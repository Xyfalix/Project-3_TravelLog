import { useState } from 'react';
import { createReview } from '../../utilities/reviews-service';

const AddReviewPage = ({ setShowAddReviewPage }) => {
  const [newReviewText, setNewReviewText] = useState('');

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      await createReview({ text: newReviewText });
      setNewReviewText('');
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const handleBack = () => {
    setShowAddReviewPage(false);
  };

  return (
    <div>
      <h2>Add Review</h2>
      <button onClick={handleBack}>Back to Reviews</button>
      <form onSubmit={handleCreateReview}>
        <label>Review Text:</label>
        <textarea
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
          required
        />
        <button type="submit">Create Review</button>
      </form>
    </div>
  );
};

export default AddReviewPage;
