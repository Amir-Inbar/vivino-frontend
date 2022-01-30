import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reviewService } from "../services/review.service";
import { StarRate } from "./StarRate";

export const AddReview = ({ wine, close, set, rate: inRate, reviews }) => {
  const [id, setId] = useState(null);
  const [rate, setRate] = useState(inRate);
  const [vintage, setVintage] = useState(new Date().getFullYear());
  const [description, setDescription] = useState("");
  const [review, setReview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reviews) return;
    if (!vintage) setReview(null);
    else setReview(reviews.find((review) => review.vintage === vintage));
  }, [vintage]);

  useEffect(() => {
    if (review) {
      setDescription(review.description);
      setRate(review.rate);
      setId(review._id);
    } else if (id) {
      setDescription("");
      setId(null);
    }
  }, [review]);

  if (!inRate) return null;
  if (inRate !== rate) setRate(inRate);
  window.scrollTo(0, 0);

  const submit = async () => {
    if (!description || !vintage) return;
    try {
      const sendReview = {
        wineId: wine._id,
        vintage,
        rate,
        description,
      };
      const recent = await reviewService.set(
        id ? { _id: id, ...sendReview } : sendReview
      );
      dispatch({
        type: "SET_WINE",
        wine: {
          ...wine,
          rate: id
            ? (wine.rate * wine.ratings - review.rate + rate) / wine.ratings
            : (wine.rate * wine.ratings + rate) / (wine.ratings + 1),
          ratings: id ? wine.ratings : wine.ratings + 1,
        },
      });
      close(recent);
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
            <StarRate rate={rate} isEditable={true} size={24} set={set} />
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
            <p className="chars-left">{512 - description?.length}</p>
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
