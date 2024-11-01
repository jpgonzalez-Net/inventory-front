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
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_ITEMS } from '../service/queries'
import { DELETE_ITEM } from '../service/mutations'
import DeleteItem from './DeleteItem'
import Loading from './Loading'

const Items = () => {
    const [allItems, setAllItems] = useState<ItemType[]>([])
    const [errorMessage, setErrorMessage] = useState<ErrorType>()

    const { loading, error, data } = useQuery(GET_ALL_ITEMS)

    const [filter, setFilter] = useState('')
    const [items, setItems] = useState<ItemType[]>([])

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [open, setOpen] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState<number | undefined>()

    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !error) {
            setAllItems(data.allItems)
            setItems(data.allItems)
        }
        if (error) {
            console.error(error)
            // setErrorMessage(0, error)
        }
    }, [loading, error, data])

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

    return (
        <div>
            {open && selectedItemId && (
                <DeleteItem
                    itemId={selectedItemId}
                    open={open}
                    handleClose={handleCloseModal}
                    handleError={(e) =>
                        setErrorMessage({
                            status: 0,
                            message: e,
                        })
                    }
                />
            )}
            {loading && <Loading />}
            {errorMessage && <Error error={errorMessage} />}
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
