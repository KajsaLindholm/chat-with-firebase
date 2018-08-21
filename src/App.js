import React, { Component } from 'react';
import './App.css';
import firebase, {provider} from './firebase';
import Chat from './components/chat'

class App extends Component {
  state = {
    user: '',
    title: "Feed the Chat"
  }


  componentDidMount(){
    this.onLogin();        
  }

  Login = () => {
    firebase.auth().signInWithPopup(provider);
    this.onLogin();
  }

  Signout = () => {
    firebase.auth().signOut();
    this.onLogin();
  }

  onLogin = () => {
    firebase
    .auth()
    .onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: "" })
      }
    });}

  render() {
    if(this.state.user === "") {
         return (
        <div className="App">
          <header>
            <h1>{this.state.title}</h1>
          </header>
          <button onClick={this.Login}>please sign in</button>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header>
          <button  className="signout" onClick={this.Signout}>Sign out</button>
            <h1>{this.state.title} </h1>
          </header>
          <Chat user={this.state.user} login={this.onLogin}/>
        </div>
      );
    }

  }
}

export default App;
