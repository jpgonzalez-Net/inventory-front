import { useMutation } from '@apollo/client'
import { Button, Modal } from '@mui/material'
import React from 'react'
import { DELETE_ITEM } from '../service/mutations'
import { GET_ALL_ITEMS } from '../service/queries'
import Loading from './Loading'

interface deleteItemProps {
    itemId: number
    open: boolean
    handleClose: () => void
    handleError: (error: string) => void
    afterDelete?: () => void
}

const DeleteItem = ({
    itemId,
    open,
    handleClose,
    handleError,
    afterDelete,
}: deleteItemProps) => {
    const [mutateFunction, { loading }] = useMutation(DELETE_ITEM, {
        refetchQueries: [GET_ALL_ITEMS],
    })

    const handleDelete = () => {
        mutateFunction({ variables: { itemId } })
            .then(() => {
                console.log('deleted')
                handleClose()
                if (afterDelete) {
                    afterDelete()
                }
            })
            .catch((e) => {
                handleError(e.message)
                console.error(e)
                handleClose()
            })
    }

    return (
        <div>
            {loading && <Loading message={`Deleting item ${itemId}...`} />}
            <Modal open={open} onClose={handleClose}>
                <div className="modal">
                    <h4>Are you sure?</h4>
                    <div className="modal-buttons">
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={handleDelete}
                        >
                            Yes, delete
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteItem
