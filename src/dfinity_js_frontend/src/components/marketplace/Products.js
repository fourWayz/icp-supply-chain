import React, { useState,useEffect} from "react";
import { Card, Button, Row, Col,Modal } from 'react-bootstrap';
import { getAllProducts } from "../../utils/supplyChain";
import { Cart4, Eye } from 'react-bootstrap-icons';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const handleUpdateProduct = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  return (
    <div className="product-list">
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title>Product Name : {product.name}</Card.Title>
                <Card.Text>Product Description : {product.description}</Card.Text>
                <Card.Text>manufacturer : {product.manufacturer.slice(0, 6)}...</Card.Text>
                <Button variant="info" onClick={() => handleUpdateProduct(product)}>Update Product</Button>
                <Button variant="info"><Cart4 /> Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for updating product */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedProduct && <UpdateProduct product={selectedProduct} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllProducts;
