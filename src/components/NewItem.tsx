import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LocationType from '../assets/LocationType'
import axios from 'axios'
import backend from '../utils/backend'
import ErrorType from '../assets/ErrorType'
import ItemType from '../assets/ItemType'
import Back from './Back'
import Error from './Error'

const NewItem = () => {
    const [itemId, setItemId] = useState<number | undefined>()
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [locationId, setLocationId] = useState<number>(-1)

    const [locations, setLocations] = useState<LocationType[]>([])
    const [error, setError] = useState<ErrorType>()

    const [nameError, setNameError] = useState(false)
    const [idError, setIdError] = useState(false)

    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`${backend}/locations`)
            .then((res) => setLocations(res.data))
            .catch((e) =>
                setError({ status: e.status, message: e.response.data.message })
            )
    }, [])

    const handleSubmit = () => {
        // const itemId: number = randomNumber()

        if (!itemId || itemId <= 0) {
            setError({
                status: 400,
                message: 'Item ID is required',
            })
            setIdError(true)
        }
        if (itemName === '') {
            setError({
                status: 400,
                message: 'Item Name is required',
            })
            setNameError(true)
        }
        if (itemName !== '' && itemId) {
            const locationObject: LocationType | null =
                locationId === -1
                    ? null
                    : {
                          locationId,
                          state: '',
                          address: null,
                          phoneNumber: null,
                      }
            const itemObject: ItemType = {
                itemId,
                itemName,
                description,
                location: locationObject,
            }

            axios
                .post(`${backend}/items`, itemObject)
                .then(() => handleOpenModal())
                .catch((e) =>
                    setError({
                        status: e.status,
                        message:
                            e.response.data.message ?? 'Internal server error',
                    })
                )
        } else {
            setError({
                status: 400,
                message: 'Item ID and Name are required',
            })
        }
    }

    const handleCloseModal = () => {
        setOpen(!open)
    }

    const handleOpenModal = () => {
        setOpen(!open)
    }

    const handleAnotherItem = () => {
        setError(undefined)
        setNameError(false)
        setIdError(false)
        setItemId(undefined)
        setItemName('')
        setDescription('')
        setLocationId(-1)
        handleCloseModal()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseModal}
                data-testid="dialogue-modal"
            >
                <div className="modal">
                    <h4>Item was added successfuly!</h4>
                    <h3>Do you want to add another item or return home?</h3>
                    <div className="modal-buttons">
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={handleAnotherItem}
                        >
                            Add another item
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => navigate('/items')}
                        >
                            Return home
                        </Button>
                    </div>
                </div>
            </Modal>
            <Back />
            {error && <Error error={error} />}
            <h2>New Item</h2>
            <Stack spacing={2}>
                <TextField
                    label="Item ID*"
                    type="number"
                    value={itemId || ''}
                    onChange={(e) => setItemId(parseInt(e.target.value, 10))}
                    error={idError}
                    helperText={
                        idError ? 'Required field (must be greater than 0)' : ''
                    }
                />
                <TextField
                    label="Item Name*"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    error={nameError}
                    helperText={nameError ? 'Required field' : ''}
                />
                <TextField
                    label="Item Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    maxRows={3}
                />
                <FormControl>
                    <InputLabel id="newitem-address-select-label">
                        Location
                    </InputLabel>
                    <Select
                        labelId="newitem-address-select-label"
                        label="Location"
                        value={locationId}
                        onChange={(e) =>
                            setLocationId(e.target.value as number)
                        }
                    >
                        <MenuItem value={-1}>
                            <i>None</i>
                        </MenuItem>
                        {locations.map((loc) => (
                            <MenuItem
                                key={loc.locationId}
                                value={loc.locationId}
                            >
                                {loc.address}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button data-testid="btn-submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Stack>
        </div>
    )
}

export default NewItem
