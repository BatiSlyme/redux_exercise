import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: 'idle', //'idle'|'loading'|'succeeded'|'failed'}
  error: null,
  count: 0,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const res = await axios.get(POSTS_URL);
    return res.data;
  } catch (error) {
    return error.message;
  }
});

export const addNewPost = createAsyncThunk(
  'posts/createPosts',
  async (initialPost) => {
    try {
      const res = await axios.post(POSTS_URL, initialPost);
      return res.data;
    } catch (error) {
      return error.message;
    }
  },
);

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  try {
    const res = await axios.delete(`${POSTS_URL}/${id}`);
    if (res.status === 200) {
      return id; // we return id because the json api does't return anything
    }
    return `${res.status}: ${res.statusText}`;
  } catch (error) {
    return error.message;
  }
});

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (error) {
      // return error.message;
      return initialPost; // if we create a new post and want to edit it ONLY FOR TESTING REDUX
    }
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      // const existingPost = state.posts.find((post) => post.id === postId);
      const existingPost = state.entities[postId];

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount(state, action) {
      state.count = state.count + 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        let min = 1;
        // adding the date and reaction
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        // add any fetched posts to the array
        // filter out posts we already have by ID
        // const existingIds = new Set(state.posts.map((p) => p.id));
        // const newPosts = loadedPosts.filter((p) => !existingIds.has(p.id));
        // state.posts = state.posts.concat(newPosts);

        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };

        // state.posts.push(action.payload);
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.error('Update could not be complete');
          console.warn(action.payload);
          return;
        }
        // const { id } = action.payload;
        // const updatedPost = {
        //   ...action.payload,
        //   date: new Date().toISOString(),
        // };
        // const posts = state.posts.filter((post) => post.id !== id);

        // state.posts = [...posts, updatedPost];
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload) {
          console.error('Delete could not be complete');
          console.warn(action.payload);
          return;
        }
        // state.posts = state.posts.filter((f) => f.id !== action.payload);
        postsAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.posts);

// export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
// export const selectPostById = (state, postId) => {
//   return state.posts.posts.find((f) => f.id === postId);
// };
export const getCount = (state) => state.posts.count;
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId),
);
export const { increaseCount, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
