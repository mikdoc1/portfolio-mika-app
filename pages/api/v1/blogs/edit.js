import auth0 from '../../../../utils/auth0';
import axios from 'axios';

export default async function editBlog(req, res) {
  try {
    const { id, blog = null, status = null } = req.body;
    const { accessToken } = await auth0.getSession(req);
    console.log('ACCESS_TOKEN', accessToken);
    const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_PORTFOLIO_API_URL}/blogs/${id}`, blog || { status }, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(err.response.status || 400).json({ message: err.message });
  }
}
