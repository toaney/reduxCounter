import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
    return {
        age:state.age
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAgeUp: () => dispatch({type:'AGE_UP'}),
        onAgeDown: () => dispatch({type:'AGE_DOWN'})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
