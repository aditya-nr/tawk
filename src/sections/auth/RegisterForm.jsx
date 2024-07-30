import { Alert, Box, CircularProgress, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { Eye, EyeSlash } from 'phosphor-react'
import React, { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { object, ref, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import { BlackButton, RHFTextInput } from '../../components'
import { authApi } from '../../api/index.js';


const RegisterForm = ({ onNext }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [prevUsername, setPrevUsername] = useState({ value: "", res: false });

    const schema = object({
        firstName: string().matches(/^[A-Za-z]{3,30}$/, "First name can only contain alphabet"),

        lastName: string().matches(/^[A-Za-z ]{3,30}$/, "Last name can only contain alphabet"),

        email: string().email('Invalid Email address').required('Email is required'),

        username: string()
            .required('Username is Required')
            .matches(/^[a-zA-Z][a-zA-Z1-9_\-\.]*$/, "Username can only contain alphabet, '_' , '-' , '.' ")
            .test('is-unique-username', 'Username is already taken', async (username) => {
                try {
                    if (prevUsername.value == username) {
                        return prevUsername.res
                    }
                    let flag = await authApi.isUsernameAvilable(username);
                    setPrevUsername({ value: username, res: flag })
                    return flag ? true : false;
                } catch (error) {
                    throw error;
                }
            }),

        password: string()
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/, "Invalid Password")
            .required('Password is required'),

        confirmPassword: string()
            .oneOf([ref('password'), null], 'Password must match')
            .required('Confirm Passowrd is required')
    }).required();


    const { control, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: 'abc',
            lastName: 'def',
            username: 'test',
            email: 'darkweb.aditya@gmail.com',
            password: 'Aa123456',
            confirmPassword: 'Aa123456'
        }
    });

    const onSubmit = async (data) => {
        let res = await authApi.requestOtp(data.email)
        if (res.status == 'OK') {
            onNext({ ...data, token: res.data.token })
        } else {
            setError('afterSubmit', { message: res.message });
        }
    }


    return (
        <>
            {errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit?.message}</Alert>}
            <FormProvider control={control} >
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap={3}>
                        {/* Name */}
                        <Stack direction={'row'} gap={2}>
                            <RHFTextInput label="First name" fullWidth name={"firstName"} />
                            <RHFTextInput label="Last name" fullWidth name={"lastName"} />
                        </Stack>
                        {/* Email */}
                        <RHFTextInput label="Email address" name={"email"} />
                        {/* Username */}
                        <RHFTextInput label="Username" name={"username"} />
                        {/* Password */}
                        <RHFTextInput label="Password" name={"password"}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={e => setShowPassword(!showPassword)}>
                                            {showPassword ? <Eye /> : <EyeSlash />}
                                        </IconButton>
                                    </InputAdornment>)
                            }} />
                        {/* Confirm Password */}
                        <RHFTextInput label="Confirm Password" name={"confirmPassword"}
                            type={showPassword2 ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={e => setShowPassword2(!showPassword2)}>
                                            {showPassword2 ? <Eye /> : <EyeSlash />}
                                        </IconButton>
                                    </InputAdornment>)
                            }} />


                        {/* submit */}
                        <BlackButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ?
                                <Box>
                                    <CircularProgress size={20} />
                                </Box> : <>Create Account</>}
                        </BlackButton>

                    </Stack>
                </form>
            </FormProvider>
        </>
    )
}

export default RegisterForm