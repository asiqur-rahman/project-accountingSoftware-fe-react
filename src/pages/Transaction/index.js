import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, Modal } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import TableLoader from "../../components/Common/TableLoader"
import Axios from "../../helpers/axios_helper"

var tabledata = {
  columns: [
    {
      label: "#Sl",
      field: "sl",
      sort: "asc",
      width: 150,
    },
    {
      label: "Transaction No",
      field: "transactionNo",
      sort: "asc",
      width: 100,
    },
    {
      label: "Date",
      field: "datetime",
      sort: "asc",
      width: 200,
    },
    {
      label: "Amount",
      field: "amount",
      sort: "asc",
      width: 270,
    },
    {
      label: "Description",
      field: "description",
      sort: "asc",
      width: 270,
    },
    {
      label: "Action",
      field: "action",
      sort: "asc",
      width: 100,
    }
  ],
  rows:[]
};

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
      field: "transaction.dateTime",
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

const DatatableTables = () => {

  const [listData, setListData] = useState(false);
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

  const deleteTran = async (id) => {
    await Axios.delete(`/transaction/id/${id}`)
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
    await Axios.get("/transaction/list")
    .then((response) => { 
      if(response.data.status===200){
        response.data.data.map((item, index) => {
          item.action = (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                className="uil-trash-alt btn-primary"
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontSize: ".7em",
                  padding: ".5rem",
                  borderRadius: ".3rem"
                }}
                onClick={() => showDetails(item.id)}
              >
                Details
              </div>

              <div
                className="uil-trash-alt btn-danger"
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontSize: ".7em",
                  padding: ".5rem",
                  borderRadius: ".3rem"
                }}
                onClick={() => deleteTran(item.id)}
              >
                Delete
              </div>
            </div>
          );
        });
        tabledata.rows=response.data.data;
        setListData(tabledata);
      }
      else{
        setListData(tabledata)
      }
    }).catch(e=>{
      setListData(tabledata)
    });
  },[]);

  return (
    <>
      <div className="page-content">

        <Breadcrumbs title="Transaction" breadcrumbItem="List of Transactions" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                {listData ?
                  <MDBDataTable 
                  responsive 
                  striped 
                  bordered 
                  hover
                  noBottomColumns={true} 
                  data={listData} />
                  :
                  <TableLoader/>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
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
                  hover
                  noBottomColumns={true} 
                  data={transactionDetails} />
                  :
                  <TableLoader/>
                }
              </CardBody>
            </div>
          </Modal>
        </Col>
      </div>

    </>
  )
}

export default DatatableTables
