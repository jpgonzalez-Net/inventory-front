import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from '@mui/material'
import { Add, Delete, Search } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import ItemType from '../assets/ItemType'
import ErrorType from '../assets/ErrorType'
import Error from './Error'
import { fetchAllItems } from '../service/fetch'
import { removeItem } from '../service/remove'

const Items = () => {
    const [allItems, setAllItems] = useState<ItemType[]>([])
    const [error, setError] = useState<ErrorType>()

    const [filter, setFilter] = useState('')
    const [items, setItems] = useState<ItemType[]>([])

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [open, setOpen] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState<number | undefined>()

    const navigate = useNavigate()

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = () => {
        fetchAllItems()
            .then((res) => {
                setAllItems(res)
                setItems(res)
            })
            .catch((e) => {
                setError({
                    status: e.status,
                    message: e.response.data.message ?? 'Internal server error',
                })
            })
    }

    const handleFilter = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const f = e.target.value

        setFilter(f)
        setItems(
            allItems.filter(
                (item) =>
                    String(item.itemId).includes(f.toLowerCase()) ||
                    item.itemName.toLowerCase().includes(f.toLowerCase())
            )
        )
        handlePageChange(null, 0)
    }

    const handlePageChange = (
        e: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleRowsPerPage = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(0)
    }

    const handleOpenModal = (itemId: number) => {
        setSelectedItemId(itemId)
        setOpen(!open)
    }
    const handleCloseModal = () => {
        setSelectedItemId(undefined)
        setOpen(!open)
    }

    const handleDelete = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        itemId: number | undefined
    ) => {
        e.preventDefault()
        if (itemId) {
            removeItem(`${itemId}`)
                .then(() => {
                    setAllItems(
                        allItems.filter((item) => item.itemId !== itemId)
                    )
                    setItems(items.filter((item) => item.itemId !== itemId))
                    handleCloseModal()
                })
                .catch((e) => {
                    setError({
                        status: e.status,
                        message:
                            e.response.data.message ?? 'Internal server error',
                    })
                    handleCloseModal()
                    handleFetch()
                })
        }
    }

    return (
        <div>
            <Modal open={open} onClose={handleCloseModal}>
                <div className="modal">
                    <h4>Are you sure?</h4>
                    <div className="modal-buttons">
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={(e) => handleDelete(e, selectedItemId)}
                        >
                            Yes, delete
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
            {error && <Error error={error} />}
            <Box display="flex" alignItems="center" justifyContent="end">
                <TextField
                    label="filter"
                    value={filter}
                    onChange={handleFilter}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Box marginLeft="12px">
                    <IconButton
                        aria-label="add"
                        onClick={() => navigate('/newItem')}
                    >
                        <Add />
                    </IconButton>
                </Box>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            <b>Item ID</b>
                        </TableCell>
                        <TableCell align="left">
                            <b>Item Name</b>
                        </TableCell>
                        <TableCell align="center">
                            <b>Delete</b>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? items.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                          )
                        : items
                    ).map((item) => (
                        <TableRow key={item.itemId}>
                            <TableCell align="left">{item.itemId}</TableCell>
                            <TableCell align="left">
                                <Link to={`/items/${item.itemId}`}>
                                    {item.itemName}
                                </Link>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                        handleOpenModal(item.itemId)
                                    }}
                                    // onClick={(e) =>
                                    //     handleDelete(e, item.itemId)
                                    // }
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                align="left"
                component="div"
                count={items.length}
                page={page}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPage}
            />
        </div>
    )
}

export default Items
