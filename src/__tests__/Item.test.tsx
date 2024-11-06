import { render, screen, waitFor } from '@testing-library/react'
import ItemType from '../assets/ItemType'
import Item from '../components/Item'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { GET_ITEM } from '../service/queries'
import { MemoryRouter, useParams } from 'react-router-dom'
import { GraphQLError } from 'graphql'

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as {}),
    useNavigate: () => jest.fn(),
    Link: () => <></>,
    useParams: jest.fn(),
}))

const mockItem: ItemType = {
    itemId: 1001,
    itemName: 'Test Item',
    description: 'description',
    location: null,
}

const mocks = [
    {
        request: {
            query: GET_ITEM,
            variables: { itemId: 1001 },
        },
        result: {
            data: {
                item: mockItem,
            },
        },
    },
    {
        request: {
            query: GET_ITEM,
            variables: { itemId: 1002 },
        },
        result: {
            errors: [new GraphQLError('Error!')],
        },
    },
]

describe('Item', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders Item correctly', async () => {
        ;(useParams as jest.Mock).mockReturnValue({ id: '1001' })

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Item />
            </MockedProvider>
        )

        await waitFor(() => {
            expect(
                screen.getByText(`ID: ${mockItem.itemId}`)
            ).toBeInTheDocument()
            expect(screen.getByText(`${mockItem.itemName}`)).toBeInTheDocument()
            expect(
                screen.getByText(`${mockItem.description}`)
            ).toBeInTheDocument()
        })
    })

    it("renders error message correctly if Item doesn't exist", async () => {
        ;(useParams as jest.Mock).mockReturnValue({ id: '1002' })
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Item />
            </MockedProvider>
        )

        await waitFor(() => {
            expect(screen.getByRole('toast')).toHaveTextContent('Error!')
        })
    })
})
