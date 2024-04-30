import { useParams } from 'react-router-dom';
import './FilmPage.scss';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import { Movie, MovieInfo } from '../../types';
import { useAppDispatch } from '../../hooks/redux';
import { addItemsLastViewed } from '../../store/slice/filmGuide';

const baseUrl = "https://image.tmdb.org/t/p/";
const imageSize = "original";

const FilmPage = () => {
  let { id } = useParams();
  const [movieInfo, setMovieInfo] = useState<MovieInfo>()
  const [dots, setDots] = useState('');
  const dispatch = useAppDispatch();
  const addNewItemsLastViewed = (item: Movie) => dispatch(addItemsLastViewed(item));


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

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        setMovieInfo(response);
        addNewItemsLastViewed(response);
      })
      .catch(err => console.error(err));

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header mainPage={false} />
        <div className="film-page">
          {!movieInfo ? (<span className="loading">Loading{dots}</span>) :
            (<>
              <div className="film-page__title-container">
                <div className="film-page__title-info">
                  <p className="film-page__title">{movieInfo.title} <span>({movieInfo.release_date.split('-')[0]})</span></p>
                  <p className="film-page__subtitle">
                    <span className="film-page__rating">{movieInfo.vote_average.toFixed(1)}</span> - {movieInfo.genres.map((genre) => genre.name).join(', ')} - <span>{movieInfo.release_date.split('-').reverse().join('.')}</span> - {movieInfo.runtime} min
                  </p>

                </div>
                <img
                  className='film-page__poster'
                  src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
                  alt="film poster"
                />
                <div className="film-page__background" style={{ backgroundImage: `url(${baseUrl}${imageSize}${movieInfo.backdrop_path})` }}></div>
              </div>
              <div className="film-page__info">
                <p className="film-page__tagline">{movieInfo.tagline}</p>
                <p><span>Overview: </span> <br /> {movieInfo.overview}</p>
                <p><span>Status: </span>{movieInfo.status}</p>
                <p><span>Production companies: </span>{movieInfo.production_companies.map((company) => company.name).join(', ')}</p>
                <p><span>Production countries: </span>{movieInfo.production_countries.map((country) => country.name).join(', ')}</p>
                <p><span>Spoken languages: </span>{movieInfo.spoken_languages.map((language) => language.name).join(', ')}</p>
              </div>
            </>)}
        </div>
      </div>
    </>
  );
};

export default FilmPage;
