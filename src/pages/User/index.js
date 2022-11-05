import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import TableLoader from "../../components/Common/TableLoader"
import Axios from "../../helpers/axios_helper"

const DatatableTables = () => {

  const [listData, setListData] = useState(false);

  var tabledata = {
    columns: [
      {
        label: "#Sl",
        field: "sl",
        sort: "asc",
        width: 150,
      },
      {
        label: "Firstname",
        field: "userDetail.firstName",
        sort: "asc",
        width: 100,
      },
      {
        label: "Lastname",
        field: "userDetail.lastName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Username",
        field: "username",
        sort: "asc",
        width: 270,
      },
      {
        label: "Email",
        field: "userDetail.email",
        sort: "asc",
        width: 270,
      },
      {
        label: "Role",
        field: "userDetail.role.name",
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

  useEffect(async () => {
    await Axios.get("/user/list")
    .then((response) => { 
      if(response.data.status===200){
        let userData = [];
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
                onClick={() => alert(item.id)}
              >
                Details
              </div>
            </div>
          );
          userData.push(item);
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
                  loading
                  data={listData} />
                  :
                  <TableLoader/>
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
