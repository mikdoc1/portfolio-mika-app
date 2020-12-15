import Link from 'next/link';
import moment from 'moment';

const BlogItem = ({ blog: { blog, author } }) => (
  <div>
    <div className="post-preview clickable">
      <Link href={`/blogs/${blog.slug}`}>
        <a>
          <h2 className="post-title">{blog.title}</h2>
          <h3 className="post-subtitle">{blog.subTitle}</h3>
        </a>
      </Link>
      <p className="post-meta">
        <a href="#"> {author.name} </a>
      </p>
    </div>
  </div>
);

export default BlogItem;
