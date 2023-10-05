import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = '/review';

const initialState = {
    loading: false,
    reviews: [],
    error: null
}

export const fetchReviewByProduct = createAsyncThunk(
    'review/fetchReviewByProduct', async (ProductId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${URL}/${ProductId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const createReview = createAsyncThunk(
    'review/createReview', async ({ userId, ProductId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(URL, { userId, ProductId });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const updateReview = createAsyncThunk(
    'review/updateReview', async ({ id, editReview }, thunkApi) => {
        try {
            const { data } = await axios.put(`${URL}/${id}`, editReview);
            return data;
        } catch (error) {
            thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const deleteReview = createAsyncThunk(
    'review/deleteReview', async ({ userId, ProductId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(URL, { userId, ProductId });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {    
        reviewSort: (state, action) => {
        const sortOrder = action.payload;
  
        if (sortOrder === 'asc') {
          state.reviews.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        } else if (sortOrder === 'desc') {
          state.reviews.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        }
      },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewByProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviewByProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviewByProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
            })
            .addCase(createReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                const updatedReview = action.payload;
                const index = state.reviews.findIndex((review) => review.id === updatedReview.id);
                if (index !== -1) {
                    state.reviews[index] = updatedReview;
                }
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                const deletedReviewId = action.payload;
                state.reviews = state.reviews.filter((review) => review.id !== deletedReviewId);
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { reviewSort } = reviewSlice.actions;
export default reviewSlice.reducer;