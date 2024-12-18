import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItemType from '../assets/ItemType'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
} from '@mui/material'
import Back from './Back'
import { Delete } from '@mui/icons-material'
import DeleteItem from './DeleteItem'
import { useQuery } from '@apollo/client'
import { GET_ITEM } from '../service/queries'
import Loading from './Loading'
import { useSnackbar } from 'notistack'

const Item = () => {
    const { id } = useParams()

    const { data, loading, error } = useQuery(GET_ITEM, {
        variables: { itemId: Number(id) },
    })

    const [open, setOpen] = useState(false)

    const [item, setItem] = useState<ItemType>()

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (!error && !loading) {
            setItem(data.item)
        }
        if (error) {
            enqueueSnackbar(error.message, { variant: 'error' })
        }
    }, [data, loading, error])

    const handleOpenModal = () => {
        setOpen(!open)
    }
    const handleCloseModal = () => {
        setOpen(!open)
    }

    return (
        <div>
            {loading && <Loading message="Loading item..." />}
            <DeleteItem
                open={open}
                itemId={Number(id)}
                handleClose={handleCloseModal}
                handleError={() => navigate('/items')}
                afterDelete={() => navigate('/items')}
            />
            <Back />
            {item && (
                <div>
                    <Card sx={{ marginTop: 2 }}>
                        <CardHeader
                            title={item.itemName}
                            subheader={`ID: ${item.itemId}`}
                        />
                        <CardContent>
                            {item.description && (
                                <div>
                                    <h4>Description:</h4>
                                    <p>{item.description}</p>
                                </div>
                            )}
                            {item.location && (
                                <div>
                                    <Divider />
                                    <h3>Location:</h3>
                                    <p>
                                        Location ID: {item.location.locationId}
                                    </p>
                                    <p>State: {item.location.state}</p>
                                    {item.location.address && (
                                        <p>Address: {item.location.address}</p>
                                    )}
                                    {item.location.phoneNumber && (
                                        <p>
                                            Phone Number:{' '}
                                            {item.location.phoneNumber}
                                        </p>
                                    )}
                                </div>
                            )}
                            <Box sx={{ p: 2 }}>
                                <Button
                                    color="error"
                                    onClick={handleOpenModal}
                                    startIcon={<Delete />}
                                    variant="contained"
                                >
                                    Delete
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}

export default Item
