import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import {
    Input,
    Card,
    CardBody,
  } from "reactstrap"
  import TableLoader from "../../components/Common/TableLoader"
  import Axios from "../../helpers/axios_helper"

const LineChart = () => {

    const [details, setDetails] = useState(false);

    const loadData = async (days=7) =>{
        await Axios.get(`/dashboard/dashboardApex/${days}`)
            .then((response) => { 
                const details = response.data[0];
                setDetails(
                    {
                    series : [{
                        name: "Expense",
                        type: 'line',
                        data: details?.sales?details.sales.split(','):[]//[20, 34, 27, 59, 37, 26, 38, 25],
                        }],
                    options : {
                        chart: {
                            toolbar: {
                                show: false
                            },
                            zoom: {
                                enabled: false
                            }
                        },
                        colors: ['#45cb85', '#3b5de7'],
                        dataLabels: {
                            enabled: false,
                        },
                        stroke: {
                            curve: 'smooth',
                            width: '3',
                            dashArray: [0, 0],
                        },
                
                        markers: {
                            size: 3
                        },
                        xaxis: {
                            categories: details?.dates?details.dates.split(','):[],//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            title: {
                                text: 'Date'
                            }
                        },
                
                        fill: {
                            type: 'solid',
                            opacity: [1, 0.1],
                        },
                
                        legend: {
                            position: 'top',
                            horizontalAlign: 'right',
                        }
                    }}
                )
            });
    }

    useEffect(async () => {
        loadData();
    },[]);

    return (
        <React.Fragment>
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
                    <h4 className="card-title mb-4">Expense Report</h4>
                    {details ?
                        <ReactApexChart
                            options={details.options}
                            series={details.series}
                            height="260"
                            type="line"
                            className="apex-charts"
                        />
                        :
                        <TableLoader/>
                    }
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default LineChart