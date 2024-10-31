import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </ApolloProvider>
)

// TODO: Convertir a graphql backend, utilizar servicio extra como middleware
// TODO: Cambiar tests a graphql
// TODO: CSS, estilo
// TODO: Errores de mensajes mas amigables
// TODO: Mensaje de "item not found" (amigable) cuando se filtra la tabla
