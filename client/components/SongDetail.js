import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {Link} from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from './LyricList';

//  queries
import fetchSong from '../queries/fetchSong';

class SongDetail extends Component {
    render() {
        if (!this.props.data) return <div>Loading...</div>;
        const { data: { song } } = this.props;
        if (!song) return <div>Song not found</div>;
        const { lyrics } = song;

        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={lyrics}/>
                <LyricCreate songId={song.id}/>
            </div>
        )
    }
}

export default graphql(fetchSong, {
    options: (props) => ({ variables: { id: props.params.id } })
})(SongDetail);