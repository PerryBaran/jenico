import React from 'react';
import style from './backgroundAnimation.module.css';

function BackgroundAnimation(props: {src: string}) {
    const { src } = props;

    return (
        <div className={style.background} style={{backgroundImage: `url(${src})`}}>
            <div>
            </div>
        </div>
    );
}

export default BackgroundAnimation;