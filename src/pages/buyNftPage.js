import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Card, Row, Container } from 'react-bootstrap';
import '../buyNftPage.css';

const BuyNftPage = () => {
  const TokenIdAndAddress = useSelector((state) => state.marketplace.getTokenIds) //this will need to come from the listings.
  const account = useSelector((state) => state.provider.account)
  const [nftNames, setNftNames] = useState({});

  const Buyhandler = () => {

  }

  return (
     <div className="myNft-div">
          {account ? (
            <Container>
              <Row xs={1} md={2} lg={3}>
              {TokenIdAndAddress.map(({ tokenId, contractAddress }, index) => (
                <Col key={index}>
                  <Card className="mynft-card">
                    <Card.Body>
                      <Card.Title>{nftNames[contractAddress] || "Loading..."}</Card.Title>
                      <Card.Text>
                        <strong>Token ID:</strong> {tokenId} <br />
                        <strong>Contract Address:</strong> {contractAddress}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              </Row>
            </Container>
          ) : (
            <p>Please connect to blockchain</p>
          )}
          {/* More NFT items */}
        </div>
  );
};

export default BuyNftPage;
