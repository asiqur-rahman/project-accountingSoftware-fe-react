import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label
} from "reactstrap"
import Select from "react-select";
import { MDBDataTable } from "mdbreact"
import downloadExcel from '../../helpers/dataExport_helper';

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./treeView.scss"
import Axios from "../../helpers/axios_helper"
const moment = require('moment');

var tableData = {
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
      field: "name",
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

const IncomeStatement = () => {

  const [listData, setListData] = useState(false)
  const [allAccounts, setAllAccounts] = useState([])
  const [selectedMulti, setselectedMulti] = useState(false);
  const [fromDateTime, setFromDateTime] = useState(moment().format("YYYY-MM-DD"))
  const [toDateTime, setToDateTime] = useState(moment().format("YYYY-MM-DD"))

  const loadList =async ()=>{
    setListData(false)
    var accounts=[];
    if(selectedMulti.length > 0){
      selectedMulti.forEach(account=>{
        accounts.push(account.value)
      })
    }else{
      accounts.push(0)
    }
    const data={
      fromDate:fromDateTime,
      toDate:toDateTime,
      accounts: accounts.join(',')
    }
    await Axios.post("/report/custom-report",data)
    .then((response) => { 
      if(response.data.status===200){
        tableData.rows=response.data.data;
        setListData(tableData);
      }
      else{
        setListData(false)
      }
    }).catch(e=>{
      setListData(false)
    })
  }

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }

  useEffect(async () => {
    await Axios.get("/account/allDD")
        .then((response) => { 
        if(response.data.status===200){
            setAllAccounts(response.data.data);
        }
        else{
            setAllAccounts([])
        }
    });
  },[]);

  return (
    <>
      <div className="page-content">

        <Breadcrumbs title="Report" breadcrumbItem="Daily Transaction Report" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row>
                  <Col md="3">
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
                  <Col md="3">
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
                  <Col md="4">
                    <div className="mb-3">
                      <label className="control-label">Chart of Account</label>
                      <Select
                        value={selectedMulti}
                        placeholder="All Chart of Accounts"
                        isMulti={true}
                        onChange={(e) => {
                          handleMulti(e);
                        }}
                        options={allAccounts}
                        classNamePrefix="select2-selection"
                      />
                  </div>
                  </Col>
                  <Col style={{textAlign: 'right'}}>
                    <Button color="primary" onClick={()=>loadList()} type="button" style={{position:'absolute',bottom:'17%',right:'10%'}}>
                        Search
                    </Button>
                  </Col>
                </Row>
                  
                {listData &&
                  <MDBDataTable 
                  responsive 
                  striped 
                  bordered 
                  hover
                  noBottomColumns={true}
                  autoResetPage={false}
                  data={listData} />
                }

              {listData && listData.rows && 
                <Col className="col-12" style={{textAlign:"center"}}>
                  <Button
                    onClick={() => {
                      downloadExcel(listData.rows, 'Transaction Report')
                    }}
                    color="success"
                    className="btn btn-success mt-3 mt-lg-0 col-md-4 col-lg-2"
                    >Export to CSV
                  </Button>
                </Col>
              }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    </>
  )
}

export default IncomeStatement
