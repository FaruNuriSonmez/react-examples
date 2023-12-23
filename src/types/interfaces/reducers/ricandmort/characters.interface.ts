import { CharactersModel } from "../../../models/reducers/ricandmort/characters.model";

export interface ICharactersState {
    data:ICharacters,
    loading:boolean,
    error:any
}

export interface ICharacters {
    results:CharactersModel[];
}