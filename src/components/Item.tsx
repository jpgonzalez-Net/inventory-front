import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ItemType from '../assets/ItemType'
import ErrorType from '../assets/ErrorType'
import { Box, Button, Chip, Divider, Modal } from '@mui/material'
import Back from './Back'
import Error from './Error'
import { Delete } from '@mui/icons-material'
import DeleteItem from './DeleteItem'
import { useQuery } from '@apollo/client'
import { GET_ITEM } from '../service/queries'
import Loading from './Loading'

const Item = () => {
    const { id } = useParams()

    const { data, loading, error } = useQuery(GET_ITEM, {
        variables: { itemId: Number(id) },
    })

    const [open, setOpen] = useState(false)

    const [item, setItem] = useState<ItemType>()
    const [errorMessage, setErrorMessage] = useState<ErrorType>()

    const navigate = useNavigate()

    useEffect(() => {
        if (!error && !loading) {
            setItem(data.item)
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
                handleError={(e) => setErrorMessage({ status: 0, message: e })}
                afterDelete={() => navigate('/items')}
            />
            <Back />
            {errorMessage && <Error error={errorMessage} />}
            {item && (
                <div>
                    <Box sx={{ p: 2 }}>
                        <Chip
                            label={
                                <span>
                                    <b>ID:</b> {item.itemId}
                                </span>
                            }
                            className="id-label"
                            size="small"
                        />
                        <h2 className="item-title">{item?.itemName}</h2>
                        <p>{item?.description}</p>
                    </Box>
                    {item?.location ? (
                        <>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <h3>Location:</h3>
                                <Chip
                                    label={
                                        <span>
                                            <b>ID:</b> {item.itemId}
                                        </span>
                                    }
                                    className="id-label"
                                    size="small"
                                />
                                <h4 className="item-title">
                                    {item.location.address}
                                </h4>
                                {item.location.state && (
                                    <p>
                                        <b>State:</b> {item.location.state}
                                    </p>
                                )}
                                {item.location.phoneNumber && (
                                    <p>
                                        <b>Phone #:</b>{' '}
                                        {item.location.phoneNumber}
                                    </p>
                                )}
                            </Box>
                        </>
                    ) : (
                        <></>
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
                </div>
            )}
        </div>
    )
}

export default Item
