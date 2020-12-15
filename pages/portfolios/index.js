import { useGetUser } from '../../actions/user';
import BasePage from '../../components/BasePage';
import Layout from '../../components/Layout/Layout';
import { Row, Col, Button } from 'reactstrap';
import PortfolioCard from '../../components/PortfolioCard';
import { getPortfolios, deletePortfolio } from '../../redux/slice/portfolio';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../redux/store';
import { useRouter } from 'next/router';
import { isAuthorized } from '../../utils/auth0';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  await store.dispatch(getPortfolios());
  return {
    props: {},
    revalidate: 10,
  };
});

const Portfolios = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { portfolios, meta } = useSelector((state) => state.portfolioSlice);
  const { user, loadingUser } = useGetUser();

  const onDeletePortfolio = ({ id }) => {
    dispatch(deletePortfolio({ id }));
  };

  return (
    <Layout user={user} loading={loadingUser}>
      <BasePage header="Portfolios" className="portfolio-page" title="Newest Portfolios - Mika Shahin">
        <Row>
          {!meta.error ? (
            portfolios.map((portfolio) => (
              <Col key={portfolio._id} onClick={() => router.push(`/portfolios/${portfolio._id}`)} md="4">
                <PortfolioCard portfolio={portfolio}>
                  {user && isAuthorized(user, 'admin') && (
                    <>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/portfolios/${portfolio._id}/edit`);
                        }}
                        className="mr-2"
                        color="warning"
                      >
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePortfolio({ id: portfolio._id });
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </PortfolioCard>
              </Col>
            ))
          ) : (
            <div className="alert alert-danger">{meta.error}</div>
          )}
        </Row>
      </BasePage>
    </Layout>
  );
};

export default Portfolios;
