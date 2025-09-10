import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCount, increaseCount } from '../features/Posts/postsSlice';

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  return (
    <header className="Header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/" style={{ color: 'white' }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="post" style={{ color: 'white' }}>
              Post
            </Link>
          </li>
          <li>
            <Link to={'user'}>Users</Link>
          </li>
          <button onClick={() => dispatch(increaseCount())}>{count}</button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
