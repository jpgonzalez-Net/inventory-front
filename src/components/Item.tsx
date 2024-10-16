import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import backend from '../utils/backend'
import ItemType from '../assets/ItemType'
import ErrorType from '../assets/ErrorType'
import { Alert, Box, Button, Chip, Divider, Modal } from '@mui/material'
import Back from './Back'
import Error from './Error'
import { Delete } from '@mui/icons-material'

const Item = () => {
    const { id } = useParams()

    const [open, setOpen] = useState(false)

    const [item, setItem] = useState<ItemType>()
    const [error, setError] = useState<ErrorType>()

    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`${backend}/items/${id}`)
            .then((res) => {
                setItem(res.data)
            })
            .catch((e) => {
                console.log(e)
                setError({
                    status: e.status,
                    message: e.response.data.message ?? 'Internal server error',
                })
            })
    }, [])

    const handleOpenModal = () => {
        setOpen(!open)
    }
    const handleCloseModal = () => {
        setOpen(!open)
    }

    const handleDelete = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault()
        axios
            .delete(`${backend}/items/${id}`)
            .then(() => {
                handleCloseModal()
                navigate('/items')
            })
            .catch((e) => {
                console.error(`${e.status}: ${e.response.data.message}`)
                setError({
                    status: e.status,
                    message: e.response.data.message ?? 'Internal server error',
                })
                handleCloseModal()
            })
    }

    return (
        <div>
            <Modal open={open} onClose={handleCloseModal}>
                <div className="modal">
                    <h4>Are you sure?</h4>
                    <div className="modal-buttons">
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={(e) => handleDelete(e)}
                        >
                            Yes, delete
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
            <Back />
            {error && <Error error={error} />}
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
