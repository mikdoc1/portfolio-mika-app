import { useRouter } from 'next/router';
import Layout from '../../../components/Layout/Layout';
import BasePage from '../../../components/BasePage';
import withAuth from '../../../hoc/withAuth';
import { Editor } from 'slate-simple-editor';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlog, editBlog } from '../../../redux/slice/blog';

const BlogUpdateEditor = ({ user, loading }) => {
  const { blog, meta } = useSelector((state) => state.blogSlice);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      // dispatch(getBlog({ id }));
    }
  }, [id, dispatch]);

  const onUpdateBlog = async (data) => {
    // const resAction = await dispatch(editBlog({ id, blog: data }));
    // if (editBlog.fulfilled.match(resAction)) {
    //   toast.success('Blog updated!');
    // }
  };

  if (meta.error) {
    toast.error(meta.error);
  }

  return (
    <Layout user={user} loading={loading}>
      <BasePage>
        {blog && blog.content && (
          <Editor
            header="Update Your Blog..."
            initialContent={blog.content}
            onSave={onUpdateBlog}
            loading={meta.isLoading}
          />
        )}
      </BasePage>
    </Layout>
  );
};

export default withAuth(BlogUpdateEditor)('admin');
