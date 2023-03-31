import React, { useState } from 'react';
import Buttons from './Buttons';
import Display from './Display';

const Calculator = () => {
    const [expression, setExpression] = useState('');
    const [displayValue, setDisplayValue] = useState('');

    const handleButtonClick = (buttonValue) => {
        if (buttonValue === 'clear') {
            setDisplayValue('');
            setExpression('');
        } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
            setExpression(expression + buttonValue);
            setDisplayValue(displayValue + buttonValue);
        } else if (buttonValue === '=') {
            const regex = /(\d+\.?\d*)([+\-*/])(\d+\.?\d*)/; // regex = regular expresssion, first () captures number with a decimal, second () captures the operation, and third () captures a second number
            const match = expression.match(regex); // match() method is used to check if the regex expression is equal to the expression string, if not returns null, if so returns array of captured groups

            if (match) {
                // this will set the value of the variables using the matched array indicies from above
                const num1 = parseFloat(match[1]);
                const operator = match[2];
                const num2 = parseFloat(match[3]);


                const payload = {
                    'num1': num1,
                    'num2': num2,
                    'operation': operator
                };

                // the lambda invoked url is in an environment variable
                fetch(`${process.env.REACT_APP_API_URL}/calculate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                    .then(response => response.json())
                    .then(data => {
                        setDisplayValue(data.result);
                        setExpression('');
                    });
            } else {
                // Handle invalid expression
            }
        } else {
            setExpression(expression + buttonValue);
            setDisplayValue(displayValue + buttonValue);
        }
    };

    return (
        <div className="calculator">
            <Display displayValue={displayValue} />
            <Buttons handleButtonClick={handleButtonClick} />
        </div>
    );
};

export default Calculator;
