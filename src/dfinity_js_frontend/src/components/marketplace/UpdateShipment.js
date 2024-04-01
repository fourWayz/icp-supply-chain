import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { updateShipmentStatus } from '../utils/api';
import { toast } from 'react-toastify';

const UpdateShipment = ({shipment}) => {
  const [shipmentId, setShipmentId] = useState(shipment.id);
  const [status, setStatus] = useState(shipment.status);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateShipmentStatus({ shipmentId, status });
      toast.success('Shipment status updated successfully');
    } catch (error) {
      toast.error('Error updating shipment status');
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
