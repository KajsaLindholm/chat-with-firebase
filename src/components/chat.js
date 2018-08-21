import React, { Component } from 'react';
import firebase, {provider} from '../firebase';


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
        //to firebase
        let dateSent = new Date();
        let sendMsg = { message: this.state.typingMsg, 
            date: dateSent, user: this.props.user};
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
    }

    render() {
        let previousMessages = this.state.prevMsgs.map((message) => {
            <div key={message.date}> 
                <small>{message.date}</small>
                <p>{message.user.displayName} says: </p>
                <p>{message.message}</p>
            </div>
        });
        return(
            <div className="chat">
                <div className="prevMsg">
                {previousMessages}
                </div>
                <form onSubmit={this.onSubmit}>
                    <textarea onChange={this.onType}/>
                    <input type="submit" value="send" />
                </form>
            </div>
            )
    }
}

export default Chat;