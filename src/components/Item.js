import React from 'react'
import { Button, Card, CardTitle, CardText, CardBody, Col, Row } from 'reactstrap'

const Item = ({ name, preco, deleteItem }) => (
  <Card style={{ marginBottom: 10 }}>
    <CardBody>
      <CardTitle>{name}</CardTitle>
      <Row>
        <Col sm="10" xs="10">
          <CardText style={{ color: 'green' }}>
            R$ {parseFloat(preco).toFixed(2).replace('.', ',')}
          </CardText>
        </Col>
        <Col sm="2" xs="2">
          <Button color="danger" onClick={deleteItem}>X</Button>
        </Col>
      </Row>
    </CardBody>
  </Card>
)

export { Item }
