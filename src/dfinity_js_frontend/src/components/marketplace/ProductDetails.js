import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getProductDetails } from '../utils/api';

const ProductDetails = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedProduct = await getProductDetails(productId);
      setProduct(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productId">
          <Form.Label>Product ID</Form.Label>
          <Form.Control type="text" value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="Enter product ID" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Get Product Details
        </Button>
      </Form>
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
