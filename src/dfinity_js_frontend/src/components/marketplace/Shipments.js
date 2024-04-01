import React, { useState,useEffect } from "react";
import { Card, Button,Row,Modal } from 'react-bootstrap';
import UpdateShipment from './UpdateShipment';
import { getAllShipments } from '../../utils/supplyChain';

const AllShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const fetchedShipments = await getAllShipments();
        setShipments(fetchedShipments);
      } catch (error) {
        console.error('Error fetching shipments:', error);
      }
    };
    fetchShipments();
  }, []);

  const handleUpdateShipment = (shipment) => {
    setSelectedShipment(shipment);
    setShowUpdateModal(true);
  };

  return (
    <div className="shipment-list">
      <h1 className="text-primary fw-bold">Shipments</h1>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
      {shipments.map((shipment) => (
        <Card key={shipment.id} style={{ width: '18rem' }}>
          <Card.Body className="shadow">
            <Card.Title>Shipment ID: <span>{shipment.id}</span></Card.Title>
            <Card.Text>
              From: {shipment.from}<br />
              To: {shipment.to}<br />
              Status: {shipment.status}
            </Card.Text>
            <Button className="m-2" variant="info" onClick={() => handleUpdateShipment(shipment)}>Update Status</Button>
          </Card.Body>
        </Card>
      ))}
      </Row>

      
      {/* Modal for updating shipment */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Shipment Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedShipment && <UpdateShipment shipment={selectedShipment} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllShipments;
