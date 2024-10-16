import {
    Button,
    FormControl,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LocationType from '../assets/LocationType'
import axios from 'axios'
import backend from '../utils/backend'
import ErrorType from '../assets/ErrorType'
import ItemType from '../assets/ItemType'
import randomNumber from '../utils/randomNumber'

const NewItem = () => {
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [locationId, setLocationId] = useState<number>(-1)

    const [locations, setLocations] = useState<LocationType[]>([])
    const [error, setError] = useState<ErrorType>()

    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`${backend}/locations`)
            .then((res) => setLocations(res.data))
            .catch((e) => setError({ status: e.status, message: e.message }))
    }, [])

    const handleSubmit = () => {
        console.log('submitting...')
        console.log(
            `itemName: "${itemName}"; description: "${description}"; location: "${locationId}"`
        )

        const itemId: number = randomNumber()
        // console.log(itemId)

        const locationObject: LocationType | null =
            locationId === -1
                ? null
                : { locationId, state: '', address: null, phoneNumber: null }
        const itemObject: ItemType = {
            itemId,
            itemName,
            description,
            location: locationObject,
        }

        axios
            .post(`${backend}/items`, itemObject)
            .then(() => navigate('/items'))
            .catch((e) => setError(e))
    }

    // const locations = [{ locationId: '1', state: 'TX', address: 'Address 1' }]

    return (
        <div>
            <Link to="/items">Back</Link>
            <h2>New Item</h2>
            <FormControl>
                <TextField
                    label="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <TextField
                    label="Item Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <InputLabel id="newitem-address-select-label">
                    Location
                </InputLabel>
                <Select
                    labelId="newitem-address-select-label"
                    label="Location"
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value as number)}
                >
                    <MenuItem value={-1}>
                        <i>None</i>
                    </MenuItem>
                    {locations.map((loc) => (
                        <MenuItem key={loc.locationId} value={loc.locationId}>
                            {loc.address}
                        </MenuItem>
                    ))}
                </Select>
                <Button onClick={handleSubmit}>Submit</Button>
            </FormControl>
        </div>
    )
}

export default NewItem
