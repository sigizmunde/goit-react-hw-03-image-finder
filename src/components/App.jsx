import React from 'react';
import css from './App.module.css';
import fetchImages from './api-query';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export class App extends React.Component {
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
      this.setState({ status: 'loading' });

      fetchImages(query, page)
        .then(newItems => {
          this.setState(({ items }) => ({
            items: [...items, ...newItems],
          }));
        })
        .finally(() => {
          this.setState({ status: 'idle' });
        });
    }

    if (items !== prevState.items && page !== 1) {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleSearch = query => {
    this.setState(({ page, query: oldQuery }) => {
      if (oldQuery !== query) return { query, page: 1, items: [] };
    });
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
          <Modal
            closeFunction={this.modalCloseHandle}
            imageURL={currentImage.imageURL}
            tags={currentImage.tags}
          />
        )}
      </div>
    );
  }
}
