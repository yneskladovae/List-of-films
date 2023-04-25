import {v1} from "uuid";

export type initialStateType = {
    id: string
    film: string
    rating: null | number
    isWatched: boolean
    color: string
}

const initialState: initialStateType[] = []

export const filmsListReducer = (state: initialStateType[] = initialState, action: ActionsType): initialStateType[] => {
    switch (action.type) {
        case('ADD-FILM'): {
            const newFilm = {
                id: v1(),
                film: action.payload.filmTitle,
                rating: null,
                isWatched: false,
                color: action.payload.color
            }
            return [...state, newFilm]
        }
        case('CHANGE-WATCHED-STATUS'): {
            return state.map(el => el.id === action.payload.filmId ? {
                ...el,
                isWatched: action.payload.isWatchedValue,
                rating: 0
            } : el)
        }
        case('ADD-FILM-RATING'): {
            return state.map(el => el.id === action.payload.filmId ? {
                ...el,
                rating: action.payload.ratingValue
            } : el)
        }
        default: {
            return state
        }
    }
}

export type ActionsType = addFilmACType | changeIsWatchedStatusACType | addFilmRatingACType

export type addFilmACType = ReturnType<typeof addFilmAC>
export type changeIsWatchedStatusACType = ReturnType<typeof changeIsWatchedStatusAC>
export type addFilmRatingACType = ReturnType<typeof addFilmRatingAC>

export const addFilmAC = (filmTitle: string, color: string) => {
    return {
        type: 'ADD-FILM',
        payload: {
            filmTitle,
            color
        }
    } as const
}


export const changeIsWatchedStatusAC = (filmId: string, isWatchedValue: boolean) => {
    return {
        type: 'CHANGE-WATCHED-STATUS',
        payload: {
            filmId,
            isWatchedValue
        }
    } as const
}


export const addFilmRatingAC = (filmId: string, ratingValue: number | null) => {
    return {
        type: 'ADD-FILM-RATING',
        payload: {
            filmId,
            ratingValue
        }
    } as const
}