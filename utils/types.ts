
export interface GET_USER_RESULT {
    lastName: string ,
    country: string ,
    lastOnlineTimeSeconds: number ,
    city: string ,
    rating: number ,
    friendOfCount: number ,
    titlePhoto: string ,
    handle: string ,
    avatar: string ,
    firstName: string ,
    contribution: number ,
    organization: string ,
    rank: string ,
    maxRating: number ,
    registrationTimeSeconds: number ,
    maxRank: string 
}

export interface GET_USER_RESPONSE {
    status : string , 
    result : [GET_USER_RESULT]
}