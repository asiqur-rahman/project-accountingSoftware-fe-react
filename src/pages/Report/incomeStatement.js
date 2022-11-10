import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label
} from "reactstrap"

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./treeView.scss"
import TableLoader from "../../components/Common/TableLoader"
import Axios from "../../helpers/axios_helper"
const moment = require('moment');

const IncomeStatement = () => {

  const [listData, setListData] = useState(false)
  const [fromDateTime, setFromDateTime] = useState(moment().format("YYYY-MM-DD"))
  const [toDateTime, setToDateTime] = useState(moment().format("YYYY-MM-DD"))

  const loadList =async ()=>{
    const data={
      fromDate:fromDateTime,
      todate:toDateTime
    }
    await Axios.post("/report/income-statement",data)
    .then((response) => { 
      if(response.data.status===200){
        setListData(response.data.data);
      }
      else{
        setListData(false)
      }
    }).catch(e=>{
      setListData(false)
    })
  }

  // useEffect(async () => {
  //   loadList();
  // },[]);

  return (
    <>
      <div className="page-content">

        <Breadcrumbs title="Report" breadcrumbItem="Tree wise report view" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row>
                  <Col md="5">
                    <div className="mb-3">
                        <Label>From Date</Label>
                        <Flatpickr
                                name="dateTime"
                                className="form-control d-block"
                                placeholder="dd M, yyyy"
                                options={{
                                    altInput: true,
                                    altFormat: "F j, Y",
                                    dateFormat: "Y-m-d",
                                    defaultDate: "today"
                                }}
                                onChange={(selectedDates, dateStr, instance) => {
                                // const firstDate = selectedDates[0];
                                // console.log({ firstDate, dateStr });
                                setFromDateTime(dateStr);
                            }}
                        />
                    </div>
                  </Col>
                  <Col md="5">
                    <div className="mb-3">
                        <Label>To Date</Label>
                        <Flatpickr
                                name="dateTime"
                                className="form-control d-block"
                                placeholder="dd M, yyyy"
                                options={{
                                    altInput: true,
                                    altFormat: "F j, Y",
                                    dateFormat: "Y-m-d",
                                    defaultDate: "today"
                                }}
                                onChange={(selectedDates, dateStr, instance) => {
                                // const firstDate = selectedDates[0];
                                // console.log({ firstDate, dateStr });
                                setToDateTime(dateStr);
                            }}
                        />
                    </div>
                  </Col>
                  <Col style={{textAlign: 'right'}}>
                    <Button color="primary" onClick={()=>loadList()} type="button" style={{position:'absolute',bottom:'17%',right:'10%'}}>
                        Search
                    </Button>
                  </Col>
                </Row>
                  <ol className="wtree">
                    {listData && 
                    <>
                      <Col style={{textAlign:'center', margin:"15px 0"}}><h5>Income Statement Report</h5></Col>
                      <li><span>Income <p>BDT {listData.incomeTotal} Tk.</p></span>
                        <ol>
                          {listData.incomeData.map((item2,i2)=>{
                            return (
                              <li key={i2}>
                                <span>{item2['creditAccount.name']} <p>BDT {item2.amount} Tk.</p></span>
                              </li>
                            )
                          })}
                        </ol>
                      </li>

                      <li><span>Expense <p>BDT {listData.expenseTotal} Tk.</p></span>
                      <ol>
                        {listData.expenseData.map((item2,i2)=>{
                          return (
                            <li key={i2}>
                              <span>{item2['debitAccount.name']} <p>BDT {item2.amount} Tk.</p></span>
                            </li>
                          )
                        })}
                      </ol>
                      </li>

                      {/* <li style="font-weight: bold; font-size: 18px;">
                          <span>Net Income<p>BDT {listData.incomeTotal-listData.expenseRotal} Tk.</p></span>
                      </li> */}
                    </>
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

export default IncomeStatement
