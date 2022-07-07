import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

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

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  previewURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
