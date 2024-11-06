import { Backdrop, CircularProgress } from '@mui/material'

interface loadingProps {
    message?: string
}

const Loading = ({ message = 'Loading...' }: loadingProps) => {
    return (
        <div className="loading-container">
            <Backdrop open={true}>
                <div className="loading">
                    <CircularProgress />
                    <p className="loading-info">{message}</p>
                </div>
            </Backdrop>
        </div>
    )
}

export default Loading
