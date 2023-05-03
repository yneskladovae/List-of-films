import React, {ChangeEvent, FC, memo, useState} from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import {addFilmAC} from "../../store/filmsListReducer";
import {useDispatch} from "react-redux";

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

type InputItemFormPropsType = {
    setSearchTerm: (searchTerm: string) => void
}

export const InputItemForm: FC<InputItemFormPropsType> = memo(({setSearchTerm}) => {
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()

    const addFilmOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addFilmOnClickHandler = () => {
        const newFilm = title[0].toUpperCase() + title.slice(1);
        dispatch(addFilmAC(newFilm.trim(), getRandomColor()))
        setTitle('')
        setSearchTerm('')
    }

    return (
        <div className={'input-item-form'}>
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
    );
});