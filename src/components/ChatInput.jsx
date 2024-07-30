import { Box, Dialog, Fab, IconButton, InputBase, Stack, Tooltip, useTheme } from "@mui/material";
import { File, Image, LinkSimple, Smiley, Sticker, User } from "phosphor-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from 'emoji-picker-react';
import { pushChat } from "../redux";
import { chatApi } from "../api/chatsApi";
import { useSocket } from "../context/SocketContext";
import { socketApi } from "../api/socket";
import useSnacbar from "../hooks/useSnackbar";


function generateUniqueNumber() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000); // You can adjust the range as needed
    return `${timestamp}${random}`;
}

const ImageComponent = () => {
    const active_user = useSelector(s => s.chat.active);
    const myUsername = useSelector(s => s.user.username);

    const dispatch = useDispatch();
    const socket = useSocket();
    const snackbar = useSnacbar();

    const handleFile = async (e) => {
        const file = e.target.files[0];
        let url = URL.createObjectURL(file);
        dispatch(pushChat({ user: active_user, data: { from: myUsername, type: 'IMAGE', src: url, _id: generateUniqueNumber() } }))
        let res = await chatApi.uploadFile(file);
        if (res.status == 'OK') {
            let res2 = await socketApi.emitFileMessage(socket, active_user, 'IMAGE', res.key);
            if (res2.status != 'OK') {
                snackbar('error', res2.message);
            }
        } else {
            snackbar('error', res.message);
        }
    }

    return (<>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <Image size={24} />
            <input
                onChange={handleFile}
                type="file"
                accept=".jpg, .jpeg, .png"
                style={{ display: 'none' }}
            />
        </label>
    </>)
}



const ChatInput = ({ placeholder, value, onChange, send }) => {
    const [showAction, setShowAction] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const theme = useTheme();
    return (<>
        <Stack sx={{
            flexDirection: 'row',
            bgcolor: t => t.palette.mode == 'dark' ? 'background.paper' : 'grey.50012',
            alignItems: 'center',
            px: 1.5,
            py: 0.5,
            gap: 1.5,
            width: '100%',
            borderRadius: 1.5
        }}>
            <IconButton sx={{ position: 'relative' }} onClick={e => setShowAction(!showAction)}>
                <LinkSimple color='#709CE6' size={25} />
                {/* Icon list */}
                <Stack display={!showAction && 'none'} sx={{
                    position: 'absolute',
                    bottom: 50,
                    gap: 1
                }}>
                    <Tooltip title={"Photo/Video"} placement="right" >
                        <Fab >
                            <ImageComponent />
                        </Fab>
                    </Tooltip>

                </Stack>
            </IconButton>
            <InputBase
                placeholder={placeholder || "Type Something..."}
                fullWidth
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyUp={e => {
                    if (e.key == 'Enter')
                        send();
                }}
            />
            <IconButton sx={{ position: 'relative' }} onClick={e => setShowEmoji(!showEmoji)}>
                <Smiley color='#709CE6' size={25} />
                {showEmoji && (<Box sx={{ position: 'absolute', bottom: 50, right: 0 }}>
                    <EmojiPicker lazyLoadEmojis theme={theme.palette.mode}
                        onEmojiClick={(emoji, event) => onChange(`${value}${emoji.emoji}`)}
                    />
                </Box>)}
            </IconButton>
            <Dialog open={false}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <Image size={24} />
                    <input
                        onChange={e => console.log(e.target.files)}
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        style={{ display: 'none' }}
                    />
                </label>
            </Dialog>
        </Stack>
    </>)
}

export default ChatInput;