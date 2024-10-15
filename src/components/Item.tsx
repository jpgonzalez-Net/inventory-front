import { Link, useParams } from 'react-router-dom'

const Item = () => {
    const { id } = useParams()

    return (
        <div>
            <Link to={'/items'}>Back</Link>
            <p>ID: {id}</p>
            <h2>Item Name</h2>
            {/* Description */}
            <p>Lorem Ipsum</p>
        </div>
    )
}

export default Item
