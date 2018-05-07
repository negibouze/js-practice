import React, { Component } from 'react';
import './Square';

function Square(props) {
  return (
    <button className={props.highlight ? 'square highlight' : 'square'} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
