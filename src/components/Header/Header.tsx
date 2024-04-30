import './Header.scss';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const Header = ({ mainPage }: { mainPage: boolean }) => {
  const navList = useAppSelector((state) => state.filmGuide.navItems);

  return (
    <>
      <div className="header">
        <a href="/react-film-guide/" className="logo">
          Film Guide
        </a>
        {mainPage && (<nav className="nav">
          <ul className="nav-list">
            {
              navList?.map((elem) =>
              (<li key={elem.name} className="nav-item">
                <NavLink to={`/react-film-guide/${elem.link}`}>{elem.name}</NavLink>
              </li>)
              )
            }
          </ul>
        </nav>)
        }
      </div >
    </>
  );
};

export default Header;
