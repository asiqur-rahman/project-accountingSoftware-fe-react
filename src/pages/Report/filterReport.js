import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./treeView.scss"
import TableLoader from "../../components/Common/TableLoader"
import Axios from "../../helpers/axios_helper"

const BalanceStatement = () => {

  const [listData, setListData] = useState(false)

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
                    {listData ? <>
                      <li><span>Assets <p>BDT {listData.assetsTotal} Tk.</p></span>
                        <ol>
                          {listData.assetsData.map((item2,i2)=>{
                            return (
                              <li key={i2}>
                                <span>{item2.name} <p>BDT {item2['accountBalances.amount']} Tk.</p></span>
                                  <ol>
                                    {item2.childs && item2.childs.map((item3,i3)=>{
                                      return (
                                        <li key={i3}>
                                          <span>{item3.name} <p>BDT {item3['accountBalances.amount']} Tk.</p></span>
                                          <ol>
                                            {item3.childs && item3.childs.map((item4,i4)=>{
                                              return (
                                                <li key={i4}>
                                                  <span>{item4.name} <p>BDT {item4['accountBalances.amount']} Tk.</p></span>
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

                      <li><span>Liabilities <p>BDT {listData.liabilitiesTotal} Tk.</p></span>
                      <ol>
                        {listData.liabilitiesData.map((item2,i2)=>{
                          return (
                            <li key={i2}>
                              <span>{item2.name} <p>BDT {item2['accountBalances.amount']} Tk.</p></span>
                                <ol>
                                  {item2.childs && item2.childs.map((item3,i3)=>{
                                    return (
                                      <li key={i3}>
                                        <span>{item3.name} <p>BDT {item3['accountBalances.amount']} Tk.</p></span>
                                        <ol>
                                          {item3.childs && item3.childs.map((item4,i4)=>{
                                            return (
                                              <li key={i4}>
                                                <span>{item4.name} <p>BDT {item4['accountBalances.amount']} Tk.</p></span>
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

                      <li><span>Equities <p>BDT {listData.equitiesTotal} Tk.</p></span>
                      <ol>
                        {listData.equitiesData.map((item2,i2)=>{
                          return (
                            <li key={i2}>
                              <span>{item2.name} <p>BDT {item2['accountBalances.amount']} Tk.</p></span>
                                <ol>
                                  {item2.childs && item2.childs.map((item3,i3)=>{
                                    return (
                                      <li key={i3}>
                                        <span>{item3.name} <p>BDT {item3['accountBalances.amount']} Tk.</p></span>
                                        <ol>
                                          {item3.childs && item3.childs.map((item4,i4)=>{
                                            return (
                                              <li key={i4}>
                                                <span>{item4.name} <p>BDT {item4['accountBalances.amount']} Tk.</p></span>
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
                    </>: <TableLoader/>
                    }
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
