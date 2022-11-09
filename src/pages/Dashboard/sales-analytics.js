import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import TableLoader from "../../components/Common/TableLoader"
import Axios from "../../helpers/axios_helper"

const ExpenseAnalysis = ( props ) => {

  const [analysis, setAnalysis] = useState(false);

  const loadData = async (days=7) =>{
      await Axios.get(`/dashboard/expenseAccountReview`)
          .then((response) => { 
              const details = response.data;
              setAnalysis({
                series: details.value,//[38, 26, 14],
                options: {
                  labels: details.key,//["Online", "Offline", "Marketing"],
                  plotOptions: {
                    pie: {
                      donut: {
                        size: '70%'
                      }
                    }
                  },
                  legend: {
                    show: false,
                  },
                  // colors: ['#3b5de7', '#45cb85', '#eeb902'],
                },
              })
          });
    }

    useEffect(async () => {
        loadData();
    },[]);

    return (
      <>
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Expense Review</h4>

            <Row className="align-items-center" style={{minHeight:analysis?"260px":"0px"}}>
              <Col sm={12}>
                {analysis ?
                  <ReactApexChart
                    options={analysis.options}
                    series={analysis.series}
                    type="donut"
                    height={245}
                    className="apex-charts"
                  />:
                  <TableLoader/>
                }
              </Col>
            </Row>
          </CardBody>
        </Card>
      </>
    )
}

export default ExpenseAnalysis
