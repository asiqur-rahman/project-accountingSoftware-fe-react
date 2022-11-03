import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"

const ExpenseAnalysis = ( props ) => {

  const [analysis, setAnalysis] = useState(false);

    useEffect(async () => {
        if(props.details){
          setAnalysis({
            series: props.details.value,//[38, 26, 14],
            options: {
              labels: props.details.key,//["Online", "Offline", "Marketing"],
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
        }
    },[props.details]);

    return (
      <>
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Expense Review</h4>

            <Row className="align-items-center">
              <Col sm={12}>
                {analysis &&
                  <ReactApexChart
                    options={analysis.options}
                    series={analysis.series}
                    type="donut"
                    height={245}
                    className="apex-charts"
                  />
                }
              </Col>
            </Row>
          </CardBody>
        </Card>
      </>
    )
}

export default ExpenseAnalysis
