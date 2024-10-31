import axios from 'axios'
import ItemType from '../assets/ItemType'
import LocationType from '../assets/LocationType'
import backend from '../utils/backend'

const createByURL = (url: string, object: any) => {
    return axios
        .post(url, object)
        .then((res) => res.data)
        .catch((e) => {
            console.error(e)
            throw e
        })
}

export const createItem = (item: ItemType) => {
    return createByURL(`${backend}/items`, item)
}

export const createLocation = (location: LocationType) => {
    return createByURL(`${backend}/locations`, location)
}
