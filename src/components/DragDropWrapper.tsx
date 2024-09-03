import React, { useState } from 'react';

const DragDropWrapper = ({ children, onDrop }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (onDrop) {
      const droppedData = event.dataTransfer.getData('text/plain');
      onDrop(droppedData);
    }
  };

  const handleDragStart = (event, data) => {
    event.dataTransfer.setData('text/plain', data);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`p-4 border-dashed ${isDragging ? 'border-blue-500 bg-blue-100 border-2 z-50' : 'border-gray-300'
        }`}
    >
      {children}
    </div>
  );
};

export default DragDropWrapper;

