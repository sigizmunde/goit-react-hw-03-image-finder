import css from './Button.module.css';

function Button({ onClick }) {
  return (
    <button type="button" className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
}

export default Button;
