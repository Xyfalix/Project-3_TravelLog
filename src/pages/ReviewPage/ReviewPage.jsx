import { useState, useEffect } from 'react';
import {
  getAllReviews,
  removeReview,
  updateReview,
} from '../../utilities/reviews-service';
import AddReviewPage from './AddReviewPage';

function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [showAddReviewPage, setShowAddReviewPage] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const reviewsData = await getAllReviews();
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await removeReview(id);
      loadReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleEditReview = async (id, updatedText) => {
    try {
      await updateReview(id, updatedText);
      loadReviews();
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <div>
      <h1>Reviews Page</h1>

      {showAddReviewPage ? (
        <AddReviewPage
          setShowAddReviewPage={setShowAddReviewPage}
          loadReviews={loadReviews}
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
                <li key={review.id}>
                  <strong>Review:</strong> {review.text}<br />
                  <button onClick={() => handleDeleteReview(review.id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      const updatedText = prompt('Edit the review:', review.text);
                      if (updatedText !== null) {
                        handleEditReview(review.id, updatedText);
                      }
                    }}
                  >
                    Edit
                  </button>
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
