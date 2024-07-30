import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import ChatRender from './ChatRender';

const ChatBody = ({ username }) => {
    const elementRef = useRef();
    const chats = useSelector(s => s.chat.chats[username]);
    const cur_user = useSelector(s => s.user.username);

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.scrollTop = elementRef.current.scrollHeight;
        }
    }, [chats])

    return (
        <Box ref={elementRef} sx={{
            height: '100%',
            overflowY: 'scroll'
        }}>
            <Stack>
                {
                    chats?.map(e => (
                        <ChatRender key={e._id} chat={e} user={cur_user} />
                    ))
                }
            </Stack>
        </Box>
    )
}

export default ChatBody