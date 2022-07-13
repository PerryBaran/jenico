import React from 'react';
import style from './background.module.css';


const Background = (props: { src: string; }) => {
    const {src} = props

    return (
        <div className={style.container}>
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