import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Stack } from '@mui/material'
import { useDispatch } from 'react-redux'

import { useSnacbar } from '../hooks'
import { SideNav } from '../components'
import { activeChat, addFriend, pushChat, setFriends, updateFriend, updateLastSeen } from '../redux'
import { chatApi } from '../api'
import { useSocket } from '../context/SocketContext'


const DashboardLayout = () => {
    const dispatch = useDispatch();
    const snackbar = useSnacbar();
    const socket = useSocket();
    const fetchFriends = async () => {
        let res = await chatApi.getFriends();
        if (res.status == 'OK') {
            dispatch(setFriends(res.data));
        } else {
            snackbar('error', res.message);
        }
    }


    useEffect(() => {
        fetchFriends();
        if (socket) {

            socket.on('new-friend', (data) => {
                data.status == 'IN' && snackbar('info', `${data.username} sent you a friend request`);
                dispatch(addFriend(data));
            })

            socket.on('accept-friend', (data) => {
                dispatch(updateFriend(data));
                data.status != 'IN' && snackbar('success', `${data.username} accepted your friend request`);
            })

            socket.on('new-message', data => {
                dispatch(pushChat({ user: data.from, data }))
            })
            socket.on('update-lastSeen', data => {
                console.log(data);
                dispatch(updateLastSeen(data))
            })
        }
        return () => {
            socket?.off()
            dispatch(activeChat(""));
        }
    }, [socket])

    return (
        <>
            <Stack direction={'row'}>
                <SideNav />
                <Outlet />
            </Stack>
        </>
    )
}

export default DashboardLayout