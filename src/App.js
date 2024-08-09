import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Connect from "./handlers/connectWallet"
import Homepage from './pages/homepage';
import BuyNft from './pages/buyNftPage';
import MintNft from './pages/mintNft';
import MyNfts from "./pages/myNft";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Router>
      <div>
    <Connect></Connect>
    </div>
        <div className="sideTab-container">
          <Button variant="primary" onClick={handleShow}>
            |||
          </Button>
        </div>
        <Offcanvas show={show} onHide={handleClose} backdrop="static" className="sidebar">
          <Offcanvas.Header closeButton className="offcanvas-header">
            <Offcanvas.Title>My account</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvas-body">
            <Nav justify className="flex-column">
            <Nav.Item>
                <Nav.Link as={Link} to="/" onClick={handleClose}>
                  <Button className="d-grid gap-2 btn-lg" size="lg">Homepage</Button>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/myNft" onClick={handleClose}>
                  <Button className="d-grid gap-2 btn-lg" size="lg">My NFTs</Button>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/buy" onClick={handleClose}>
                  <Button className="d-grid gap-2 btn-lg" size="lg">Buy NFTs</Button>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/mint" onClick={handleClose}>
                  <Button className="d-grid gap-2 btn-lg" size="lg">Mint NFTs</Button>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      <div className="App">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/myNft" element={<MyNfts />} />
            <Route path="/buy" element={<BuyNft />} />
            <Route path="/mint" element={<MintNft />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
