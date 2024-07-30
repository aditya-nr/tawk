import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { Chat, ChatTeardrop } from 'phosphor-react'
import React from 'react'

const FriendCard = ({ user, onClickNewChat, onClickChat }) => {
    const { name, username, avatar } = user;
    return (
        <>
            <Stack direction={'row'} width={'100%'}
                gap={2} px={2} py={2}
                alignItems={'center'}
            >
                <Avatar src={avatar} alt={name} />
                <Stack flex={1}>
                    <Typography variant='subtitle1'>{name}</Typography>
                    <Typography variant='subtitle2' color={'grey'}>{username}</Typography>
                </Stack>
                <IconButton onClick={e => {
                    if (user.status == 'NEW') onClickNewChat(username);
                    else if (user.status == 'FRIEND') onClickChat(username);
                }}>
                    <Chat color='#5BE584' weight='duotone' />
                </IconButton>
            </Stack>
        </>
    )
}

export default FriendCard