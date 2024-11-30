import React from 'react';

const CompleteButton = ({ onComplete }) => {
    return (
        <button className="complete-button" onClick={onComplete}>
            Complete
        </button>
    );
};

export default CompleteButton;
