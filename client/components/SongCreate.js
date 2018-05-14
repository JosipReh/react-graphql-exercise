import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { hashHistory } from "react-router";

//  queries
import fetchSongs from '../queries/fetchSongs';
import addSong from "../queries/addSong";

class SongCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };

    }

    handleSubmit(event){
        event.preventDefault();

        this.props.mutate({
           variables: {
               title: this.state.title,
           },
            refetchQueries: [{ query: fetchSongs }],    //that also takes variables object like up there, variables : {}
        })
        .then(() => hashHistory.push('/'))
        .catch(err => console.log(err));
    };

    render() {
        return (
          <div>
              <Link to="/">Back</Link>
              <h3>Create a new song</h3>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <label>Song Title:</label>
                <input onChange={event => this.setState({title: event.target.value})} value={this.state.title}/>
              </form>
          </div>
        );
    }
};

export default graphql(addSong)(SongCreate);