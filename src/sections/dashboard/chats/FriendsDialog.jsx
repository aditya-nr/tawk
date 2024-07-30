import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Dialog, Divider, List, ListItem, ListItemButton, Stack, Tab, Tabs, Typography } from '@mui/material'

import { FriendCard, SearchField } from '../../../components';
import { chatApi, socketApi } from '../../../api';
import UserDetailsDialog from './UserDetailsDialog';
import { useSocket } from '../../../context/SocketContext';
import { useSnacbar } from '../../../hooks';
import { activeChat, activeNewChat } from '../../../redux';


const FriendsDialog = ({ open, onClose }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const handleChange = (e, val) => {
        setTabIndex(val);
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} >
                <Box sx={{
                    height: '50vh',
                    bgcolor: 'background.paper',
                    p: 2,
                    overflow: 'hidden'
                }}>
                    <Tabs value={tabIndex} onChange={handleChange} sx={{ px: { xs: 1, md: 5 }, mb: 2 }}>
                        <Tab label={'Explore'} sx={{ mx: { xs: 1, md: 3 } }} />
                        <Tab label={'Friends'} sx={{ mx: { xs: 1, md: 3 } }} />
                        <Tab label={'Requests'} sx={{ mx: { xs: 1, md: 3 } }} />
                    </Tabs>

                    <Stack height={'100%'}>
                        {
                            tabIndex == 0 ? <Explore />
                                : tabIndex == 1 ? <Friends {...{ onClose }} />
                                    : tabIndex == 2 ? <Requests />
                                        : <></>
                        }
                    </Stack>
                </Box>
            </Dialog>
        </>
    )
}

const Explore = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("")

    const searchUser = async (username) => {
        if (!username) return;
        let res = await chatApi.searchUser({ username });
        if (res.status == 'OK')
            setData(res.users);
    }

    const handleChange = (e) => {
        if (e.target.value) {
            searchUser(e.target.value);
        }
        else
            setData([]);
    }
    const handleClick = (e) => {
        setUsername(e);
        setOpen(true);
    }
    return (<>
        <SearchField
            onChange={handleChange}
            placeholder={'Search Username'}
            fieldsx={{
                bgcolor: 'grey.5008'
            }}
        />
        <List sx={{ height: '90%', overflowY: 'scroll' }}>
            {data.map(el => (
                <React.Fragment key={el}>
                    <ListItem disablePadding >
                        <ListItemButton onClick={() => handleClick(el)}>
                            {el}
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
        {/* user Details Dialog */}
        {open && (
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Box sx={{
                    bgcolor: 'background.paper',
                }}>
                    <UserDetailsDialog {...{ username, setOpen }} />
                </Box>
            </Dialog>
        )}
    </>)
}

const Requests = () => {
    const socket = useSocket();
    const snackbar = useSnacbar();
    const friends = useSelector(s => s.chat.friends);
    const [emiting, setEmiting] = useState(false);

    const handleClick = async (username) => {
        setEmiting(true);
        let res = await socketApi.emitAcceptFriendRequest(socket, username);
        if (res == 'OK') {
            snackbar('success', 'Done !');
        } else {
            snackbar('error', res.message);
        }
        setEmiting(false);
    }
    return (<>
        <SearchField

            placeholder={'Search Username'}
            fieldsx={{
                bgcolor: 'grey.5008'
            }}
        />
        <List sx={{ height: '90%', overflowY: 'scroll' }}>
            {friends.filter(e => e.status != 'NEW').map(e => (
                <React.Fragment key={e.username}>
                    <ListItem disablePadding >
                        <ListItemButton onClick={() => handleClick(e.username)}>
                            <Stack sx={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>
                                <Avatar src={e.avatar} alt={e.username} />
                                <Typography>{e.username}</Typography>
                                {e.status == 'IN' && (
                                    <Button disabled={emiting} onClick={handleClick}>
                                        {emiting ? 'Processing...' : 'Accept'}
                                    </Button>
                                )}
                                {e.status == 'OUT' && (<Button disabled>Pending</Button>)}
                            </Stack>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>

    </>)
}

const Friends = ({ onClose }) => {
    const [search, setSearch] = useState("")
    const friends = useSelector(s => s.chat.friends);

    const dispatch = useDispatch();

    const onClickNewChat = (username) => {
        dispatch(activeNewChat(username));
        onClose();
    }
    const onClickChat = (username) => {
        dispatch(activeChat(username));
        onClose();
    }

    return (<>
        <SearchField
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={'Search Username'}
            fieldsx={{
                bgcolor: 'grey.5008'
            }}
        />
        <List sx={{ height: '90%', overflowY: 'scroll' }}>
            {friends.filter(e => ['NEW', 'FRIEND'].includes(e.status))
                .filter(e => {
                    let regex = new RegExp(search);
                    return (regex.test(e.username) || regex.test(e.name));
                })
                .map(e => (
                    <ListItem disablePadding key={e.username}>
                        <FriendCard user={e} {...{ onClickNewChat, onClickChat }} />
                    </ListItem>
                ))}
        </List>

    </>)
}

export default FriendsDialog