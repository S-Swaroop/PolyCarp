import { Document, Schema, model , Model } from 'mongoose' ;

//constants
import { USER } from '../utils/constants' ;

//interface for user document 
export interface USER_INTERFACE extends  Document {
    firstName : string ;
    lastName : string ;
    discordUserId : string ; 
    handle : string ;
    rank: string ;
    country?: string ; 
    city?: string ; 
    organization?: string ; 
};

//some types
const ReqString = {
    type: String , 
    required: true 
}

const UserSchema = new Schema<USER_INTERFACE>({
    firstName: ReqString , 
    lastName: ReqString , 
    handle: ReqString ,
    discordUserId: ReqString ,
    rank: ReqString , 
    country: String , 
    city: String ,
    organization: String  
}, {
    timestamps : true 
});

//model 
export const User : Model<USER_INTERFACE> = model<USER_INTERFACE>(USER , UserSchema)
