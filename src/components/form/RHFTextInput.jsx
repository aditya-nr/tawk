import { TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'


const RHFTextInput = ({ name, helperText, ...props }) => {

    return (
        <Controller name={name} render={({ field, fieldState: { error } }) => (
            <TextField {...field} {...props}
                error={!!error}
                helperText={!!error ? error.message : helperText}
            />
        )} />
    )
}

export default RHFTextInput