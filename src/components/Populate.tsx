import { useNavigate } from 'react-router-dom'
import ItemType from '../assets/ItemType'
import LocationType from '../assets/LocationType'
import { useEffect } from 'react'
import axios from 'axios'
import backend from '../utils/backend'

const Populate = () => {
    // React component to quickly populate the db

    const navigate = useNavigate()

    useEffect(() => {
        const locations: LocationType[] = [
            {
                locationId: 1001,
                state: 'TX',
                address: 'Champions Lane',
                phoneNumber: 12345,
            },
            {
                locationId: 1002,
                state: 'WA',
                address: 'Columbia St.',
                phoneNumber: null,
            },
            {
                locationId: 1003,
                state: 'IL',
                address: null,
                phoneNumber: 12345,
            },
            {
                locationId: 1004,
                state: 'NM',
                address: null,
                phoneNumber: null,
            },
        ]

        const items: ItemType[] = [
            {
                itemId: 1000,
                itemName: 'Dune',
                description: 'Frank Herbert',
                location: null,
            },
            {
                itemId: 1001,
                itemName: 'Old-School Essentials',
                description: null,
                location: {
                    locationId: 1001,
                    state: '',
                    address: null,
                    phoneNumber: null,
                },
            },
            {
                itemId: 1002,
                itemName: 'Thinkpad',
                description: 'Laptop',
                location: null,
            },
            {
                itemId: 1003,
                itemName: "A Hard Day's Night",
                description: 'LP, by the Beatles',
                location: {
                    locationId: 1004,
                    state: 'NM',
                    address: null,
                    phoneNumber: null,
                },
            },
            {
                itemId: 1004,
                itemName: 'Tamborsito',
                description: 'Dulce',
                location: {
                    locationId: 1002,
                    state: 'WA',
                    address: 'Columbia St.',
                    phoneNumber: null,
                },
            },
            {
                itemId: 1005,
                itemName: 'Surface Pro 4',
                description: 'Microsoft Windows',
                location: {
                    locationId: 1003,
                    state: 'IL',
                    address: null,
                    phoneNumber: 12345,
                },
            },
            {
                itemId: 1006,
                itemName: 'Keychron K8',
                description: 'Mechanical keyboard',
                location: null,
            },
            {
                itemId: 1007,
                itemName: 'Lamy Safari',
                description: 'Fountiain pen',
                location: null,
            },
            {
                itemId: 1008,
                itemName: 'Lego: Millenium Falcon',
                description: 'Disney trademark',
                location: {
                    locationId: 1001,
                    state: 'TX',
                    address: 'Champions Lane',
                    phoneNumber: 12345,
                },
            },
            {
                itemId: 1009,
                itemName: 'Nikon Camera',
                description: '16mm film',
                location: null,
            },
            {
                itemId: 1010,
                itemName: 'Stratocaster',
                description: null,
                location: {
                    locationId: 1003,
                    state: 'IL',
                    address: null,
                    phoneNumber: 12345,
                },
            },
            {
                itemId: 1011,
                itemName: 'Sunglasses',
                description: null,
                location: {
                    locationId: 1003,
                    state: 'IL',
                    address: null,
                    phoneNumber: 12345,
                },
            },
            {
                itemId: 1012,
                itemName: '8BitDo',
                description: 'Gamepad for Nintendo Switch',
                location: null,
            },
            {
                itemId: 1013,
                itemName: 'Nintendo Switch',
                description: null,
                location: {
                    locationId: 1002,
                    state: 'WA',
                    address: 'Columbia St.',
                    phoneNumber: null,
                },
            },
            {
                itemId: 1014,
                itemName: 'LG Monitor',
                description: null,
                location: null,
            },
            {
                itemId: 1015,
                itemName: 'Ployhedral Dice Set',
                description: null,
                location: {
                    locationId: 1004,
                    state: 'NM',
                    address: null,
                    phoneNumber: null,
                },
            },
            {
                itemId: 1016,
                itemName: 'Miniatures',
                description: null,
                location: {
                    locationId: 1003,
                    state: 'IL',
                    address: null,
                    phoneNumber: 12345,
                },
            },
            {
                itemId: 1017,
                itemName: 'Record Player ',
                description: null,
                location: {
                    locationId: 1001,
                    state: 'TX',
                    address: 'Champions Lane',
                    phoneNumber: 12345,
                },
            },
            {
                itemId: 1018,
                itemName: 'External HDD',
                description: '1TB, connect via USB C',
                location: null,
            },
            {
                itemId: 1019,
                itemName: 'Table fan',
                description: null,
                location: {
                    locationId: 1004,
                    state: 'NM',
                    address: null,
                    phoneNumber: null,
                },
            },
            {
                itemId: 1020,
                itemName: 'Color Pencils',
                description: null,
                location: null,
            },
            {
                itemId: 1021,
                itemName: 'Nintendo 3DS',
                description: null,
                location: {
                    locationId: 1004,
                    state: 'NM',
                    address: null,
                    phoneNumber: null,
                },
            },
            {
                itemId: 1022,
                itemName: 'Electric Guitar Strings',
                description: null,
                location: null,
            },
            {
                itemId: 1023,
                itemName: 'Teddy Bear',
                description: null,
                location: null,
            },
            {
                itemId: 1024,
                itemName: 'Harmonica',
                description: 'In key of C',
                location: {
                    locationId: 1002,
                    state: 'WA',
                    address: 'Columbia St.',
                    phoneNumber: null,
                },
            },
        ]

        locations.forEach((location) => {
            axios
                .post(`${backend}/locations`, location)
                .then(() => {
                    items.forEach((item) => {
                        axios
                            .post(`${backend}/items`, item)
                            .then(() => navigate('/items'))
                            .catch((e) => console.error(e.message))
                    })
                })
                .catch((e) => console.error(e.message))
        })
    }, [navigate])

    return (
        <div>
            <h2>Populating database...</h2>
        </div>
    )
}

export default Populate
