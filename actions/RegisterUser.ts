import consola from 'consola' ;

//models and model_interfaces
import { User , USER_INTERFACE } from '../models/User' ;

//actions 
import getUser from './GetUser' ;

//constants
import { ERROR } from '../utils/constants' ;

const registerUser = async (author : any , handle : string) : Promise<any> => {
    let { 
        success , 
        userData , 
        message 
    } : {
        success : boolean ; 
        userData : any ; 
        message : string
    } = await getUser(handle) ;

    if (success) {
        try {
            let existingUser : any = await User.findOne({handle : handle}) ;

            if (existingUser) {
                return {
                    success : false , 
                    message : "User with this handle is already registered !!"
                }
            }
            let user : USER_INTERFACE = await User.create({
                handle : handle ,
                firstName : userData.firstName , 
                lastName : userData.lastName , 
                rank : userData.rank ,
                discordUserId : author.id 
            }) ;

            // consola.log(`created user : ` , user) ;

            return {
                success : true , 
                message : "User registered !"
            };

        } catch (error) {
            let errorMessage: string = ERROR ;
            if (error instanceof Error) {
                errorMessage = error.message ;
            }
            consola.error(errorMessage) ;
            return {
                success : false , 
                message : "Something's wrong in RegisterUser action !"
            }
        }
    } else {
        consola.error(message) ; 
        return {
            success : false , 
            message : "No such user found in CodeForces !!"
        }
    }
}

export default registerUser ;