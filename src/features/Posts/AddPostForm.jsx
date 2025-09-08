import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';
import { selectAllUsers } from '../Users/usersSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const users = useSelector(selectAllUsers);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const addNewPost = () => {
    if (title && content && userId) {
      dispatch(postAdded(title, content, userId));
    }
    setTitle('');
    setContent('');
  };

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>
        <button type="button" onClick={addNewPost}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
