import React, { useEffect, useState } from "react"
import { Card, CardBody, Table, CardTitle, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap"
import { Link } from "react-router-dom"

const LatestTransaction = ( props ) => {
    
    const [last5transaction, setLast5transaction] = useState(false);

    useEffect(async () => {
        if(props.transactions)setLast5transaction(props.transactions)
    },[props.transactions]);

    return (
        <Col lg={12}>
            <Card>
                <CardBody>
                    <CardTitle className="h4 mb-4">Latest 5 Transactions</CardTitle>
                    <div className="table-responsive">
                        <Table className="table-centered">
                            <thead>
                                <tr>
                                    <th scope="col">#Sl</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Transaction No</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col" colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {last5transaction && last5transaction.map((item, i) =>{
                                    return (
                                        <tr key={i}>
                                            <td>{item.sl}</td>
                                            <td>{item.dateTime}</td>
                                            <td>{item.transactionNo}</td>
                                            <td>{item.description}</td>
                                            <td>{item.amount}</td>
                                            <td><Link to="#" className="btn btn-primary btn-sm">View Details</Link></td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </Table>
                    </div>
                </CardBody>
            </Card>
        </Col>
    )
}

export default LatestTransaction