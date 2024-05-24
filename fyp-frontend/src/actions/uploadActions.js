import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const uploadImages = createAsyncThunk(
  'upload/uploadImages',
  async (files, { rejectWithValue }) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('http://localhost:3000/xray/uploadMultipleXRays', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
