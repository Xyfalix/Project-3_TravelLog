import { useEffect, useState } from 'react';
import AddReviewPage from './AddReviewPage';
import { useParams } from 'react-router';
import {removeReview, updateReview} from '../../utilities/users-service'; 

function ReviewPage({ cities, user }) {
  const [reviews, setReviews] = useState([]);
  const [showAddReviewPage, setShowAddReviewPage] = useState(false);  
  const [updatedReviewText, setUpdatedReviewText] = useState("");
  const [editReviewId, setEditReviewId] = useState("")
  const { cityId, attractionId } = useParams();
  
  const selectedCity = cities?.find((city) => city._id === cityId);
  const selectedAttraction  = selectedCity?.attractions?.find((attraction) => attraction._id === attractionId);
  const currentUser = user._id;
  console.log(cities)
  console.log(selectedCity)
  console.log(selectedAttraction)
  console.log(cityId)
  console.log(attractionId)
  console.log(user._id)
  
  const updateReviews = (newReview) => {
    setReviews([...reviews, newReview])
  }


  useEffect(() => {
    if (selectedAttraction) {
      setReviews(selectedAttraction.reviews);
    }
  }, [selectedAttraction]);

  const handleDeleteReview = async (reviewId) => { //subject to changes after the backend is added
    try {
      await removeReview(reviewId);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleEditReview = (reviewId) => { //subject to changes after the backend is added
    setEditReviewId(reviewId);
  };

  const handleConfirmEdit = async (reviewId, updatedText) => { //subject to changes after the backend is added
    try {
      await updateReview(reviewId, updatedText);
      setReviews(selectedAttraction.reviews);
      setEditReviewId(null);
      setUpdatedReviewText("");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div>
      <h1 className="flex justify-center">Reviews Page</h1>
          {/* <div className="card mt-8 w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt={attraction.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Attraction Name: {attraction.name}</h2>
            <p>Attraction Description: {attraction.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Remove from list</button>
            </div>
          </div>
        </div> */}

      {showAddReviewPage ? (
        <AddReviewPage
          setShowAddReviewPage={setShowAddReviewPage}
          selectedCity={selectedCity}
          selectedAttraction={selectedAttraction}
          updateReviews={updateReviews}
          currentUser={currentUser}
        />
      ) : (
        <div>
          <div>
            <h2>Reviews</h2>
            <button onClick={() => setShowAddReviewPage(true)}>
              Add Review
            </button>
            <ul>
              {reviews.map((review) => (
                <li key={review._id}>
                  {editReviewId === review._id ? (
                    <>
                      <input
                        type="text"
                        value={updatedReviewText}
                        onChange={(e) => setUpdatedReviewText(e.target.value)}
                      />
                      <button onClick={() => handleConfirmEdit(review._id, updatedReviewText)}>
                        Confirm
                      </button>
                    </>
                  ) : (
                    <>
                      <strong>Review:</strong> {review.text} <br />
                      <button onClick={() => handleDeleteReview(review._id)}>
                        Delete
                      </button>
                      <button onClick={() => handleEditReview(review._id)}>
                        Edit
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
