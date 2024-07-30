import { createContext, useMemo, useState } from 'react';
import { Alert, CssBaseline, ThemeProvider as MuiThemeProvider, Snackbar, createTheme, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { changeTheme } from '../redux';

import ComponentOverrides from './overrides/index.js';
import typography from './typography.js';
import palette from './palette';

export const SnackbarContext = createContext();
const SnackbarProvider = SnackbarContext.Provider;

const ThemeProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.app);
    const [snackProp, setSnackProp] = useState({ show: false });


    dispatch(changeTheme(useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'))

    const themeOption = useMemo(() => ({
        palette: theme == 'light' ? palette.light : palette.dark,
        typography,
        shape: { borderRadius: 8 },

    }), [theme])

    const closeSnacbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackProp({ show: false });
    };

    const snackbar = (type, message, duration = 5000) => {
        const payload = {
            type: type || 'info',
            duration: duration || 5000,
            message: message || 'Hello !',
            show: true
        }
        setSnackProp(payload);
    }

    const newTheme = createTheme(themeOption);
    newTheme.components = ComponentOverrides(newTheme);
    return (
        <SnackbarProvider value={snackbar}>
            <MuiThemeProvider theme={newTheme} children={
                <>
                    <CssBaseline />
                    {children}
                </>
            } />

            <Snackbar open={snackProp.show} autoHideDuration={snackProp.duration} onClose={closeSnacbar}>
                <Alert
                    onClose={closeSnacbar}
                    severity={snackProp.type}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackProp.message}
                </Alert>
            </Snackbar>
        </SnackbarProvider>
    )
}
export default ThemeProvider;