import {
    Button,
    FormControl,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const NewItem = () => {
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')

    const handleSubmit = () => {
        console.log('submitting...')
        console.log(
            `itemName: "${itemName}"; description: "${description}"; location: "${location}"`
        )
    }

    const locations = [{ locationId: '1', state: 'TX', address: 'Address 1' }]

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
                    value={location}
                    onChange={(e) => setLocation(e.target.value as string)}
                >
                    <MenuItem value="">
                        <i>None</i>
                    </MenuItem>
                    {locations.map((loc) => (
                        <MenuItem key={loc.locationId} value={loc.locationId}>
                            {loc.address}, {loc.state}
                        </MenuItem>
                    ))}
                </Select>
                <Button onClick={handleSubmit}>Submit</Button>
            </FormControl>
        </div>
    )
}

export default NewItem
