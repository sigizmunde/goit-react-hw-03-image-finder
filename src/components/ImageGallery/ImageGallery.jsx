import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';

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

export default ImageGallery;
