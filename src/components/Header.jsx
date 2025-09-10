import { Link } from 'react-router-dom';

const Header = () => {
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
