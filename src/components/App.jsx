import React from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends React.Component {
  MY_API_KEY = '27547013-b29238c577303ab781139b8a0';
  URL = 'https://pixabay.com/api/';
  PER_PAGE = 12;

  state = {
    query: '',
    items: [],
    page: 1,
    status: 'idle',
    currentImage: '',
  };

  componentDidUpdate(_, prevState) {
    const { query } = this.state;
    if (query !== prevState.query) {
      this.setState({ status: 'loading' });
      this.fetchImages(query).finally(this.setState({ status: 'idle' }));
    }
  }

  handleSearch = query => {
    this.setState({ query });
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

  previewClickHandle = ({ image }) => {
    this.setState({ currentImage: image, status: 'modal' });
  };

  modalCloseHandle = () => {
    this.setState({ status: 'idle' });
  };

  render() {
    const { items, status, currentImage } = this.state;
    return (
      <div
        className={css.App}
        // style={{
        //   height: '100vh',
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   fontSize: 40,
        //   color: '#010101',
        // }}
      >
        <Searchbar onSearch={this.handleSearch} />
        {status === 'loading' && <Loader />}
        {items.length > 0 && (
          <ImageGallery items={items} onClick={this.previewClickHandle} />
        )}
        {status === 'modal' && (
          <Modal closeFunction={this.modalCloseHandle}>
            <img src={currentImage.imageURL} alt={currentImage.tags} />
          </Modal>
        )}
      </div>
    );
  }
}
