import React, { Component } from 'react';
import './App.css';
import firebase, {provider} from './firebase';
import Chat from './components/chat'

class App extends Component {
  state = {
    user: ''
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

  render() {
    if(this.state.user === "") {
         return (
        <div className="App">
          <h1>Hello</h1>
          <button onClick={this.Login}>please sign in</button>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>Welcome {this.state.user.displayName} </h1>
          <button onClick={this.Login} className="signout">Sign out when you're done</button>
          <Chat user={this.state.user} />
        </div>
      );
    }

  }
}

export default App;
