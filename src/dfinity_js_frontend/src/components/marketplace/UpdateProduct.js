import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { updateProduct } from "../../utils/supplyChain";
import { toast } from "react-toastify";

const UpdateProduct = ({ product }) => {
  // State variables to store updated name and description
  const [updatedName, setUpdatedName] = useState(product.name);
  const [updatedDescription, setUpdatedDescription] = useState(product.description);

  // Function to handle changes in the name input field
  const handleNameChange = (e) => {
    setUpdatedName(e.target.value);
  };

  // Function to handle changes in the description textarea
  const handleDescriptionChange = (e) => {
    setUpdatedDescription(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create payload with updated data
    const payload = {
      id: product.id,
      name: updatedName,
      description: updatedDescription
    };
    try {
      // Call updateProduct function with payload
      await updateProduct(payload, BigInt(0), BigInt(0));
      // Show success toast
      toast.success("Product updated successfully!");
      // Reload the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      // Log error if update fails
      console.error("Error updating product:", error);
    }
    // Reset form fields to original values
    setUpdatedName(product.name);
    setUpdatedDescription(product.description);
  };

  return (
    <Form onSubmit={handleSubmit} className="m-2">
      {/* Input field for updated name */}
      <Form.Group controlId="updatedName" className="m-2">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={updatedName} onChange={handleNameChange} />
      </Form.Group>
      {/* Textarea for updated description */}
      <Form.Group controlId="updatedDescription" className="m-2">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={updatedDescription} onChange={handleDescriptionChange} />
      </Form.Group>
      {/* Submit button */}
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};

export default UpdateProduct;
