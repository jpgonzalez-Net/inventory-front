import { Backdrop, CircularProgress } from '@mui/material'
import theme from '../utils/theme'

interface loadingProps {
    message?: string
}

const Loading = ({ message = 'Loading...' }: loadingProps) => {
    // document.body.style.overflow = 'hidden'
    return (
        <Backdrop sx={(theme) => ({})} open={true}>
            <div className="loading">
                <CircularProgress />
                <p className="loading-info">{message}</p>
            </div>
        </Backdrop>
    )
}

export default Loading
