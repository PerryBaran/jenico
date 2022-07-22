import style from './backgroundImage.module.css';

function BackgroundImage(props: {src: string}) {
    const { src } = props;

    return (
        <div className={style.container}>
            <img
                src={src}
                alt='background'
            />
      </div>
    );
};

export default BackgroundImage;