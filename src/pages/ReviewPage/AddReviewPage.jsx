import { useState } from 'react';
import { createReview } from '../../utilities/users-service';

const AddReviewPage = ({ setShowAddReviewPage, selectedAttraction, currentUser, updateReviews }) => {
  const [newReviewText, setNewReviewText] = useState('');
  console.log(selectedAttraction._id)

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      const newReview = await createReview(selectedAttraction._id, { text: newReviewText, user: currentUser });
      updateReviews(newReview)
      setNewReviewText('');
      handleBack();
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
        <button className="btn btn-primary" type="submit">Create Review</button>
      </form>
    </div>
  </div>
  );
};

export default AddReviewPage;
