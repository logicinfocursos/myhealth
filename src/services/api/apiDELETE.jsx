import { api } from './api'



export const apiDELETE = async (table, id) => {

    if (table && id) {

      //  try {

            const uri = `${table}/${id}`

            const result = await api.delete(uri)

            console.log(">>> delete result", result)

            if(result && result.status == 200)  return true
            
           

      //  } catch (error) {

        //    console.log(`error when trying to read the apiDELETE - table: ${table}`, error)
       // }
    }

    return false
}