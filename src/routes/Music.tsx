import React from 'react';

function Music(props:any) {
    const {data} = props
    return (
        <div className="music">
            {data.map(((album: any) => {
                return (
                    <button className='cover'>
                        <div>
                            <img src={album.art} alt={`${album.title} album cover`}/>
                            <p>{album.title}</p>
                        </div>
                    </button>
                )
            }))}
        </div>
    );
}

export default Music;