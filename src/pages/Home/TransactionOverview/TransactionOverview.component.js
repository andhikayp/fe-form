import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsQuestionCircleFill } from 'react-icons/bs';

const StatusBox = ({ status, count, variant }) => (
  <Col xs={12} md={4} className="mt-3">
    <Card className="bg-light">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center text-secondary">
          <span>{status}</span>
          <BsQuestionCircleFill />
        </div>
        <div
          style={{ fontSize: '48px', fontWeight: 'bolder' }}
          className={`mt-4 text-${variant}`}
        >
          {count || 0}
        </div>
      </Card.Body>
    </Card>
  </Col>
);

const TransactionOverview = (props) => {
  const { transactionOverview } = props;

  return (
    <Card
      className="p-3"
    >
      <Card.Title className="mb-4">Status Overview</Card.Title>
      <Row>
        <StatusBox status="Awaiting" count={transactionOverview?.WAITING} variant="warning" />
        <StatusBox status="Successfully" count={transactionOverview?.APPROVED} variant="success" />
        <StatusBox status="Rejected" count={transactionOverview?.REJECTED} variant="danger" />
      </Row>
    </Card>
  );
};

export default TransactionOverview;
