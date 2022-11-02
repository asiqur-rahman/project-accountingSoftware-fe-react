import React from "react"
import { Row, Col, CardBody, Card, Progress } from "reactstrap"
import { Link } from "react-router-dom"

//Import Components
import LineChart from "./line-chart"
import RevenueChart from "./revenue-chart"
import SalesAnalytics from "./sales-analytics"
import ScatterChart from "./scatter-analytics"
import LatestTransaction from "./latest-transaction"

//Import Image
import widgetImage from "../../assets/images/widget-img.png"
import Overview from "./Overview";
import Reviews from './Reviews';
import Revenue from './Revenue';
import Inbox  from './Inbox';

const Dashboard = () => {

  return (
    <React.Fragment>
      <div className="page-content">
  
        <Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">Dashboard</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">Welcome to BT_Solution Dashboard</li>
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
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-archive-arrow-down-outline"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Income Today</div>
                  </div>
                </div>
                <h4 className="mt-4">1,368 Tk.</h4> 
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
            <Card >
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-archive-arrow-down"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Income This Month</div>
                  </div>
                </div>
                <h4 className="mt-4">1,368 Tk.</h4> 
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
            <Card >
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-archive-arrow-up-outline"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Today Expense</div>
                  </div>
                </div>
                <h4 className="mt-4">1,368 Tk.</h4> 
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
            <Card >
              <CardBody lg={3}>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-archive-arrow-up"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Expense This Month</div>
                  </div>
                </div>
                <h4 className="mt-4">1,368 Tk.</h4> 
              </CardBody>
            </Card>
          </Col>
          <Col lg={8}>
            <LineChart />
          </Col>
          <Col lg={4}>
            <SalesAnalytics />
          </Col>
          <LatestTransaction />
        </Row>

      </div>
    </React.Fragment>
  )
}

export default Dashboard