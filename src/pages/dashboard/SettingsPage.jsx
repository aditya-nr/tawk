import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux';
import { useSocket } from '../../context/SocketContext';

const Settings = () => {
    const socket = useSocket();
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(logout(socket));
    }
    return (
        <>
            <Box p={3}>
                <Typography>Setting Page</Typography>
                <Button variant='contained' onClick={handleClick}>Logout</Button>
            </Box>
        </>
    )
}

export default Settings