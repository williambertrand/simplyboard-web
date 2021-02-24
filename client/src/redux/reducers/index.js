import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
// import { registration } from './registration.reducer';
// import { users } from './users.reducer'; /TODO

const rootReducer = combineReducers({
    authentication,
});

export default rootReducer;