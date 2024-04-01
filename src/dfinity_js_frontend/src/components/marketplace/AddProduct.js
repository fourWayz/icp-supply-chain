import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { addProduct } from "../../utils/supplyChain";
import { toast } from 'react-toastify';


const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(
        formData,
        BigInt(0),
        BigInt(0)
      );
      toast.success("Product added successfully")
    } catch (error) {
      toast.error("Error adding product")
      console.error('Error adding product:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter product name" />
      </Form.Group>
      <Form.Group controlId="productDescription">
        <Form.Label>Product Description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
};

export default AddProduct;
