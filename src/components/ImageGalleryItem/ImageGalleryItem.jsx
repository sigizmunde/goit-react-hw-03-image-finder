import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ id, previewURL, tags, onClick }) {
  return (
    <li className={css.ImageGalleryItem} onClick={() => onClick(id)}>
      <img
        className={css['ImageGalleryItem-image']}
        src={previewURL}
        alt={tags}
      />
    </li>
  );
}

export default ImageGalleryItem;
