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
  const [deleteReviewId, setDeleteReviewId] = useState("");
  const [editReviewError, setEditReviewError] = useState("")

  

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

  const handleDeleteReview = (reviewId) => {
    setDeleteReviewId(reviewId);
  };
  

  const handleConfirmDelete = async (reviewId) => { 
    try {
      await removeReview(selectedAttraction._id, reviewId);
      setReviews(reviews?.filter((review) => review._id !== reviewId));
      setDeleteReviewId("");
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteReviewId("");
  };
  


  const handleEditReview = (reviewId) => { 
    setEditReviewId(reviewId);
    setEditReviewError(""); 
  };


  const handleConfirmEdit = async (reviewId, updatedText) => {
    if (updatedText.trim() === "") {
      setEditReviewError("Please fill in the review text.");
      return;
    }
  
    if (updatedRating < 1 || updatedRating > 5) {
      setEditReviewError('Don\'t forget to rate (1-5 stars)');
      return;
    }
  
    try {
      await updateReview(selectedAttraction._id, reviewId, updatedText, updatedRating);
      const updatedReviews = await getAllReviews(selectedAttraction._id);
      setReviews(updatedReviews);
      setEditReviewId(null);
      setUpdatedReviewText("");
      setEditReviewError(""); 
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };
  

const handleCancelEdit = () => {
  setUpdatedReviewText('');
  setUpdatedRating(0);
  setEditReviewId(null);
};

const toggleExpandReview = (reviewId) => {
  setReviews((prevReviews) => {
    return prevReviews.map((review) => {
      if (review._id === reviewId) {
        return { ...review, expanded: !review.expanded };
      }
      return review;
    });
  });
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
          <h1 className="flex justify-center mt-8 text-2xl mb-4">Review Page</h1>
          <div className="flex justify-center"> 
            <button className="btn btn-accent btn-xl mb-6" onClick={() => setShowAddReviewPage(true)}>
              Add Review
            </button>
            </div>
              <div>
              {reviews.length === 0 ? (
                <div className="text-center mt-4 text-gray-500">
                <p className="text-xl">No reviews at the moment, feel free to add a review now!</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="card card-compact mt-8 w-96 bg-gray-700 shadow-xl mb-4">
                    {review.image && (
                      <figure className="w-full"><img src={review.image} alt="Review Image" className="w-full"/></figure>
                    )}
                    {deleteReviewId === review._id ? (
                      <div>
                        <p className='mx-9 mt-2'>Are you sure you want to delete this review?</p>
                        <div className="flex justify-between mt-4 mb-4">
                          <button className="btn btn-accent btn-sm ml-5" onClick={handleCancelDelete}>
                            Cancel
                          </button>
                          <button className="btn btn-accent btn-sm mr-5" onClick={() => handleConfirmDelete(review._id)}>
                            Confirm
                          </button>
                        </div>
                      </div>
                    ) : editReviewId === review._id ? (
                      <>
                        <textarea className="textarea textarea-bordered textarea-lg w-fullmax-w-xs mb-2" 
                          type="text"
                          placeholder="Type here..."
                          value={updatedReviewText}
                          onChange={(e) => setUpdatedReviewText(e.target.value)}
                        />
                        <div className="mx-5">
                          <Rating
                            count={5}
                            size={24}
                            value={updatedRating}
                            onChange={(updatedRating) => setUpdatedRating(updatedRating)}
                          />
                          {editReviewError && (
                            <div className="text-red-500 mb-4">{editReviewError}</div>
                          )}
                        </div>
                        <div className="flex justify-between mb-4">
                          <button className="btn btn-warning btn-sm ml-5" onClick={() => handleCancelEdit(review._id)}>
                            Cancel
                          </button>
                          <button className="btn btn-accent btn-sm mr-5" onClick={() => handleConfirmEdit(review._id, updatedReviewText)}>
                            Confirm
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                      <div className="mx-5">
                        <h2 className="text-lg text-info mt-4 font-bold">{review.user.name}</h2>
                        <h6 className="text-justify">
                          {review.text.length <= 70 || review.expanded ? review.text : `${review.text.substring(0, 70)}...`}
                            {review.text.length > 70 && (
                              <span className="m-2 text-blue-400">
                              <button
                                onClick={() => toggleExpandReview(review._id)}
                              >
                                {review.expanded ? ' Less' : ' More'}
                              </button>
                              </span>
                            )}
                          </h6>
                        <Rating 
                            count={5}
                            size={24} 
                            value={review.rating} 
                            edit={false} 
                          />
                        <br />
                          {currentUser === review.user._id && (
                            <div className="flex justify-between mb-4">
                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() => handleDeleteReview(review._id)}
                              >
                                Delete
                              </button>
                              <button
                                className="btn btn-accent btn-sm"
                                onClick={() => handleEditReview(review._id)}
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  ))
                )}
              </div>
          </div>
      </div>
    )}
  </div>
)}


export default ReviewPage;
