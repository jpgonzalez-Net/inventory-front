import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_ITEM } from '../service/mutations'
import { GET_ALL_LOCATIONS } from '../service/queries'
import Loading from './Loading'
import items from '../assets/items'

const PopulateItems = () => {
    const navigate = useNavigate()

    const [createItem] = useMutation(CREATE_ITEM, {
        refetchQueries: [GET_ALL_LOCATIONS],
    })

    useEffect(() => {
        items.forEach((item) => {
            createItem({
                variables: {
                    ...item,
                    locationId: item.location?.locationId ?? null,
                },
            })
                .then(() => {
                    navigate('/items')
                })
                .catch((e) => {
                    navigate('/items')
                    console.error(e.message)
                })
        })
    }, [navigate, createItem])

    return (
        <div>
            <Loading message="Populating database with items..." />
            <h2>Populating database...</h2>
        </div>
    )
}

export default PopulateItems
