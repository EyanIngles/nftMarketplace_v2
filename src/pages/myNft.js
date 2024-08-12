import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Col, Card, Row, Container } from 'react-bootstrap';
import { loadImportNftContract } from "../handlers/interactions";
import { ethers } from "ethers";
import '../buyNftPage.css';

const MyNft = () => {
  const [nftContract, setNftContract] = useState("");
  const [nftNames, setNftNames] = useState({}); // Store names with contract addresses

  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.provider);
  const chainId = useSelector((state) => state.provider.network);
  const marketplace = useSelector((state) => state.marketplace.mContract);
  const TokenIdAndAddress = useSelector((state) => state.marketplace.getTokenIds);
  const account = useSelector((state) => state.provider.account);

  const myNFThandler = async () => {
    // Handle connection to blockchain if needed
  };

  const importHandler = async () => {
    const address = nftContract.toString();
    await loadImportNftContract(provider, marketplace, chainId, address, dispatch);
  };

  const inputHandler = (e) => {
    e.preventDefault();
    setNftContract(e.target.value);
  };

  // Fetch the name of the NFT collection for each contract address
  useEffect(() => {
    const fetchNftNames = async () => {
      if (provider && TokenIdAndAddress.length > 0) {
        const names = {};

        for (const { contractAddress } of TokenIdAndAddress) {
          if (!names[contractAddress]) { // Only fetch if not already fetched
            const contract = new ethers.Contract(contractAddress, [
              "function name() view returns (string)"
            ], provider);

            try {
              const name = await contract.name();
              names[contractAddress] = name;
            } catch (error) {
              console.error(`Failed to fetch name for contract ${contractAddress}:`, error);
              names[contractAddress] = "Unknown"; // Default name if fetch fails
            }
          }
        }

        setNftNames(names);
      }
    };

    fetchNftNames();
  }, [provider, TokenIdAndAddress]);

  return (
    <div>
      <section>
        <h2>My NFTs</h2>
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
            <Button onClick={myNFThandler}>Please connect to blockchain</Button>
          )}
          {/* More NFT items */}
        </div>
      </section>
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formNFTAddress">
            <Form.Label>Can't see all your NFTs? <br />Please import the contract here.</Form.Label>
            <Form.Control
              type="text"
              placeholder="NFT contract"
              value={nftContract}
              onChange={inputHandler}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={importHandler}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default MyNft;
