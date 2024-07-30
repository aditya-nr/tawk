import { Button } from '@mui/material'
import React from 'react'

const BlackButton = ({ children, onClick, ...props }) => {
    return (
        <Button onClick={onClick} {...props} variant='contained' sx={{
            bgcolor: 'text.primary',
            color: theme => theme.palette.mode == 'light' ? 'common.white' : 'grey.700',
            '&:hover': {
                bgcolor: 'text.primary',
                color: theme => theme.palette.mode == 'light' ? 'common.white' : 'grey.700'
            },
            lineHeight: 2.4
        }}>
            {children}
        </Button>
    )
}

export default BlackButton