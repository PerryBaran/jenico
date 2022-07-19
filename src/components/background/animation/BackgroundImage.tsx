import React from 'react';
import style from './backgroundImage.module.css';

function BackgroundImage(props: {src: string}) {
    const { src } = props;

    return (
        <div className={style.background} style={{backgroundImage: `url(${src})`}}>
            <div>
            </div>
        </div>
    );
}

export default BackgroundImage;