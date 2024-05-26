import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import uploadReducer from './reducers/uploadReducer';


const store = configureStore({
    reducer: {
      user: userReducer,
      upload: uploadReducer,
    },
  });

export default store;