import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addShipment } from '../utils/api';

const AddShipment = () => {
  const [formData, setFormData] = useState({
    productId: '',
    from: '',
    to: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addShipment(formData);
      // Handle success
      console.log('Shipment added successfully');
    } catch (error) {
      console.error('Error adding shipment:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="productId">
        <Form.Label>Product ID</Form.Label>
        <Form.Control type="text" name="productId" value={formData.productId} onChange={handleChange} placeholder="Enter product ID" />
      </Form.Group>
      <Form.Group controlId="from">
        <Form.Label>From</Form.Label>
        <Form.Control type="text" name="from" value={formData.from} onChange={handleChange} placeholder="Enter origin" />
      </Form.Group>
      <Form.Group controlId="to">
        <Form.Label>To</Form.Label>
        <Form.Control type="text" name="to" value={formData.to} onChange={handleChange} placeholder="Enter destination" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Shipment
      </Button>
    </Form>
  );
};

export default AddShipment;
