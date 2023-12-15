import React, { useState } from 'react';

const WordGame = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const dragIndex = e.dataTransfer.getData('text/plain');
    const dragItem = items[dragIndex];


    // Remove the dragged item from the original position
    const updatedItems = items.filter((item, i) => i !== dragIndex);
    // Insert the dragged item at the new position
    updatedItems.splice(index, 0, dragItem);

    setItems(updatedItems);
  };

  return (
    <div>
      <h2>Drag and Drop Example</h2>
      <ul>
        {items.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={e => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, index)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordGame;