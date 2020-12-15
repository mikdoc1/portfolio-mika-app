import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';

const initState = {
  portfolio: null,
  portfolios: [],
  meta: {
    error: '',
    isLoading: false,
  },
};

export const createPortfolio = createAsyncThunk(
  'portfolioSlice/createPortfolio',
  async ({ portfolio }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/v1/portfolios/create', portfolio);
      return { portfolio: data };
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const editPortfolio = createAsyncThunk(
  'portfolioSlice/editPortfolio',
  async ({ id, portfolio }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch('/api/v1/portfolios/edit', { id, portfolio });
      return { portfolio: data };
    } catch (err) {
      return rejectWithValue({ error: err.response.data });
    }
  }
);

export const deletePortfolio = createAsyncThunk(
  'portfolioSlice/deletePortfolio',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/portfolios/delete/${id}`);
      return { id: data._id };
    } catch (err) {
      return rejectWithValue({ error: err.response.data });
    }
  }
);

export const getPortfolios = createAsyncThunk('portfolioSlice/getPortfolios', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PORTFOLIO_API_URL}/portfolios`);
    return { portfolios: data };
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }
});

export const getPortfolio = createAsyncThunk('portfolioSlice/getPortfolio', async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PORTFOLIO_API_URL}/portfolios/${id}`);
    return { portfolio: data };
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }
});

const portfolioSlice = createSlice({
  name: 'portfolioSlice',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, { payload }) => {
      return {
        ...state,
        ...payload.portfolioSlice,
      };
    });
    builder.addCase(deletePortfolio.fulfilled, (state, { payload }) => {
      console.log('AAAAAA', payload);
      return {
        ...state,
        portfolios: state.portfolios.filter(({ _id }) => _id !== payload.id),
        meta: {
          ...state.meta,
          isLoading: false,
          error: '',
        },
      };
    });
    builder.addMatcher(
      (action) =>
        action.type.includes('createPortfolio/pending') ||
        action.type.includes('getPortfolio/pending') ||
        action.type.includes('deletePortfolio/pending') ||
        action.type.includes('editPortfolio/pending'),
      (state) => {
        return {
          ...state,
          meta: {
            ...state.meta,
            isLoading: true,
          },
        };
      }
    );
    builder.addMatcher(
      (action) =>
        action.type.includes('getPortfolio/fulfilled') ||
        action.type.includes('createPortfolio/fulfilled') ||
        action.type.includes('editPortfolio/fulfilled'),
      (state, { payload }) => {
        return {
          ...state,
          portfolio: payload.portfolio,
          meta: {
            ...state.meta,
            error: '',
            isLoading: false,
          },
        };
      }
    );
    builder.addMatcher(
      (action) => action.type.includes('getPortfolios/fulfilled'),
      (state, { payload }) => {
        return {
          ...state,
          portfolios: [...state.portfolios, ...payload.portfolios],
          meta: {
            ...state.meta,
            error: '',
            isLoading: false,
          },
        };
      }
    );
    builder.addMatcher(
      (action) =>
        action.type.includes('getPortfolios/rejected') ||
        action.type.includes('getPortfolio/rejected') ||
        action.type.includes('createPortfolio/rejected') ||
        action.type.includes('deletePortfolio/rejected') ||
        action.type.includes('editPortfolio/rejected'),
      (state, { payload }) => {
        return {
          ...state,
          meta: {
            ...state.meta,
            error: payload.error || 'Oops something went wrong...',
            isLoading: false,
          },
        };
      }
    );
  },
});

export default portfolioSlice.reducer;
