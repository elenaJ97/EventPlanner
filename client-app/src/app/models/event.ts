import { Profile } from "./profile"

export interface Event {
    id: string
    title: string
    date: Date | null
    description: string
    location: string
    image: string
    hostUsername: string
    isCancelled: boolean
    isGoing: boolean
    isHost: boolean
    host?: Profile
    attendees: Profile[]
}

export class Event implements Event {
    constructor(init?: EventFormValues) {
        Object.assign(this, init);
    }
}

export class EventFormValues {
    id?: string = undefined;
    title: string = '';
    description: string = '';    
    date: Date | null = null;
    location: string = '';
    image: string = '';

    constructor(event?: EventFormValues) {
        if (event) {
            this.id = event.id;
            this.title = event.title;
            this.description = event.description;
            this.date = event.date;
            this.location = event.location;
            this.image = event.image;
        } 
    }
}

export interface FilterEvent {
    id?: string;
    title: string;
    location: string;
}