import css from "./ImageCard.module.css";

function ImageCard({ image, onClick }) {
  return (
    <li>
      <div className={css.card} onClick={onClick}>
        <img src={image.urls.small} alt={image.alt_description} />
      </div>
    </li>
  );
}

export default ImageCard;
