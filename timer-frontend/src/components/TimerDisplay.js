const TimerDisplay = ({ startTime, endTime, elapsedTime }) => {
    const calculateTime = () => {
        if (endTime) {
            return new Date(endTime).getTime() - new Date(startTime).getTime();
        }
        return elapsedTime;
    };

    const displayTime = formatTime(calculateTime());

    return (
        <div className="timer-display">
            <h1>{displayTime}</h1>
        </div>
    );
};

const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default TimerDisplay;
