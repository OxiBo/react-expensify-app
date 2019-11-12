import { createStore, combineReducers } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";

export default () => {
  // Store creation

  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),

    // redux dev tool extention -https://github.com/zalmoxisus/redux-devtools-extension#usage
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
