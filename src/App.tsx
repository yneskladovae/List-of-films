import React from 'react';
import {v1} from 'uuid';
import './App.css';
import {useSelector} from "react-redux";
import {FilmsList} from "./components/FilmsList/FilmsList";

function App() {
    // const films = useSelector(state => state)
    return (
        <div className="App">
            <FilmsList/>
        </div>
    );
}

export default App;
