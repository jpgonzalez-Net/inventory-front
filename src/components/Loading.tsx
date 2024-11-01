import { CircularProgress } from '@mui/material'

interface loadingProps {
    message?: string
}

const Loading = ({ message = 'Loading...' }: loadingProps) => {
    document.body.style.overflow = 'hidden'
    return (
        <div className="loading-container">
            <div className="loading">
                <CircularProgress />
                <p className="loading-info">{message}</p>
            </div>
        </div>
    )
}

export default Loading
