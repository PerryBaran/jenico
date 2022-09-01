import style from './socials.module.css';

function Socials(props: {href: string, imgSrc:string, name: string}) {
    const {href, imgSrc, name} = props;
    
    return (
        <a href={href} target="_Blank" rel="noreferrer" className={style.container}>
            <img alt={`${name} icon`} src={imgSrc}/>
            <p>{name}</p>
        </a>
    );
};

export default Socials;