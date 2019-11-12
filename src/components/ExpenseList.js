import React from "react";
import { connect } from "react-redux"; // function to connect to the store
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.map(expense => {
      return <ExpenseListItem 
      key={expense.id} {...expense} 
      />;
    })}
  </div>
);

// function that maps state to component's props
// It is called every time the store state changes.
// It receives the entire store state, and should return an object of data this component needs.
/*This function should be passed as the first argument to connect, and will be called every time when the Redux store state changes. If you do not wish to subscribe to the store, pass null or undefined to connect in place of mapStateToProps.
ownProps (optional)
You may define the function with a second argument, ownProps, if your component needs the data from its own props to retrieve data from the store. This argument will contain all of the props given to the wrapper component that was generated by connect.
Much like a Redux reducer, a mapStateToProps function should always be 100% pure and synchronous. It should simply take state (and ownProps) as arguments, and return the data the component needs as props. It should not be used to trigger asynchronous behavior like AJAX calls for data fetching, and the functions should not be declared as async.*/

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

// connect can have second argument - https://react-redux.js.org/docs/using-react-redux/connect-dispatching-actions-with-mapdispatchtoprops#connect-dispatching-actions-with-mapdispatchtoprops

export default connect(mapStateToProps)(ExpenseList);

// export default ConnectedExpenseList;
// const ConnectedExpenseList = connect((state) => {
//     return {
//         expenses: state.expenses
//     };
//     })(ExpenseList);

//     export default ConnectedExpenseList;
