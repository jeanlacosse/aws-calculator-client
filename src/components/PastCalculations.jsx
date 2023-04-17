import React from 'react';

const PastCalculations = ({ pastCalculations }) => {
    return (
        <div className="past-calculations">
            <h3>Past Calculations:</h3>
            <ul>
                {pastCalculations.map((calc, index) => (
                    <li key={index}>
                        {calc.num1} {calc.operation} {calc.num2} = {calc.result}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PastCalculations;
