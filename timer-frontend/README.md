Project Overview
This application allows users to track and manage a timer, providing functionality to start, pause, resume, complete, and track lap times. The timer is persistent across sessions, even after browser refreshes, using localStorage for data persistence.

Features
1. Start Timer
Functionality: The timer starts when the user first interacts with the application.
Behavior: On the first page load or after a refresh, if no active timer exists, a new timer is created and saved in localStorage.
Start Time: The timer’s start time is stored using the current timestamp (new Date().getTime()).
2. Pause/Resume Timer
Functionality: The user can pause and resume the timer at any time.
State Tracking: The application tracks the paused state with the isPaused state variable.
Local Storage: The isPaused state is stored in localStorage so that it persists across browser refreshes.
3. Lap Times
Functionality: The user can record lap times during the timer’s operation.
State Tracking: Each lap time is calculated as the difference between the current time and the start time of the timer.
Persistence: Lap times are stored in localStorage and displayed in a list.
4. Complete Timer
Functionality: The user can complete the timer session, ending it and saving the results.
State Update: Once the timer is complete, it updates the status and shows the final result.
API Integration: Upon completing the timer, the application interacts with the backend to store the completed timer data.
5. Timer State Persistence
Browser Refresh: The timer’s current state (including elapsed time, start time, paused state, and lap times) is stored in localStorage. On browser refresh, the state is restored, and the timer picks up where it left off.
Data Handling:
The startTime, elapsedTime, and isPaused states are persisted across sessions.
If no active timer is found, a new timer is created.
Technologies Used:
Frontend: React.js:
useState and useEffect hooks for managing state and side effects.
setInterval for updating the elapsed time at regular intervals.
localStorage for state persistence.
Basic UI components like buttons and display areas for timer and lap times.
Backend: Node.js (expressed in API calls)
The backend API interacts with the frontend to create, update, and complete timers. Data is stored in the backend (e.g., MongoDB).
