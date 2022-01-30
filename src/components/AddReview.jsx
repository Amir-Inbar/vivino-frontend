import { useState } from "react";
import { useDispatch } from "react-redux";
import { authService } from "../services/auth.service";
import { reviewService } from "../services/review.service";
import { StarRate } from "./StarRate";

export const AddReview = ({ wine, close, set, rate: inRate, review }) => {
  const [id, setId] = useState(review?._id || null);
  const [rate, setRate] = useState(review?.rate || inRate);
  const [vintage, setVintage] = useState(
    review?.vintage || new Date().getFullYear()
  );
  const [description, setDescription] = useState(review?.description || "");
  const dispatch = useDispatch();
  if (!inRate) return null;
  if (inRate !== rate) setRate(inRate);

  const submit = async () => {
    if (!description) return;
    try {
      const review = id
        ? { _id: id, wineId: wine._id, vintage, rate, description }
        : { wineId: wine._id, vintage, rate, description };
      const recent = await reviewService.set(review);
      dispatch({
        type: "SET_WINE",
        wine: {
          ...wine,
          rate: (wine.rate * wine.ratings + rate) / (wine.ratings + 1),
          ratings: wine.ratings + 1,
        },
      });
      close();
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      close();
    }
  };

  const validateAndPost = () => {
    submit();
  };

  return (
    <div
      className="background-dimm full"
      onClick={close}
      onKeyDown={handleKeyDown}
    >
      <section
        className="wine-add-review"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="close-btn" onClick={close}>
          X
        </div>
        <form>
          <label>
            <span>Rate:</span>
            <StarRate
              rate={rate}
              isEditable={true}
              size={24}
              set={(rate) => set(rate)}
            />
          </label>
          <label>
            <span>Vintage:</span>
            <input
              autoFocus
              className="vintage"
              type="number"
              min={1900}
              max={new Date().getFullYear()}
              value={vintage}
              onChange={(val) => setVintage(+val.target.value)}
            ></input>
          </label>
          <label>
            <span>Description:</span>
            <textarea
              value={description}
              onChange={(val) => setDescription(val.target.value)}
              maxLength={512}
            ></textarea>
            <p className="chars-left">{512 - description.length}</p>
            {/* <p className="warning">* Description cannot be blank</p> */}
          </label>
        </form>
        <button className="submit" onClick={validateAndPost}>
          Submit
        </button>
      </section>
    </div>
  );
};
