import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import BasePage from '../components/BasePage';
import { useGetUser } from '../actions/user';
import { Row, Col } from 'reactstrap';

const About = () => {
  const { user, loading } = useGetUser();

  useEffect(() => {
    return () => {
      window.__isAboutLoaded = true;
    };
  });

  const createFadeInClass = () => {
    if (typeof window !== 'undefined') {
      return window.__isAboutLoaded ? '' : 'fadein';
    }
    return 'fadein';
  };

  return (
    <Layout user={user} loading={loading}>
      <BasePage className="about-page" title="About Me - Mika Shahin">
        <Row className="mt-5">
          <Col md="6">
            <div className="left-side">
              <h1 className={`title ${createFadeInClass()}`}>Hello, Welcome</h1>
              <h4 className={`subtitle ${createFadeInClass()}`}>To About Page</h4>
              <p className={`subsubTitle ${createFadeInClass()}`}>Feel free to read short description about me.</p>
            </div>
          </Col>
          <Col md="6">
            <div className={`${createFadeInClass()}`}>
              <p>My name is Mika Shahin and I am an experienced software engineer and freelance developer. </p>
              <p>
                I have a Master's degree in Artificial Intelligence and several years of experience working on a wide
                range of technologies and projects from C++ development for ultrasound devices to modern mobile and web
                applications in React and Angular.
              </p>
              <p>
                Throughout my career, I have acquired advanced technical knowledge and the ability to explain
                programming topics clearly and in detail to a broad audience. I invite you to take my course, where I
                have put a lot of effort to explain web and software engineering concepts in a detailed, hands-on and
                understandable way.
              </p>
            </div>
          </Col>
        </Row>
      </BasePage>
    </Layout>
  );
};

export default About;
