import _ from 'lodash';
import {
  CREATE_LIKE,
  FETCH_LIKES,
} from '../actions/types';

export default function(state = {}, action) {
  // Attention!!! The state object here refers to state.comments, instead of the application state.

  switch(action.type) {
    case FETCH_LIKES:
      return _.mapKeys(action.payload, '_id');
    case CREATE_LIKE:
      return { ...state, [action.payload._id]: action.payload };  // [] here is not for creating array, is for key interpolation, i.e. newState[action.payload.id] = action.payload
    default:
      return state;
  }
}