import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card } from 'antd';

const { Title, Text } = Typography;

const Booking = () => {
  const { type, id } = useParams();

  return (
    <Card>
      <Title level={2}>Booking Page</Title>
      <Text>This is a placeholder for the booking page.</Text>
      <Text>Booking Type: {type}</Text>
      <Text>Booking ID: {id}</Text>
    </Card>
  );
};

export default Booking;