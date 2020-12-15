import Header from '../Shared/Header';
import { ToastContainer } from 'react-toastify';

const Layout = (props) => {
  const { className = '', user, navClass = 'with-bg', loading, children } = props;
  return (
    <div className="layout-container">
      <Header className={navClass} user={user} loading={loading} />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Layout;
