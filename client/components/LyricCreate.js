import React, { Component } from 'react';
import { graphql } from 'react-apollo';

//  queries
import addLyricToSong from '../queries/addLyricToSong';

class LyricCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: '',
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const { content } = this.state;
        const { songId } = this.props;
        this.props.mutate({
            variables: {
                content,
                songId
            }
        }).then(() => {
            this.setState({content: ''});
        });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input onChange={event => this.setState({content: event.target.value})} value={this.state.content}/>
            </form>
        )
    }
}

export default graphql(addLyricToSong)(LyricCreate);