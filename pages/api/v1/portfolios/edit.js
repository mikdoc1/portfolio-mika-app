import auth0 from '../../../../utils/auth0';
import axios from 'axios';

export default async function editPortfolio(req, res) {
  try {
    const { portfolio, id } = req.body;
    const { accessToken } = await auth0.getSession(req);
    const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_PORTFOLIO_API_URL}/portfolios/${id}`, portfolio, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 400).json(err.response.data);
  }
}
