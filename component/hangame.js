import React, { useState } from 'react';
import style from "../styles/Hangman.module.css"

import step0 from "../public/image/0.jpg";
import step1 from "../public/image/1.jpg";
import step2 from "../public/image/2.jpg";
import step3 from "../public/image/3.jpg";
import step4 from "../public/image/4.jpg";
import step5 from "../public/image/5.jpg";
import step6 from "../public/image/6.jpg";
import Image from 'next/image';

export default function Hangman(){
    const [mistake, setMistake] = useState(0);
    // console.log("mistake",mistake)
    const [guessed, setGuessed] = useState(new Set([]));
    // console.log("first",guessed)
    var my = {
        question: "what is your team member name",
        answer: ["kiran", "vikas"]
    }
    const [answers, setAnswers] = useState(my.answer);
    // console.log(answers)

    const handleGuess = e => {
        let letter = e.target.value;
        // console.log("first",letter)
        // console.log("12",answers.join("").includes(letter))
        setGuessed(prevGuessed => new Set([...prevGuessed, letter]));
        setMistake(prevMistake => prevMistake + (answers.join("").includes(letter) ? 0 : 1));
    }

    const guessedWord = (index) => {
        return answers[index].split("").map(letter => (guessed.has(letter) ? letter : " _ "));
    }
    const generateButtons = () => {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button
                className={style.btn}
                key={letter}
                value={letter}
                onClick={handleGuess}
                disabled={guessed.has(letter)}
            >
                {letter}
            </button>
        ));
    }

    const resetButton = () => {
        setMistake(0);
        setGuessed(new Set([]));
        setAnswers(my.answer);
    }

    const gameOver = mistake >= 6;
    const isWinner = answers.every((answer, index) => guessedWord(index).join("") === answer);
    let gameStat = generateButtons();

    if (isWinner) {
        gameStat = "You Won!!!"
    }

    if (gameOver) {
        gameStat = "You Lost!!!"
    }
 

    return (
        <>
            <div className={style.heading}>
                <h1 className='text-center'>Hangman</h1>
                <div className="float-right">Wrong Guesses: {mistake} of 6</div>
            </div>
            <div className={`${style.Hangman} + container`}>
                <div className="text-center">
                    <Image className={style.img} src={[step0, step1, step2, step3, step4, step5, step6][mistake]} alt="" />
                </div>
                <div className={style.textbody}>
                    <h3>{my?.question}</h3>
                    {answers.map((answer, index) => (
                        <span key={index} className={style.space}>
                            {!gameOver ? guessedWord(index) : answer}
                            <div></div>
                        </span>
                    ))}
                    <div className={style.letter}>{gameStat}</div>
                    <button className='btn btn-info' onClick={resetButton}>Reset</button>
                </div>
            </div>
        </>
    );
}