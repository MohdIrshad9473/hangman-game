import React, { useState } from "react";

const initialState = [
    { id: 1, isRight: true, label: "True 1", clicked: false },
    { id: 2, isRight: true, label: "True 2", clicked: false },
    { id: 3, isRight: true, label: "True 3", clicked: false },
    { id: 4, isRight: true, label: "True 4", clicked: false },
    { id: 5, isRight: true, label: "True 5", clicked: false },
    { id: 6, isRight: true, label: "True 6", clicked: false },
    { id: 7, isRight: false, label: "False 7", clicked: false },
    { id: 8, isRight: false, label: "False 8", clicked: false }
];

export default function Hello() {
    // Button Restart refresh Page
    function resetGame() {
        setButtons(initialState);
        setCount(6);
    }

    const [buttons, setButtons] = useState(initialState);

    // Counter
    const [count, setCount] = useState(6);

    const buttonClickHandler = (id) => {
        if (count === 0) {
            return;
        }
        setCount(count - 1);
        setButtons(
            buttons.map((item) =>
                item.id === id ? { ...item, clicked: !item.clicked } : item
            )
        );
    };

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id.toString());
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const questionId = parseInt(e.dataTransfer.getData("text/plain"));
        const droppedButton = buttons.find((item) => item.id === questionId);
        const targetButton = buttons.find((item) => item.id === parseInt(e.target.id));

        if (droppedButton && targetButton) {
            const updatedButtons = buttons.map((item) => {
                if (item.id === droppedButton.id) {
                    return { ...item, clicked: false };
                }
                if (item.id === targetButton.id) {
                    return { ...item, clicked: true };
                }
                return item;
            });
            setButtons(updatedButtons);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="App">
            <div>
                <button onClick={resetGame} refresh="true">
                    RestartNew
                </button>
                <h3>Chances: 6</h3>
                {count}
            </div>

            <div>
                <h2>Answers</h2>
                <div
                    className="answer"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {buttons
                        .filter((button) => button.clicked)
                        .map((button) => (
                            <button key={button.id} id={button.id}>
                                {button.label}
                            </button>
                        ))}
                </div>
            </div>

            <h2>Buttons Questions!</h2>
            {/* Question buttons */}
            {buttons
                .filter((button) => !button.clicked)
                .map((button) => (
                    <button
                        key={button.id}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, button.id)}
                        onClick={() => buttonClickHandler(button.id)}
                    >
                        {button.label}
                    </button>
                ))}
            <h2>Buttons Questions!</h2>
            {/* Question buttons */}
            {buttons.map((button) => (
                <button key={button.id} onClick={() => buttonClickHandler(button.id)}>
                    {button.label}
                </button>
            ))}

            <br />
            <br />
            <h2>Checker</h2>
            <button onClick={() => checkIfCorrect()}>Check Answers</button>
            <br />
            <br />
        </div>
    );
}
