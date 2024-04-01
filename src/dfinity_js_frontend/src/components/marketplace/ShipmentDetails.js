import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getShipmentDetails } from '../utils/api';

const ShipmentDetails = () => {
  // State to store the entered shipment ID
  const [shipmentId, setShipmentId] = useState('');
  // State to store the fetched shipment details
  const [shipment, setShipment] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch shipment details using the entered ID
      const fetchedShipment = await getShipmentDetails(shipmentId);
      // Set the fetched shipment details in state
      setShipment(fetchedShipment);
    } catch (error) {
      console.error('Error fetching shipment details:', error);
    }
  };

  return (
    <div>
      {/* Shipment details form */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="shipmentId">
          <Form.Label>Shipment ID</Form.Label>
          {/* Input field for entering shipment ID */}
          <Form.Control type="text" value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} placeholder="Enter shipment ID" />
        </Form.Group>
        {/* Button to submit the form */}
        <Button variant="primary" type="submit">
          Get Shipment Details
        </Button>
      </Form>
      
      {/* Display fetched shipment details if available */}
      {shipment && (
        <div>
          {/* Display shipment ID */}
          <h2>{shipment.id}</h2>
          {/* Display shipment origin */}
          <p>From: {shipment.from}</p>
          {/* Display shipment destination */}
          <p>To: {shipment.to}</p>
          {/* Display shipment status */}
          <p>Status: {shipment.status}</p>
        </div>
      )}
    </div>
  );
};

export default ShipmentDetails;
