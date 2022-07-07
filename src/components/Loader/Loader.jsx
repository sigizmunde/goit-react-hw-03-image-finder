import css from './Loader.module.css';
import { ReactComponent as LoaderPic } from 'components/Loader/rotate.svg';

function Loader() {
  return (
    <div className={css.Overlay}>
      <LoaderPic className={css.LoaderPic} />
    </div>
  );
}

export default Loader;
