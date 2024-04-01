import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getShipmentDetails } from '../utils/api';

const ShipmentDetails = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [shipment, setShipment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedShipment = await getShipmentDetails(shipmentId);
      setShipment(fetchedShipment);
    } catch (error) {
      console.error('Error fetching shipment details:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="shipmentId">
          <Form.Label>Shipment ID</Form.Label>
          <Form.Control type="text" value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} placeholder="Enter shipment ID" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Get Shipment Details
        </Button>
      </Form>
      {shipment && (
        <div>
          <h2>{shipment.id}</h2>
          <p>From: {shipment.from}</p>
          <p>To: {shipment.to}</p>
          <p>Status: {shipment.status}</p>
        </div>
      )}
    </div>
  );
};

export default ShipmentDetails;
