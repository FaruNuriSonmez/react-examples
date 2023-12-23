import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICharactersState } from "../../types/interfaces/reducers/ricandmort/characters.interface";
import ApiCharactersService, { fetchCharacters } from "../../services/rickandmort/characters.service";
import { ICharacters } from "../../types/interfaces/reducers/ricandmort/characters.interface";
import { AxiosResponse
 } from "axios";
const initialState: ICharactersState = {
    data: { results: [] },
    loading: true,
    error: ""
}

const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchCharacters.fulfilled, (state,  action: PayloadAction<AxiosResponse<ICharacters, any>>) => {
            state.loading = false;
            state.data = action.payload.data;
        });
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
        })
    },
})

export default charactersSlice