import { Alert, Button, IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material'
import { Eye, EyeSlash } from 'phosphor-react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { BlackButton, RHFTextInput } from '../../components';
import { authApi } from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { login } from '../../redux';
import { useSnacbar } from '../../hooks';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const snackbar = useSnacbar();

    const [showPassword, setShowPassword] = useState(false);

    const schema = object({
        username: string().required('username is required'),
        password: string().required('password is required')
    }).required();

    const { control, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: 'test',
            password: 'Aa123456'
        }
    });

    // network_call :: login
    const onSubmit = async (data) => {
        const { username, password } = data;
        let res = await authApi.login(username, password);
        if (res.status == 'OK') {
            dispatch(login(res.data));
        } else {
            snackbar('error', res.message);
        }
    }

    return (
        <FormProvider control={control}>
            {!!errors.afterSubmit &&
                <Alert severity='error'>{errors.afterSubmit.message}</Alert>
            }
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={2}>
                    {/* inputs */}
                    <RHFTextInput label="Username" name="username" />
                    <RHFTextInput label="Password" name={"password"}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Eye /> : <EyeSlash />}
                                    </IconButton>
                                </InputAdornment>)
                        }} />

                    {/* forgot */}
                    <Link
                        to={'../forgot'}
                        variant='body2'
                        textAlign={'end'}
                        fullwidth="true"
                        underline='always'
                        component={RouterLink}
                        sx={{
                            cursor: 'pointer', color: 'text.primary', display: 'block',
                            textDecorationColor: (theme) => theme.palette.text.primary
                        }}
                    >Forgot Password ?</Link>
                    {/* submit */}
                    <BlackButton type='submit' disabled={isSubmitting}>Login</BlackButton>
                </Stack>
            </form>
        </FormProvider>
    )
}

export default LoginForm