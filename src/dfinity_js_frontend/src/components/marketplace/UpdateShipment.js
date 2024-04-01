import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateShipmentStatus } from "../../utils/supplyChain";

const UpdateShipment = ({ shipment }) => {
  // State variables to store shipment ID and status
  const [shipmentId, setShipmentId] = useState(shipment.id);
  const [status, setStatus] = useState(shipment.status);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create payload with updated shipment ID and status
      const payload = {
        shipmentId,
        status
      };
      // Call updateShipmentStatus function with payload
      await updateShipmentStatus(
        payload,
        BigInt(0),
        BigInt(0)
      );
      // Show success toast
      toast.success('Shipment status updated successfully');
      // Reload the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      // Show error toast if update fails
      toast.error('Error updating shipment status');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Input field for shipment ID */}
      <Form.Group controlId="shipmentId" className="m-2">
        <Form.Label>Shipment ID</Form.Label>
        <Form.Control type="text" value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} placeholder="Enter shipment ID" />
      </Form.Group>
      {/* Input field for new status */}
      <Form.Group controlId="status" className="m-2">
        <Form.Label>New Status</Form.Label>
        <Form.Control type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Enter new status" />
      </Form.Group>
      {/* Submit button */}
      <Button variant="primary" type="submit" className="m-2">
        Update Status
      </Button>
    </Form>
  );
};

export default UpdateShipment;
