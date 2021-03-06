import React, { Component } from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from "./components/KeyPadComponent";
import axios from 'axios';
import ReactJson from 'react-json-view'

class App extends Component {
    constructor(){
        super();
        this.state = {
            result: "",
            data: false,
            pathname: "",
            req: true,
            loading: false
        }
    }
    componentDidMount() { 
        this.setState({pathname : window.location.pathname})
        if (window.location.pathname == "/callback")
        {
            let uri = window.location.href;
            uri = uri.replace('3000', '8080');
            console.log(uri);
            axios.get(uri)
            .then(res => {
              const persons = res.data;
              if (persons.me != "Bad request.")
                this.setState({req : false})
              console.log(persons);
            })
        }
        if (window.location.pathname == "/calculator")
        {
            this.setState({loading : true})
            axios.get("http://localhost:8080/me")
            .then(res => {
              const me = res.data;
              this.setState({data : me})
              this.setState({loading : false})
            })
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
        if (this.state.loading == true)
            return ( <h1>Loading...</h1>);
        else
        {
            return (
                <div className="content text-center bg">
                {this.state.pathname == "/calculator" && this.state.req && this.state.data.me &&  !this.state.data.me.bad ? 
                    <div>
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
                        <p>It has nothing to do with the calculator, but since you are logged in O_O</p>
                        <ReactJson src={this.state.data} />
                    </div>
                    :
                    <div>
                    <div class="content text-center">
                        <h1>Calculator Browser Aapplication</h1>
                        <img src="https://raw.githubusercontent.com/InigoRomero/42ItTest/main/nodeJS/captures/icon.png?token=AK5DQM5DJC3HF4ZI6JZM4STATFGJ4" className="iconImg" />
                        <img src="/logo512.png" className="iconReact" / >
                        <p>by Iromero-</p>
                        <br></br>
                    </div>
                    <center>
                        <div class="justify-content-center fadeInDown">
                            <div id="formContent">
                                <div class="fadeIn first">
                                    <img src="https://raw.githubusercontent.com/InigoRomero/42ItTest/main/42Icon.jpeg?token=AK5DQMZPDGPOKG2TZ3CF6XDATK74Y" id="icon" alt="User Icon" />
                                </div>
                                <form>
                                    <a href="https://api.intra.42.fr/oauth/authorize?client_id=3390c897e9313d75feb7518f9aa8ea1024e200d81915588048d7b337f9758f57&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code">Log in</a>
                                </form>
                                <div id="formFooter">
                                    <p class="underlineHover"> You can only access it if you are from 42 :) </p>
                                </div>
                            </div>
                        </div>
                    </center>
                    </div>
                }
                </div>
            );
        }
    }
}

export default App;