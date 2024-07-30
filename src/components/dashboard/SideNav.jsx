import React, { useState } from 'react'
import { Avatar, Box, IconButton, Stack } from '@mui/material'
import { ChatCircleDots, Moon, Phone, Sun, Users } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../assets/Images/logo.svg';
import { toggleTheme } from '../../redux';
import ThemeSwitch from '../ThemeSwitch';

const actionBtns = [
    { logo: <ChatCircleDots />, to: 'chats' },
    { logo: <Users />, to: 'groups' },
    { logo: <Phone />, to: 'calls' },
]


const SideNav = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.app);
    const navigate = useNavigate();

    let cur = window.location.pathname.slice(1);
    actionBtns.forEach((e, i) => {
        if (e.to == cur)
            cur = i;
    })

    return (
        <>
            <Box height={"100vh"} px={2} py={2} sx={{
                backgroundColor: t => t.palette.mode === "light" ? "#F0F4FA" : "background.paper",
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}>
                <Stack sx={{
                    height: '100%',
                    justifyContent: 'space-between',
                }}>
                    <Stack gap={2} alignItems={'center'}>
                        {/* Logo */}
                        <Box mb={2} sx={{
                            bgcolor: t => 'primary.main',
                            borderRadius: 1.5,
                            height: 64,
                            width: 64,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <img src={Logo} alt="Akite" height={50} width={50} />
                        </Box>

                        {/* buttons */}
                        {
                            actionBtns.map((e, i) => (
                                <Box key={i} sx={{
                                    bgcolor: t => (i == cur ? 'primary.main' : ''),
                                    borderRadius: 1.5,
                                    p: 1
                                }}>
                                    <IconButton onClick={() => { navigate(e.to); }} sx={{
                                        color: t => (t.palette.mode == 'dark' || i == cur) ? 'white' : 'black'
                                    }}>
                                        {e.logo}
                                    </IconButton>
                                </Box>
                            ))
                        }
                    </Stack>

                    <Stack alignItems={'center'} gap={2}>
                        {/* Theme Switch */}
                        <ThemeSwitch onClick={() => dispatch(toggleTheme())} checked={theme == 'dark'} />
                        {/* profile */}
                        <IconButton onClick={() => navigate('settings')}>
                            <Avatar />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default SideNav