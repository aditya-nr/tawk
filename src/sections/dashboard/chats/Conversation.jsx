import { Avatar, Box, Button, IconButton, InputBase, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useSnacbar } from '../../../hooks'
import { ChatBody, ChatFooter, ChatHeader, ChatInput } from '../../../components';
import { chatApi } from '../../../api/chatsApi';
import { populateChat } from '../../../redux';

const Conversation = ({ setShowInfo }) => {
    const snackbar = useSnacbar();
    const dispatch = useDispatch();
    const active = useSelector(s => s.chat.active);
    const friend = useSelector(s => s.chat.friends.filter(e => e.username == active)[0]);

    const getChats = async (active) => {
        let res = await chatApi.getChats(active);
        if (res.status == 'OK') {
            dispatch(populateChat({ user: active, data: res.data }))
        } else {
            snackbar('error', res.message);
        }
    }

    useEffect(() => {
        if (active) {
            getChats(active);
        }
    }, [active])

    if (!active) return <>No chat to show</>

    return (
        <>
            <Stack height={"100%"}>
                {/* Header */}
                <Stack>

                    <ChatHeader user={friend} />
                </Stack>

                {/* Body */}
                <Stack height={'80%'} flex={1} p={1}>
                    <ChatBody username={active} />
                </Stack>

                {/* footer */}
                <Stack>

                    <ChatFooter user={friend} />
                </Stack>
            </Stack >
        </>
    )
}

export default Conversation