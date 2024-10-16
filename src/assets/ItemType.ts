import LocationType from './LocationType'

type ItemType = {
    itemId: number
    itemName: string
    description: string | null
    location: LocationType | null
}

export default ItemType
