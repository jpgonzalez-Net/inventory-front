import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
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
import randomNumber from '../utils/randomNumber'
import Back from './Back'
import Error from './Error'

const NewItem = () => {
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [locationId, setLocationId] = useState<number>(-1)

    const [locations, setLocations] = useState<LocationType[]>([])
    const [error, setError] = useState<ErrorType>()

    const [nameError, setNameError] = useState(false)

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
        console.log('submitting...')
        console.log(
            `itemName: "${itemName}"; description: "${description}"; location: "${locationId}"`
        )

        const itemId: number = randomNumber()
        // console.log(itemId)

        if (itemName === '') {
            setError({
                status: 400,
                message: 'Item Name is required',
            })
            setNameError(true)
        } else {
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
                .then(() => navigate('/items'))
                .catch((e) =>
                    setError({
                        status: e.status,
                        message:
                            e.response.data.message ?? 'Internal server error',
                    })
                )
        }
    }

    // const locations = [{ locationId: '1', state: 'TX', address: 'Address 1' }]

    return (
        <div>
            <Back />
            {error && <Error error={error} />}
            <h2>New Item</h2>
            <Stack spacing={2}>
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
                <Button onClick={handleSubmit}>Submit</Button>
            </Stack>
        </div>
    )
}

export default NewItem
