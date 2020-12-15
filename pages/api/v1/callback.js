import auth0 from '../../../utils/auth0';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/' });
  } catch (error) {
    console.log('ERROR', error);
    res.status(error.response.status || 400).json({ message: error.message });
  }
}
