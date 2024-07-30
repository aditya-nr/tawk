import { Link, Typography, Stack } from '@mui/material'
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';

import { AuthSocial, OtpForm, RegisterForm } from '../../sections';
import { authApi } from '../../api';
import { useDispatch } from 'react-redux';
import { login } from '../../redux';
import { useSnacbar } from '../../hooks';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const snackbar = useSnacbar();

    const [formData, setFormData] = useState({});
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onNext = (data) => {
        setFormData(data);
        console.log(data);
        setStep(1);
    }

    const submitForm = async (otp) => {
        setIsSubmitting(true);
        let res = await authApi.register({ ...formData, otp });
        if (res.status == 'OK') {
            dispatch(login(res.data));
        } else {
            snackbar('error', res.message);
        }
        setIsSubmitting(false);
    }

    return (
        <>
            <Stack gap={3} pb={4}>
                {/* Header */}
                <Stack>
                    <Typography variant='h4'>Get started with Tawk</Typography>
                    <Typography variant='body2'>Already have an account?
                        <Link variant='inherit' to="../login" component={RouterLink}
                            sx={{
                                color: theme => theme.palette.mode == 'light' ? 'primary.main' : 'secondary.main'
                            }}> Sign in
                        </Link>
                    </Typography>
                </Stack>

                {/* Register Form */}
                {step == 0 ?
                    <RegisterForm
                        onNext={onNext}
                    /> :
                    <OtpForm
                        onNext={submitForm} isSubmitting={isSubmitting}
                    />
                }

                {/* Footer */}
                <Typography variant='caption' color={'text.secondary'} textAlign={'center'}>
                    By signing up, I agree to <Link underline='always' sx={{
                        color: 'text.primary',
                        cursor: 'pointer',
                        textDecorationColor: (theme) => theme.palette.text.secondary
                    }}>Terms of Service</Link> and <Link underline='always' sx={{
                        color: 'text.primary',
                        cursor: 'pointer',
                        textDecorationColor: theme => theme.palette.text.secondary
                    }}>Priviacy Policy</Link>
                    .
                </Typography>
                <AuthSocial />
            </Stack>
        </>
    )
}

export default RegisterPage