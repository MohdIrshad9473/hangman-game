import React from 'react';

const Word = ({ targetWord }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedLetter = e.dataTransfer.getData('text/plain');
    const targetId = e.target.id;
    const targetElement = document.getElementById(targetId);

    if (droppedLetter && targetElement) {
      targetElement.value = droppedLetter;
    }
  };

  return (
    <div className="word" onDragOver={handleDragOver} onDrop={handleDrop}>
      {targetWord.split('').map((_, index) => (
        <input
          id={`letter-${index}`}
          key={index}
          className="letter"
          type="text"
          maxLength={1}
          readOnly
        />
      ))}
    </div>
  );
};

export default Word;
