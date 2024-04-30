import './FilmsList.scss';
import { useAppSelector } from '../../hooks/redux';
import FilmsItem from '../FilmsItem/FilmsItem';

const FilmsList = () => {

  const itemList = useAppSelector((state) => state.filmGuide.items);

  return (
    <>
      <div className="films-list">
        {
          itemList.length !== 0
            ? (itemList.map((item) =>
              (<FilmsItem key={item.id} item={item} />)
            ))
            : (<span className="films-list__empty">The film list is empty</span>)
        }
      </div >
    </>
  );
};

export default FilmsList;
