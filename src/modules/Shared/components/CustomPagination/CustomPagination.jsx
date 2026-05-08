import React from "react";

export default function CustomPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="pagination-wrapper d-flex justify-content-md-end justify-content-center my-4 ">
      {" "}
      <nav>
        <ul className="pagination mb-0">
          {/* Previous */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
          </li>

          {/* First Page */}
          <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(1)}>
              1
            </button>
          </li>

          {/* Left dots */}
          {currentPage > 3 && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}

          {/* Middle Pages */}
          {[...Array(totalPages)]
            .map((_, index) => index + 1)
            .filter(
              (page) =>
                page !== 1 &&
                page !== totalPages &&
                page >= currentPage - 1 &&
                page <= currentPage + 1,
            )
            .map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}

          {/* Right dots */}
          {currentPage < totalPages - 2 && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}

          {/* Last Page */}
          {totalPages > 1 && (
            <li
              className={`page-item ${
                currentPage === totalPages ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          )}

          {/* Next */}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
