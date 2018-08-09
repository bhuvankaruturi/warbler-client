import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getMessages, removeMessage } from "../store/actions/message";
import MessageItem from "../components/MessageItem";

class MessageList extends Component {
    componentDidMount() {
        this.props.getMessages();       
    }
    
    render() {
        const {messages, removeMessage, currentUserId} = this.props;
        let messageList = messages.map(m => (
                <MessageItem
                key={m._id}
                date={m.createdAt}
                text={m.text}
                username={m.user.username}
                profileImageUrl={m.user.profileImageUrl}
                removeMessage={removeMessage.bind(this, m.user._id, m._id)}
                isCorrectUser={currentUserId === m.user._id}
                />
            ));
        return (
            <div className="row col-sm-8">
                <div className="offset-1 col-sm-10">
                    <ul className="list-group" id="messages">
                        {messageList}
                    </ul>
                </div>
            </div>
            );
    }
}

const mapStateToProps = function(state) {
    return {
        messages: state.message,
        currentUserId: state.currentUser.user.id
    };
};

export default connect(mapStateToProps, {getMessages, removeMessage})(MessageList);