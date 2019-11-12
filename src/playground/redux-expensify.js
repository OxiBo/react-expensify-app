import { createStore, combineReducers } from "redux";
import uuid from "uuid"; // generates unique IDs


/* Actions 
Actions are payloads (корисні дані) of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store.dispatch().
 Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed. 
 Action type is recommended to assign to a variable like this: const ADD_TODO = 'ADD_TODO'.
Action creators are exactly that — functions that create actions. In the code below there is a bunch of action creators. Each of them returns an object (an action)
Actions only describe what happened, but don't describe how the application's state changes.
this part - ({ id } = {}) destructuring from empty object in this case)) is an object destructuring often used in the part where you write list of arguments for action creators
*/

// ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});


// REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});


// EDIT_EXPENSE
const editExpense = (id, updates) => (
    {
        type: 'EDIT_EXPENSE',
        id, 
        updates
    }
)


// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});


// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});


// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})


// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

/*
Reducers
The reducer is a pure function that takes the previous state and an action, and returns the next state.
Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.
Things you should never do inside a reducer:
- Mutate its arguments;
- Perform side effects like API calls and routing transitions;
- Call non-pure functions, e.g. Date.now() or Math.random(). 
Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
Arguments to the reducer often use ES6 default arguments syntax (ex. - const expensesReducer = (state = expensesReducerDefaultState, action) => ....)
good practice to use Object.assign() function to return a new piece of state, spread operator (for arrays and objects as well), concat(), slice().


*/
// Expenses reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
        case 'ADD_EXPENSE':
        return [
            ...state, 
            action.expense
            ];
        case 'REMOVE_EXPENSE':
        return state.filter(({ id })  => id !== action.id);
        case 'EDIT_EXPENSE':
        return state.map((expense) => {
            if(expense.id === action.id) {
                return {
                    ...expense,
                    ...action.updates
                }
            }
            else {
                return expense;
            };
        })
        default:
        return state;
  }
};

// Filter Reducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date", //date or amount
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
      case "SET_TEXT_FILTER":
      return {
          ...state,
          text: action.text
      };
      case "SORT_BY_DATE":
      return {
          ...state,
          sortBy: 'date'
      }
      case "SORT_BY_AMOUNT":
      return {
          ...state,
          sortBy: 'amount'
      }
      case "SET_START_DATE":
      return {
          ...state,
          startDate: action.startDate
      }
      case "SET_END_DATE":
      return {
          ...state,
          endDate: action.endDate
      }
    default:
      return state;
  }
};


// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {

    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.startAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
          return b.createdAt - a.createdAt; 
        }
        else if(sortBy === 'amount') {
            return b.amount - a.amount;
        }
    })
};




// Store creation
// create a store after installing Redux and importing import { createStore } from "redux";
// The Store is the object that brings actions and reducers together.
// The argument to the store is a reducer (or combineReducer if you have a few) and optionally the initial state as the second argument.
// if there are multiple reducers use combineReducers (import { createStore, combineReducers } from "redux";)
// with combineReducer() the state parameter is different for every reducer, and corresponds to the part of the state it manages. All combineReducers() does is generate a function that calls your reducers with the slices of state selected according to their keys, and combines their results into a single object again

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);


/*
subscribe(listener)
Adds a change listener. It will be called any time an action is dispatched, and some part of the state tree may potentially have changed. You may then call getState() to read the current state tree inside the callback.
The argument Listener (Function): The callback to be invoked any time an action has been dispatched, and the state tree might have changed. You may call getState() inside this callback to read the current state tree. It is reasonable to expect that the store's reducer is a pure function, so you may compare references to some deep path in the state tree to learn whether its value has changed
Returns (Function): A function that unsubscribes the change listener. To unsubscribe the change listener, invoke the function returned by subscribe.
for example - const unsubscribe = store.subscribe(() => console.log(store.getState())). It will stop listening to changes
*/
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});

/*
dispatch(action)
Dispatches an action. This is the only way to trigger a state change.
Arguments:
Action (Object): A plain object describing the change that makes sense for your application. Actions are the only way to get data into the store.
Returns
(Object): The dispatched action
*/

const expense1 = store.dispatch(addExpense({ description:'rent', amount: 100, createdAt: -21000 }));

const expense2 = store.dispatch(addExpense({ description:'coffee', amount: 200, createdAt: -1000 }));

const expense3 = store.dispatch(addExpense({ description:'coffee', amount: 500, createdAt: -1000 }));
// console.log(item2);

// console.log(store.getState());

// store.dispatch(removeExpense({ id: expense2.expense.id }));

// store.dispatch(editExpense(expense1.expense.id, { amount: 777 }));


// store.dispatch(setTextFilter('rent'));

// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(-2000));




const demoState = {
  expenses: [
    {
      id: "hfjdhdjhfd",
      description: "january rent",
      note: "final payment",
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", //date or amount
    startDate: undefined,
    endDate: undefined
  }
};

// console.log(demoState)
