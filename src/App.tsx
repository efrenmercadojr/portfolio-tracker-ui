import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { Button, Col, Row } from 'react-bootstrap';
import type { Asset } from './types';
import AssetService from './services/AssetService';


interface AppProps {}

function App({}: AppProps) {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/asset-list">Asssets</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/asset-list">
          <AssetList />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

function AssetList() {
  const [ assets, setAssets ] = useState<ReadonlyArray<Asset>>([]);

  useEffect(() => {
    function fetchAssets() {
      const { data } = AssetService.getAssets();
      if (data) {
        setAssets(data);
      }
    };
    fetchAssets();
  })

  const assetList = assets.map(asset => (
    <tr>
      <td>{asset.dateOfPurchase.toLocaleString()}</td>
      <td>{asset.code}</td>
      <td>{asset.numOfShares}</td>
      <td>{asset.buyPrice}</td>
      <td>{asset.brokerFee}</td>
    </tr>
  ));

  return (
    <Container>
      <Row>
        <Col md={4}>
          <h1>Assets</h1>
        </Col>
        <Col md={{ span: 2, offset: 6 }}>
          <Button className="float-end">New Asset</Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date of Purchase</th>
              <th>Code</th>
              <th># of Shares</th>
              <th>Buy Price</th>
              <th>Broker Fee</th>
            </tr>
          </thead>
          <tbody>
            {assetList}
          </tbody>
        </Table>
      </Row>
      
    </Container>
  );
}

function Dashboard() {
  return (
    <Container>
      <Row>
        <h2>Dashboard</h2>
      </Row>
    </Container>
  );
}


export default App;
