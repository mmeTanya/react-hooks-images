import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Loading from '../Loading';
import Modal from '../Modal';
import { FetchImages } from 'services/api';
import './ImageGallery.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
let activeImage = null;

function ImageGallery({ query }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setImages([]);
    setStatus(Status.PENDING);
    setPage(1);
    FetchImages(query, page)
      .then(data => {
        if (data.hits.length !== 0) {
          setImages([...data.hits]);
          setStatus(Status.RESOLVED);
          setShowButton(true);
          if (page >= Math.ceil(data.totalHits / 12)) {
            setShowButton(false);
            toast("We're sorry, but you've reached the end of search results");
          }
          scroll.scrollToBottom();
          return;
        }
        setStatus(Status.REJECTED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [query]);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);
    FetchImages(query, page)
      .then(data => {
        if (data.hits.length !== 0) {
          setImages([...images, ...data.hits]);
          setStatus(Status.RESOLVED);
          setShowButton(true);

          if (page >= Math.ceil(data.totalHits / 12)) {
            setShowButton(false);
            toast("We're sorry, but you've reached the end of search results");
          }
          scroll.scrollToBottom();
        }
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [page]);

  const handleOpenModal = index => {
    setShowModal(true);
    return (activeImage = images.find(image => image.id === index));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (status === Status.IDLE) {
    return <p className="text">Please, enter the name of a pictures</p>;
  }

  if (status === Status.PENDING) {
    return (
      <>
        <ul className="ImageGallery">
          {images.map(image => (
            <ImageGalleryItem
              image={image}
              key={image.id}
              onCliked={handleOpenModal}
            />
          ))}
        </ul>
        <Loading />
      </>
    );
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <ul className="ImageGallery">
          {images.map(image => (
            <ImageGalleryItem
              image={image}
              key={image.id}
              onClicked={handleOpenModal}
            />
          ))}
        </ul>
        {showButton && (
          <Button onLoadMore={() => setPage(state => state + 1)} />
        )}
        {showModal && (
          <Modal modulImage={activeImage} onClose={handleCloseModal} />
        )}
      </>
    );
  }

  if (status === Status.REJECTED) {
    return (
      <p className="text">
        Sorry, we do not find the pictures with a name {query}
      </p>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
