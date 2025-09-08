import './App.css';
import AddPostForm from './features/Posts/AddPostForm';
import Counter from './features/Counter/Counter';
import PostsList from './features/Posts/PostsList';

function App() {
  return (
    <>
      <Counter />
      <PostsList />
      <AddPostForm />
      <h1 style={{ color: 'red', fontWeight: 'bold' }}>DENI IS A GOOD GIRL</h1>
    </>
  );
}

export default App;
