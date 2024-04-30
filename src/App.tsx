import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import MainPage from './components/MainPage/MainPage';
import FilmPage from './components/FilmPage/FilmPage';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/react-film-guide/popular`} replace />}
        />
        <Route
          path="/react-film-guide"
          element={<Navigate to={`/react-film-guide/popular`} replace />}
        />
        <Route
          path="/react-film-guide/:sorting"
          element={<MainPage />}
        />
        <Route
          path="/react-film-guide/film/:id"
          element={<FilmPage />}
        />
        <Route
          path="*"
          element={<Navigate to={`/react-film-guide/popular`} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
