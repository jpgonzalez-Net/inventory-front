import { Alert, Box } from '@mui/material'
import ErrorType from '../assets/ErrorType'

interface ErrorProps {
    error: ErrorType
}

const Error = ({ error }: ErrorProps) => {
    return (
        <Box sx={{ p: 2 }}>
            <Alert severity="error">
                <b>Error {error.status}:</b> {error.message}
            </Alert>
        </Box>
    )
}

export default Error
