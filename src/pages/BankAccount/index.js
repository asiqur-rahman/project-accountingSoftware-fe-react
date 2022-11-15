import React, { useEffect, useState, useRef } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, Modal } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import Axios from "../../helpers/axios_helper"
import TableLoader from "../../components/Common/TableLoader"
import BankAccountModel from "./model"
import CustomModal from "../Common/CustomModal"

var tabledata = {
  columns: [
    {
      label: "#Sl",
      field: "sl",
      sort: "asc",
      width: 150,
    },
    {
      label: "Bank name",
      field: "name",
      sort: "asc",
      width: 100,
    },
    {
      label: "Account Title",
      field: "accountTitle",
      sort: "asc",
      width: 200,
    },
    {
      label: "Account Number",
      field: "accountNumber",
      sort: "asc",
      width: 270,
    },
    {
      label: "Desciption",
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

const DatatableTables = () => {

  const [listData, setListData] = useState(false)
  const [delete_modal_center, setDelete_modal_center] = useState(false)
  const [modal_center, setmodal_center] = useState(false)
  const selectedItem = useRef(0)

  function showUpdateModal(id) {
    selectedItem.current = id;
    setmodal_center(true);
  }

  const handleCallback = (details) =>{
    selectedItem.current=0;
    setmodal_center(false);
    // alert(details.message)
    loadList();
  }

  const modalCallback = async (result) =>{
    if(result){
      const status=selectedItem.current.status==1?0:1
      await Axios.patch(`/bank-account/changeStatus/${selectedItem.current.id}/${status}`)
        .then((response) => {
        if(response.data.status===200){
          loadList()
        }else{
          alert(response.data.message)
        }
        })
        .catch((e)=>{
            var e=e
        })
    }
    setDelete_modal_center(false);
  }

  const loadList = async () =>{
    setListData(false);
    await Axios.get("/bank-account/list")
    .then((response) => { 
      if(response.data.status===200){
        response.data.data.map((item, index) => {
          item.action = (
            <div style={{ display: "flex" }} className="customBtnArea">
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
              >Edit
              </button>
              
              <button
                className="uil-trash-alt btn-danger"
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontSize: ".7em",
                  padding: ".3rem",
                  borderRadius: ".3rem"
                }}
                onClick={() => {selectedItem.current={id:item.id,status:item.isActive}; setDelete_modal_center(true);}}
              >Delete
              </button>
            </div>
          );
        });
        tabledata.rows=response.data.data;
        setListData(tabledata);
      }
    }).catch(e=>{
      setListData(false)
    });
  }

  useEffect(async () => {
    loadList();
  },[]);

  return (
    <>
      <div className="page-content">

        <Breadcrumbs title="Bank Account" breadcrumbItem="List of Bank Accounts" />

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
              <h5 className="modal-title mt-0">Update Bank Account</h5>
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
              <BankAccountModel id={selectedItem.current} handleCallback={handleCallback}/>
            </div>
          </Modal>

          <CustomModal modelShow={delete_modal_center} handleCallback={modalCallback}/>
        </Col>
      </div>

    </>
  )
}

export default DatatableTables
