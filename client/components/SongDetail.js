import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongDetail extends Component {

    renderSong() {
        const { data: { song } } = this.props;
        if (!song) return <div>Song not found</div>

    }
    render() {
        if (!this.props.data) return <div>Loading...</div>;
        return (
            <div>
                <h3>Song Detail</h3>
                {this.renderSong()}
            </div>
        )
    }
}

const query = gql`
    query FindSong($id: ID!) {
        song(id: $id){
            id,
            title
        }
    }
`;

export default graphql(query, {
    options: (props) => ({ variables: { id: props.params.id } })
})(SongDetail);