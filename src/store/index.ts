import { configureStore } from '@reduxjs/toolkit'
import {useDispatch, TypedUseSelectorHook, useSelector, } from "react-redux";
import charactersSlice from "../reducers/rickandmort/characters.slice"
const store = configureStore({
    reducer:{
        characters:charactersSlice.reducer
    }
})

export default store;
export type RootState  = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;