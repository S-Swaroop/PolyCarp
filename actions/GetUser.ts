// import { GET_USER_RESPONSE , RESULT } from "../utils/types" ;
import { ERROR } from "../utils/constants" ; 
import consola from 'consola' ;
import axios from "axios";

const getUser = async (username : string) : Promise<any> => {
    try {
        let { status , data } : {status : number ; data : any} = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`) ;
        if (status !== 200) {
            return {
                success : false , 
                message : "Something's wrong with CodeForces API"
            }
        }
        return {
            success : true , 
            userData : data.result[0] 
        };
    } catch (error) {
        let errorMessage: string = ERROR ;
        if (error instanceof Error) {
            errorMessage = error.message ;
        }
        consola.error(errorMessage) ;
        return {
            success : false , 
            message : "Something's wrong in Getuser Action !!"
        }
    }
}

export default getUser ;