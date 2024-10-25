import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import NewItem from '../components/NewItem'
import axios from 'axios'
import LocationType from '../assets/LocationType'
import '@testing-library/jest-dom'

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as {}),
    useNavigate: () => jest.fn(),
}))

jest.mock('axios')

describe('NewItem', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        ;(axios.get as jest.Mock).mockResolvedValue({ data: mockLocations })
    })

    const mockLocations: LocationType[] = [
        {
            locationId: 1001,
            state: 'TX',
            address: 'some adress',
            phoneNumber: 1080,
        },
        {
            locationId: 1002,
            state: 'MS',
            address: 'some adress',
            phoneNumber: 1008,
        },
    ]

    test('It renders 2 text input fields, 1 number input field, 1 select and one submit button on the screen', async () => {
        // render NewItem
        render(<NewItem />)

        // Get all the form elements
        const inputFieldsText = screen.getAllByRole('textbox')
        const inputFieldNumber = screen.getAllByRole('spinbutton')
        const inputFieldSelect = screen.getAllByRole('combobox')
        const submitButton = screen.getAllByTestId('btn-submit')

        // check that all the form elements exist
        expect(inputFieldsText).toHaveLength(2)
        expect(inputFieldNumber).toHaveLength(1)
        expect(inputFieldSelect).toHaveLength(1)
        expect(submitButton).toHaveLength(1)
    })

    test('It renders the Modal after clicking submit', async () => {
        // mock the jest POST request
        ;(axios.post as jest.Mock).mockResolvedValue({ data: {} })

        //render NewItem
        render(<NewItem />)

        // get the required elements
        const nameField = screen.getByRole('textbox', {
            name: /Name/i,
        })
        const idField = screen.getByRole('spinbutton', {
            name: /ID/i,
        })
        const submitButton = screen.getByRole('button', {
            name: /submit/i,
        })

        // make changes to the needed fields
        fireEvent.change(nameField, { target: { value: 'ItemTest' } })
        fireEvent.change(idField, { target: { value: '5001' } })

        // click 'submit' button
        fireEvent.click(submitButton)

        // after the events conclude
        await waitFor(() => {
            // check that the modal has the text
            expect(
                screen.getByText('Item was added successfuly!')
            ).toBeInTheDocument()
        })
    })

    test('It renders Error alert correctly if ID already exists in database', async () => {
        // mock the post request with status 409 and message 'error'
        ;(axios.post as jest.Mock).mockRejectedValue({
            status: 409,
            response: {
                data: {
                    message: 'error',
                },
            },
        })

        // render NewItem
        render(<NewItem />)

        //  get required fields
        const nameField = screen.getByRole('textbox', {
            name: /Name/i,
        })
        const idField = screen.getByRole('spinbutton', {
            name: /ID/i,
        })
        const submitButton = screen.getByRole('button', {
            name: /submit/i,
        })

        // change the field values
        fireEvent.change(nameField, { target: { value: 'ItemTest' } })
        fireEvent.change(idField, { target: { value: '5001' } })

        // click submit button
        fireEvent.click(submitButton)

        // after all the events finish
        await waitFor(() => {
            // we expect to see the error message
            expect(screen.getByRole('alert')).toHaveTextContent(
                'Error 409: error'
            )
        })

        // we expect NOT to see the modal message
        expect(
            screen.queryByText('Item was added successfuly!')
        ).not.toBeInTheDocument()
    })

    test('It renders the Error alert if ID or Name is not entered', async () => {
        // render NewItem
        render(<NewItem />)

        // click submit button
        fireEvent.click(
            screen.getByRole('button', {
                name: /submit/i,
            })
        )

        // after the event finishes
        await waitFor(() => {
            // expect to see error messages:
            expect(
                screen.getByText('Required field (must be greater than 0)')
            ).toBeInTheDocument()
            expect(screen.getByText('Required field')).toBeInTheDocument()
        })
    })
})
