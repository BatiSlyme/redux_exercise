import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsExcerp = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <h3>{post.body.substring(0, 100)}</h3>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerp;
