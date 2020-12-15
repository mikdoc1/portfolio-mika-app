import auth0 from '../../../utils/auth0';

export default async function me(req, res) {
  try {
    await auth0.handleProfile(req, res);
  } catch (error) {
    res.status(error.response.status || 400).json({ message: error.message });
  }
}
