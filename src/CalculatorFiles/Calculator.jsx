import React, { useState } from 'react';
import './calculator.css';
import Clock from './Clock';
import darkModeIcon from '../assets/dark_mode_icon.png'
import ligthModeIcon from '../assets/light_mode_icon.png'


function Calculator() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("0");
    const [isEvaluated, setIsEvaluated] = useState(false);  

    const [isActivate, setIsActivate] = useState("darkMode");

    const darkandLigthModes = [
        {
            id: 1,
            image: darkModeIcon,
            type: "darkMode"
        },
        {
            id: 2,
            image: ligthModeIcon,
            type: "lightMode"
        }
    ];

    const handleInput = (value) => {
        if (isEvaluated && typeof value === "number") {   // !isNaN(value)
            setInput(value);
            setIsEvaluated(false);
        } else {
            if (/[*+/%-.]$/.test(input) && /[*+/%-.]/.test(value)) {
                return;
            }
            setInput(isEvaluated ? result + value : input + value); 
            console.log(input)
            setIsEvaluated(false);
        }
    };

    const handleClear = () => {
        setInput("");
        setResult("");
        setIsEvaluated(false);
    };

    const handleBackSpace = () => {
        setInput(input.slice(0, -1));
    };

    const handleTotalResult = () => {
        try {
            if (input) {
                // (\d+) : Captures a sequence of one or more digits (first number, A) and also (second number, B) 
                // $1 and $2 refer to the first and second captured numbers (A and B) A*B/100 .
                const sanitizedInput = input.replace(/(\d+)%(\d+)/g, "($1 * $2 / 100)");
                const evaluatedResult = eval(sanitizedInput);
                const formattedResult = evaluatedResult.toLocaleString("en-US"); // Adds comma separators
                setResult(formattedResult);
                setIsEvaluated(true);
            }
        } catch (error) {
            setResult("Error");
        }
    };
    
    

    const handleDarkLigthModes = ()=> {
        setIsActivate(isActivate === "darkMode" ? "lightMode" : "darkMode")
    }

    return (
        <div className={isActivate === "darkMode" ? "container" : "lightModeContainer"}>
            <form action="">
                <div className='displayOutPut'>
                    <div className='topPhnIcons'>
                        <div className='clockLightMode'><Clock isActivate={isActivate}/></div>
                        <div className='leftIcons'>
                            {/* Sample icons */}
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="24px" fill={isActivate === "darkMode" ? "white" : "black"}><path d="M0 0h24v24H0V0z" fill="none" /><path d="M17 4h3v16h-3V4zM5 14h3v6H5v-6zm6-5h3v11h-3V9z" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="24px" fill={isActivate === "darkMode" ? "white" : "black"}><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" /><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="24px" fill={isActivate === "darkMode" ? "white" : "black"}><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM11 20v-5.5H9L13 7v5.5h2L11 20z" /></svg>
                        </div>
                    </div>
                    <span className='ligthModesContainer' onClick={handleDarkLigthModes}>
                        {
                            darkandLigthModes.map((images)=>{
                                if (isActivate === images.type) {
                                    return(
                                        <img src={images.image} alt={images.type} className={isActivate === "darkMode" ? "modeIconDark" : "modeIconLight"}/>
                                    ) 
                                }
                            })
                        }
                    </span>
                    {/* <input type="text" value={input} placeholder='Enter values'/> */}
                    <div className='inputTextDisplay'>{input}</div>
                    <h1 className={isActivate === "darkMode" ? "result" : "resultLightMode"}>=<span id="value">{result}</span></h1>
                </div>

                <div className='row1'>
                    <button type="button" className='row1Bg' onClick={handleClear}>AC</button>
                    <button type="button" className='row1Bg' onClick={handleBackSpace}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" /></svg>
                    </button>
                    <button type="button" onClick={() => handleInput('/')}>/</button>
                    <button type="button" onClick={() => handleInput('%')}>%</button>
                </div>

                <div className='row2'>
                    <button type="button" onClick={() => handleInput('7')}>7</button>
                    <button type="button" onClick={() => handleInput('8')}>8</button>
                    <button type="button" onClick={() => handleInput('9')}>9</button>
                    <button type="button" onClick={() => handleInput('*')}>*</button>
                </div>

                <div className='row3'>
                    <button type="button" onClick={() => handleInput('4')}>4</button>
                    <button type="button" onClick={() => handleInput('5')}>5</button>
                    <button type="button" onClick={() => handleInput('6')}>6</button>
                    <button type="button" onClick={() => handleInput('-')}>-</button>
                </div>

                <div className='row4'>
                    <button type="button" onClick={() => handleInput('1')}>1</button>
                    <button type="button" onClick={() => handleInput('2')}>2</button>
                    <button type="button" onClick={() => handleInput('3')}>3</button>
                    <button type="button" onClick={() => handleInput('+')}>+</button>
                </div>

                <div className='row5'>
                    <button type="button" onClick={() => handleInput('0')}>0</button>
                    <button type="button" onClick={() => handleInput('.')}>.</button>
                    <button type="button" onClick={handleTotalResult}>=</button>
                </div>
            </form>
        </div>
    );
}

export default Calculator;
