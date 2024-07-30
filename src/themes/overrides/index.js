import Typography from "./Typography"
import Input from "./Input"
import Link from "./Link"

const ComponentOverrides = (theme) => {
    return Object.assign(
        Link(theme),
        Input(theme),
        Typography(theme),
    )
}

export default ComponentOverrides