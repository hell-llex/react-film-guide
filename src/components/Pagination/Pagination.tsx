import './Pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
  let startPage = Math.max(currentPage - 1, 1);
  let endPage = Math.min(startPage + 2, totalPages);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="pagination">
      <button className="prevButton" onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
        -
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button className="nextButton" onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
        +
      </button>
    </div>
  );
};

export default Pagination;
