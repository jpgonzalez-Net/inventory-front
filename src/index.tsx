import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { CssBaseline, IconButton, ThemeProvider } from '@mui/material'
import theme from './utils/theme'
import { closeSnackbar, SnackbarProvider } from 'notistack'
import { Close } from '@mui/icons-material'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <SnackbarProvider
                maxSnack={5}
                action={(snackbarId) => (
                    <IconButton
                        aria-label="dismiss"
                        onClick={() => closeSnackbar(snackbarId)}
                    >
                        <Close />
                    </IconButton>
                )}
            >
                <React.StrictMode>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </React.StrictMode>
            </SnackbarProvider>
        </BrowserRouter>
    </ApolloProvider>
)

// DONE: Convertir a graphql backend, utilizar servicio extra como middleware
// DONE: Cambiar tests a graphql
// DONE: CSS, estilo
// DONE: Errores de mensajes mas amigables
// DONE: Mensaje de "item not found" (amigable) cuando se filtra la tabla
