import '../styles/globals.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'slate-simple-editor/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
