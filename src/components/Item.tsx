import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import backend from '../utils/backend'
import ItemType from '../assets/ItemType'
import ErrorType from '../assets/ErrorType'

const Item = () => {
    const { id } = useParams()

    const [item, setItem] = useState<ItemType>()
    const [error, setError] = useState<ErrorType>()

    useEffect(() => {
        axios
            .get(`${backend}/items/${id}`)
            .then((res) => {
                setItem(res.data)
            })
            .catch((e) => setError({ status: e.status, message: e.message }))
    }, [])

    return (
        <div>
            <Link to={'/items'}>Back</Link>
            <p>ID: {item?.itemId}</p>
            <h2>{item?.itemName}</h2>
            <p>{item?.description}</p>
            {item?.location ? (
                <>
                    <p>Location ID: {item.location.locationId}</p>
                    <h4>Location: {item.location.address}</h4>
                    {item.location.state && <p>State: {item.location.state}</p>}
                    {item.location.phoneNumber && (
                        <p>Phone #: {item.location.phoneNumber}</p>
                    )}
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Item
