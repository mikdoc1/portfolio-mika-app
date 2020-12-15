import Layout from '../components/Layout/Layout';
import { wrapper } from '../redux/store';
import BasePage from '../components/BasePage';
import withAuth from '../hoc/withAuth';
import { Row, Col, Button } from 'reactstrap';
import Mast from '../components/Shared/Mast';
import auth0 from '../utils/auth0';
import axios from 'axios';
import Link from 'next/link';
import DropMenu from '../components/Shared/DropMenu';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBlogs, changeBlogStatus } from '../redux/slice/blog';

const Dashboard = ({ user, loading }) => {
  const { blogs, meta } = useSelector((state) => state.blogSlice);
  const dispatch = useDispatch();
  const onChangeBlogStatus = async (id, status) => {
    const resAction = await dispatch(changeBlogStatus({ id, status }));
  };

  const createOption = (blogStatus) => {
    return blogStatus === 'draft'
      ? { view: 'Publish Story', value: 'published' }
      : { view: 'Make a Draft', value: 'draft' };
  };

  const createOptions = (blog) => {
    const option = createOption(blog.status);
    return [
      {
        key: `${blog._id}-published`,
        text: option.view,
        handlers: {
          onClick: () => onChangeBlogStatus(blog._id, option.value),
        },
      },
      {
        key: `${blog._id}-delete`,
        text: 'Delete',
        handlers: {
          onClick: () => onChangeBlogStatus(blog._id, 'deleted'),
        },
      },
    ];
  };

  const renderBlogs = (blogs, status) => (
    <ul className="user-blogs-list">
      {blogs &&
        blogs
          .filter((blog) => blog.status === status)
          .map((blog) => (
            <li key={blog._id}>
              <Link href={`/blogs/editor/${blog._id}`}>
                <a>{blog.title}</a>
              </Link>
              <DropMenu items={createOptions(blog)} />
            </li>
          ))}
    </ul>
  );
  return (
    <Layout navClass="transparent" user={user} loading={loading}>
      <Mast imagePath="/images/home-bg.jpg">
        <h1>Blogs Dashboard</h1>
        <span className="subheading">
          Let's write some nice blog today{' '}
          <Link href="/blogs/editor">
            <Button color="primary">Create a new Blog</Button>
          </Link>
        </span>
      </Mast>
      <BasePage className="blog-user-page">
        <Row>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Published Blogs </h2>
            {renderBlogs(blogs, 'published')}
          </Col>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Draft Blogs </h2>
            {renderBlogs(blogs, 'draft')}
          </Col>
        </Row>
      </BasePage>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store }) => {
  const result = await auth0.getSession(req);
  if (result) {
    await store.dispatch(getMyBlogs({ accessToken: result.accessToken }));
  }
  return {
    props: {},
  };
});

export default withAuth(Dashboard)('admin');
