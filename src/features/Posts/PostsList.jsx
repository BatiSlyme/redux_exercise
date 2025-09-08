import { useSelector } from 'react-redux';
import { selectAllPosts } from './postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPosts.map((p) => (
    <article key={p.id}>
      <h3>{p.title}</h3>
      <h3>{p.content.substring(0, 100)}</h3>
      <PostAuthor userId={p.userId} />
      <TimeAgo timestamp={p.date} />
      <ReactionButtons post={p} />
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  );
};

export default PostsList;
