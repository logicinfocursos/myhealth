import { api } from './api'



export const apiPUT = async(table = '', objToUpdate) => {

    if (table !== '') {

        try {

            const result = await api.put(`${table}/${objToUpdate.id}`, objToUpdate)  

            return result.data

        } catch (error) {

            console.log(`error when trying to read the apitPUT - table: ${table}`, error)
             
        }
    }   

    return false
}