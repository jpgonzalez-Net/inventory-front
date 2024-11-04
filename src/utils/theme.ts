import { createTheme } from '@mui/material'

// colors

const bg = '#fbf1c7'
const bg_light = '#f9f5d7'
const fg = '#3c3836'
const fg_dark = '#282828'
const red = '#cc241d'
const red_dark = '#9d0006'
const green = '#98971a'
const green_dark = '#79740e'
const yellow = '#d79921'
const yellow_dark = '#b57614'
const blue = '#458588'
const blue_dark = '#076679'
const purple = '#b16286'
const purple_dark = '#8f3f71'
const aqua = '#689d6a'
const aqua_dark = '#427b58'
const gray = '#928374'
const gray_dark = '#7c6f64'

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#282c34', // Dark background
            paper: '#3c3f41', // Lighter panel background
        },
        text: {
            primary: '#ffffff', // Primary text color
            secondary: '#8abeb7', // Secondary text color
        },
        primary: {
            main: aqua,
        },
        secondary: {
            main: purple,
        },
        warning: {
            main: yellow,
        },
        error: {
            main: red,
        },
    },
    typography: {
        fontFamily: 'monospace',
        fontSize: 14,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2c323c',
                    color: '#8abeb7',
                    '&:hover': {
                        backgroundColor: '#3c434f',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 0, // Square edges for panels
                },
            },
        },
    },
})

export default theme
