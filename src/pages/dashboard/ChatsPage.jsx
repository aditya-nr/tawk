import { Fab, Stack } from '@mui/material'
import React, { useState } from 'react'
import { Chats, Conversation, FriendsDialog, Info } from '../../sections'
import { ChatsCircle } from 'phosphor-react';


const ChatsPage = () => {
    const [showInfo, setShowInfo] = useState(false);
    const [openFriendsDialog, setOpenFriendsDialog] = useState(false);

    return (
        <Stack direction={'row'} width={'100%'} height={'100vh'}>
            {/* Menu */}
            <Stack sx={{
                p: 2,
                width: 320,
                height: '100vh',
                bgcolor: t => t.palette.mode === "light" ? "#F8F9FF" : "",
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                position: 'relative'
            }}>
                <Chats />

                <FriendsDialog open={openFriendsDialog} onClose={e => setOpenFriendsDialog(false)} />

                <Fab onClick={e => setOpenFriendsDialog(true)} sx={{
                    position: 'absolute',
                    right: '1rem',
                    bottom: '1rem'
                }}>
                    <ChatsCircle size={30} />
                </Fab>

            </Stack>

            {/* Content */}
            <Stack sx={{
                flex: 1,
                direction: 'row',
                backgroundColor: t => t.palette.mode === "light" ? "#F0F4FA" : "background.paper",
            }}>
                <Conversation {...{ setShowInfo }} />
            </Stack>
            {showInfo && <Info />}
        </Stack>
    )
}

export default ChatsPage