import consola from 'consola' ;
import axios from 'axios' ;
//constants
import { 
    CF_URL , 
    CF_API_URL , 
    ERROR 
} from '../utils/constants' ;

const getUrl = (id : Number) => {
    return `${CF_URL}/contest/${id}` ;
}

const getVirtual = async (handles : string[]) : Promise<any> => {
    try {
        var name_url = new Map<string , string>() , id_contestName = new Map<Number , string>() ; 
        let { status , data } : {status : number ; data : any} = await axios.get(`${CF_API_URL}/contest.list`) ;
        if (status !== 200) {
            return {
                success : false , 
                message : "Something's wrong with CodeForces API"
            }
        }
        const allContests : any[] = data.result ; 
        for (let contest of allContests) { //mapping contest id -> contest name and url
            if (contest.phase === "FINISHED") {
                name_url.set(contest.name , `${CF_URL}/contest/${contest.id}`) ;
                id_contestName.set(contest.id , contest.name) ; 
            }
        }
        for (let handle of handles) {
            let { status , data } : {status : number ; data : any} = await axios.get(`${CF_API_URL}/user.status?handle=${handle}`) ;
            if (status !== 200) {
                return {
                    success : false , 
                    message : `User with handle ${handle} doesn't exist.`
                }
            }
            let submissions = data.result ;
            for (let submission of submissions) {
                if (submission.verdict === "OK") {
                    if (id_contestName.has(submission.problem.contestId)) {
                        // id_url.delete(submission.problem.contestId) ;
                        id_contestName.delete(submission.problem.contestId) ; 
                    }
                }
            }
        }
        var contests : any = {
            div1 : [] , 
            div2 : [] , 
            div3 : [] ,
            div4 : [] ,
            special : []
        } ;
        for (let contest of id_contestName.values()) {
            if (contest.includes("Div. 1")) {
                contests.div1.push(name_url.get(contest)) ;
            } else if (contest.includes("Div. 2")) {
                contests.div2.push(name_url.get(contest)) ;
            } else if (contest.includes("Div. 3")) {
                contests.div3.push(name_url.get(contest)) ;
            } else if (contest.includes("Div. 4")) {
                contests.div4.push(name_url.get(contest)) ;
            } else {
                contests.special.push(name_url.get(contest)) ; 
            }
        }
    } catch (error) {
        let errorMessage: string = ERROR ;
        if (error instanceof Error) {
            errorMessage = error.message ;
        }
        consola.error(errorMessage) ;
        return {
            success : false , 
            message : "Something's wrong in GetVirtual Action !!"
        }
    } finally {
        return {
            success : true , 
            message : "" , 
            contests : contests
        }
    }
}

export default getVirtual ;