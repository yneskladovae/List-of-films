import React, {ChangeEvent, FC, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addFilmAC, addFilmRatingAC, changeIsWatchedStatusAC, initialStateType} from "../../store/filmsListReducer";
import {AppRootStateType} from "../../store/state";
import {FilmRating} from "../FilmRating/FilmRating";
import TextField from '@mui/material/TextField';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';

export const FilmsList = () => {
    const films = useSelector<AppRootStateType, Array<initialStateType>>(state => state.filmsList)
    console.log(films)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')

    const addFilmOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addFilmOnClickHandler = () => {
        const newFilm = title[0].toUpperCase() + title.slice(1);
        dispatch(addFilmAC(newFilm.trim()))
        setTitle('')
    }

    const addFilmRatingHandler = (id: string, ratingValue: null | number) => {
        dispatch(addFilmRatingAC(id, ratingValue))
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <div>
            <h1 className={'title'}>List of films</h1>
            <div className={'input-item-form'}>
                {/*<input value={title} onChange={addFilmOnChangeHandler}/>*/}
                {/*<button onClick={addFilmOnClickHandler} disabled={title.length < 0}>+</button>*/}
                <TextField
                    id="outlined-basic"
                    label="Enter the film"
                    variant="outlined"
                    value={title}
                    onChange={addFilmOnChangeHandler}
                />
                <IconButton aria-label="add" onClick={addFilmOnClickHandler} disabled={title.trim().length < 1}>
                    <VideoCallIcon fontSize={'large'}/>
                </IconButton>
            </div>
            <ul className={'films-container'}>
                {films.map(el => {
                    return (
                        <Paper
                            elevation={1}
                            // style={{backgroundColor: getRandomColor()}}
                        >
                            <li key={el.id} className={'film-item'}>
                                <div>
                                    <h2>{el.film}</h2>
                                </div>
                                <label>Film viewed:
                                    {/*<input*/}
                                    {/*    onChange={(e) => dispatch(changeIsWatchedStatusAC(el.id, e.currentTarget.checked))}*/}
                                    {/*    type="checkbox" checked={el.isWatched}*/}
                                    {/*/>*/}
                                    <Checkbox
                                        icon={<PlayCircleOutlinedIcon/>}
                                        checkedIcon={<PlayCircleFilledOutlinedIcon/>}
                                        checked={el.isWatched}
                                        onChange={(e) => dispatch(changeIsWatchedStatusAC(el.id, e.currentTarget.checked))}
                                    />

                                </label>
                                {el.isWatched && <div>
                                    Rating of the film:<FilmRating
                                    addFilmRating={(ratingValue: number | null) => addFilmRatingHandler(el.id, ratingValue)}/>
                                </div>}
                            </li>
                        </Paper>
                    )
                })}
            </ul>
        </div>
    );
};