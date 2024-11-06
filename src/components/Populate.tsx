import { useNavigate } from 'react-router-dom'
import ItemType from '../assets/ItemType'
import LocationType from '../assets/LocationType'
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
    const { enqueueSnackbar } = useSnackbar()

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
                                enqueueSnackbar(
                                    'Database populated correctly!',
                                    { variant: 'success' }
                                )
                                navigate('/items')
                            })
                            .catch((e) => {
                                enqueueSnackbar('An error ocurred', {
                                    variant: 'error',
                                })
                                navigate('/items')
                                console.error(e.message)
                            })
                    })
                })
                .catch((e) => {
                    enqueueSnackbar('An error ocurred', {
                        variant: 'error',
                    })
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
