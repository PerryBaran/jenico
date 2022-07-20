import React from 'react';
import style from './socials.module.css';

function Socials(props: {src: string, img:string, name: string}) {
    const {src, img, name} = props

    return (
        <a href={src} target="_Blank" rel="noreferrer" className={style.link}>
            <img alt={`${name} icon`} src={img}/>
            <p>{name}</p>
        </a>
    );
}

export default Socials;