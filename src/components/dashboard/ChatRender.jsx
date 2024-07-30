import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { chatApi } from '../../api/chatsApi'
import { useDownload } from '../../hooks'
import { Download } from 'phosphor-react'

const TextMessage = ({ chat, user }) => {
    return (
        <>
            <Stack alignSelf={chat.from == user ? 'end' : 'start'} sx={{
                p: 1.5,
                m: 1.5,
                bgcolor: 'primary.main',
                borderRadius: 1
            }}>
                <Typography>{chat.message}</Typography>
            </Stack>
        </>
    )
}

const ImageMessage = ({ chat, user }) => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const download = useDownload();

    const handleDownlaod = () => {
        let filename = chat.key?.split('/').at(-1);
        download(url, chat.key, filename);
    }
    const convertKeyToUrl = async (key) => {
        let res = await chatApi.getFile(key);
        if (res.status == 'OK') {
            setUrl(res.url);
            setLoading(false);
        }
    }
    useEffect(() => {
        if (chat.src) {
            setUrl(chat.src);
            setLoading(false);
        } else {
            convertKeyToUrl(chat.key);
        }
    }, [])

    return (
        <>
            <Stack alignSelf={chat.from == user ? 'end' : 'start'} sx={{
                p: 1.5,
                m: 1.5,
                borderRadius: 1
            }}>
                {
                    loading ?
                        <>Loading...</>
                        : (
                            <>
                                <img src={url} width={250} />
                                <IconButton onClick={handleDownlaod}><Download /></IconButton>
                                {/* <a href={url} download={'asdfasf.jpeg'}><Download /></a> */}
                            </>
                        )

                }
            </Stack>
        </>
    )
}
const ChatRender = ({ chat, user }) => {
    return (
        <Stack w={'100%'}>
            {
                (() => {
                    switch (chat.type) {
                        case 'TEXT':
                            return <TextMessage chat={chat} user={user} />
                        case 'IMAGE':
                            return <ImageMessage chat={chat} user={user} />
                    }
                })()
            }
        </Stack>
    )
}

const withWrapper = (Component) => {

    const WithWrapper = (prop) => {
        const { from, user, type, text } = prop;

        return (
            <Stack direction={'row'} alignSelf={from == user ? 'end' : 'start'}>
                <Box>
                    <Component {...prop} />
                </Box>
            </Stack>
        )
    }
}
export default ChatRender