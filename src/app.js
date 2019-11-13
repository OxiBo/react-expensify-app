import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import { addExpense, removeExpense, editExpense  } from './actions/expenses';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate  } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import configureStore from './store/configureStore';

import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();


// store.dispatch(addExpense({ description:'water bill', amount: 5000}));
// store.dispatch(addExpense({ description:'gas bill', createdAt: 1000}));
// store.dispatch(addExpense({ description:'internet bill'}));
// store.dispatch(addExpense({ description:'medical bill', amount: 77777777777}));
// store.dispatch(addExpense({ description:'drinking water'}));
// store.dispatch(addExpense({ description:'rent', amount: "105000"}));
// store.dispatch(addExpense({ description:'books bill', amount: 7000, createdAt: 2000}));
// store.dispatch(addExpense({ description:'fridge bill', amount: 200000}));
// store.dispatch(addExpense({ description:'repare bill', amount: 3300}));
// store.dispatch(setTextFilter('water'));



const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses) 
console.log("testing")
// store.dispatch(getVisibleExpenses('water'))
// console.log(store.getState());

// store in curly brackets is our store variable, store will be available for components
const jsx = (
  <Provider store={store}> 
    <AppRouter />
  </Provider>
  
)

ReactDOM.render(jsx, document.getElementById("app"));









































// my testing area

class Test extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    // console.log("what are the props?");
    return (
      <div>
        <p>Lets test it</p>
      </div>
    );
  }
}

// ReactDOM.render(<Test />, document.getElementById("tests"));
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };

    // change code below this line
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }
  // change code above this line

  // change code below this line
  toggleVisibility() {
    this.setState({
      visibility: !this.state.visibility
    });
  }
  // change code above this line
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
          <div>
            <p style={{ color: "white" }}> ## mark down</p>## what is this
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(<MyComponent />, document.getElementById("tests"));
