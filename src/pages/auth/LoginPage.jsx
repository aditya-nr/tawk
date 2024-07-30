import React from 'react'
import { Stack, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { AuthSocial, LoginForm } from '../../sections';


const Login = () => {
    return (
        <>
            <Stack spacing={2} sx={{ pb: 5, position: "relative" }}>
                <Typography variant="h4">Login to Tawk</Typography>

                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">New user?</Typography>

                    <Link
                        to={"../register"}
                        component={RouterLink}
                        variant="subtitle2"
                        sx={{ color: theme => theme.palette.mode == 'light' ? 'primary.main' : 'secondary.main' }}
                    >
                        Create an account
                    </Link>
                </Stack>

                {/* Form */}
                <LoginForm />

                {/* <AuthSocial /> */}
                <AuthSocial />
            </Stack>
        </>
    )
}

export default Login