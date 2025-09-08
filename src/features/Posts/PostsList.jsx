import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from './postsSlice';
import { useEffect, useMemo } from 'react';
import PostsExcerp from './PostsExcerp';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  useEffect(() => {
    console.log('posts changed');
  }, [posts]);

  const content = useMemo(() => {
    if (postsStatus === 'loading') {
      return <p>Loading...</p>;
    } else if (postsStatus === 'succeeded') {
      const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

      return orderedPosts.map((p) => <PostsExcerp post={p} key={p.id} />);
    } else if (postsStatus === 'failed') {
      return <p>{error}</p>;
    }
  }, [error, posts, postsStatus]);

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
