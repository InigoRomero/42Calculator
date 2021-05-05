import React, { Component } from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from "./components/KeyPadComponent";

class App extends Component {
    constructor(){
        super();

        this.state = {
            result: "",
            data: {}
        }
    }

    onClick = button => {

        if(button === "="){
            this.calculate()
        }

        else if(button === "C"){
            this.reset()
        }
        else if(button === "CE"){
            this.backspace()
        }

        else {
            this.setState({
                result: this.state.result + button
            })
        }
    };


    calculate = () => {
        var checkResult = ''
        if(this.state.result.includes('--')){
            checkResult = this.state.result.replace('--','+')
        }

        else {
            checkResult = this.state.result
        }

        try {
            this.setState({
                // eslint-disable-next-line
                result: (eval(checkResult) || "" ) + ""
            })
        } catch (e) {
            this.setState({
                result: "error"
            })

        }
    };

    reset = () => {
        this.setState({
            result: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };

    render() {
        return (
            <div className="content text-center bg">
              <br></br>
              <h1>Calculator Browser Aapplication</h1>
              <img src="/logo512.png" className="iconReact" / >
              <img src="https://raw.githubusercontent.com/InigoRomero/42ItTest/main/42Icon.jpeg?token=AK5DQMZPDGPOKG2TZ3CF6XDATK74Y" className="iconImg" alt="User Icon" />
              <br></br>
              <br></br>
              <div className="calculator-body">
                  <ResultComponent result={this.state.result}/>
                  <KeyPadComponent onClick={this.onClick}/>
              </div>
              <br></br>
              <p>by Iromero-</p>
            </div>
        );
    }
}

export default App;