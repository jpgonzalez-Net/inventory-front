import { gql } from '@apollo/client'

export const CREATE_LOCATION = gql`
    mutation AddLocation(
        $locationId: Int!
        $state: String!
        $address: String
        $phoneNumber: Int
    ) {
        addLocation(
            locationId: $locationId
            state: $state
            address: $address
            phoneNumber: $phoneNumber
        ) {
            locationId
        }
    }
`

export const CREATE_ITEM = gql`
    mutation AddItem(
        $itemId: Int!
        $itemName: String!
        $description: String
        $locationId: Int
    ) {
        addItem(
            itemId: $itemId
            itemName: $itemName
            description: $description
            locationId: $locationId
        ) {
            itemId
        }
    }
`

export const DELETE_ITEM = gql`
    mutation DeleteItem($itemId: Int!) {
        removeItem(itemId: $itemId) {
            itemId
        }
    }
`
