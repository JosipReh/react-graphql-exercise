import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import FetchSongs from '../queries/fetchSongs';

class SongList extends Component {

    handleDelete(id) {
        this.props.mutate({
            variables: {
                id,
            },
        }).then(() => this.props.data.refetch());
    }

    renderSongs() {
        const { songs } = this.props.data;
        if (!songs) return <div>Loading</div>;
        return songs.map(({title, id}) => <li className="collection-item" key={id}>
            {title}
            <i className="material-icons" onClick={() => this.handleDelete(id)}>delete</i>
        </li>);
    }

    render() {
        if (!this.props.data.songs) return <div>Loading...</div>;
        return(
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
            )
    }
}

const deleteSongs = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id){
            id
        }
    }
`;

export default graphql(deleteSongs)(
    graphql(FetchSongs)(SongList)
);