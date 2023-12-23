import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import { ICharacters } from "../../types/interfaces/reducers/ricandmort/characters.interface";

interface ICharactersService {
    fetchCharactersService(): Promise<AxiosResponse>;
}


const fetchCharacters = createAsyncThunk(
    "fetch/characters",
    async ()=> {
        const response = await axios.get<ICharacters>("https://rickandmortyapi.com/api/character");
        return response
    }
);

const ApiCharactersService: ICharactersService = {
    //@ts-ignore
    fetchCharacters:fetchCharacters,
}


export { fetchCharacters };
export default ApiCharactersService;