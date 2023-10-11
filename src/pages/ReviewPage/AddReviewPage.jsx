import { useState } from 'react';
import { createReview } from '../../utilities/users-service';
import Rating from 'react-rating-stars-component'

const AddReviewPage = ({ setShowAddReviewPage, selectedAttraction, currentUser, updateReviews, onReviewAdded }) => {
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [ratingErrorMessage, setRatingErrorMessage] = useState('');
  console.log(newRating)

  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (newRating === 0) {
      setRatingErrorMessage('Don\'t forget to rate (1-5 stars)');
      return;
    }
    try {
      setRatingErrorMessage('');
      const newReview = await createReview(selectedAttraction._id, { text: newReviewText, rating: newRating, user: currentUser }); 
      updateReviews(newReview)
      setNewReviewText('');
      setNewRating(0);
      handleBack();

      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const handleBack = () => {
    setShowAddReviewPage(false);
  };

  return (
  <div className="flex justify-center">
    <div className="card-body">
      <h2 className="card-title">Add Review</h2>
      <div>
        <button className="btn btn-primary" onClick={handleBack}>Back to Reviews</button>
      </div>
      <form onSubmit={handleCreateReview}>
        <label>Review Text:</label>
        <br />
        <textarea
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
          required
        />
        <br />
        <label>Rating:</label>
          <br />
          <Rating
            count={5}
            size={30}
            value={newRating}
            onChange={(newRating) => setNewRating(newRating)}
            required
          />
          {newRating === 0 && (
            <p className="text-red-500">{ratingErrorMessage}</p>
          )}
          <br />
        <button className="btn btn-primary" type="submit">Create Review</button>
      </form>
    </div>
  </div>
  );
};

export default AddReviewPage;
