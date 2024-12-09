import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { searchPhotos } from "./api/images";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Empty from "./components/Empty/Empty";
import ImageModal from "./components/ImageModal/ImageModal";
import Modal from "react-modal";

Modal.setAppElement("#root");

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  async function handleSubmit(searchQuery) {
    try {
      if (searchQuery === query) {
        return;
      }

      setQuery(searchQuery);
      setNextPage(1);
      setPhotos([]);
      setError(false);
      setLoading(true);

      const data = await searchPhotos({ query: searchQuery, page: nextPage });
      setPhotos(data.results);

      if (data.total_pages > 1) {
        setHasNextPage(true);
        setNextPage(nextPage + 1);
      } else {
        setHasNextPage(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleLoadMore() {
    try {
      setLoading(true);
      const data = await searchPhotos({ query, page: nextPage });
      setPhotos([...photos, ...data.results]);

      if (data.total_pages > nextPage) {
        setHasNextPage(true);
        setNextPage(nextPage + 1);
      } else {
        setHasNextPage(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function openModal(image) {
    setModalIsOpen(true);
    setModalImage(image);
  }

  return (
    <div>
      <ImageModal
        image={modalImage}
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
      <SearchBar onSubmit={handleSubmit} />
      {photos.length > 0 && (
        <ImageGallery images={photos} onClick={openModal} />
      )}
      {photos.length > 0 && !loading && hasNextPage && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {photos.length === 0 && !loading && <Empty />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
};

export default App;
