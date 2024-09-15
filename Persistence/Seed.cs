using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Events.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Elena Jakimovska",
                        UserName = "elenaJ",
                        Email = "elena.jakimovska@eventplanner.com",
                        Role = "Administrator"
                    },
                    new AppUser                    
                    {
                        DisplayName = "Elena Ivanovska",
                        UserName = "elenaI",
                        Email = "elena.ivanovska@eventplanner.com",
                        Role = "User"
                    },         
                    new AppUser
                    {
                        DisplayName = "Ana Nucevska",
                        UserName = "anaN",
                        Email = "ana.nucevska@eventplanner.com",
                        Role = "User"
                    },                               
                    new AppUser
                    {
                        DisplayName = "Jovana Miskimovska",
                        UserName = "jovanaM",
                        Email = "jovana.miskimovska@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Sara Mitevska",
                        UserName = "saraM",
                        Email = "sara.mitevska@eventplanner.com",
                        Role = "User"
                    },        
                    new AppUser
                    {
                        DisplayName = "Biljana Jovchevska",
                        UserName = "biljanaJ",
                        Email = "biljana.jovchevska@eventplanner.com",
                        Role = "User"
                    },                                
                    new AppUser
                    {
                        DisplayName = "Iva Ivanov",
                        UserName = "ivaI",
                        Email = "iva.ivanov@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Marija Miloshevska",
                        UserName = "marijaM",
                        Email = "marija.miloshevska@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Angela Stojchevska",
                        UserName = "angelaS",
                        Email = "angela.stojchevska@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Eva Shaltanovska",
                        UserName = "evaS",
                        Email = "eva.shaltanovska@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Avalon Production",
                        UserName = "avalonProd",
                        Email = "avalon@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Honeycomb Production",
                        UserName = "honeycombProd",
                        Email = "honeycomb@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Bluewater Production",
                        UserName = "bluewaterProd",
                        Email = "bluewater@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Gramafilm Production",
                        UserName = "gramafilmProd",
                        Email = "gramafilm@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Cube Production",
                        UserName = "cubeProd",
                        Email = "cube@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Clockwise Production",
                        UserName = "clockwiseProd",
                        Email = "clockwise@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Jungle Travel",
                        UserName = "jungleTravel",
                        Email = "jungle@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Escape Travel",
                        UserName = "escapeTravel",
                        Email = "escape@eventplanner.com",
                        Role = "User"
                    },
                    new AppUser
                    {
                        DisplayName = "Aurora Travel",
                        UserName = "auroraTravel",
                        Email = "aurora@eventplanner.com",
                        Role = "User"
                    },
                };                

                foreach (var user in users)
                {
                    user.Bio = "Hi! My name is " + user.DisplayName;
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var userFollowings = new List<UserFollowing>
                {
                    new UserFollowing
                    {
                        TargetId = users[0].Id,
                        ObserverId = users[3].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[0].Id,
                        ObserverId = users[6].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[0].Id,
                        ObserverId = users[8].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[1].Id,
                        ObserverId = users[2].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[1].Id,
                        ObserverId = users[5].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[1].Id,
                        ObserverId = users[4].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[2].Id,
                        ObserverId = users[0].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[2].Id,
                        ObserverId = users[3].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[2].Id,
                        ObserverId = users[8].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[3].Id,
                        ObserverId = users[1].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[3].Id,
                        ObserverId = users[0].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[3].Id,
                        ObserverId = users[9].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[4].Id,
                        ObserverId = users[0].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[4].Id,
                        ObserverId = users[6].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[4].Id,
                        ObserverId = users[8].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[5].Id,
                        ObserverId = users[9].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[5].Id,
                        ObserverId = users[3].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[6].Id,
                        ObserverId = users[0].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[7].Id,
                        ObserverId = users[2].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[7].Id,
                        ObserverId = users[6].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[8].Id,
                        ObserverId = users[3].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[8].Id,
                        ObserverId = users[9].Id
                    },
                    new UserFollowing
                    {
                        TargetId = users[9].Id,
                        ObserverId = users[7].Id
                    },
                };

                await context.UserFollowings.AddRangeAsync(userFollowings);

                var photos = new List<Photo>
                {
                    new Photo
                    {
                        Id = "zhox9dhdy5xbb3spqgve",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1725996022/zhox9dhdy5xbb3spqgve.png",
                        IsMain = true,  
                        AppUserId = users[0].Id                      
                    },
                    new Photo
                    {
                        Id = "p4ipfvtrxvzevvqrvmfn",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1725996093/p4ipfvtrxvzevvqrvmfn.png",
                        IsMain = true,  
                        AppUserId = users[1].Id                      
                    },
                    new Photo
                    {
                        Id = "xiusj11ijckdqn7rqqxq",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1725996111/xiusj11ijckdqn7rqqxq.png",
                        IsMain = true,  
                        AppUserId = users[2].Id                      
                    },
                    new Photo
                    {
                        Id = "yv2vlnfu1gjx34seub0v",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1725996133/yv2vlnfu1gjx34seub0v.png",
                        IsMain = true,  
                        AppUserId = users[3].Id                      
                    },
                    new Photo
                    {
                        Id = "z13kb3gel9rspbmxovts",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1725996160/z13kb3gel9rspbmxovts.png",
                        IsMain = true,  
                        AppUserId = users[4].Id                      
                    },
                    new Photo
                    {
                        Id = "t2dyo8vy4pj8bo0wf4j5",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1725996183/t2dyo8vy4pj8bo0wf4j5.png",
                        IsMain = true,  
                        AppUserId = users[5].Id                      
                    },
                    new Photo
                    {
                        Id = "mudpigi6w9rm9ilsuaij",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1725996298/mudpigi6w9rm9ilsuaij.png",
                        IsMain = true,  
                        AppUserId = users[6].Id                      
                    },
                    new Photo
                    {
                        Id = "tnajatfg3vqv4kgtvmo6",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1725998259/tnajatfg3vqv4kgtvmo6.png",
                        IsMain = true,  
                        AppUserId = users[7].Id                      
                    },
                    new Photo
                    {
                        Id = "prtsqfydwxmp3arhjzbp",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1725996359/prtsqfydwxmp3arhjzbp.png",
                        IsMain = true,  
                        AppUserId = users[8].Id                      
                    },
                    new Photo
                    {
                        Id = "d3hjuitr1t4trbhf4o4r",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1725996420/d3hjuitr1t4trbhf4o4r.png",
                        IsMain = true,  
                        AppUserId = users[9].Id                      
                    },
                    new Photo
                    {
                        Id = "zc4e1zlj8psw9qvb2o8z",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726013908/zc4e1zlj8psw9qvb2o8z.png",
                        IsMain = true,  
                        AppUserId = users[10].Id                      
                    },
                    new Photo
                    {
                        Id = "vvkyd7kjdlujikkzha1z",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726009654/vvkyd7kjdlujikkzha1z.png",
                        IsMain = true,  
                        AppUserId = users[11].Id                      
                    },
                    new Photo
                    {
                        Id = "efvepmp4gkyj3j96ryzm",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726009743/efvepmp4gkyj3j96ryzm.png",
                        IsMain = true,  
                        AppUserId = users[12].Id                      
                    },
                    new Photo
                    {
                        Id = "mnnlfhjbskwettwcj9da",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726009810/mnnlfhjbskwettwcj9da.png",
                        IsMain = true,  
                        AppUserId = users[13].Id                      
                    },
                    new Photo
                    {
                        Id = "upfhhikn1gfin9qorgw9",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726009913/upfhhikn1gfin9qorgw9.png",
                        IsMain = true,  
                        AppUserId = users[14].Id                      
                    },
                    new Photo
                    {
                        Id = "ccbvaddmcdh6rfttxtrr",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726009922/ccbvaddmcdh6rfttxtrr.png",
                        IsMain = true,  
                        AppUserId = users[15].Id                      
                    },
                    new Photo
                    {
                        Id = "zyw4drja1cj6aysmn5u9",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726010047/zyw4drja1cj6aysmn5u9.png",
                        IsMain = true,  
                        AppUserId = users[16].Id                      
                    },
                    new Photo
                    {
                        Id = "urmpihzkylx7zhwwfsqw",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726010058/urmpihzkylx7zhwwfsqw.png",
                        IsMain = true,  
                        AppUserId = users[17].Id                      
                    },
                    new Photo
                    {
                        Id = "phbonsw4fhabblp5fmgo",
                        Url = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726010066/phbonsw4fhabblp5fmgo.png",
                        IsMain = true,  
                        AppUserId = users[18].Id                      
                    },
                };

                await context.Photos.AddRangeAsync(photos);                

                var events = new List<Event>
                {
                    new Event
                    {
                        Title = "Sting: My Songs Tour",
                        // Date = new DateTime(2024, 10, 02, 21, 00, 00, DateTimeKind.Utc),
                        Date = new DateTime(2024, 09, 15, 21, 00, 00, DateTimeKind.Utc),
                        Description = "Experience Sting like never before! \nAnnouncing the Sting My Songs Tour 2024, where he’ll perform reimagined versions of his greatest hits, including \"Fields of Gold\", \"Every Breath You Take\", \"Roxanne\" and \"Desert Rose\".",                            
                        Location = "National Arena \"Todor Proeski\", Skopje, Macedonia",
                        Image="https://res.cloudinary.com/ddz2sobeb/image/upload/v1726405600/gum6ru6lx6ctbffqpmei.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[10],
                                IsHost = true
                            },    
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[3],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[4],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[5],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[6],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[7],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[8],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[9],
                                IsHost = false
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Ed Sheeran: +–=÷x Tour",
                        Date = new DateTime(2024, 09, 15, 21, 30, 00, DateTimeKind.Utc),
                        Description = "Ed Sheeran is hitting the road for his Ed Sheeran 2024 Tour. \nDon’t miss the chance to hear live performances of his biggest hits, including \"Shape of You\", \"Perfect\", \"Thinking Out Loud\" and \"Bad Habits\".",
                        Location = "Usce Park, Belgrade, Serbia",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726405692/w1vy9sbditoqa1wznarb.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[12],
                                IsHost = true
                            },
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[8],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[9],
                                IsHost = false
                            },                            
                        }
                    },
                    new Event
                    {
                        Title = "Skopje Jazz Festival",
                        Date = new DateTime(2024, 10, 22, 20, 30, 00, DateTimeKind.Utc),
                        Description = "Get ready for an unforgettable musical experience! \nThe Skopje Jazz Festival 2024 is coming to town, featuring an incredible lineup of jazz legends and emerging talents. Join us for a celebration of jazz that will ignite your senses and elevate your spirit.",
                        Location = "National Opera and Ballet, Skopje, Macedonia",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726405800/hrmr7huwtiornn7z5i6w.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[10],
                                IsHost = true
                            },
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[4],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[6],
                                IsHost = false
                            },
                        }
                    },
                    new Event
                    {
                        Title = "HardBeats Festival",
                        Date = new DateTime(2024, 9, 14, 17, 00, 00, DateTimeKind.Utc),
                        Description = "Get ready to turn up the volume at the HardBeats Festival 2024! \nDive into a high-energy lineup of the biggest names in electronic, dance, and hard-hitting beats.",
                        Location = "Cvetličarna d.o.o., Ljubljana, Slovenia",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726406013/ossny9skaxtqlo01erki.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[11],
                                IsHost = true                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },                            
                        }
                    },
                    new Event
                    {
                        Title = "Danube Rock Sounds",
                        Date = new DateTime(2024, 10, 10, 18, 00, 00, DateTimeKind.Utc),
                        Description = "Get ready to rock out at Danube Rock Sounds 2024! \nJoin us for an epic celebration of rock music featuring electrifying performances from top bands and emerging artists.",
                        Location = "Plaja Dunărea, Galaţi, Romania",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726406126/u2mhdsxzv2ae51lat8ha.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[11],
                                IsHost = true                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Tirana International Film Festival",
                        Date = new DateTime(2024, 10, 21, 19, 30, 00, DateTimeKind.Utc),
                        Description = "Get ready for an unforgettable cinematic journey as we bring the magic of film to the heart of Tirana! \nJoin us for a week-long celebration of storytelling, creativity, and innovation.",
                        Location = "Kinema Millennium, Tirana, Albania",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726406197/ra5ubgze9rx7qqhomjv1.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[13],
                                IsHost = true
                            },
                            new EventAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[5],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[7],
                                IsHost = false
                            },
                        }
                    },           
                    new Event
                    {
                        Title = "Cannes Film Festival",
                        Date = new DateTime(2024, 12, 21, 19, 00, 00, DateTimeKind.Utc),
                        Description = "The Cannes Film Festival 2024 is just around the corner! \nJoin us for an extraordinary celebration of cinema, featuring stunning premieres, star-studded red carpets, and groundbreaking films from around the globe.",
                        Location = "Cinéma du réel, Cannes, France",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726406316/g1ybhymp1qsennqn1asf.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[15],
                                IsHost = true
                            },
                            new EventAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[4],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[7],
                                IsHost = false
                            },
                        }
                    },                               
                    new Event
                    {
                        Title = "Venice Film Festival",
                        Date = new DateTime(2024, 09, 10, 18, 30, 00, DateTimeKind.Utc),
                        Description = "The Venice Film Festival 2024 is coming soon! \nJoin us in the enchanting city of Venice for a dazzling celebration of cinema, featuring world premieres, star-studded events, and groundbreaking films from across the globe.",
                        Location = "Palazzo del Cinema, Venice, Italy",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726406384/qytjpwakrjq1yjlontoi.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[14],
                                IsHost = true
                            },
                            new EventAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[4],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[7],
                                IsHost = false
                            },
                        }
                    },                               
                    new Event
                    {
                        Title = "Berlin International Film Festival",
                        Date = new DateTime(2024, 09, 12, 18, 30, 00, DateTimeKind.Utc),
                        Description = "The Berlin International Film Festival 2024 is coming soon! \nJoin us in the enchanting city of Berlin for a dazzling celebration of cinema, featuring world premieres, star-studded events, and groundbreaking films from across the globe.",
                        Location = "Berliner Palast, Berlin, Germany",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726406446/i2old9n0jcxsguzqeo5s.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[13],
                                IsHost = true
                            },
                            new EventAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[3],
                                IsHost = false
                            },
                            new EventAttendee
                            {
                                AppUser = users[7],
                                IsHost = false
                            },
                        }
                    },                               
                    new Event
                    {
                        Title = "South America Tour",
                        Date = new DateTime(2024, 10, 12, 18, 30, 00, DateTimeKind.Utc),
                        Description = "Join us for an experience that blends nature, history, and excitement—where every moment is a new adventure. \nBook your South American escape today and let the journey of a lifetime begin!",
                        Location = "Peru, Bolivia, Chile",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726406562/v2brrr2wypfzmcrpglr7.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[17],
                                IsHost = true                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[5],
                                IsHost = false                            
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Zanzibar Beach Adventure",
                        Date = new DateTime(2024, 09, 12, 18, 30, 00, DateTimeKind.Utc),
                        Description = "Whether you seek relaxation, adventure, or a bit of both, Zanzibar offers an idyllic escape with its stunning beaches, warm hospitality, and captivating history. \nMake your dream tropical escape a reality—book your Zanzibar adventure today and let the island's serenity rejuvenate your spirit! ",
                        Location = "Zanzibar, Tanzania",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726406613/qhelycvdwmelbbxyweru.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[17],
                                IsHost = true                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[2],
                                IsHost = false                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[7],
                                IsHost = false                            
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Maldives Beach Adventure",
                        Date = new DateTime(2024, 12, 20, 18, 30, 00, DateTimeKind.Utc),
                        Description = "Experience unparalleled luxury and natural beauty in one of the most breathtaking destinations on Earth. \nBook your Maldives retreat today and let the serene island paradise wash your cares away!",
                        Location = "Maldives",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726406699/e58l8pyt4imvyp54lwtx.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[16],
                                IsHost = true                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[9],
                                IsHost = false                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[8],
                                IsHost = false                            
                            },
                        }
                    },
                    new Event
                    {
                        Title = "Thailand Tour",
                        Date = new DateTime(2024, 11, 12, 18, 30, 00, DateTimeKind.Utc),
                        Description = "Whether you’re seeking adventure, relaxation, or a taste of Thai culture, Thailand offers something for every traveler. \nDon’t miss out—book your Thai adventure today and let the Land of Smiles enchant you!",
                        Location = "Thailand",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726406775/g61edyhqweoxtzi1hcjg.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[18],
                                IsHost = true                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                        }
                    },       
                    new Event
                    {
                        Title = "Northern Lights Tour",
                        Date = new DateTime(2024, 12, 22, 18, 30, 00, DateTimeKind.Utc),
                        Description = "Event 8 months in future",
                        Location = "Iceland",
                        Image = "https://res.cloudinary.com/ddz2sobeb/image/upload/v1726406890/anl0mscieoskign3qgyg.png",
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUser = users[18],
                                IsHost = true                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[5],
                                IsHost = false                            
                            },
                            new EventAttendee
                            {
                                AppUser = users[4],
                                IsHost = false                            
                            },
                        }
                    },
                };

                await context.Events.AddRangeAsync(events);
                await context.SaveChangesAsync();
            }
        }
    }
}
