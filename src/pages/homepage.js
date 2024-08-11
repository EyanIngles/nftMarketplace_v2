import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import '../buyNftPage.css';


const Homepage = () => {

  const nftCollectionHandler = () => {

  }

  const projectHandler = () => {
    
  }
  return (
    <Container>
      {/* Hero Section */}
      <Row className="my-5 text-center">
        <Col>
          <h1>Welcome to Marketplace V2</h1>
          <p>Discover, collect, and sell extraordinary NFTs on this plateform!</p>
          <Button variant="primary" size="lg">Explore NFTs</Button>
        </Col>
      </Row>

      {/* About Section */}
      <Row className="my-5">
        <Col md={6}>
          <h2>About [Your NFT Project]</h2>
          <p>
            [Your NFT Project] is a groundbreaking NFT collection that features unique, one-of-a-kind digital assets.
            Each NFT in our collection is meticulously crafted by talented artists and represents a piece of digital
            history. Our marketplace allows collectors to buy, sell, and trade NFTs with ease, all on a secure and
            user-friendly platform.
          </p>
        </Col>
        <Col md={6}>
          <img src="[Image URL]" alt="About Project" className="img-fluid"/>
        </Col>
      </Row>

      {/* Featured NFTs Section */}
      <Row className="my-5">
        <Col>
          <h2>New and Popular NFT Collections</h2>
          <Row>
            {/* Repeat this Col for each featured NFT */}
            <Col md={4} className="mb-4">
              <Card className='nft-card-display'>
                <Card.Img variant="top" src="[NFT Image URL]" />
                <Card.Body>
                  <Card.Title>(NFT title)</Card.Title>
                  <Card.Text>(NFT Description)</Card.Text>
                  <Button variant="primary" href='/mint'>View NFT</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Related Projects Section */}
      <Row className="my-5">
        <Col>
          <h2>Explore Related Projects</h2>
          <Row>
            {/* Repeat this Col for each related project */}
            <Col md={4} className="mb-4">
              <Card className='nft-card-explore'>
                <Card.Img variant="top" src="[Related Project Image URL]" />
                <Card.Body>
                  <Card.Title>[Project Title]</Card.Title>
                  <Card.Text>[Project Description]</Card.Text>
                  <Button variant="primary">View Project</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Advertising Section */}
      <Row className="my-5">
        <Col>
          <h2>Advertise with Us</h2>
          <p>
            Reach a targeted audience of NFT enthusiasts by advertising your project on our platform. Our marketplace
            attracts a wide range of users who are passionate about digital art and blockchain technology.
          </p>
          <Button variant="secondary">Learn More</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Homepage
