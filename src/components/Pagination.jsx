import React, { useEffect } from "react";
import Button from "../layout/Button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange((prev) => prev + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <Button
        onClick={handlePrev}
        isDisabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
      >
        Prev
      </Button>
      <span className="px-4 text-lg font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={handleNext}
        isDisabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
