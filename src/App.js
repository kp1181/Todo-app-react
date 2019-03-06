import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SimpleCard from './components/todos/SimpleCard'
import MainLayout from './components/MainLayout';




class App extends Component {
  render() {
    return (
      <div className="App">
          <MainLayout/>
      </div>
    );
  }
}

export default App;
