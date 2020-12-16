import Layout from '../../components/Layout/Layout';
import BasePage from '../../components/BasePage';
import { useGetUser } from '../../actions/user';
import { Row, Col } from 'reactstrap';
import { SlateView } from 'slate-simple-editor';
import axios from 'axios';
import { wrapper } from '../../redux/store';
import { getBlogBySlug } from '../../redux/slice/blog';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AvatarComponent from '../../components/Shared/AvatarComponent';

const BlogDetail = () => {
  const router = useRouter();
  const { blog, author } = useSelector((state) => state.blogSlice);
  const { data, loading } = useGetUser();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <Layout user={data} loading={loading}>
      <BasePage className="slate-container" title={`${blog?.title} - Mika Shahin`} metaDescription={blog?.subTitle}>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <AvatarComponent title={author?.name} image={author?.picture} date={blog?.createdAt} />
            <hr />
            <SlateView initialContent={blog?.content} />
          </Col>
        </Row>
      </BasePage>
    </Layout>
  );
};

export async function getStaticPaths() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_PORTFOLIO_API_URL}/blogs`);

  const paths = data.map((blog) => ({ params: { slug: blog.blog.slug } }));
  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = wrapper.getStaticProps(async ({ params, store }) => {
  await store.dispatch(getBlogBySlug({ slug: params.slug }));
  return {
    props: {},
    revalidate: 10,
  };
});

export default BlogDetail;
