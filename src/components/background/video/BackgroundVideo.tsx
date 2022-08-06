import style from './backgroundVideo.module.css';


const BackgroundVideo = (props: { src: string; }) => {
    const {src} = props;

    return (
        <div className={style.container}>
            <video 
                autoPlay 
                loop
                muted
                src={src}
                data-testid='video'
            />
      </div>
    );
};


export default BackgroundVideo;