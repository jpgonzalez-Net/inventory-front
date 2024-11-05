import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import ItemType from '../assets/ItemType'
import Items from '../components/Items'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import { GET_ALL_ITEMS } from '../service/queries'

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as {}),
    useNavigate: () => jest.fn(),
    Link: () => <></>,
}))

const mockItems: ItemType[] = [
    {
        itemId: 1001,
        itemName: 'Item001',
        description: null,
        location: null,
    },
    {
        itemId: 1002,
        itemName: 'Item002',
        description: null,
        location: null,
    },
    {
        itemId: 1003,
        itemName: 'Item003',
        description: null,
        location: null,
    },
]

const mocks = [
    {
        request: {
            query: GET_ALL_ITEMS,
        },
        result: {
            data: {
                allItems: mockItems,
            },
        },
        maxUsageCount: 2,
    },
]

describe('Items', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders all items', async () => {
        // render Items
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Items />
            </MockedProvider>
        )

        // after events finish
        await waitFor(() => {
            // get the number of rows in the table
            const rows = screen.getAllByRole('row')
            // check if the number of rows is equal to elements (+1 because of header row)
            expect(rows).toHaveLength(mockItems.length + 1)
            // check if the info of one element is on screen
            expect(screen.getByText(mockItems[0].itemId)).toBeInTheDocument()
        })
    })

    it('renders filtered items', async () => {
        // render Items
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Items />
            </MockedProvider>
        )

        // wait for events to finish
        await waitFor(() => {
            // get the number of rows in the table
            const Allrows = screen.getAllByRole('row')
            // check if the number of rows is equal to 1 (+1 because of header row)
            expect(Allrows).toHaveLength(mockItems.length + 1)
        })

        // change text of "Filter"
        fireEvent.change(screen.getByRole('textbox', { name: /filter/i }), {
            target: { value: '001' },
        })

        // check if the number of rows has changed
        const filterRows = screen.getAllByRole('row')
        expect(filterRows).toHaveLength(2)
    })
})
