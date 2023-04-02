import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './slices/notes';

const reducer = {
  notes: noteReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;