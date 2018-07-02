import React, { Component } from 'react';
import { Button, Table, Label } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../etherium/campaign';
import web3 from '../../../etherium/web3';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
    
        const requests = await Promise.all(
          Array(requestCount)
            .fill()
            .map((element, index) => {
              return campaign.methods.requests(index).call();
            })
        );
    
        return { address, requestCount, requests };
    }  

    renderRows() {
        return this.props.requests.map((request, index) => {
          return (
            <Table.Row>
                <Table.Cell>
                    <Label ribbon>First</Label>
                </Table.Cell>
            </Table.Row>
          );
        });
    }

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);
    
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
          from: accounts[0]
        });
    };

    render() {
        return (
            <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                <Button primary>Add Request</Button>
                </a>
            </Link>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Recipient</Table.HeaderCell>
                        <Table.HeaderCell>Approval</Table.HeaderCell>
                        <Table.HeaderCell>Approve</Table.HeaderCell>
                        <Table.HeaderCell>Finalize</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        this.props.requests.map((request, index) => {
                            return(
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <Label ribbon>{index}</Label>
                                    </Table.Cell>
                                    <Table.Cell>{request[0]}</Table.Cell>
                                    <Table.Cell>{web3.utils.fromWei(request.value, 'ether')}</Table.Cell>
                                    <Table.Cell>{request.recipient}</Table.Cell>
                                    <Table.Cell>{request.approvalCount}</Table.Cell>
                                    <Table.Cell>
                                    <Button color="green" basic onClick={async () => {
                                        const campaign = Campaign(this.props.address);
                                        const accounts = await web3.eth.getAccounts();
                                        try {
                                            await campaign.methods.approveRequest(index).send({
                                                from: accounts[0]
                                            });
                                        } catch(err) {
                                            console.log(err);
                                        }
                                    }}>
                                        Approve
                                    </Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                    <Button color="teal" basic onClick={async () => {
                                        const campaign = Campaign(this.props.address);
                                        const accounts = await web3.eth.getAccounts();
                                        try {
                                            await campaign.methods.finalizeRequest(index).send({
                                                from: accounts[0]
                                            });
                                        } catch(err) {
                                            console.log(err);
                                        }
                                    }}>
                                        Finalize
                                    </Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
            </Layout>
        );
    }
}

export default RequestIndex;