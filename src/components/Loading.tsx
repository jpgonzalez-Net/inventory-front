import { Backdrop, CircularProgress } from '@mui/material'

interface loadingProps {
    message?: string
}

const Loading = ({ message = 'Loading...' }: loadingProps) => {
    return (
        <Backdrop open={true}>
            <div className="loading">
                <CircularProgress />
                <p className="loading-info">{message}</p>
            </div>
        </Backdrop>
    )
}

export default Loading
