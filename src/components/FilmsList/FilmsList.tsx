import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addFilmRatingAC, changeIsWatchedStatusAC, initialStateType} from "../../store/filmsListReducer";
import {AppRootStateType} from "../../store/state";
import {FilmRating} from "../FilmRating/FilmRating";
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import {InputItemForm} from "../InputItemForm/InputItemForm";
import TextField from "@mui/material/TextField";

export const FilmsList = () => {
    const films = useSelector<AppRootStateType, Array<initialStateType>>(state => state.filmsList)
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch()

    const addFilmRatingHandler = (id: string, ratingValue: null | number) => {
        dispatch(addFilmRatingAC(id, ratingValue))
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const results = !searchTerm
        ? films
        : films.filter(el =>
            el.film.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    
    return (
        <div>
            <h1 className={'title'}>List of films</h1>
            <div className={'add-search-films'}>
                <InputItemForm/>
                <TextField
                    label="Search"
                    variant="outlined"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            <ul className={'films-container'}>
                {results.map(el => {
                    return (
                        <>
                            <Paper
                                elevation={1}
                                style={{backgroundColor: el.color}}
                            >
                                <li key={el.id} className={'film-item'}>
                                    <div>
                                        <h2>{el.film}</h2>
                                    </div>
                                    <label>Film viewed:
                                        <Checkbox
                                            icon={<PlayCircleOutlinedIcon/>}
                                            checkedIcon={<PlayCircleFilledOutlinedIcon/>}
                                            checked={el.isWatched}
                                            onChange={(e) => dispatch(changeIsWatchedStatusAC(el.id, e.currentTarget.checked))}
                                        />
                                    </label>
                                    {el.isWatched && <div>
                                        Rating of the film:
                                        <FilmRating
                                            addFilmRating={(ratingValue: number | null) => addFilmRatingHandler(el.id, ratingValue)}/>
                                    </div>}
                                </li>
                            </Paper>
                        </>
                    )
                })}
            </ul>
        </div>
    );
};