import axios from 'axios'
import backend from '../utils/backend'

const removeByURL = (url: string) => {
    return axios
        .delete(url)
        .then((res) => res.data)
        .catch((e) => {
            console.error(e.message)
            throw e
        })
}

export const removeItem = (id: string | undefined) => {
    return removeByURL(`${backend}/items/${id}`)
}
