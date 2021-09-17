import { Profile } from "./profile";

export interface Activity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUsername:string;
    isCancelled: boolean;
    isGoing:boolean;
    isHost:boolean;
    host?:Profile;
    attendees:Profile[];
}
export class Activity implements Activity{
    constructor(init?:ActivityFormValues){
        Object.assign(this,init);
    }
}
export class ActivityFormValues{
    id?:string =undefined;
    title: string='';
    category:string='';
    description: string='';
    date: Date|null=null
    city:string = '';
    venue:string =''

    constructor(activity?:Activity) {
        if(activity){
            this.id=activity.id;
            this.category=activity.category;
            this.city=activity.city;
            this.date=activity.date;
            this.description=activity.description;
            this.title=activity.title;
            this.venue=activity.venue;
        }
    }
}