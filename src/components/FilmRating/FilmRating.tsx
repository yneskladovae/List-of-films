import React, {FC, memo, useState} from "react";
import Rating from '@mui/material/Rating';

export type FilmRatingPropsType = {
    addFilmRating: (ratingValue: number | null) => void
}

export const FilmRating: FC<FilmRatingPropsType> = ({addFilmRating}) => {
    const [value, setValue] = useState<number | null>(0);

    return (
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