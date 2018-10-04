import React, {Component} from 'react'
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "",
            translate: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onWordChange = this.onWordChange.bind(this);
        this.onTranslateChange = this.onTranslateChange.bind(this);
    }

    onSubmit(event) {
        console.log(this.state.word + " " + this.state.translate);
        this.postNewWord();
        this.setState({
            word: "",
            translate: ""
        });
        event.preventDefault();
    }

    // TODO catch errors
    // TODO indicate if word-translation saved on the server
    postNewWord() {
        axios.post("http://localhost:8090/main/word", {
            word: this.state.word,
            translate: this.state.translate
        })
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
    }

    onWordChange(event) {
        this.setState({word: event.target.value});
    }

    onTranslateChange(event) {
        this.setState({translate: event.target.value});
    }

    render() {
        return (
            <div>
                Form
                <form onSubmit={this.onSubmit}>
                    <label>
                        Word:
                        <input type="text" value={this.state.word} onChange={this.onWordChange}/>
                    </label>
                    <label>
                        Translation:
                        <input type="text" value={this.state.translate} onChange={this.onTranslateChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default Form;