import React, { useState } from 'react';

function Calculator() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                num1: num1,
                num2: num2,
                operation: operation,
            }),
        });
        const data = await response.json();
        // this may need to change depending on how the response looks, it may also need to be turned into a number from a string
        setResult(data.body)
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                />
                <select
                    name="operation"
                    id="operation"
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                >
                    <option value="add">+</option>
                    <option value="subtract">-</option>
                    <option value="multiply">*</option>
                    <option value="divide">/</option>
                </select>
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                />
                <button type='submit'>Calculate</button>
            </form>
            <div>{result}</div>
        </div>
    );
}

export default Calculator;