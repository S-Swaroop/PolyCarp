
import {
    GET_USER , 
    GET_VIRTUAL , 
    // UPCOMING_CONTESTS , 
    REGISTER ,
    // HELP
} from './constants' ;

const parseMessage = (message: string): any => {
    let words : string[] = message.split(" ") ;
    
    let COMMAND: string = words[0].slice(1) ;
    
    let FLAGS: string[] = [] ;
    let ARGS: any = {} ;
    
    switch (COMMAND) {
        case GET_USER : 
            ARGS.username = words[1] ;
            break ;
        case GET_VIRTUAL : 
            ARGS.users = words.slice(1) ;
            break ;
        case REGISTER : 
            ARGS.handle = words[1] ;
        default:
            break ;
    }

    return {
        COMMAND , 
        FLAGS , 
        ARGS
    }
}

export default parseMessage ;