import { Button, Divider, Stack, Typography, } from '@mui/material'
import { ArchiveBox } from 'phosphor-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SearchField, ChatCard } from '../../../components';
import { activeChat } from '../../../redux';

const Chats = () => {
    const dispatch = useDispatch();
    const active = useSelector(s => s.chat.active);
    const friends = useSelector(s => s.chat.friends);

    return (
        <>
            <Stack height={'100%'} gap={2}>
                {/* Name */}
                <Typography variant='h5'>Chats</Typography>

                {/* search */}
                <SearchField />

                {/* archieve */}
                <Stack sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <ArchiveBox size={24} />
                    <Button>Archive</Button>
                </Stack>

                <Divider />

                {/* Chats */}
                <Stack sx={{
                    flex: 1,
                    overflowY: 'scroll',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE and Edge
                    '&::-webkit-scrollbar': {
                        display: 'none', // Chrome, Safari, Opera
                    },
                }}>
                    {
                        friends
                            .filter(e => ['FRIEND'].includes(e.status))
                            .map(e => (
                                <ChatCard
                                    user={e}
                                    key={e.username}
                                    onClick={username => dispatch(activeChat(username))}
                                    active={active}
                                />))
                    }
                </Stack>
            </Stack>
        </>
    )
}

export default Chats