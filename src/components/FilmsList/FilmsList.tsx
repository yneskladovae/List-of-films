import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addFilmAC, changeIsWatchedStatusAC, initialStateType} from "../../store/filmsListReducer";
import {AppRootStateType} from "../../store/state";

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

    return (
        <div>
            <h1>List of films</h1>

            <input value={title} onChange={addFilmOnChangeHandler}/>
            <button onClick={addFilmOnClickHandler}>+</button>
            <ul>
                {films.map(el => {
                    return (
                        <li key={el.id}>
                            <input
                                onChange={(e) => dispatch(changeIsWatchedStatusAC(el.id, e.currentTarget.checked))}
                                type="checkbox" checked={el.isWatched}
                            />
                            {el.film}
                            {el.isWatched && <div> Rating of the film: <FilmRating/></div>}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export const FilmRating = () => {
    return (
        <select name="select">
            <option value="value1" >1</option>
            <option value="value2" >2</option>
            <option value="value3">3</option>
            <option value="value4">4</option>
            <option value="value5">5</option>
        </select>
    )
}
