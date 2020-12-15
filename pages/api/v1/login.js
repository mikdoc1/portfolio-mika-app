import auth0 from '../../../utils/auth0';

export default async function login(req, res) {
  try {
    await auth0.handleLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.response.status || 400).json({ message: error.message });
  }
}
