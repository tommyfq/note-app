/**
 * Configures the Redux store with the given reducers and settings.
 * @module configureStore
*/

import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './slices/notes';

/**
 * Object that defines the root reducer of the store.
 * The root reducer is a collection of named reducer functions.
*/
const reducer = {
  notes: noteReducer
}

/**
 * Configures the Redux store with the given reducers and settings.
 * @function
 * @param {object} reducer - An object that defines the root reducer of the store.
 * @param {boolean} [devTools=true] - A boolean that enables/disables the use of Redux DevTools in the browser.
 * @returns {object} - The configured Redux store.
*/
const store = configureStore({
  reducer: reducer,
  devTools: true,
})

/**
 * Exports the Redux store for use in other parts of the application.
*/
export default store;