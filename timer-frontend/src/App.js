import React, { useState, useEffect } from 'react';
import { startTimer, completeTimer, fetchTimer } from './api';
import TimerDisplay from './components/TimerDisplay';
import CompleteButton from './components/CompleteButton';

const App = () => {
    const [timer, setTimer] = useState(null);
    const [isPaused, setIsPaused] = useState(false); 
    const [lapTimes, setLapTimes] = useState([]);   
    const [currentElapsedTime, setCurrentElapsedTime] = useState(0);

    useEffect(() => {
        const initTimer = async () => {
            try {
                const timerId = localStorage.getItem('timerId');
                
                if (timerId) {
                    try {
                        const { data } = await fetchTimer(timerId);
                        setTimer(data);
                    } catch (error) {
                        if (error.response?.status === 404) {
                            console.log("Timer ID not found, creating a new one...");
                            const { data } = await startTimer();
                            localStorage.setItem('timerId', data._id);
                            setTimer(data);
                        } else {
                            throw error;
                        }
                    }
                } else {
                    const { data } = await startTimer();
                    localStorage.setItem('timerId', data._id);
                    setTimer(data);
                }
            } catch (error) {
                console.error("Error initializing timer:", error);
            }
        };
        initTimer();
    }, []);

    useEffect(() => {
        let interval;
        let startTime = timer ? new Date(timer.assessment_start_time).getTime() : new Date().getTime();
        let pausedTime = 0;

        if (timer && !isPaused && !timer.assessment_end_time) {
            console.log("Starting interval"); 
            interval = setInterval(() => {
                const now = new Date().getTime();
                setCurrentElapsedTime(now - startTime + pausedTime);
                localStorage.setItem('elapsedTime', now - startTime + pausedTime);
                localStorage.setItem('startTime', startTime); 
            }, 1000);
        } else {
            console.log("Clearing interval"); 
            clearInterval(interval);
            if (isPaused) {
                pausedTime = currentElapsedTime; 
            }
        }

        return () => clearInterval(interval); 
    }, [timer, isPaused, currentElapsedTime]);

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
        localStorage.setItem('isPaused', !isPaused);
    };

    const handleLap = () => {
        const now = new Date().getTime();
        const elapsedTime = now - new Date(timer.assessment_start_time).getTime();
        console.log("Adding lap time:", elapsedTime); 
        setLapTimes([...lapTimes, elapsedTime]);
        localStorage.setItem('lapTimes', JSON.stringify([...lapTimes, elapsedTime]));
    };

    const handleComplete = async () => {
        try {
            if (timer) {
                const { data } = await completeTimer(timer._id);
                setTimer(data);
            }
        } catch (error) {
            console.error("Error completing timer:", error);
        }
    };

    return (
        <div className="app">
            {timer ? (
                <>
                    <TimerDisplay
                        startTime={timer.assessment_start_time}
                        endTime={timer.assessment_end_time}
                        elapsedTime={currentElapsedTime}
                    />
                    <div className="controls">
                        {!timer.assessment_end_time && (
                            <>
                                <button onClick={handlePauseResume}>
                                    {isPaused ? "Resume" : "Pause"}
                                </button>
                                <button onClick={handleLap}>Lap</button>
                                <CompleteButton onComplete={handleComplete} />
                            </>
                        )}
                    </div>
                    <div className="lap-times">
                        <h3>Lap Times</h3>
                        <ul>
                            {lapTimes.map((lap, index) => (
                                <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export default App;
