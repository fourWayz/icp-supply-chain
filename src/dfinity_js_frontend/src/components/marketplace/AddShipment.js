import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addShipment } from "../../utils/supplyChain";

const AddShipment = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    productId: '',
    from: '',
    to: '',
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call addShipment function with form data
      await addShipment(
        formData,
        BigInt(0),
        BigInt(0));
      
      // Display success toast message
      toast.success('Shipment added successfully');
      
      // Reload the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000); 
    } catch (error) {
      // Display error toast message
      toast.error('Error adding shipment');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Product ID input field */}
      <Form.Group controlId="productId">
        <Form.Label>Product ID</Form.Label>
        <Form.Control type="text" name="productId" value={formData.productId} onChange={handleChange} placeholder="Enter product ID" />
      </Form.Group>
      
      {/* From input field */}
      <Form.Group controlId="from">
        <Form.Label>From</Form.Label>
        <Form.Control type="text" name="from" value={formData.from} onChange={handleChange} placeholder="Enter origin" />
      </Form.Group>
      
      {/* To input field */}
      <Form.Group controlId="to">
        <Form.Label>To</Form.Label>
        <Form.Control type="text" name="to" value={formData.to} onChange={handleChange} placeholder="Enter destination" />
      </Form.Group>
      
      {/* Submit button */}
      <Button variant="primary" type="submit" className="m-2">
        Add Shipment
      </Button>
    </Form>
  );
};

export default AddShipment;
