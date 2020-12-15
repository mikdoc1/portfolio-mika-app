import { Row, Col } from 'reactstrap';
import Layout from '../components/Layout/Layout';
import BasePage from '../components/BasePage';
import { useGetUser } from '../actions/user';

const Cv = () => {
  const { user, loading } = useGetUser();
  return (
    <Layout user={user} loading={loading}>
      <BasePage title="My Experiences - Mika Shahin">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <iframe style={{ width: '100%', height: '1080px' }} src="/mikayel_shahinyan_resume.pdf" />
          </Col>
        </Row>
      </BasePage>
    </Layout>
  );
};

export default Cv;
