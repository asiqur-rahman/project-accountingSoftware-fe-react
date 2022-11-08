import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./treeView.scss"

import Axios from "../../helpers/axios_helper"

const DatatableTables = () => {

  const [listData, setListData] = useState(false);

  useEffect(async () => {
    // await Axios.get("/transaction/list")
    // .then((response) => { 
    //   if(response.data.status===200){
    //     let userData = [];
    //     response.data.data.map((item, index) => {
    //       item.action = (
    //         <div style={{ display: "flex", justifyContent: "space-between" }}>
    //           <div
    //             className="uil-trash-alt btn-primary"
    //             style={{
    //               cursor: "pointer",
    //               color: "white",
    //               fontSize: ".7em",
    //               padding: ".5rem",
    //               borderRadius: ".3rem"
    //             }}
    //             onClick={() => alert(item.id)}
    //           >
    //             Details
    //           </div>
    //         </div>
    //       );
    //       userData.push(item);
    //     });
    //     tabledata.rows=response.data.data;
    //     setListData(tabledata);
    //   }
    //   else{
    //     setListData(tabledata)
    //   }
    // }).catch(e=>{
    //   setListData(tabledata)
    // });
  },[]);

  return (
    <React.Fragment>
      <div className="page-content">

        <Breadcrumbs title="Transaction" breadcrumbItem="List of Transactions" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                
                

              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>

    </React.Fragment>
  )
}

export default DatatableTables
