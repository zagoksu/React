import React from 'react';

export default function Button({ onSubmit, disabled }) {
  return (
    <button className="searchButton" onClick={onSubmit} type="submit" disabled={disabled}>
      Search
    </button>
  );
}