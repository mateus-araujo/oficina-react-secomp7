import React, { Component } from 'react'
import { Alert, Button, Card, CardBody, Col, Form, FormGroup, Label, Input } from 'reactstrap'
import { Item } from '../components'

class List extends Component {
  state = {
    name: '',
    preco: '',
    totalItens: '',
    list: []
  }

  async componentDidMount() {
    const list = await localStorage.getItem('secomp-7@list')
    this.setState({ list: JSON.parse(list) })

    this.calculateTotal()
  }

  calculateTotal = () => {
    let totalItens = 0

    if (this.state.list)
      this.state.list.map(item => totalItens = totalItens + parseFloat(item.preco))

    this.setState({ totalItens: totalItens })
  }

  deleteItem = async (id) => {
    let updatedList = []

    updatedList = this.state.list.filter(item => item.id !== id)
    await this.setState({ list: updatedList })
    localStorage.setItem('secomp-7@list', JSON.stringify(updatedList))

    this.calculateTotal()
  }

  addItem = async () => {
    if (!this.state.name.length || !this.state.preco.length)
      alert("Preencha os campos corretamente")
    else {
      let updatedList = []

      if (this.state.list)
        updatedList = this.state.list

      const id = Math.random() * (1000 - 1) + 1
      updatedList.push({ id: id, name: this.state.name, preco: this.state.preco })

      await this.setState({ list: updatedList, name: '', preco: 0 })
      localStorage.setItem('secomp-7@list', JSON.stringify(updatedList))

      this.calculateTotal()
    }
  }

  render() {
    const total = this.props.total - this.state.totalItens

    return (
      <div className="Post-List">
        <Card style={{ marginBottom: 30 }}>
          <CardBody>
            <Alert color={total >= 0 ? 'success' : 'danger'}>
              Seu total é de: R$ {(this.props.total - this.state.totalItens).toFixed(2).replace('.', ',')}
            </Alert>

            <Form>
              <FormGroup>
                <Label>Item</Label>
                <Input
                  onChange={e => this.setState({ name: e.target.value })}
                  value={this.state.name}
                />
              </FormGroup>

              <FormGroup>
                <Label>Preço</Label>
                <Input
                  type="number"
                  onChange={e => this.setState({ preco: e.target.value })}
                  value={this.state.preco}
                />
              </FormGroup>

              <FormGroup>
                <Col sm={{ offset: 10 }} xs={{ offset: 9 }}>
                  <Button color="primary" onClick={this.addItem.bind(this)}>
                    Adicionar
                </Button>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>

        {this.state.list ?
          this.state.list.map(item =>
            <Item
              key={item.id}
              name={item.name}
              preco={item.preco}
              deleteItem={() => this.deleteItem(item.id)}
            />
          )
          : null
        }
      </div>
    )
  }
}

export { List }
