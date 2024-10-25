import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import ItemType from '../assets/ItemType'
import Item from '../components/Item'
import '@testing-library/jest-dom'

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as {}),
    useNavigate: () => jest.fn(),
    Link: () => <></>,
}))

jest.mock('axios')

describe('Item', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders Item correctly', async () => {
        const mockItem: ItemType = {
            itemId: 1001,
            itemName: 'Test Item',
            description: 'description',
            location: null,
        }
        ;(axios.get as jest.Mock).mockResolvedValue({ data: mockItem })

        render(<Item />)

        await waitFor(() => {
            expect(screen.getByText('1001')).toBeInTheDocument()
            expect(screen.getByText('Test Item')).toBeInTheDocument()
            expect(screen.getByText('description')).toBeInTheDocument()
        })
    })

    it("renders error message correctly if Item doesn't exist", async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
            status: 404,
            response: { data: { message: "Item doesn't exist" } },
        })

        render(<Item />)

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(
                "Error 404: Item doesn't exist"
            )
        })
    })
})
