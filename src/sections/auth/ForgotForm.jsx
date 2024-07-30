import { Stack } from '@mui/material'
import React from 'react'
import { object, string } from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BlackButton, RHFTextInput } from '../../components'

const ForgotForm = () => {
    const schema = object({
        email: string().email('Invalid Email address').required('Email is required')
    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
        alert(`Done`)
    }
    return (
        <FormProvider control={control}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={3}>
                    <RHFTextInput label="Email Address" name={'email'} />
                    <BlackButton type="submit">Send Request</BlackButton>
                </Stack>

            </form>
        </FormProvider>
    )
}

export default ForgotForm