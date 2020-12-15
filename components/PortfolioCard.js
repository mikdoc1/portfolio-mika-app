import { Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';

const PortfolioCard = ({ portfolio, children }) => {
  return (
    <Card className="portfolio-card" style={{ backgroundImage: 'linear-gradient(45deg, #4e54c8 0%, #8f94fb 100%)' }}>
      <CardHeader className="portfolio-card-header">{portfolio.jobTitle}</CardHeader>
      <CardBody>
        <p className="portfolio-card-city">{portfolio.location}</p>
        <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
        <CardText className="portfolio-card-text">{portfolio.description}</CardText>
        {children}
      </CardBody>
    </Card>
  );
};

export default PortfolioCard;
