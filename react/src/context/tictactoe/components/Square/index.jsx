import React, { Component } from 'react';
import './Square';

function Square(props) {
  console.log(props.highlight)
  return (
    <button className={props.highlight ? 'square highlight' : 'square'} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
