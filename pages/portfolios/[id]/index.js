import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout/Layout';
import BasePage from '../../../components/BasePage';
import { useGetUser } from '../../../actions/user';
import { wrapper } from '../../../redux/store';
import { getPortfolio } from '../../../redux/slice/portfolio';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../helpers/functions';

export const getStaticProps = wrapper.getStaticProps(async ({ store, params }) => {
  await store.dispatch(getPortfolio({ id: params.id }));
  return {
    props: {},
    revalidate: 10,
  };
});

export async function getStaticPaths() {
  const paths = [];
  try {
    const { data } = await axios.get('http://localhost:3001/api/v1/portfolios');
    data.forEach((portofilio) =>
      paths.push({
        params: { id: portofilio._id.toString() },
      })
    );
  } catch (err) {
    console.log(err.message);
  }
  return {
    paths,
    fallback: true,
  };
}

const Portfolio = () => {
  const router = useRouter();
  const { portfolio, meta } = useSelector((state) => state.portfolioSlice);
  const { user, loading: loadingUser } = useGetUser();

  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }

  return (
    <Layout user={user} loading={loadingUser}>
      <BasePage
        noWrapper
        indexPage
        navClass="transparent"
        title={`${portfolio?.title} - Mika Shahin`}
        metaDescription={portfolio?.description}
      >
        <div className="portfolio-detail">
          <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" class="inner page-cover">
              <h1 class="cover-heading">{portfolio?.title}</h1>
              <p class="lead dates">
                {formatDate(portfolio?.startDate)} - {formatDate(portfolio?.endDate) || 'Present'}
              </p>
              <p class="lead info mb-0">
                {portfolio?.jobTitle} | {portfolio?.company} | {portfolio?.location}
              </p>
              <p class="lead">{portfolio?.description}</p>
              <p class="lead">
                <a href={portfolio?.companyWebsite} target="_" class="btn btn-lg btn-secondary">
                  Visit Company
                </a>
              </p>
            </main>
          </div>
        </div>
      </BasePage>
      {meta.error && <div className="alert alert-danger">{meta.error}</div>}
    </Layout>
  );
};

export default Portfolio;
