import React from 'react';


const Background = (props: { src: string; }) => {
    const {src} = props

    return (
        <div className='background'>
            <video 
                autoPlay 
                loop 
                muted
                src={src}
            />
      </div>
    );
};


export default Background;