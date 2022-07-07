import React from 'react';
import css from './ImageGallery.module.css';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

class ImageGallery extends React.Component {
  MY_API_KEY = '27547013-b29238c577303ab781139b8a0';
  URL = 'https://pixabay.com/api/';
  PER_PAGE = 12;

  state = {
    items: [],
    page: 1,
    status: 'idle',
    modalImage: '',
  };

  fetchImages = searchString => {
    const headers = {
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    };

    return fetch(
      `${this.URL}?key=${this.MY_API_KEY}&q=${searchString}&per_page=${this.PER_PAGE}&page=${this.state.page}`,
      headers
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error('Server response not OK'));
      })
      .then(json =>
        json.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          previewURL: webformatURL,
          imageURL: largeImageURL,
          tags,
        }))
      )
      .then(items => this.setState({ items }))
      .catch(error => console.error(error));
  };

  previewClick = imageURL => {
    this.setState({ modalImage: imageURL, status: 'modal' });
  };

  componentDidUpdate(prevProps, _) {
    const { query } = this.props;
    if (query !== prevProps.query) {
      this.setState({ status: 'loading' });
      this.fetchImages(query).finally(this.setState({ status: 'idle' }));
    }
  }

  render() {
    const { items, status, modalImage } = this.state;
    return (
      <ul className={css.ImageGallery}>
        {status === 'loading' && <Loader />}
        {items.length > 0 &&
          items.map(({ id, previewURL, imageURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              previewURL={previewURL}
              onClick={() => this.previewClick(imageURL)}
            />
          ))}
        {status === 'modal' && (
          <Modal>
            {
              <img
                src={modalImage}
                alt="full size view"
                onClick={() => this.setState({ status: 'idle' })}
              />
            }
          </Modal>
        )}
      </ul>
    );
  }
}

export default ImageGallery;
