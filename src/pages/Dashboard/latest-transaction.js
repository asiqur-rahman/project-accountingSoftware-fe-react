import React, { useEffect, useState } from "react"
import { Card, CardBody, Table, CardTitle, Col, Modal } from "reactstrap"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"
import TableLoader from "../../components/Common/TableLoader"
import Axios from "../../helpers/axios_helper"


var transactionDetailsData = {
    columns: [
      {
        label: "#Sl",
        field: "sl",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date",
        field: "dateTime",
        sort: "asc",
        width: 200,
      },
      {
        label: "Name",
        field: "chartOfAccount.name",
        sort: "asc",
        width: 100,
      },
      {
        label: "Debit",
        field: "debit",
        sort: "asc",
        width: 270,
      },
      {
        label: "Credit",
        field: "credit",
        sort: "asc",
        width: 270,
      }
    ],
    rows:[]
  };

const LatestTransaction = ( props ) => {
    
    const [last5transaction, setLast5transaction] = useState(false);
    const [modal_center, setmodal_center] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState(false)

    const showDetails = async (id) => {
        await Axios.get(`/transaction/details/${id}`)
        .then((response) => { 
          if(response.data.status===200){
            transactionDetailsData.rows=response.data.data;
            setTransactionDetails(transactionDetailsData);
            setmodal_center(true);
          }
          else{
            setTransactionDetails(false)
          }
        }).catch(e=>{
          setTransactionDetails(false)
        });
      }

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
                                            <td><button onClick={() => showDetails(item.id)} className="btn btn-primary btn-sm">View Details</button></td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </Table>
                    </div>
                </CardBody>
            </Card>
            <Col>
                <Modal
                    size="lg"
                    isOpen={modal_center}
                    centered={true}
                >
                    <div className="modal-header">
                    <h5 className="modal-title mt-0">Transaction Details</h5>
                    <button
                        type="button"
                        onClick={() => {
                        setmodal_center(false)
                        }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    > 
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body" style={{padding:"0"}}>
                    <CardBody>
                    {transactionDetails ?
                        <MDBDataTable 
                        responsive 
                        striped 
                        bordered 
                        data={transactionDetails} />
                        :
                        <TableLoader/>
                        }
                    </CardBody>
                    </div>
                </Modal>
            </Col>
        </Col>
    )
}

export default LatestTransaction