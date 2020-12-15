import BaseLayout from '../../components/Layout/Layout';
import BasePage from '../../components/BasePage';
import withAuth from '../../hoc/withAuth';
import { Row, Col } from 'reactstrap';
import PortfolioForm from '../../components/PortfolioForm';
import { useDispatch, useSelector } from 'react-redux';
import { createPortfolio } from '../../redux/slice/portfolio';
import Redirect from '../../components/Shared/Redirect';

const PortfolioCreate = ({ user, loading: userLoading }) => {
  const { portfolio, meta } = useSelector((state) => state.portfolioSlice);
  const dispatch = useDispatch();
  const onCreatePortfolio = (portfolio) => {
    dispatch(createPortfolio({ portfolio }));
  };

  if (portfolio) {
    return <Redirect to="/portfolios" />;
  }

  return (
    <BaseLayout user={user} loading={userLoading}>
      <BasePage header="Create Portfolio">
        <Row>
          <Col md="8">
            {!meta.error ? (
              <PortfolioForm onSubmit={onCreatePortfolio} />
            ) : (
              <div className="alert alert-danger mt-2">{meta.error}</div>
            )}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(PortfolioCreate)('admin');
