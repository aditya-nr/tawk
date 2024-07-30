import { useContext } from "react";
import { SnackbarContext } from "../themes/ThemeProvider";

export default function useSnacbar() {
    return useContext(SnackbarContext)
}