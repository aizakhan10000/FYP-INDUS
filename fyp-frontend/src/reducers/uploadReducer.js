import { createSlice } from '@reduxjs/toolkit';
import { uploadImages } from '../actions/uploadActions';

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default uploadSlice.reducer;