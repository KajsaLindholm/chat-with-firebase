import React, { Component } from 'react';
import './App.css';
import firebase, {provider} from './firebase';
import Chat from './components/chat'

class App extends Component {
  state = {
    user: ''
  }


  componentDidMount(){
    this.onLogin();        
  }

  Login = () => {
    firebase.auth().signInWithPopup(provider);
    this.onLogin();
  }

  onLogin = () => {
    firebase
    .auth()
    .onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: {} })
      }
    });}

  //missing a logout function

  render() {
    if(this.state.user === "") {
         return (
        <div className="App">
          <header>
            <h1>Hello</h1>
          </header>
          <button onClick={this.Login}>please sign in</button>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header>
          <button  className="signout">Sign out</button>
            <h1>Welcome {this.state.user.displayName} </h1>
          </header>
          <Chat user={this.state.user} />
        </div>
      );
    }

  }
}

export default App;
