import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { updateShipmentStatus } from '../utils/api';

const UpdateShipment = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateShipmentStatus({ shipmentId, status });
      // Handle success
      console.log('Shipment status updated successfully');
    } catch (error) {
      console.error('Error updating shipment status:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="shipmentId">
        <Form.Label>Shipment ID</Form.Label>
        <Form.Control type="text" value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} placeholder="Enter shipment ID" />
      </Form.Group>
      <Form.Group controlId="status">
        <Form.Label>New Status</Form.Label>
        <Form.Control type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Enter new status" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update Shipment Status
      </Button>
    </Form>
  );
};

export default UpdateShipment;
