import React from 'react';

export default function Button({ onSubmit, isButtonDisabled }) {
  return (
    <button className="searchButton" onClick={onSubmit} type="submit" disabled={isButtonDisabled}>
      Search
    </button>
  );
}