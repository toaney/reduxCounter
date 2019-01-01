import React, { Component } from 'react';
import { connect } from 'react-redux';


class App extends Component {

    render() {
        return (
            <div>
            <center>
            <h1>Simple Redux Counter</h1>
            <button onClick={this.props.onAgeUp}>increment</button>
            <button onClick={this.props.onAgeDown}>decrement</button>
            <div>Age: <span>{this.props.age}</span></div>
            </center>
            </div>
        )
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