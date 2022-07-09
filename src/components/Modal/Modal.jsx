import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    closeFunction: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keyPressed);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyPressed);
  }

  keyPressed = e => {
    if (e.code === 'Escape') this.props.closeFunction();
  };

  render() {
    const { closeFunction, imageURL, tags } = this.props;
    return (
      <div className={css.Overlay} onClick={closeFunction}>
        <div className={css.Modal}>
          <img src={imageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
