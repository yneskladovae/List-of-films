import React, {ChangeEvent, FC} from "react";

export type FilmRatingPropsType = {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const FilmRating: FC<FilmRatingPropsType> = ({onChange}) => {
    return (
        <select onChange={onChange} name="select" autoFocus>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    )
}