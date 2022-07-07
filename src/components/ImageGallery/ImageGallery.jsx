import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

function ImageGallery({ items, onClick }) {
  return (
    <ul className={css.ImageGallery}>
      {items.map(item => {
        const { id, previewURL } = item;
        return (
          <ImageGalleryItem
            key={id + nanoid()}
            id={id}
            previewURL={previewURL}
            onClick={() => onClick({ image: item })}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      previewURL: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
