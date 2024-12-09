import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

function ImageGallery({ images, onClick }) {
  return (
    <ul className={css.imageGallery}>
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onClick={() => onClick(image)}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
