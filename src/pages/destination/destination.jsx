import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, Spin } from 'antd';

const { Title, Text } = Typography;

const Destination = () => {
  const { id } = useParams();

  return (
    <Card>
      <Title level={2}>Destination Page</Title>
      <Text>This is a placeholder for the destination page with ID: {id}</Text>
    </Card>
  );
};

export default Destination;