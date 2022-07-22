import style from './time.module.css';

function Time(props: {time: number}) {
    const { time } = props;

    const calcDisplayTime = (seconds: number) => {
        let sec: number | string = seconds;
        let min = 0;
        while (sec >= 60) {
            min++;
            sec = sec - 60;
        }
        if (sec < 10) {
            sec = `0${sec}`;
        }
        return `${min}:${sec}`;
    };

    return (
        <div className={style.container}>
            <p>{calcDisplayTime(time)}</p>
        </div>
    );
};

export default Time;