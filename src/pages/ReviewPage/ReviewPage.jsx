import { useEffect, useState } from 'react';
import AddReviewPage from './AddReviewPage';
import { useParams } from 'react-router';
import {getAllReviews, removeReview, updateReview} from '../../utilities/users-service'; 

function ReviewPage({ attractions, user }) {
  const [reviews, setReviews] = useState([]);
  const [showAddReviewPage, setShowAddReviewPage] = useState(false);  
  const [updatedReviewText, setUpdatedReviewText] = useState("");
  const [editReviewId, setEditReviewId] = useState("")
  const { attractionId } = useParams();
  const selectedAttraction = attractions?.find((attraction) => attraction._id === attractionId);
  const currentUser = user._id;
  console.log(selectedAttraction)
  

  const updateReviews = (newReview) => {
    setReviews([...reviews, newReview])
  }

console.log(reviews)
  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviews = await getAllReviews(attractionId);
        setReviews(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    if (selectedAttraction) {
      fetchReviews();
    }
  }, [attractionId, selectedAttraction]);

  const handleDeleteReview = async (reviewId) => { 
    try {
      await removeReview(selectedAttraction._id, reviewId);
      setReviews(reviews?.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleEditReview = (reviewId) => { //subject to changes after the backend is added
    setEditReviewId(reviewId);
  };

  const handleConfirmEdit = async (reviewId, updatedText) => {
    try {
      await updateReview(selectedAttraction._id, reviewId, updatedText);
      const updatedReviews = await getAllReviews(selectedAttraction._id);
      setReviews(updatedReviews);
      setEditReviewId(null);
      setUpdatedReviewText("");
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };
  
  return (
    <div className="flex justify-center">
      <h1>Reviews Page</h1>

      {showAddReviewPage ? (
        <AddReviewPage
          setShowAddReviewPage={setShowAddReviewPage}
          selectedAttraction={selectedAttraction}
          updateReviews={updateReviews}
          currentUser={currentUser}
        />
      ) : (
        <div>
          <div>
            <button className="btn btn-primary" onClick={() => setShowAddReviewPage(true)}>
              Add Review
            </button>
              <div >
                {reviews.map((review) => (
                  <div key={review._id} className="card mt-8 w-96 bg-base-100 shadow-xl">
                    {editReviewId === review._id ? (
                      <>
                        <input
                          type="text"
                          value={updatedReviewText}
                          onChange={(e) => setUpdatedReviewText(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={() => handleConfirmEdit(review._id, updatedReviewText)}>
                          Confirm
                        </button>
                      </>
                    ) : (
                      <>
                      <div>
                        <strong>Review:</strong>
                        <p>{review.text}</p>
                        <br />
                        <button className="btn btn-primary" onClick={() => handleDeleteReview(review._id)}>
                          Delete
                        </button>
                        <button className="btn btn-primary" onClick={() => handleEditReview(review._id)}>
                          Edit
                        </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
          </div>
      </div>
    )}
  </div>
)}

export default ReviewPage;
