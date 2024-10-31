import axios from 'axios'
import backend from '../utils/backend'

const fetchResponseByURL = (url: string) => {
    return axios
        .get(url)
        .then((res) => res.data)
        .catch((e) => {
            console.error(e.message)
            throw e
        })
}

export const fetchAllItems = () => {
    return fetchResponseByURL(`${backend}/items`)
}

export const fetchItemById = (itemId: string | undefined) => {
    return fetchResponseByURL(`${backend}/items/${itemId}`)
}

export const fetchAllLocations = () => {
    return fetchResponseByURL(`${backend}/locations`)
}
