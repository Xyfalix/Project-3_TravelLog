import { useState } from "react";
import AttractionCard from "../../components/AttractionCard/AttractionCard";

export default function BucketListPage({ user, attractions, setAttractions }) {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const attractionsToDisplay = attractions.slice(startIndex, endIndex);

  const totalPages = Math.ceil(attractions.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1 className="flex justify-center mt-8 text-2xl text-white font-semibold">
        {user.name}&apos;s Bucket List
      </h1>
      <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mx-2">
        {attractionsToDisplay.map((attraction) => (
          <AttractionCard
            key={attraction._id}
            attraction={attraction}
            attractions={attractions}
            setAttractions={setAttractions}
          />
        ))}
      </div>
      <div className="flex justify-center my-5">
        <button
          className="btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn ${index + 1 === currentPage ? "btn-accent" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            Page {index + 1}
          </button>
        ))}
        <button
          className="btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
