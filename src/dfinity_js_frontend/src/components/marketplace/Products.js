import React, { useState,useEffect} from "react";
import { Card, Button } from 'react-bootstrap';
import { getAllProducts } from "../../utils/supplyChain";
import { Cart4, Eye } from 'react-bootstrap-icons';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        console.log(fetchProducts)
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <Card key={product.id} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>{product.manufacturer}</Card.Text>
            <Button variant="primary"><Eye /> View Details</Button>
            <Button variant="info"><Cart4 /> Add to Cart</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AllProducts;
