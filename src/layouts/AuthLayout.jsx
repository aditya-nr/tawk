import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, IconButton, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { images } from '../constants'
import { toggleTheme } from '../redux'
import { Moon, Sun } from 'phosphor-react'

const AuthLayout = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.app);
    return (
        <>
            <Container sx={{ mt: 5 }} maxWidth="sm">
                <Stack spacing={5}>
                    <Stack
                        sx={{ width: "100%" }}
                        direction="column"
                        alignItems={"center"}
                    >
                        <img style={{ height: 120, width: 120 }} src={images.Logo} alt="Logo" />
                    </Stack>
                    {/* Children */}
                    <Outlet />
                    {/* Theme toggler */}
                    <IconButton onClick={() => dispatch(toggleTheme())} sx={{
                        position: 'absolute',
                        width: 'fit-content',
                        top: '-2rem',
                        right: '10px'
                    }}>
                        {theme == 'dark' ? <Sun color='yellow' /> : <Moon color='grey' />}
                    </IconButton>
                </Stack>
            </Container>

        </>
    )
}

export default AuthLayout