import React, { useState } from "react"
import { IconButton, InputBase, Paper } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import useDebounce from "../../utils/debounce";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';

interface ISearch {
    placeholder?: string
    inputProps?: object
    onChangeText: (text:string) => void
    debounceDelay:number
}

const Search = ({ placeholder, inputProps, onChangeText, debounceDelay}: ISearch) => {

    const [searchTxt, setsearchTxt] = useState("")
    onChangeText(useDebounce(searchTxt, debounceDelay))

    return (
        <Paper
            component="form"
            sx={{display: 'flex', alignItems: 'center', width: 365 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                inputProps={inputProps}
                onChange={e=>setsearchTxt(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }}>
                <FilterAltTwoToneIcon/>
            </IconButton>
        </Paper>
    )
}

export default Search
