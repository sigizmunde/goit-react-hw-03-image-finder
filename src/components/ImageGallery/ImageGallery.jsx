import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ items, onClick }) {
  return (
    <ul className={css.ImageGallery}>
      {items.map(item => {
        const { id, previewURL } = item;
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            previewURL={previewURL}
            onClick={() => onClick({ image: item })}
          />
        );
      })}
    </ul>
  );
}

export default ImageGallery;
