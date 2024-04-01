import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { updateProduct } from "../../utils/supplyChain";

const UpdateProduct = ({ product }) => {
  const [updatedName, setUpdatedName] = useState(product.name);
  const [updatedDescription, setUpdatedDescription] = useState(product.description);

  const handleNameChange = (e) => {
    setUpdatedName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setUpdatedDescription(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const payload = {
        id : product.id,
        name : updatedName,
        description : updatedDescription
    }
    await updateProduct(
        payload,
        BigInt(0),
        BigInt(0)
      );
      toast.success("Product updated successfully!")
    // Reset form fields
    setUpdatedName(product.name);
    setUpdatedDescription(product.description);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="updatedName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={updatedName} onChange={handleNameChange} />
      </Form.Group>
      <Form.Group controlId="updatedDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={updatedDescription} onChange={handleDescriptionChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};

export default UpdateProduct;
