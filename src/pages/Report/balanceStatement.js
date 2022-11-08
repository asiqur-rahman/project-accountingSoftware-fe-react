import React, { useEffect, useState, useRef } from "react"
import { Row, Col, Card, CardBody, Modal } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./treeView.scss"

import Axios from "../../helpers/axios_helper"

const BalanceStatement = () => {

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
    await Axios.get("/report/balance-sheet")
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

        <Breadcrumbs title="Char of Account" breadcrumbItem="Tree wise view" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                  <ol className="wtree">
                    {listData && listData.map((item1,i1)=>{
                      return(
                      <li key={i1}><span>{item1.name} <p>BDT {item1['accountBalances.amount']} Tk.</p></span>
                        <ol>
                          {item1.childs && item1.childs.map((item2,i2)=>{
                            return (
                              <li key={i2}>
                                <span>{item2.name} (<button onClick={() => showUpdateModal(item2.id)} style={{background:"none",border:"none",padding:"0",margin:"0",fontWeight:"bold",color:"blue"}}>Edit</button>)<p>BDT {item2['accountBalances.amount']} Tk.</p></span>
                                  <ol>
                                    {item2.childs && item2.childs.map((item3,i3)=>{
                                      return (
                                        <li key={i3}>
                                          <span>{item3.name} (<button onClick={() => showUpdateModal(item3.id)} style={{background:"none",border:"none",padding:"0",margin:"0",fontWeight:"bold",color:"blue"}}>Edit</button>)<p>BDT {item3['accountBalances.amount']} Tk.</p></span>
                                          <ol>
                                            {item3.childs && item3.childs.map((item4,i4)=>{
                                              return (
                                                <li key={i4}>
                                                  <span>{item4.name} (<button onClick={() => showUpdateModal(item4.id)} style={{background:"none",border:"none",padding:"0",margin:"0",fontWeight:"bold",color:"blue"}}>Edit</button>)<p>BDT {item4['accountBalances.amount']} Tk.</p></span>
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

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    </>
  )
}

export default BalanceStatement
