import Layout from '../../../components/Layout/Layout';
import BasePage from '../../../components/BasePage';
import withAuth from '../../../hoc/withAuth';
import { Editor } from 'slate-simple-editor';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../../redux/slice/blog';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const BlogEditor = ({ user, loading }) => {
  const router = useRouter();
  const { meta } = useSelector((state) => state.blogSlice);
  const dispatch = useDispatch();
  const saveBlog = async (blog) => {
    const resAction = await dispatch(createBlog({ blog }));
    if (createBlog.fulfilled.match(resAction)) {
      const payload = resAction.payload;
      router.push(`/blogs/editor/${payload.blog._id}`);
    }
  };

  if (meta.error) {
    toast.error(meta.error);
  }

  return (
    <Layout user={user} loading={loading}>
      <BasePage header="Blog Editor">
        <Editor onSave={saveBlog} loading={meta.isLoading} />
      </BasePage>
    </Layout>
  );
};

export default withAuth(BlogEditor)('admin');
