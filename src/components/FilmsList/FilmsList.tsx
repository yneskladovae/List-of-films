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
import {Search} from "../Search/Search";

export const FilmsList = () => {
    const films = useSelector<AppRootStateType, Array<initialStateType>>(state => state.filmsList)
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState<string>("");

    const addFilmRatingHandler = (id: string, ratingValue: null | number) => {
        dispatch(addFilmRatingAC(id, ratingValue))
    }

    const results = !searchTerm
        ? films
        : films.filter(el =>
            el.film.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log( e.currentTarget.checked)
        e.currentTarget.checked && results.filter(el => el.isWatched)
        console.log(results.filter(el => el.isWatched))
    }

    return (
        <div>
            <div className={'films-list-container'}>
                {films.length > 0 && (
                    <div className={'sidebar'}>
                        <h2>Sidebar</h2>
                        <div>
                            <Search value={searchTerm} setSearchTerm={setSearchTerm}/>
                        </div>
                        <div>
                            <label>
                                Film viewed: <input type="checkbox" onChange={onChangeCheckboxHandler} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Rating of the film:  <FilmRating
                                addFilmRating={() => {}}/>
                            </label>
                        </div>
                    </div>
                )}
                <div className={'films-main'}>
                    <div className={'add-film-form'}>
                        <h1 className={'title'}>List of films</h1>
                        <InputItemForm setSearchTerm={setSearchTerm}/>
                    </div>
                    <ul className={'films-container'}>
                        {results.map(el => {
                            return (
                                <>
                                    <Paper elevation={1} style={{backgroundColor: el.color}}>
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
                        {results.length === 0 && <h3>Nothing found</h3>}
                    </ul>
                </div>
            </div>
        </div>
    );
};