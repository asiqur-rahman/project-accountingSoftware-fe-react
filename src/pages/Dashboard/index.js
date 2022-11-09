import React, { useEffect, useState } from "react"
import { Row, Col, CardBody, Card, Progress } from "reactstrap"

//Import Components
import LineChart from "./line-chart"
import SalesAnalytics from "./sales-analytics"
import LatestTransaction from "./latest-transaction"

import Axios from "../../helpers/axios_helper"

const Dashboard = () => {

  const [topData, setTopData] = useState(false);
  const [last5transaction, setLast5transaction] = useState(false);

  useEffect(async () => {
    await Axios.get("/dashboard/topData").then((response) => { 
      setTopData(response.data[0]); });
    await Axios.get("/dashboard/last5transaction").then((response) => { 
        setLast5transaction(response.data.data); });
  },[]);

  return (
    <>
      <div className="page-content">
        <Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">Dashboard</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">Welcome to Accounting Pro Dashboard</li>
                </ol>
              </div>

            </div>
          </div>
        </Row>

        <Row>
          <Col lg={3}>
            <Card >
              <CardBody>
                <div className="d-flex align-items-start">
                  {/* <div className="avatar-sm font-size-20 me-3"> */}
                  <div className="font-size-20" style={{height:"2rem",width:"2rem",marginRight:"0.4rem"}}>
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-archive-arrow-down-outline"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-15 mt-2">Income Today</div>
                  </div>
                </div>
                <h4 className="mt-4">{topData ? topData.IncomeToday : 0} Tk.</h4> 
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
            <Card >
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="font-size-20" style={{height:"2rem",width:"2rem",marginRight:"0.4rem"}}>
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-archive-arrow-down"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-15 mt-2">Income This Month</div>
                  </div>
                </div>
                <h4 className="mt-4">{topData ? topData.IncomeThisMonth : 0} Tk.</h4> 
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
            <Card >
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="font-size-20" style={{height:"2rem",width:"2rem",marginRight:"0.4rem"}}>
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-archive-arrow-up-outline"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-15 mt-2">Today Expense</div>
                  </div>
                </div>
                <h4 className="mt-4">{topData ? topData.ExpenseToday : 0} Tk.</h4> 
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
            <Card >
              <CardBody lg={3}>
                <div className="d-flex align-items-start">
                  <div className="font-size-20" style={{height:"2rem",width:"2rem",marginRight:"0.4rem"}}>
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-archive-arrow-up"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-15 mt-2">Expense This Month</div>
                  </div>
                </div>
                <h4 className="mt-4">{topData ? topData.ExpenseThisMonth : 0} Tk.</h4> 
              </CardBody>
            </Card>
          </Col>
          <Col lg={8}>
            <LineChart/>
          </Col>
          <Col lg={4}>
            <SalesAnalytics/>
          </Col>
          <Col lg={12}>
            <LatestTransaction transactions={last5transaction}/>
          </Col>
        </Row>

      </div>
    </>
  )
}

export default Dashboard