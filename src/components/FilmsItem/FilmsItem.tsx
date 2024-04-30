import { useState } from 'react';
import './FilmsItem.scss';
import { Link } from 'react-router-dom';
import { Movie } from '../../types';

const baseUrl = "https://image.tmdb.org/t/p/";
const imageSize = "w500";

const FilmsItem = ({ item }: { item: Movie }) => {
  const [itemCard, setItemCard] = useState<Movie>(item)

  return (
    <>
      <Link to={`/react-film-guide/film/${itemCard.id}`} state={itemCard}>
        <div className="item-card">
          <div className="item-card__background" style={{ backgroundImage: `url(${baseUrl}${imageSize}${itemCard.backdrop_path})` }}></div>
          <p className="item-card__title">{itemCard.title}</p>
          <p className="item-card__rating">{itemCard.vote_average.toFixed(1)}</p>
        </div >
      </Link >
    </>
  );
};

export default FilmsItem;
