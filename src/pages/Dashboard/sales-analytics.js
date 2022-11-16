import React, { useEffect, useState } from "react"
import { Input, Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import TableLoader from "../../components/Common/TableLoader"
import Axios from "../../helpers/axios_helper"

const ExpenseAnalysis = ( props ) => {

  const [analysis, setAnalysis] = useState(false);

  const loadData = async (days=7) =>{
      await Axios.get(`/dashboard/expenseAccountReview/${days}`)
          .then((response) => { 
              const details = response.data[0];
              const series = details?.amount?details.amount.split(','):[]
              const labels = details?.names?details.names.split(','):[]
              const cSeries =[]
              series.forEach(element => {
                cSeries.push(parseFloat(element))
              });
              setAnalysis({
                series: cSeries,//[38, 26, 14],
                options: {
                  labels: labels,//["Online", "Offline", "Marketing"],
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
            <div className="float-end">
                <div className="input-group">
                    <label className="input-group-text" style={{marginTop:'0'}}>Sort By</label>
                    <Input type="select" className="form-select form-select-sm" onChange={(e)=>{loadData(e.target.value)}}>
                        <option value="7">7 Days</option>
                        <option value="30">30 Days</option>
                        <option value="60">60 Days</option>
                        <option value="90">90 Days</option>
                    </Input>
                </div>
            </div>
            <h4 className="card-title mb-4">Expense Overview</h4>

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
