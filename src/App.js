import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import WordGuess from "./WordGuess";
import Form from "./Form";
import NavBar from "./NavBar";
import Home from "./Home";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavBar/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/guesser" component={WordGuess}/>
                    <Route path="/form" component={Form}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
