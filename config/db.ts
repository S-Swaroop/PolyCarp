import mongoose from 'mongoose' ;
import consola from 'consola' ;
//config vars
import { MONGO_URI_CLOUD } from './index' ;

//constants
import { ERROR } from '../utils/constants' ;

const connectDB = async () : Promise<void> => {
    try {
        var conn : any = await mongoose.connect(MONGO_URI_CLOUD) ;
    } catch (error) {
        let errorMessage: string = ERROR ;
        if (error instanceof Error) {
            errorMessage = error.message ;
        }
        consola.error(errorMessage) ;
    } finally {
        consola.success(`MongoDB Connected : ${conn.connection.host}`) ;
    }
}

export default connectDB ; 