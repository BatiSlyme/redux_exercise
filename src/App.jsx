import './App.css';
import AddPostForm from './features/Posts/AddPostForm';
import PostsList from './features/Posts/PostsList';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SinglePostPage from './features/Posts/SinglePostPage';
import EditPostForm from './features/Posts/EditPostForm';
import UserPage from './features/Users/UserPage';
import UsersList from './features/Users/UsersList';

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

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />}></Route>
        </Route>

        {/* Catch all unexistinng pages => navigate to home page if page doesn't exist */}
        <Route path="*" element={<Navigate to={'/'} replace />} />
      </Route>
    </Routes>
  );
}

export default App;
