import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { getAllShipments } from '../utils/api';
import { Truck, Eye } from 'react-bootstrap-icons';

const AllShipments = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const fetchedShipments = await getAllShipments();
        setShipments(fetchedShipments);
      } catch (error) {
        console.error('Error fetching shipments:', error);
      }
    };
    fetchShipments();
  }, []);

  return (
    <div className="shipment-list">
      {shipments.map((shipment) => (
        <Card key={shipment.id} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Shipment ID: {shipment.id}</Card.Title>
            <Card.Text>
              From: {shipment.from}<br />
              To: {shipment.to}<br />
              Status: {shipment.status}
            </Card.Text>
            <Button variant="primary"><Eye /> View Details</Button>
            <Button variant="info"><Truck /> Track Shipment</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AllShipments;
