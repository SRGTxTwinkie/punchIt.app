import React from 'react';
import ReactDOM from 'react-dom';
import MainComp from './mainComp.js'
import './App.css'

ReactDOM.render(
  <div className={"webpageClamp"}>
    <div className={"webpageCentered centeredText fadeIn"}>
      <MainComp />
    </div>
  </div>
  ,document.getElementById('root')
);

