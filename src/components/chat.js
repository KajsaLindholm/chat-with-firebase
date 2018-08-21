import React, { Component } from 'react';
import firebase from '../firebase';


class Chat extends Component {
    state = {
        typingMsg: '',
        prevMsgs: [],
    }

    componentDidMount(){
        this.props.login();
        this.updatePrevious();
    }

    onType = (e) => {
        let newText = e.target.value;
        this.setState({typingMsg: newText});
    }

    onSubmit = (e) => {
        e.preventDefault();
        //to firebase
        let dateSent = new Date();
        let date = dateSent.getTime();
        let sendMsg = { message: this.state.typingMsg, 
            date: date, user: {name: this.props.user.displayName,
                email:this.props.user.email}
            };
        firebase.database().ref(`/chat/`).push(sendMsg);

        //reset state
        this.setState({typingMsg: ''});
    }

    updatePrevious = () => {
        firebase.database().ref(`/chat`)
        .limitToLast(5)
        .on('value', (snapshot) => {
            let newDisplay= snapshot.val();
            console.log(newDisplay);
            let msgArray= Object.values(newDisplay);
            console.log(msgArray);
            this.setState({prevMsgs: msgArray});
        });
    }

    render() {
        //date.toISOString()
        let previousMessages = this.state.prevMsgs.map((date) => {
            return (<div key={date.date}> 
                <p> <small>{date.date}</small> {date.user.name} says: </p>
                <p>{date.message}</p>
            </div>)
        });
        return(
            <div className="chat">
                <div className="flex-col chat-feed">
                {previousMessages}
                </div>
                <form onSubmit={this.onSubmit} className="flex-col">
                    <label htmlFor="yourMessage">Tell us something!</label>
                    <textarea onChange={this.onType} id="yourMessage" value={this.state.typingMsg}/>
                    <input type="submit" value="send" />
                </form>
            </div>
            )
    }
}

export default Chat;