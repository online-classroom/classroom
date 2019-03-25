import React, {Component} from 'react';
import Chat from '../../Components/QueueChat/Chat';
import Queue from '../../Components/QueueChat/Queue';
import SecondaryButton from './../../Components/Buttons/SecondaryButton';

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
                    <SecondaryButton onClick={this.handleClickChat} isActive={this.state.showChat}>Chat</SecondaryButton>
                    <SecondaryButton onClick={this.handleClickQueue} isActive={!this.state.showChat}>Queue</SecondaryButton>
                </div>
                {this.state.showChat ? (
                    <Chat/>
                ):(
                    <Queue course_id={this.props.course_id}/>
                )}
            </div>
        )
    }
}

export default QueueChatContainer