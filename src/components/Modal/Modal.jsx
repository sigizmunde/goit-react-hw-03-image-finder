import css from './Modal.module.css';

function Modal({ children }) {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>{children}</div>
    </div>
  );
}

export default Modal;
