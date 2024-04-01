import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateShipmentStatus } from "../../utils/supplyChain";

const UpdateShipment = ({shipment}) => {
  const [shipmentId, setShipmentId] = useState(shipment.id);
  const [status, setStatus] = useState(shipment.status);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        shipmentId,
        status
      }
      await updateShipmentStatus(
        payload,
        BigInt(0),
        BigInt(0)
      );
      toast.success('Shipment status updated successfully');
    } catch (error) {
      toast.error('Error updating shipment status');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="shipmentId" className="m-2">
        <Form.Label>Shipment ID</Form.Label>
        <Form.Control type="text" value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} placeholder="Enter shipment ID" />
      </Form.Group>
      <Form.Group controlId="status" className="m-2">
        <Form.Label>New Status</Form.Label>
        <Form.Control type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Enter new status" />
      </Form.Group>
      <Button variant="primary" type="submit" className="m-2">
        Update Status
      </Button>
    </Form>
  );
};

export default UpdateShipment;
