import { makeAutoObservable, reaction, runInAction } from "mobx";
import { FilterProfile, Photo, Profile, UserEvent } from "../models/profile";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;
    loading = false;
    followings: Profile[] = [];
    loadingFollowings = false;
    activeTab = 0;
    userEvents: UserEvent[] = [];
    loadingEvents = false;
    filterProfiles: FilterProfile[] = [];    

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.activeTab,
            activeTab => {
                if (activeTab === 3 || activeTab === 4) {
                    const predicate = activeTab === 3 ? 'followers' : 'following';
                    this.loadFollowings(predicate);
                } else {
                    this.followings = [];
                }
            }
        )
    }

    setActiveTab = (activeTab: number) => {
        this.activeTab = activeTab;
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }

        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    loadAllProfiles = async (existingUsers?: FilterProfile[]) => {
        if (!!existingUsers)
            this.filterProfiles = existingUsers
        else {
            const allUsers = await agent.Profiles.getAll();
            runInAction(() => {
                let users:FilterProfile[] = [];
                allUsers.forEach(user => {
                    users.push(user);
                })
                this.filterProfiles = users;
            })
        }
    }    

    deleteProfile = async (username: string) => {
        try {
            await agent.Profiles.delete(username);
            runInAction(() => {
                this.filterProfiles = this.filterProfiles.filter(p => p.username !== username);                
                this.followings = this.followings.filter(p => p.username !== username);
                store.eventStore.eventRegistry.forEach(e => {
                    e.attendees = e.attendees.filter(a => a.username !== username);
                })                
                store.eventStore.eventRegistry.forEach(e => {
                    if (e.hostUsername == username) {
                        e.host = undefined;
                        store.eventStore.eventRegistry.set(e.id, e)
                    }
                })  
                if (store.userStore.user?.username === username)
                    store.userStore.logout();
                router.navigate('/events');
            })
        } catch (error) {
            console.log(error);
        }
    }

    uploadPhoto = async (file: Blob, eventId?: string) => {
        this.uploading = true;
        try {
            const response = await agent.Profiles.uploadPhoto(file, eventId);
            const photo = response.data;
            runInAction(() => {
                if (eventId == null)
                {
                    if (this.profile) {
                        this.profile.photos?.push(photo);
                        if (photo.isMain && store.userStore.user) {
                            store.userStore.setImage(photo.url);
                            this.profile.image = photo.url;
                        }
                    }
                } else {
                    store.eventStore.selectedEvent!.image = photo.url;
                    store.eventStore.eventRegistry.set(store.eventStore.selectedEvent!.id, store.eventStore.selectedEvent!);
                }

                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    setMainPhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }

    deletePhoto = async (id: string, src: string) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(id);
            runInAction(() => {
                if (this.profile && src == 'user') {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== id);
                }
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }

    updateProfile = async (profile: Partial<Profile>) => {
        this.loading = true;
        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName && profile.displayName !== store.userStore.user?.displayName)
                    store.userStore.setDisplayName(profile.displayName);
                this.profile = { ...this.profile, ...profile as Profile };
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateFollowing = async (username: string, following: boolean) => {
        this.loading = true;
        try {
            await agent.Profiles.updateFollowing(username);
            store.eventStore.updateAttendeeFollowing(username);
            runInAction(() => {
                if (this.profile && this.profile.username !== store.userStore.user?.username && this.profile.username === username) {
                    if (following) {
                        this.profile.followersCount++;
                        this.followings.push(store.userStore.userProfile!);
                     } else {
                        this.followings = this.followings.filter(a => a.username !== store.userStore.user?.username);
                        this.profile.followersCount--;                        
                     }
                    this.profile.following = !this.profile.following;
                }
                if (this.profile && this.profile.username === store.userStore.user?.username) {
                    following ? this.profile.followingCount++ : this.profile.followingCount--;
                }
                this.followings.forEach(profile => {
                    if (profile.username == username) {
                        profile.following ? profile.followersCount-- : profile.followersCount++;
                        profile.following = !profile.following;
                    }
                })
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    loadFollowings = async (predicate: string) => {
        this.loadingFollowings = true;
        try {
            const followings = await agent.Profiles.listFollowings(this.profile!.username, predicate);
            runInAction(() => {
                this.followings = followings;
                this.loadingFollowings = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingFollowings = false);
        }
    }

    loadUserEvents = async (username: string, predicate?: string) => {
        this.loadingEvents = true;
        try {
            const events = await agent.Profiles.listEvents(username, predicate!);
            runInAction(() => {
                this.userEvents = events;
                this.loadingEvents = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingEvents = false;
            })
        }
    }
}