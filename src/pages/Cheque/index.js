import React, { useEffect, useState,useRef } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, Modal } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

import Axios from "../../helpers/axios_helper"
import ChequeRecordModal from "./model"
import TableLoader from "../../components/Common/TableLoader"

var tabledata = {
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
      label: "Bank Name",
      field: "bankAccount.name",
      sort: "asc",
      width: 100,
    },
    
    {
      label: "Account Title",
      field: "bankAccount.accountTitle",
      sort: "asc",
      width: 100,
    },
    {
      label: "Account Number",
      field: "bankAccount.accountNumber",
      sort: "asc",
      width: 100,
    },
    {
      label: "Cheque Number",
      field: "number",
      sort: "asc",
      width: 270,
    },
    {
      label: "Amount",
      field: "amount",
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

const DatatableTables = () => {

  const [listData, setListData] = useState(false);
  const [modal_center, setmodal_center] = useState(false)
  const selectedCheque = useRef(0)

  function showUpdateModal(id) {
    selectedCheque.current = id;
    setmodal_center(true);
  }

  const handleCallback = (details) =>{
    selectedCheque.current=0;
    setmodal_center(false);
    // alert(details.message)
    loadList();
  }

  const loadList = async () =>{
    setListData(false);
    await Axios.get("/cheque/list")
    .then((response) => { 
      if(response.data.status===200){
        response.data.data.map((item, index) => {
          item.action = (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="uil-trash-alt btn-primary"
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontSize: ".7em",
                  padding: ".3rem",
                  borderRadius: ".3rem"
                }}
                onClick={() => showUpdateModal(item.id)}
              >
                Details
              </button>
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
  }
  
  useEffect(async () => {
    loadList();
  },[]);

  return (
    <>
      <div className="page-content">
        <Breadcrumbs title="Cheque Record" breadcrumbItem="List of Cheque Record" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                {listData ?
                  <MDBDataTable 
                  responsive 
                  striped 
                  bordered 
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
              <h5 className="modal-title mt-0">Update Modal</h5>
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
              <ChequeRecordModal id={selectedCheque.current} handleCallback={handleCallback}/>
            </div>
          </Modal>
        </Col>
      </div>
      
    </>
  )
}

export default DatatableTables
