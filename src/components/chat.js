import React, { Component } from 'react';
import firebase from '../firebase';


class Chat extends Component {
    state = {
        typingMsg: '',
        prevMsgs: [],
    }

    componentDidMount(){
        
    }

    onType = (e) => {
        let newText = e.target.value;
        this.setState({typingMsg: newText});
    }

    onSubmit = (e) => {
        e.preventDefault();
        //to firebase
        let dateSent = new Date(); //doesn't reach db - WHYYYY
       // console.log(dateSent); okej, den existerar. 
        let sendMsg = { message: this.state.typingMsg, 
            date: dateSent, user: {name: this.props.user.displayName,
                email:this.props.user.email}
            };
        firebase.database().ref(`/chat/${dateSent}`).push(sendMsg);
        //updating state
        this.setState({typingMsg: ''});
        this.updatePrevious();
    }

    updatePrevious = () => {
        firebase.database().ref(`/chat`)
        .limitToLast(5)
        .on('value', function(snapshot){
            console.log(snapshot.val());
          //  let newDisplay= this.toArray(snapshot.val());
           // this.setState({prevMsgs: newDisplay});
        });

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
            return (<div key={message.date}> 
                <small>{message.date}</small>
                <p>{message.user.name} says: </p>
                <p>{message.message}</p>
            </div>)
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