import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from '@mui/material'
import { Add, Delete, Search } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import backend from '../utils/backend'
import ItemType from '../assets/ItemType'
import ErrorType from '../assets/ErrorType'
import Error from './Error'

const Items = () => {
    const rows = [
        { itemId: '1', itemName: 'basketball' },
        { itemId: '2', itemName: 'baseball' },
        { itemId: '3', itemName: 'NVIDIA' },
        { itemId: '4', itemName: 'Old-School Essentials' },
        { itemId: '5', itemName: 'LAMY Safari' },
        { itemId: '6', itemName: 'Montblanc' },
        { itemId: '7', itemName: '8BitDo' },
        { itemId: '8', itemName: 'Dune' },
        { itemId: '9', itemName: 'Dune Messiah' },
        { itemId: '10', itemName: 'Abbey Road' },
        { itemId: '11', itemName: 'IT' },
        { itemId: '12', itemName: "A Hard Day's Night" },
        { itemId: '13', itemName: 'Nintendo 3DS' },
        { itemId: '14', itemName: 'ThinkPad' },
    ]

    const [allItems, setAllItems] = useState<ItemType[]>([])
    const [error, setError] = useState<ErrorType>()

    const [filter, setFilter] = useState('')
    const [items, setItems] = useState<ItemType[]>([])

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [paginated, setPaginated] = useState([])

    const [open, setOpen] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState<number | undefined>()

    const navigate = useNavigate()

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = () => {
        axios
            .get(`${backend}/items`)
            .then((res) => {
                console.log(res.data)
                setAllItems(res.data)
                setItems(res.data)
            })
            .catch((e) => {
                console.error(e.message)
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
            axios
                .delete(`${backend}/items/${itemId}`)
                .then(() => {
                    setAllItems(
                        allItems.filter((item) => item.itemId !== itemId)
                    )
                    setItems(items.filter((item) => item.itemId !== itemId))
                    handleCloseModal()
                })
                .catch((e) => {
                    console.error(`${e.status}: ${e.response.data.message}`)
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
            <h2>Items</h2>
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
