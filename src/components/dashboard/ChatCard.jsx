import { Avatar, Badge, Stack, Typography } from "@mui/material"
import React from "react";

const ChatCard = ({ user, active, onClick }) => {
    const { name, avatar, lastSeen, messageCount, username } = user;
    return (
        <>
            <Stack sx={{
                bgcolor: t => active == username ? (t.palette.mode == 'light' ? 'secondary.light' : 'primary.main') : 'background.paper',
                p: 1.2,
                my: 1,
                borderRadius: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }} onClick={e => onClick(username)} >
                <Badge color="success" badgeContent="" variant="dot" invisible={lastSeen != 'ONLINE'}>
                    <Avatar src={avatar} alt={username} />
                </Badge>
                <Stack flex={1} pl={1.2}>
                    <Typography variant='body2'>{username}</Typography>
                </Stack>
                <Stack alignItems={'flex-end'}>
                    {!!messageCount &&
                        <Typography variant="subtitle2" sx={{
                            bgcolor: 'success.light',
                            px: 1,
                            borderRadius: '50%',
                            color: 'black'
                        }}>{messageCount}</Typography>
                    }
                </Stack>
            </Stack>
        </>
    )
}


export default ChatCard;