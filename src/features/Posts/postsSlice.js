import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
// import axios from 'axios';

// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '2',
    title: 'Slices...',
    content: 'The more I say slice, the more I want pizza.',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

// const initialState = {
//   posts: [],
//   status: 'idle', //'idle'|'loading'|'succeeded'|'failed'}
//   error: null,
// };

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//   try {
//     const res = await axios.get(POSTS_URL);
//     return [...res.data];
//   } catch (error) {
//     return error.message;
//   }
// });

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload); // uses immer under the hood - > creates new state underneath
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchPosts.pending, (state, action) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(fetchPosts.fulfilled, (state, action) => {
  //       state.status = 'succeeded';
  //       let min = 1;
  //       // adding the date and reaction
  //       const loadedPosts = action.payload.map((post) => {
  //         post.date = sub(new Date(), { minutes: min++ }).toDateString();
  //         post.reactions = {
  //           thumbsUp: 0,
  //           wow: 0,
  //           heart: 0,
  //           rocket: 0,
  //           coffee: 0,
  //         };
  //         return post;
  //       });

  //       //add any fetched posts to the array
  //       state.posts = state.posts.concat(loadedPosts); // we can concat because of immer
  //     })
  //     .addCase(fetchPosts.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.error = action.error.message;
  //     });
  // },
});

export const selectAllPosts = (state) => state.posts.posts;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
