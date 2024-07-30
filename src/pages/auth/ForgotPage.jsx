import { Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { CaretLeft } from 'phosphor-react'
import { Link as RouterLink } from 'react-router-dom';

import { ForgotForm } from '../../sections'

const ForgotPage = () => {
    return (
        <>
            <Stack gap={3} sx={{ pb: "2rem" }}>
                {/* header */}
                <Typography variant='h3'>Forgot your password?</Typography>
                <Typography variant='body1' sx={{
                    color: 'text.secondary'
                }}>Please enter the email address associated with your account and We will email you a link to reset your password</Typography>

                {/* form */}
                <ForgotForm />

                {/* Footer */}
                <Link alignItems={'center'} display={'flex'} color={'text.primary'} variant='subtitle2' to="../login" component={RouterLink}>
                    <CaretLeft size={26} /> Return to sign in
                </Link>
            </Stack >
        </>
    )
}

export default ForgotPage