import React, { useState } from 'react';

const UseToggle = (initialState) => {
  const [state, setState] = useState(initialState || false);

  const toggleState = () => {
    setState((st) => !st);
  };

  return [state, toggleState];
};

export default UseToggle;
