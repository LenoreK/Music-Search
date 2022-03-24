import { useState, useState } from 'react';
import { useParams } from 'react-route-dom';

function AlbumView() {
    const { id } = useParams()
    const [albumData, setAlbumData ] = useState([]);

    return (
        <div>
            <h2>The id passed was: {id}</h2>
            <p>Album data goes here!</p>
        </div>

    )
}

export default AlbumView