import {combineReducers, legacy_createStore} from "redux";
import {filmsListReducer} from "./filmsListReducer";

const rootReducer = combineReducers({
    filmsList: filmsListReducer
})

export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>
