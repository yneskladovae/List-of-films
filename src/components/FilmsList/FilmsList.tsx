import React, {ChangeEvent, FC, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addFilmAC, addFilmRatingAC, changeIsWatchedStatusAC, initialStateType} from "../../store/filmsListReducer";
import {AppRootStateType} from "../../store/state";
import {FilmRating} from "../FilmRating/FilmRating";

export const FilmsList = () => {
    const films = useSelector<AppRootStateType, Array<initialStateType>>(state => state.filmsList)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')

    const addFilmOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addFilmOnClickHandler = () => {
        setTitle('')
        dispatch(addFilmAC(title))
    }

    const addFilmRatingHandler = (id: string, ratingValue: number) => {
        dispatch(addFilmRatingAC(id, ratingValue))
    }

    return (
        <div>
            <h1>List of films</h1>
            <input value={title} onChange={addFilmOnChangeHandler}/>
            <button onClick={addFilmOnClickHandler}>+</button>
            <ul>
                {films.map(el => {
                    return (
                        <li key={el.id}>
                            <div>
                                <strong>{el.film}</strong>
                            </div>
                            <label>Film viewed:
                                <input
                                    onChange={(e) => dispatch(changeIsWatchedStatusAC(el.id, e.currentTarget.checked))}
                                    type="checkbox" checked={el.isWatched}
                                />
                            </label>
                            {el.isWatched && <div>
                                <label>
                                    Rating of the film: <FilmRating
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => addFilmRatingHandler(el.id, +e.target.value)}/>
                                </label>
                            </div>}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};