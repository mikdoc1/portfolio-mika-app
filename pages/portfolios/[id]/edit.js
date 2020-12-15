import { useRouter } from 'next/router';
import Layout from '../../../components/Layout/Layout';
import BasePage from '../../../components/BasePage';
import { useGetUser } from '../../../actions/user';
import { getPortfolio } from '../../../redux/slice/portfolio';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PortfolioForm from '../../../components/PortfolioForm';
import { useEffect } from 'react';
import parseISO from 'date-fns/parseISO';
import { editPortfolio } from '../../../redux/slice/portfolio';
import { toast } from 'react-toastify';

const PortfolioEdit = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;
  const { portfolio, meta } = useSelector((state) => state.portfolioSlice);
  const { user, loading: loadingUser } = useGetUser();

  const onEditPortfolio = async (portfolio) => {
    const resAction = await dispatch(editPortfolio({ id, portfolio }));
    if (editPortfolio.fulfilled.match(resAction)) {
      toast.success('Portfolio has been updated!', { autoClose: 5000 });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getPortfolio({ id }));
    }
  }, [dispatch, id]);

  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }

  let portfolioCopy = null;
  if (portfolio) {
    portfolioCopy = {
      ...portfolio,
      endDate: portfolio.endData ? parseISO(portfolio.endDate) : null,
      startDate: parseISO(portfolio.startDate),
    };
    delete portfolioCopy._id;
    delete portfolioCopy.__v;
    delete portfolioCopy.userId;
    delete portfolioCopy.createdAt;
  }
  return (
    <Layout user={user} loading={loadingUser}>
      <BasePage>
        <Row>
          <Col md="8">
            <PortfolioForm onSubmit={onEditPortfolio} initialData={portfolioCopy} />
            {meta.error && <div className="alert alert-danger mt-2">{meta.error}</div>}
          </Col>
        </Row>
      </BasePage>
    </Layout>
  );
};

export default PortfolioEdit;
