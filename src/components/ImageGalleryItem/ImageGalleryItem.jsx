import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ id, previewURL, onClick }) {
  return (
    <li className={css.ImageGalleryItem} onClick={() => onClick(id)}>
      <img
        className={css['ImageGalleryItem-image']}
        src={previewURL}
        alt="miniature"
      />
    </li>
  );
}

export default ImageGalleryItem;
