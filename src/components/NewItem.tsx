import {
    Box,
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
import ErrorType from '../assets/ErrorType'
import Back from './Back'
import Error from './Error'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_ITEMS, GET_ALL_LOCATIONS } from '../service/queries'
import { CREATE_ITEM } from '../service/mutations'
import Loading from './Loading'
import { modalStyle } from '../assets/ModalStyle'
import { useSnackbar } from 'notistack'

const NewItem = () => {
    const [itemId, setItemId] = useState<number | undefined>()
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [locationId, setLocationId] = useState<number>(0)

    const [locations, setLocations] = useState<LocationType[]>([])

    const [nameError, setNameError] = useState(false)
    const [idError, setIdError] = useState(false)

    const [open, setOpen] = useState(false)

    const {
        data: locationData,
        loading: locationLoading,
        error: locationError,
    } = useQuery(GET_ALL_LOCATIONS)

    const [createItem, { loading: itemLoading, error: itemError }] =
        useMutation(CREATE_ITEM, {
            refetchQueries: [GET_ALL_ITEMS],
        })

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (!locationError && !locationLoading) {
            setLocations(locationData.allLocations)
        }
        if (locationError) {
            enqueueSnackbar('There was an error fetching location data', {
                variant: 'error',
            })
        }
    }, [locationData, locationLoading, locationError])

    useEffect(() => {
        if (itemError) {
            enqueueSnackbar(itemError.message, { variant: 'error' })
        }
    }, [itemError])

    const handleSubmit = () => {
        // const itemId: number = randomNumber()

        if (itemId && itemId > 0) {
            setIdError(false)
        }
        if (itemName !== '') {
            setNameError(false)
        }

        if ((!itemId || itemId <= 0) && itemName === '') {
            enqueueSnackbar('Item ID and Name are required', {
                variant: 'error',
            })
        } else if (!itemId || itemId <= 0) {
            enqueueSnackbar('Item ID is required', { variant: 'error' })
            setIdError(true)
        } else if (itemName === '') {
            enqueueSnackbar('Item Name is required', { variant: 'error' })
            setNameError(true)
        } else {
            createItem({
                variables: {
                    itemId,
                    itemName,
                    description: description.length === 0 ? null : description,
                    locationId: locationId === 0 ? null : locationId,
                },
            })
                .then(() => {
                    enqueueSnackbar('Item added successfully!', {
                        variant: 'success',
                    })
                    handleOpenModal()
                })
                .catch((e) => enqueueSnackbar(e.message, { variant: 'error' }))
        }
    }

    const handleCloseModal = () => {
        setOpen(!open)
    }

    const handleOpenModal = () => {
        setOpen(!open)
    }

    const handleAnotherItem = () => {
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
            {itemLoading && <Loading message="Creating item..." />}
            {locationLoading && <Loading message="Populating locations..." />}
            <Modal
                open={open}
                onClose={handleCloseModal}
                data-testid="dialogue-modal"
            >
                <Box sx={modalStyle}>
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
                </Box>
            </Modal>
            <Back />
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
                        <MenuItem value={0}>
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
