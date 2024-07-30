import { Box, IconButton, Stack } from '@mui/material'
import React, { useState } from 'react'
import ChatInput from '../ChatInput'
import { PaperPlaneTilt } from 'phosphor-react'
import { socketApi } from '../../api/socket'
import { useSocket } from '../../context/SocketContext'
import { useDispatch, useSelector } from 'react-redux'
import { pushChat } from '../../redux'

function generateUniqueNumber() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000); // You can adjust the range as needed
    return `${timestamp}${random}`;
}

const ChatFooter = ({ user: { username } }) => {
    const socket = useSocket();
    const dispatch = useDispatch();
    const cur_user = useSelector(s => s.user.username);

    const [text, setText] = useState("");

    const onClickSend = async () => {
        if (!text.trim())
            return;
        setText("");
        dispatch(pushChat({ user: username, data: { from: cur_user, type: 'TEXT', message: text, _id: generateUniqueNumber() } }));
        let res = await socketApi.emitTextMessage(socket, username, text);
        if (res.status == 'OK') {
            console.log('message sent');
        } else {
            console.log('not sent');
        }
    }

    return (
        <>
            <Stack direction={'row'} alignItems={'center'} gap={2} px={2} py={1} sx={{
                backgroundColor: t => t.palette.mode === "light"
                    ? "#F8FAFF"
                    : t.palette.background.neutral,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}>
                <ChatInput value={text} onChange={e => setText(e)} send={onClickSend} />
                <IconButton onClick={onClickSend} sx={{
                    bgcolor: t => t.palette.mode == 'dark' ? 'primary.main' : 'secondary.light',
                    '&:hover': {
                        bgcolor: t => t.palette.mode == 'dark' ? 'primary.main' : 'secondary.light',
                    },
                    borderRadius: 1.5,
                    color: 'white'
                }}>
                    <PaperPlaneTilt size={24} />
                </IconButton>
            </Stack>
        </>
    )
}

export default ChatFooter