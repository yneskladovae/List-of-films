import React, {FC, useState} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Rating from '@mui/material/Rating';


export type FilmRatingPropsType = {
    addFilmRating: (ratingValue: number | null) => void
}

export const FilmRating: FC<FilmRatingPropsType> = ({addFilmRating}) => {
    const [value, setValue] = useState<number | null>(0);

    return (
        // <select onChange={onChange} name="select" autoFocus>
        //     <option value="1">1</option>
        //     <option value="2">2</option>
        //     <option value="3">3</option>
        //     <option value="4">4</option>
        //     <option value="5">5</option>
        // </select>

        // <Box sx={{minWidth: 120}}>
        //     <InputLabel style={{display: 'inlineFlex'}} id="demo-simple-select-label">Rating of the film:</InputLabel>
        //     <Select
        //         labelId="demo-simple-select-label"
        //         id="demo-simple-select"
        //         label=" Rating of the film:"
        //         onChange={onChange}
        //         defaultValue={"1"}
        //     >
        //         <MenuItem value={"1"}>1</MenuItem>
        //         <MenuItem value={"2"}>2</MenuItem>
        //         <MenuItem value={"3"}>3</MenuItem>
        //         <MenuItem value={"4"}>4</MenuItem>
        //         <MenuItem value={"5"}>5</MenuItem>
        //     </Select>
        // </Box>

        <div>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    addFilmRating(newValue)
                }}
            />
        </div>
    )
}