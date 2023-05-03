import React, {ChangeEvent, FC} from 'react';
import TextField from "@mui/material/TextField";

type SearchPropsType = {
    value: string
    setSearchTerm: (searchTerm: string) => void
}

export const Search: FC<SearchPropsType> = ({value, setSearchTerm}) => {
    const onChangeSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.currentTarget.value)
    }
    return (
        <TextField
            label="Search"
            variant="outlined"
            type="text"
            placeholder="Search"
            value={value}
            onChange={onChangeSearchHandler}
        />
    );
};