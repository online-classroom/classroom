import React, {Component} from 'react';
import Chat from '../../Components/QueueChat/Chat';
import Queue from '../../Components/QueueChat/Queue';

class QueueChatContainer extends Component {
    constructor(){
        super()
        this.state = {
            showChat: true
        }
    }
    handleClickChat = ()=>{
        this.setState({
            showChat: true
        })
    }
    handleClickQueue = ()=>{
        this.setState({
            showChat: false
        })
    }
    render(){
        return (
            <div>
                <div>
                    <button onClick={this.handleClickChat}>Chat</button>
                    <button onClick={this.handleClickQueue}>Queue</button>
                </div>
                {this.state.showChat ? (
                    <Chat/>
                ):(
                    <Queue/>
                )}
            </div>
        )
    }
}

export default QueueChatContainer