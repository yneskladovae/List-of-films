import {v1} from "uuid";

export type initialStateType = {
    id: string
    film: string
    rating: null | number
    isWatched: boolean
}

const initialState: initialStateType[] = []

export type ActionsType = addFilmACType | changeIsWatchedStatusACType
export type addFilmACType = ReturnType<typeof addFilmAC>
export const addFilmAC = (filmTitle: string) => {
    return {
        type: 'ADD-FILM',
        payload: {
            filmTitle
        }
    } as const
}

export type changeIsWatchedStatusACType = ReturnType<typeof changeIsWatchedStatusAC>
export const changeIsWatchedStatusAC = (filmId: string, isWatchedValue: boolean) => {
    return {
        type: 'CHANGE-IS-WATCHED-STATUS',
        payload: {
            filmId,
            isWatchedValue
        }
    } as const
}

export type changeIsWatchedStatusACType = ReturnType<typeof changeIsWatchedStatusAC>
export const changeIsWatchedStatusAC = (filmId: string, isWatchedValue: boolean) => {
    return {
        type: 'CHANGE-IS-WATCHED-STATUS',
        payload: {
            filmId,
            isWatchedValue
        }
    } as const
}

export const filmsListReducer = (state: initialStateType[] = initialState, action: ActionsType): initialStateType[] => {
    switch (action.type) {
        case('ADD-FILM'): {
            const newFilm = {
                id: v1(),
                film: action.payload.filmTitle,
                rating: null,
                isWatched: false
            }
            return [...state, newFilm]
        }
        case('CHANGE-IS-WATCHED-STATUS'): {
            return state.map(el => el.id === action.payload.filmId ? {
                ...el,
                isWatched: action.payload.isWatchedValue
            } : el)
        }
        default: {
            return state
        }

    }

}
