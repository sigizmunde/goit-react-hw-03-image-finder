import React from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends React.Component {
  state = {
    query: '',
  };

  handleSearch = query => {
    this.setState({ query });
  };

  render() {
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
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}
