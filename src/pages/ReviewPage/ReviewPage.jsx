import { useEffect, useState } from 'react';
import AddReviewPage from './AddReviewPage';
import { useParams } from 'react-router';
import {getAllReviews, removeReview, updateReview} from '../../utilities/users-service'; 
import  Rating from 'react-rating-stars-component' ;

function ReviewPage({ attractions, user }) {
  const [reviews, setReviews] = useState([]);
  const [showAddReviewPage, setShowAddReviewPage] = useState(false);  
  const [updatedReviewText, setUpdatedReviewText] = useState("");
  const [editReviewId, setEditReviewId] = useState("")
  const { attractionId } = useParams();
  const selectedAttraction = attractions?.find((attraction) => attraction._id === attractionId);
  const currentUser = user._id;
  const [updatedRating, setUpdatedRating] = useState(0);
  const [showMore, setShowMore] = useState(false);
  

  const updateReviews = (newReview) => {
    setReviews([...reviews, newReview])
  }

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

  const handleReviewAdded = async () => {
    try {
      const reviews = await getAllReviews(selectedAttraction._id);
      setReviews(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => { 
    try {
      await removeReview(selectedAttraction._id, reviewId);
      setReviews(reviews?.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleEditReview = (reviewId) => { 
    setEditReviewId(reviewId);
  };


const handleConfirmEdit = async (reviewId, updatedText) => {
  try {

    if (updatedRating < 1 || updatedRating > 5) {
      console.error('Invalid rating:', updatedRating);
      return;
    }

    await updateReview(selectedAttraction._id, reviewId, updatedText, updatedRating);
    const updatedReviews = await getAllReviews(selectedAttraction._id);
    setReviews(updatedReviews);
    setEditReviewId(null);
    setUpdatedReviewText('');
  } catch (error) {
    console.error('Error updating review:', error);
  }
};

const handleCancelEdit = () => {
  setUpdatedReviewText('');
  setUpdatedRating(0);
  setEditReviewId(null);
};
  
  return (
    <div className="flex justify-center">
      {showAddReviewPage ? (
        <AddReviewPage
          setShowAddReviewPage={setShowAddReviewPage}
          selectedAttraction={selectedAttraction}
          updateReviews={updateReviews}
          currentUser={currentUser}
          onReviewAdded={handleReviewAdded}
        />
      ) : (
        <div>
          <div>
          <h1>Reviews Page</h1>
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
                        <Rating
                          count={5}
                          size={24}
                          value={updatedRating}
                          onChange={(updatedRating) => setUpdatedRating(updatedRating)}
                        />
                        <button className="btn btn-primary" onClick={() => handleConfirmEdit(review._id, updatedReviewText)}>
                          Confirm
                        </button>
                        <button className="btn btn-secondary" onClick={() => handleCancelEdit(review._id)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                      <div>
                        <strong>{review.user.name}</strong>
                        <h6>
                          {showMore ? review.text : `${review.text.substring(0, 250)}`}
                          <button className="btn btn-xs" onClick={() => setShowMore(!showMore)}>
                            {showMore ? 'Show less' : 'Show more'}
                          </button>
                        </h6>
                        <Rating
                            count={5}
                            size={24} 
                            value={review.rating} 
                            edit={false} 
                          />
                        <br />
                          {currentUser === review.user._id && (
                            <>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleDeleteReview(review._id)}
                              >
                                Delete
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleEditReview(review._id)}
                              >
                                Edit
                              </button>
                            </>
                          )}
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
