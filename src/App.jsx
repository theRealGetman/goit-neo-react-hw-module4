import { useEffect, useState } from "react";
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
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    async function search() {
      try {
        if (!query) {
          return;
        }

        setLoading(true);
        setError(false);

        const data = await searchPhotos({
          query: query,
          page: page,
        });
        setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
        setHasNextPage(data.total_pages > page);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [query, page]);

  function handleQueryChange(searchQuery) {
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setPage(1);
      setPhotos([]);
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
      <SearchBar onSubmit={handleQueryChange} />
      {photos.length > 0 && (
        <ImageGallery images={photos} onClick={openModal} />
      )}
      {photos.length > 0 && !loading && hasNextPage && (
        <LoadMoreBtn onClick={() => setPage(page + 1)} />
      )}
      {photos.length === 0 && !loading && <Empty />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
};

export default App;
