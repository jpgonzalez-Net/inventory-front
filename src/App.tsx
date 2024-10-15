import { Container } from '@mui/material'
import Items from './components/Items'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Item from './components/Item'
import NewItem from './components/NewItem'

const App = () => {
    return (
        <div className="App">
            <Container fixed>
                <h1>App</h1>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/items" replace />}
                    />
                    <Route path="/items" element={<Items />} />
                    <Route path="/items/:id" element={<Item />} />
                    <Route path="/newItem" element={<NewItem />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
