import './App.css';
import AddPostForm from './features/Posts/AddPostForm';
import PostsList from './features/Posts/PostsList';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SinglePostPage from './features/Posts/SinglePostPage';
import EditPostForm from './features/Posts/EditPostForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
