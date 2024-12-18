import { ArrowBack } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Back = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/items')
    }

    return (
        <Chip
            data-testid="back-1"
            icon={<ArrowBack />}
            label="back"
            onClick={handleClick}
            color="primary"
        />
    )
}

export default Back
