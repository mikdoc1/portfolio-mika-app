import auth0 from '../../../../utils/auth0';
import axios from 'axios';

export default async function createBlog(req, res) {
  try {
    const { accessToken } = await auth0.getSession(req);
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_PORTFOLIO_API_URL}/blogs/create`, req.body, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(err.response.status || 400).json({ message: err.message });
  }
}
