import React, { Component } from 'react';
import firebase from '../firebase';


class Chat extends Component {
    state = {
        typingMsg: '',
        prevMsgs: [],
    }

    onType = (e) => {
        let newText = e.target.value;
        this.setState({typingMsg: newText});
    }

    onSubmit = (e) => {
        e.preventDefault();
        //to firebase
        let dateSent = new Date(); //doesn't reach db - WHYYYY
        let sendMsg = { message: this.state.typingMsg, 
            date: dateSent, user: {name: this.props.user.displayName,
                email:this.props.user.email}
            };
        firebase.database().ref(`/chat`).push(sendMsg);
        //updating state
        this.setState({typingMsg: ''});
        this.updatePrevious();
    }

    updatePrevious = () => {
        let lastFiveMsg = firebase.database().ref(`/chat`)
        .orderByChild('date')
        .limitToFirst(5)
        .on('value', function(snapshot){
            console.log(snapshot.val());
        });
        let newDisplay= this.toArray(lastFiveMsg);
        this.setState({prevMsgs: newDisplay})
    }

     toArray = (firebaseObject) => {
        let array = []
        for (let item in firebaseObject) {
          array.push({ ...firebaseObject[item], key: item })
        }
        return array;
  }

    render() {
        let previousMessages = this.state.prevMsgs.map((message) => {
            <div key={message.date}> 
                <small>{message.date}</small>
                <p>{message.user.name} says: </p>
                <p>{message.message}</p>
            </div>
        });
        return(
            <div className="chat">
                <div className="prevMsg">
                {previousMessages}
                </div>
                <form onSubmit={this.onSubmit} className="flex-col">
                    <label htmlFor="yourMessage">Tell us something!</label>
                    <textarea onChange={this.onType} id="yourMessage"/>
                    <input type="submit" value="send" />
                </form>
            </div>
            )
    }
}

export default Chat;