import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

//  queries
import fetchSongs from '../queries/fetchSongs';
import deleteSongs from '../queries/deleteSong';

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
                <Link to={`/songs/${id}`}>{title}</Link>
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

export default graphql(deleteSongs)(
    graphql(fetchSongs)(SongList)
);