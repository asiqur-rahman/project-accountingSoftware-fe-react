import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"

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

  useEffect(async () => {
    await Axios.get("/cheque/list")
    .then((response) => { 
      if(response.data.status===200){
        response.data.data.map((item, index) => {
          item.action = (
            <Link to={`/cheque/${item.id}`} style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                className="uil-trash-alt btn-primary"
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontSize: ".7em",
                  padding: ".5rem",
                  borderRadius: ".3rem"
                }}
                onClick={() => alert(item.id)}
              >
                Details
              </div>
            </Link>
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
    <React.Fragment>
      <div className="page-content">

        <Breadcrumbs title="Cheque Record" breadcrumbItem="List of Cheque Record" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                {listData &&
                  <MDBDataTable 
                  responsive 
                  striped 
                  bordered 
                  loading
                  data={listData} />
                }
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>

    </React.Fragment>
  )
}

export default DatatableTables
