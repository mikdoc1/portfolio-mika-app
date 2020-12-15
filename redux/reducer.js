import { combineReducers } from '@reduxjs/toolkit';
import portfolioReducer from './slice/portfolio';
import blogReducer from './slice/blog';

export const reducer = combineReducers({
  portfolioSlice: portfolioReducer,
  blogSlice: blogReducer,
});
