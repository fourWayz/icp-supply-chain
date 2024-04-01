import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getProductDetails } from '../utils/api';

const ProductDetails = () => {
  // State to manage the input value for product ID
  const [productId, setProductId] = useState('');
  
  // State to store the fetched product details
  const [product, setProduct] = useState(null);

  // Handle form submission to fetch product details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to fetch product details using the product ID
      const fetchedProduct = await getProductDetails(productId);
      // Update state with fetched product details
      setProduct(fetchedProduct);
    } catch (error) {
      // Handle error if fetching product details fails
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div>
      {/* Form to input product ID and fetch details */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productId">
          <Form.Label>Product ID</Form.Label>
          <Form.Control 
            type="text" 
            value={productId} 
            onChange={(e) => setProductId(e.target.value)} 
            placeholder="Enter product ID" 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Get Product Details
        </Button>
      </Form>
      
      {/* Display product details if available */}
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
