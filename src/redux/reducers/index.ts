import {
  combineReducers
} from 'redux';
import { UserReducer } from 'src/redux/reducers/user-reducer';
import SystemReducer from 'src/redux/reducers/system-reducer';

const reducers = {
  user: UserReducer,
  system: SystemReducer
};

export default combineReducers(reducers);
