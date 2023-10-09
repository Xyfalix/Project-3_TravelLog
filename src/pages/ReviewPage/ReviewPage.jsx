import { useState, useEffect } from 'react';
import {
  getAllReviews,
  // removeReview,
  // updateReview,
} from '../../utilities/users-service';
import AddReviewPage from './AddReviewPage';
import { useParams } from 'react-router';

function ReviewPage({ cities, attractions }) {
  const [reviews, setReviews] = useState([]);
  const [showAddReviewPage, setShowAddReviewPage] = useState(false);
  const { cityID, attractionID } = useParams();
  const selectedCity  = cities.find((city) => city._id === cityID);
  const selectedAttraction  = attractions.find((attraction) => attraction._id === attractionID);

  const loadReviews = async () => {
    try {
      const reviewsData = await getAllReviews();
      setReviews(reviewsData.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  
  useEffect(() => {
    loadReviews();
  }, []);
  
  // const handleDeleteReview = async (id) => {
  //   try {
  //     await removeReview(id);
  //     loadReviews();
  //   } catch (error) {
  //     console.error('Error deleting review:', error);
  //   }
  // };

  // const handleEditReview = async (id, updatedText) => {
  //   try {
  //     await updateReview(id, updatedText);
  //     loadReviews();
  //   } catch (error) {
  //     console.error('Error updating review:', error);
  //   }
  // };

  return (
    <div>
      <h1>Reviews Page</h1>

      {showAddReviewPage ? (
        <AddReviewPage
          setShowAddReviewPage={setShowAddReviewPage}
          cityID={selectedCity}
          attractionID={selectedAttraction} 
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
                  <strong>Review:</strong> {review.text}<br />
                  {/* <button onClick={() => handleDeleteReview(review.id)}>
                    Delete
                  </button> */}
                  {/* <button
                    onClick={() => {
                      const updatedText = prompt('Edit the review:', review.text);
                      if (updatedText !== null) {
                        handleEditReview(review.id, updatedText);
                      }
                    }}
                  >
                    Edit
                  </button> */}
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
