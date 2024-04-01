import React, { useState, useEffect } from "react";
import { Card, Button, Row, Modal } from 'react-bootstrap';
import UpdateShipment from './UpdateShipment';
import { getAllShipments } from '../../utils/supplyChain';

const AllShipments = () => {
  // State to store the fetched shipments
  const [shipments, setShipments] = useState([]);
  // State to control the visibility of the update shipment modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // State to store the selected shipment for update
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Effect to fetch shipments on component mount
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const fetchedShipments = await getAllShipments();
        // Set fetched shipments in state
        setShipments(fetchedShipments);
      } catch (error) {
        console.error('Error fetching shipments:', error);
      }
    };
    // Call fetchShipments function
    fetchShipments();
  }, []);

  // Function to handle update shipment action
  const handleUpdateShipment = (shipment) => {
    // Set selected shipment for update
    setSelectedShipment(shipment);
    // Show update shipment modal
    setShowUpdateModal(true);
  };

  return (
    <div className="shipment-list">
      {/* Heading for shipments */}
      <h1 className="text-primary fw-bold">Shipments</h1>
      {/* Displaying shipments in rows */}
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {shipments.map((shipment) => (
          <Card key={shipment.id} style={{ width: '18rem' }}>
            <Card.Body className="shadow">
              {/* Display shipment ID */}
              <Card.Title>Shipment ID: <span>{shipment.id}</span></Card.Title>
              {/* Display shipment details */}
              <Card.Text>
                From: {shipment.from}<br />
                To: {shipment.to}<br />
                Status: {shipment.status}
              </Card.Text>
              {/* Button to update shipment status */}
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
          {/* Render update shipment component with selected shipment */}
          {selectedShipment && <UpdateShipment shipment={selectedShipment} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllShipments;
