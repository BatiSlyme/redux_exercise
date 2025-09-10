import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';
import { Link, useParams } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }
  return (
    <article>
      <h3>{post.title}</h3>
      <h3>{post.body}</h3>
      <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
