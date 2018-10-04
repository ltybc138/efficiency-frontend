import React, {Component} from 'react';
import axios from 'axios'

class WordGuess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            words: [],
            randomNumber: -1,
            wordGuessed: 0,
            guessedWordsCount: 0
        };

        this.buttonListener = this.buttonListener.bind(this);
        this.nextButtonTouch = this.nextButtonTouch.bind(this);
    }

    componentWillMount() {
        this.getWordsFromServer();
    }

    nextButtonTouch() {
        this.setState({
            wordGuessed: 0,
            guessedWordsCount: this.state.guessedWordsCount + 1
        });
        this.getWordsFromServer()
    }

    getWordsFromServer() {
        axios.get("http://localhost:8090/main/words/4")
            .then(res => {
                const words = res.data;
                const randomNumber = Math.floor(Math.random() * words.length);
                this.setState({
                    words: words,
                    randomNumber: randomNumber
                })
            })
            .catch(ex => {
                console.log(ex)
            })
    }

    buttonListener(wordId) {
        const rightWord = this.state.words.map(word => word)[this.state.randomNumber];
        let wordGuessed = 0;
        if (rightWord.id === wordId) {
            wordGuessed = 1;
        } else {
            wordGuessed = -1;
        }
        this.setState({wordGuessed});
    }

    render() {
        const translations = this.state.words.map(word => word.translate);
        const buttons = this.state.words.map(word =>
            <button key={word.id} onClick={() => this.buttonListener(word.id)}>{word.word}</button>
        );
        const nextButton = (
            <button onClick={this.nextButtonTouch}>Next</button>
        );
        return (
            <div className="App">
                <h1>Guessed: {this.state.guessedWordsCount}</h1>
                <h1>{translations[this.state.randomNumber]}</h1>
                <div>
                    {buttons}
                </div>
                <h1>{this.state.wordGuessed > 0 ? "Yeeey" : this.state.wordGuessed < 0 ? "Noooo" : ""}</h1>
                {this.state.wordGuessed === 1 ? nextButton : null}
            </div>
        );

    }
}

export default WordGuess;
