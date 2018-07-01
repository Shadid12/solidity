import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../etherium/factory';
import web3 from '../../etherium/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        const accounts = await web3.eth.getAccounts();
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
              .createCampaign(this.state.minimumContribution)
              .send({
                from: accounts[0]
              });
            
              Router.pushRoute('/');
          } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };
  
    render() {
    return (
      <Layout>
        <h1>New Campaign!</h1>
        <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>
          
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;