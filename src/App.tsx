import { Box } from "@mui/material"
import MultiSelSearchComponent from "./components/multiSel.seach.comp";
import { useEffect } from "react";
import { useAppDispatch } from "./store";
import { fetchCharacters } from "./services/rickandmort/characters.service";

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchCharacters())
    },[])

    return (
        <Box sx={{
            position: 'absolute',
            top: '10px', // Adjust the top position as needed
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '1000', // Ensure it's above the map
            textAlign: 'center',
            width: '430px',
            height: '60px',
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
        }}>
            <MultiSelSearchComponent />
        </Box>
    )
}

export default App