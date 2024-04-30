import { useParams } from 'react-router-dom';
import FilmsList from '../FilmsList/FilmsList';
import Header from '../Header/Header';
import './MainPage.scss';
import { SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Movie } from '../../types';
import { changeItems } from '../../store/slice/filmGuide';
import Pagination from '../Pagination/Pagination';

const MainPage = () => {
  let { sorting } = useParams();
  const [prevSorting, setPrevSorting] = useState('');
  const dispatch = useAppDispatch();
  const addNewItems = (item: Movie[]) => dispatch(changeItems(item));
  const lastViewedItems = useAppSelector((state) => state.filmGuide.lastViewedItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length >= 3) {
          return '';
        } else {
          return prevDots + '.';
        }
      });
    }, 500);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGU2NzkwM2FjYmRjYjlkMzJlMjc0MWExY2EwODUzYiIsInN1YiI6IjY2MmZjOGE1OGE4OGIyMDEyN2NlZGI1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZV_9S-DoJP4e3T_JavWQ4pkJVvaVsWS0lkgY2CRKw2w'
      }
    };

    if (sorting !== 'last_viewed') {
      setIsLoading(true);
      fetch(`https://api.themoviedb.org/3/movie/${sorting}?language=en-US&page=${currentPage}'`, options)
        .then(response => response.json())
        .then(response => {
          addNewItems(response.results)
          setTotalPages(response.total_pages)
          setTimeout(() => setIsLoading(false), 500);
        })
        .catch(err => console.error(err));
    } else {
      addNewItems(lastViewedItems);
    }

    setPrevSorting(sorting!);

    return () => clearInterval(intervalId);
  }, [sorting, currentPage])

  useEffect(() => {
    if (sorting !== prevSorting) {
      setCurrentPage(1);
    }
  }, [sorting, prevSorting]);

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="wrapper">
        <Header mainPage={true} />
        {isLoading ? <span className="loading">Loading{dots}</span> : <FilmsList />}
        {sorting !== 'last_viewed' && <div className={isLoading ? "disable" : ""}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>}
      </div>
    </>
  );
};

export default MainPage;
