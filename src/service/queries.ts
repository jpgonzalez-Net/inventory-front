import { gql } from '@apollo/client'

export const GET_ALL_ITEMS = gql`
    query GetAllItems {
        allItems {
            itemId
            itemName
        }
    }
`

export const GET_ITEM = gql`
    query GetItem($itemId: Int!) {
        item(itemId: $itemId) {
            itemId
            itemName
            description
            location {
                locationId
                state
                address
                phoneNumber
            }
        }
    }
`
