import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { DotsThreeVertical } from 'phosphor-react'
import React from 'react'

const ChatHeader = ({ user }) => {
    const { name, avatar, username, lastSeen } = user;
    return (
        <>
            <Stack direction={'row'} alignItems={'center'} gap={2} px={2} py={1} sx={{
                backgroundColor: t => t.palette.mode === "light"
                    ? "#F8FAFF"
                    : t.palette.background.neutral,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}>
                <Avatar src={avatar} />
                <Stack flex={1}>
                    <Typography variant='subtitle1'>{username}</Typography>
                    <Typography variant='caption'
                        color={lastSeen == 'ONLINE' && 'success.main'}
                    >{lastSeen}</Typography>
                </Stack>
                {/* Icons */}
                <Stack>
                    <IconButton>
                        <DotsThreeVertical size={24} />
                    </IconButton>
                </Stack>
            </Stack>
        </>
    )
}

export default ChatHeader