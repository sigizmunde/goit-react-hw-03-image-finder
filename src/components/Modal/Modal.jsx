import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  propTypes = {
    children: PropTypes.node.isRequired,
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
    const { children, closeFunction } = this.props;
    return (
      <div className={css.Overlay} onClick={closeFunction}>
        <div className={css.Modal}>{children}</div>
      </div>
    );
  }
}

export default Modal;
