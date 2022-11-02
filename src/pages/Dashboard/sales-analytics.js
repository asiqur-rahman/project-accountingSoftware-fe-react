import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"

const SalesAnalysis = ( props ) => {

  const [analysis, setAnalysis] = useState(false);

    useEffect(async () => {
        // if(props.transactions)setLast5transaction(props.transactions)
        if(props.details){
          setAnalysis({
            series: [38, 26, 14],
            options: {
              labels: ["Online", "Offline", "Marketing"],
              plotOptions: {
                pie: {
                  donut: {
                    size: '75%'
                  }
                }
              },
              legend: {
                show: false,
              },
              colors: ['#3b5de7', '#45cb85', '#eeb902'],
            },
          })
        }
    },[props.details]);

    return (
      <>
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Sales Analytics</h4>

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

export default SalesAnalysis
