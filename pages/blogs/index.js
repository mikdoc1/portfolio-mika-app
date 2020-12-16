import Layout from '../../components/Layout/Layout';
import BasePage from '../../components/BasePage';
import { useGetUser } from '../../actions/user';
import Mast from '../../components/Shared/Mast';
import { Row, Col } from 'reactstrap';
import BlogItem from '../../components/BlogItem';
import { useSelector } from 'react-redux';
import { getBlogs } from '../../redux/slice/blog';
import { wrapper } from '../../redux/store';

const Blogs = () => {
  const { blogs } = useSelector((state) => state.blogSlice);
  const { data, loading } = useGetUser();
  return (
    <Layout navClass="transparent" className="blog-listing-page" user={data} loading={loading}>
      <Mast imagePath="/images/home-bg.jpg">
        <h1>Fresh Blogs</h1>
        <span className="subheading">Programming, travelling...</span>
      </Mast>
      <BasePage className="blog-body" title="Newest Blogs - Mika Shahin">
        <Row>
          {blogs.map((blog) => {
            return (
              <Col key={blog.blog._id} md="10" lg="8" className="mx-auto">
                <BlogItem blog={blog} />
                <hr></hr>
              </Col>
            );
          })}
        </Row>
      </BasePage>
    </Layout>
  );
};

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   await store.dispatch(getBlogs());
//   return {
//     props: {},
//     revalidate: 10,
//   };
// });

export default Blogs;
