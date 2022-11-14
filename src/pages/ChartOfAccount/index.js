import React, { useEffect, useState, useRef } from "react"
import { Row, Col, Card, CardBody, Modal } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./treeView.scss"
import ChartOfAccountModel from "./model"
import TableLoader from "../../components/Common/TableLoader"

import Axios from "../../helpers/axios_helper"

const ChartOfAccount = () => {

  const [listData, setListData] = useState(false)
  const [modal_center, setmodal_center] = useState(false)
  const selectedDataId = useRef(0);

  function showUpdateModal(id) {
    selectedDataId.current = id; 
    setmodal_center(true);
  }

  const handleCallback = (details) =>{
    selectedDataId.current=0;
    setmodal_center(false);
    loadList();
  }

  const loadList =async ()=>{
    await Axios.get("/account/treeWiseData")
    .then((response) => { 
      if(response.data.status===200){
        setListData(response.data.data);
      }
      else{
        setListData([])
      }
    }).catch(e=>{
      setListData([])
    })
  }

  useEffect(async () => {
    loadList();
  },[]);

  return (
    <>
      <div className="page-content">

        <Breadcrumbs title="Char of Account" breadcrumbItem="Char of Account List" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                {listData ? 
                  <ol className="wtree">
                    {listData.map((item1,i1)=>{
                      return(
                      <li key={i1}><span>{item1.name} <p> {item1['accountBalances.amount']} Tk.</p></span>
                        <ol>
                          {item1.childs && item1.childs.map((item2,i2)=>{
                            return (
                              <li key={i2}>
                                <span>{item2.name} (<button onClick={() => showUpdateModal(item2.id)} style={{background:"none",border:"none",padding:"0",margin:"0",fontWeight:"bold",color:"blue"}}>Edit</button>)<p> {item2['accountBalances.amount']} Tk.</p></span>
                                  <ol>
                                    {item2.childs && item2.childs.map((item3,i3)=>{
                                      return (
                                        <li key={i3}>
                                          <span>{item3.name} (<button onClick={() => showUpdateModal(item3.id)} style={{background:"none",border:"none",padding:"0",margin:"0",fontWeight:"bold",color:"blue"}}>Edit</button>)<p> {item3['accountBalances.amount']} Tk.</p></span>
                                          <ol>
                                            {item3.childs && item3.childs.map((item4,i4)=>{
                                              return (
                                                <li key={i4}>
                                                  <span>{item4.name} (<button onClick={() => showUpdateModal(item4.id)} style={{background:"none",border:"none",padding:"0",margin:"0",fontWeight:"bold",color:"blue"}}>Edit</button>)<p> {item4['accountBalances.amount']} Tk.</p></span>
                                                </li>
                                              )
                                            })}
                                          </ol>
                                        </li>
                                      )
                                    })}
                                  </ol>
                            </li>
                            )
                          })}
                        </ol>
                      </li>
                      )
                    })}
                  </ol>
                :<TableLoader/>}
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
              <h5 className="modal-title mt-0">Update Chart Of Account</h5>
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
              <ChartOfAccountModel id={selectedDataId.current} handleCallback={handleCallback}/>
            </div>
          </Modal>
        </Col>
      </div>

    </>
  )
}

export default ChartOfAccount
