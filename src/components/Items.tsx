import {
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from '@mui/material'
import { Delete, Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

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

    const [filter, setFilter] = useState('')
    const [items, setItems] = useState(rows)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [paginated, setPaginated] = useState([])

    const handleFilter = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const f = e.target.value

        setFilter(f)
        setItems(
            rows.filter(
                (item) =>
                    item.itemId.toLowerCase().includes(f.toLowerCase()) ||
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
        setRowsPerPage(parseInt(e.target.value, 5))
        setPage(0)
    }

    return (
        <div>
            <h2>Items</h2>
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
                                <Delete />
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
                onPageChange={handlePageChange}
                rowsPerPageOptions={[5, 10, 15]}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPage}
            />
        </div>
    )
}

export default Items
