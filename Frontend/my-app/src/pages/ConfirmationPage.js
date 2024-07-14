import React from 'react';
import { useLocation } from 'react-router-dom';

function ConfirmationPage() {
    const { state } = useLocation();  // Access state passed from the submission
    const { recommendations } = state;  // Assuming recommendations are passed directly

    return (
        <div>
            <h1>Thank You for Your Submission!</h1>
            <h2>Based on your input, here are some gift recommendations:</h2>
            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>{item}</li>  // Assuming each recommendation is a string
                ))}
            </ul>
        </div>
    );
}

export default ConfirmationPage;
