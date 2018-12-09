import React, { Component } from 'react'
import { Col, Input, Row } from 'reactstrap'

import { Header, List } from './components'
import './App.css'

class App extends Component {
  state = {
    total: 0
  }

  componentDidMount() {
    const total = localStorage.getItem('secomp-7@total')
    this.setState({ total })
  }

  updateTotal = (total) => {
    this.setState({ total })
    localStorage.setItem('secomp-7@total', total)
  }

  render() {
    return (
      <div className="App">
        <Header title="Oficina React">
          <Row>
            <Col sm="1" xs="1" style={{ display: 'flex', alignItems: 'center' }}>
              R$
            </Col>
            <Col sm="11" xs="11">
              <Input
                placeholder="Quanto você tem?"
                type="number"
                onChange={e => this.updateTotal(e.target.value)}
                value={this.state.total}
              />
            </Col>
          </Row>
        </Header>

        <List total={this.state.total} />
      </div>
    )
  }
}

export default App
