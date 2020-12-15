import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';

const initialState = {
  author: null,
  blog: null,
  blogs: [],
  meta: {
    error: '',
    isLoading: false,
  },
};

export const createBlog = createAsyncThunk('blogSlice/createBlog', async ({ blog }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/v1/blogs/create', blog);
    return { blog: data };
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }
});

export const editBlog = createAsyncThunk('blogSlice/editBlog', async ({ id, blog }, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch('/api/v1/blogs/edit', { id, blog });
    return { blog: data };
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }
});

export const getBlog = createAsyncThunk('blogSlice/getBlog', async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PORTFOLIO_API_URL}/blogs/${id}`);
    return { blog: data };
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }
});

export const getBlogBySlug = createAsyncThunk('blogSlice/getBlogBySlug', async ({ slug }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PORTFOLIO_API_URL}/blogs/s/${slug}`);
    return { blog: data.blog, author: data.author };
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }
});

export const getBlogs = createAsyncThunk('blogSlice/getBlogs', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/api/v1/blogs`);
    return { blogs: data };
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }
});

export const getMyBlogs = createAsyncThunk('blogSlice/getMyBlogs', async ({ accessToken }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PORTFOLIO_API_URL}/blogs/me`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return { blogs: data };
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }
});

export const changeBlogStatus = createAsyncThunk(
  'blogSlice/changeBlogStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch('/api/v1/blogs/edit', { id, status });
      return { blog: data };
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, { payload }) => {
      return {
        ...state,
        ...payload.blogSlice,
      };
    });
    builder.addCase(getBlogs.fulfilled, (state, { payload }) => {
      return {
        ...state,
        blogs: [
          ...payload.blogs.map((blog) => ({
            ...blog,
            author: blog.author,
          })),
        ],
        meta: {
          ...state.meta,
          error: '',
          isLoading: false,
        },
      };
    });
    builder.addCase(getMyBlogs.fulfilled, (state, { payload }) => {
      return {
        ...state,
        blogs: [...payload.blogs],
        meta: {
          ...state.meta,
          error: '',
          isLoading: false,
        },
      };
    });
    builder.addMatcher(
      (action) =>
        action.type.includes('createBlog/pending') ||
        action.type.includes('changeBlogStatus/pending') ||
        action.type.includes('editBlog/pending'),
      (state) => {
        return {
          ...state,
          meta: {
            ...state.meta,
            error: '',
            isLoading: true,
          },
        };
      }
    );
    // builder.addMatcher(
    //   (action) => action.type.includes('getMyBlogs/fulfilled') || action.type.includes('getBlogs/fulfilled'),
    //   (state, { payload }) => {
    //     return {
    //       ...state,
    //       blogs: [
    //         ...payload.blogs.map((blog) => ({
    //           ...blog,
    //           author: blog.author,
    //         })),
    //       ],
    //       meta: {
    //         ...state.meta,
    //         error: '',
    //         isLoading: false,
    //       },
    //     };
    //   }
    // );
    builder.addMatcher(
      (action) => action.type.includes('changeBlogStatus/fulfilled'),
      (state, { payload }) => {
        console.log('payload', payload);
        return {
          ...state,
          blogs: state.blogs.map((blog) => {
            if (blog._id !== payload.blog._id) return blog;
            return payload.blog;
          }),
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
        action.type.includes('createBlog/fulfilled') ||
        action.type.includes('getBlog/fulfilled') ||
        action.type.includes('getBlogBySlug/fulfilled') ||
        action.type.includes('editBlog/fulfilled'),
      (state, { payload }) => {
        return {
          ...state,
          author: payload.author || null,
          blog: { ...payload.blog },
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
        action.type.includes('createBlog/rejected') ||
        action.type.includes('getBlog/rejected') ||
        action.type.includes('getMyBlogs/rejected') ||
        action.type.includes('changeBlogStatus/rejected') ||
        action.type.includes('getBlogs/rejected') ||
        action.type.includes('getBlogBySlug/rejected') ||
        action.type.includes('editBlog/rejected'),
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

export default blogSlice.reducer;
