import { render, screen, waitFor } from '@testing-library/react'
import NewItem from '../components/NewItem'
import user from '@testing-library/user-event'
import React, { act } from 'react'
import axios from 'axios'
import LocationType from '../assets/LocationType'
import MockAdapter from 'axios-mock-adapter'
import backend from '../utils/backend'

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as {}),
    useNavigate: () => jest.fn(),
}))

let mock: MockAdapter
const locations: LocationType[] = [
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

beforeAll(() => {
    mock = new MockAdapter(axios)
})

beforeEach(() => {
    mock.onGet(`${backend}/locations`).reply(200, locations)
})

afterEach(() => {
    mock.reset()
})

test('It renders 2 text input fields, 1 number input field, 1 select and one submit button on the screen', () => {
    act(() => {
        render(<NewItem />)
    })

    const inputFieldsText = screen.getAllByRole('textbox')
    const inputFieldNumber = screen.getAllByRole('spinbutton')
    const inputFieldSelect = screen.getAllByRole('combobox')
    const submitButton = screen.getAllByTestId('btn-submit')

    expect(inputFieldsText).toHaveLength(2)
    expect(inputFieldNumber).toHaveLength(1)
    expect(inputFieldSelect).toHaveLength(1)
    expect(submitButton).toHaveLength(1)
})

test('It renders the Modal after clicking submit', async () => {
    mock.onPost(`${backend}/locations`).replyOnce(201)
    act(() => {
        render(<NewItem />)
    })

    const nameField = screen.getByRole('textbox', {
        name: /Name/i,
    })
    const idField = screen.getByRole('spinbutton', {
        name: /ID/i,
    })
    const submitButton = screen.getByRole('button', {
        name: /submit/i,
    })

    await act(async () => {
        user.click(nameField)
        user.keyboard('Test Item')

        user.click(idField)
        user.keyboard('5001')

        user.click(submitButton)
    })
    await waitFor(() => {
        const modal = screen.getByTestId('dialogue-modal')
        expect(mock.history.post.length).toBe(1)
    })
})
