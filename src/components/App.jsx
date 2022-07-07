import React from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

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
    const { query, page, items } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      if (page === 1) {
        this.setState({ items: [] });
      }
      this.setState({ status: 'loading' });
      this.fetchImages(query).finally(this.setState({ status: 'idle' }));
    }

    if (items !== prevState.items && page !== 1) {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

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
      .then(newItems => {
        this.setState(({ items }) => ({ items: [...items, ...newItems] }));
      })
      .catch(error => console.error(error));
  };

  handleSearch = query => {
    this.setState({ query, page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
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
          <>
            <ImageGallery items={items} onClick={this.previewClickHandle} />
            <Button onClick={this.loadMore} />
          </>
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
