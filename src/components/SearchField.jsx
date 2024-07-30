import { InputBase, Stack } from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";

const SearchField = ({ placeholder, value, onChange, fieldsx }) => {
    return (<>
        <Stack sx={{
            flexDirection: 'row',
            bgcolor: t => t.palette.mode == 'dark' ? 'background.paper' : 'grey.5008',
            alignItems: 'center',
            px: 2,
            py: 0.5,
            gap: 2,
            width: '100%',
            borderRadius: 4,
            ...fieldsx
        }}>
            <MagnifyingGlass color='#709CE6' size={20} />
            <InputBase
                placeholder={placeholder || "Search..."}
                fullWidth
                value={value}
                onChange={onChange}
            />
        </Stack>
    </>)
}

export default SearchField;