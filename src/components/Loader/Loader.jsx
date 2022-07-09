import css from './Loader.module.css';
// import { ReactComponent as LoaderPic } from './rotate.svg';
import { Grid } from 'react-loader-spinner';

function Loader() {
  return (
    <div className={css.Overlay}>
      {/* <LoaderPic className={css.LoaderPic} /> */}
      <Grid color="#00BFFF" height={80} width={80} />
    </div>
  );
}

export default Loader;
