import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import MessageList from '../MessageList';
import ProfileBar from '../ProfileBar';
import InputText from '../InputText';

const propTypes = {
    user: PropTypes.object.isRequired
}

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: Object.assign({}, this.props.user, { retweets: [] }, { favorites: [] }),
            openText: false,
            usernameToReply: '',
            messages: [{
                id: uuid.v4(),
                text: 'Mensaje del Tweet',
                picture: 'https://pbs.twimg.com/profile_images/1065088918519988224/EhhCjP4b_400x400.jpg',
                displayName: 'Giovanni',
                username: 'jonanv',
                date: Date.now() - (3 * 60 * 1000), //Minutos * segundos * segundos en milisegundos
                retweets: 0,
                favorites: 0,
            },
            {
                id: uuid.v4(),
                text: 'Este es un nuevo mensaje',
                picture: 'https://pbs.twimg.com/profile_images/1065088918519988224/EhhCjP4b_400x400.jpg',
                displayName: 'Giovanni',
                username: 'jonanv',
                date: Date.now() - (30 * 60 * 1000),
                retweets: 0,
                favorites: 0,
            }]
        }
        this.handleOpenText = this.handleOpenText.bind(this);
        this.handleSendText = this.handleSendText.bind(this);
        this.handleCloseText = this.handleCloseText.bind(this);
        this.handleRetweet = this.handleRetweet.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
        this.handleReplyTweet = this.handleReplyTweet.bind(this);
    }

    handleSendText(event) {
        event.preventDefault();
        let newMessage = {
            id: uuid.v4(),
            text: event.target.text.value,
            picture: this.props.user.photoURL,
            displayName: this.props.user.displayName,
            username: this.props.user.email.split('@')[0],
            date: Date.now()
        }

        this.setState({
            messages: this.state.messages.concat([newMessage]),
            openText: false,
        });
    }

    handleCloseText(event) {
        event.preventDefault();
        this.setState({ openText: false });
    }

    handleOpenText(event) {
        event.preventDefault(); //Previene o evita que se produzca el comportamiento por defecto del navegador
        this.setState({ openText: true });
    }

    handleRetweet(msgId) {
        let alreadyRetweeted = this.state.user.retweets.filter(rt => rt === msgId);

        if (alreadyRetweeted.length === 0) {
            let messages = this.state.messages.map(msg => {
                if (msg.id === msgId) {
                    msg.retweets++;
                }
                return msg;
            });

            let user = Object.assign({}, this.state.user);
            user.retweets.push(msgId);

            this.setState({
                messages,
                user
            });
        }
    }

    handleFavorite(msgId) {
        let alreadyFavorited = this.state.user.favorites.filter(fav => fav === msgId);

        if (alreadyFavorited.length === 0) {
            let messages = this.state.messages.map(msg => {
                if (msg.id === msgId) {
                    msg.favorites++;
                }
                return msg;
            });

            let user = Object.assign({}, this.state.user);
            user.favorites.push(msgId);

            this.setState({
                messages,
                user
            });
        }
    }

    handleReplyTweet(msgId, usernameToReply) {
        this.setState({
            openText: true,
            usernameToReply
        });
    }

    renderOpenText() {
        if (this.state.openText) {
            return (
                <InputText
                    onSendText={this.handleSendText}
                    onCloseText={this.handleCloseText}
                    usernameToReply={this.state.usernameToReply}
                />
            );
        }
    }

    render() {
        const { user } = this.props;

        return (
            <div>
                <ProfileBar
                    picture={user.photoURL}
                    username={user.email.split('@')[0]}
                    onOpenText={this.handleOpenText}
                />

                {this.renderOpenText()}

                <MessageList
                    messages={this.state.messages}
                    onRetweet={this.handleRetweet}
                    onFavorite={this.handleFavorite}
                    onReplyTweet={this.handleReplyTweet}
                />
            </div>
        );
    }
}

Main.propTypes = propTypes;

export default Main;