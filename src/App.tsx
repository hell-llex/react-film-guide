import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/react-film-guide/`} replace />}
        />
        <Route
          path="/react-film-guide/"
          element={<div className="wrapper"></div>}
        />
        <Route
          path="/react-film-guide/film"
          element={<></>}
        />
      </Routes>
    </>
  );
}

export default App;
