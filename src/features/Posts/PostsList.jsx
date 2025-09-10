import { useSelector } from 'react-redux';
import { getPostsError, getPostsStatus, selectPostIds } from './postsSlice';
import { useMemo } from 'react';
import PostsExcerp from './PostsExcerp';

const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const content = useMemo(() => {
    if (postsStatus === 'loading') {
      return <p>Loading...</p>;
    } else if (postsStatus === 'succeeded') {
      return orderedPostIds.map((p) => <PostsExcerp postId={p} key={p} />);
    } else if (postsStatus === 'failed') {
      return <p>{error}</p>;
    }
  }, [error, orderedPostIds, postsStatus]);

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
