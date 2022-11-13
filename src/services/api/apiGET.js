import { api } from './api'



export const apiGET = async (table = '', searchID = '', searchField = 'id') => {


    let uri = searchID === '' ? `${table}` : `${table}?${searchField}=${searchID}`

    if (table !== '') {

        try {

            const response = await api.get(uri)

            return response

        } catch (error) {

            console.log(`erro ao tentar ler a api: ${table}`, error)
        }
    }

    return null
}