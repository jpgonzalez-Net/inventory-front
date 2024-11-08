import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_ITEM, CREATE_LOCATION } from '../service/mutations'
import { GET_ALL_LOCATIONS } from '../service/queries'
import Loading from './Loading'
import { useSnackbar } from 'notistack'
import items from '../assets/items'
import locations from '../assets/locations'

const Populate = () => {
    const navigate = useNavigate()

    const [createLocation] = useMutation(CREATE_LOCATION, {
        refetchQueries: [GET_ALL_LOCATIONS],
    })
    const [createItem] = useMutation(CREATE_ITEM, {
        refetchQueries: [GET_ALL_LOCATIONS],
    })

    useEffect(() => {
        locations.forEach((location) => {
            createLocation({ variables: { ...location } })
                .then(() => {
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
                })
                .catch((e) => {
                    navigate('/items')
                    console.error(e.message)
                })
        })
    }, [navigate, createItem, createLocation])

    return (
        <div>
            <Loading message="Populating database..." />
            <h2>Populating database...</h2>
        </div>
    )
}

export default Populate
