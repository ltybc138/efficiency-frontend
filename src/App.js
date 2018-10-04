import React, {Component} from 'react';
import axios from 'axios'
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            words: [],
            clickCount: 0
        };

        this.buttonListener = this.buttonListener.bind(this)
    }

    componentWillMount() {
        axios.get("http://localhost:8090/main/words")
            .then(res => {
                const words = res.data;
                console.log(words);
                this.setState({words})
            })
            .catch(ex => {
                console.log(ex)
            })
    }

    buttonListener(word) {
        const clickCount = this.state.clickCount + 1;
        console.log(word);
        this.setState({clickCount: clickCount})
    }

    render() {
        const buttons = this.state.words.map(word =>
            <button key={word.id} onClick={() => this.buttonListener(word.word)}>{word.word}</button>
        );
        return (
            <div className="App">
                <h1>Hello world</h1>
                {/*<button onClick={() => this.buttonListener()}>{this.state.clickCount}</button>*/}
                {buttons}
            </div>
        );
    }
}

export default App;
