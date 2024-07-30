import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, Divider, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { chatApi, socketApi } from '../../../api';
import { useSnacbar } from '../../../hooks';
import { useSocket } from '../../../context/SocketContext';


const UserDetailsDialog = ({ username, setOpen }) => {
    const snackbar = useSnacbar();
    const socket = useSocket();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [sending, setSending] = useState(false);


    const fetchUser = async (username) => {
        let res = await chatApi.getUserDetails({ username });
        console.log(res);
        if (res.status == 'OK')
            setData(res.user);
        else
            snackbar('error', res.message);
        setLoading(false);
    }

    const handleClick = async () => {
        setSending(true);
        let res = await socketApi.emitFriendRequest(socket, username);
        console.log(res);
        if (res.status == 'OK') {
            snackbar('success', res.message);
            setOpen(false);
        } else {
            snackbar('warning', res.message);
        }
        setSending(false);
    }

    useEffect(() => {
        fetchUser(username);
    }, [])


    if (loading) return <>Loading...</>
    return (
        <>
            <DialogContent>
                <Stack sx={{
                    alignItems: 'center',
                    gap: 2
                }}>
                    <Avatar
                        alt={data.name}
                        src={data.avatar}
                        sx={{ width: 150, height: 150 }}
                    />
                    <Stack sx={{
                        alignItems: 'center',
                        gap: 0.4
                    }}>

                        <Typography variant='h4'>{data.name}</Typography>
                        <Typography color={'grey'}>@ {data.username}</Typography>
                        <Typography color={'grey'}>{data.lastSeen}</Typography>
                    </Stack>
                    <Divider />
                    {data.about &&
                        <TextField maxWidth={'30vw'} value={data.about} label="About" multiline sx={{ pointerEvents: 'none' }} />
                    }
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClick} disabled={sending}>
                    {sending ? "Sending..." : "Add Friend"}
                </Button>
            </DialogActions>
        </>
    )
}

export default UserDetailsDialog