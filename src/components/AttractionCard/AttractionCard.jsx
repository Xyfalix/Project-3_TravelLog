import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  removeAttractionFromBucketList,
  ImageDisplay,
  updateAttraction,
} from "../../utilities/users-service";

const AttractionCard = ({ setAttractions, attractions, attraction }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRemoveAttractionFromBucketList = async () => {
    // Trigger the confirmation modal
    setShowConfirmationModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const confirmRemoveAttraction = async () => {
    setShowConfirmationModal(false);
    try {
      await removeAttractionFromBucketList(attraction._id);
      if (attractions) {
        const updatedAttractions = attractions.filter(
          (item) => item._id !== attraction._id
        );
        setAttractions(updatedAttractions);
        // Trigger the ShowSuccessModal
        setShowSuccessModal(true);
        // Automatically close the success modal after 2 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
      }
      // Show the success modal
    } catch (error) {
      console.error("Error removing attraction from bucket list:", error);
    }
  };

  const toggleVisitAttraction = async () => {
    try {
      const updatedAttraction = await updateAttraction(attraction._id, {
        visited: !attraction.visited,
      });
      if (updatedAttraction) {
        const updatedAttractions = attractions.map((item) =>
          item._id === updatedAttraction._id ? updatedAttraction : item
        );
        setAttractions(updatedAttractions);
      }
    } catch (error) {
      console.error(
        "Error updating the attraction in your bucket list:",
        error
      );
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 h-50">
      <div className="card card-compact mt-8 w-96 bg-gray-700">
        <figure className="w-full h-64 relative">
          <img src={ImageDisplay(attraction.image)} alt={attraction.name} />
        </figure>
        <div className="card-body">
          <h2 className="text-center text-xl text-info font-semibold">{attraction.name}</h2>
          <div className="flex justify-end inline-text">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text justify-end mx-1 text-green-400">Visited?</span>
                <input
                  type="checkbox"
                  checked={attraction.visited}
                  onChange={toggleVisitAttraction}
                  className="checkbox checkbox-success"
                />
              </label>
            </div>
          </div>
          <p className="text-justify">
            {showFullDescription
              ? attraction.description
              : attraction.description.length > 200
              ? `${attraction.description.substring(0, 200)}...`
              : attraction.description}
            {attraction.description.length > 200 && (
              <span className="m-2 text-blue-400">
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Less" : "More"}
                </button>
              </span>
            )}
          </p>
          <div className="flex justify-between">
            <div>
              <button
                onClick={() =>
                  navigate(`/bucketlist/${attraction._id}/reviews`)
                }
                className="btn btn-warning btn-sm"
              >
                Reviews
              </button>
            </div>
            <div>
              <button
                onClick={handleRemoveAttractionFromBucketList}
                className="btn btn-accent btn-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal" open={showConfirmationModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Removal</h3>
          <p>
            {" "}
            Are you sure you want to remove this attraction from your bucket
            list?{" "}
          </p>
          <div className="modal-action">
            <button
              onClick={confirmRemoveAttraction}
              className="btn btn-primary"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal" open={showSuccessModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Attraction removed!</h3>
          <p>
            The attraction has been sucessfully removed from your bucket list.
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* Button to close the modal */}
              <button className="btn" onClick={handleCloseSuccessModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AttractionCard;
