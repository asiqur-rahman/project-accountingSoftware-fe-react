import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import {
    Input,
    Card,
    CardBody,
  } from "reactstrap"
  import TableLoader from "../../components/Common/TableLoader"

const LineChart = (props) => {

    const [details, setDetails] = useState(false);

    useEffect(async () => {
        if(props.details){
            setDetails(
                {
                series : [{
                    name: "Expense",
                    type: 'line',
                    data: props.details?.sales?props.details.sales.split(','):[]//[20, 34, 27, 59, 37, 26, 38, 25],
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
                        categories: props.details?.dates?props.details.dates.split(','):[],//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
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
        }
    },[props.details]);

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="float-end">
                        <div className="input-group">
                            <label className="input-group-text">Sort By</label>
                            <Input type="select" className="form-select form-select-sm">
                                <option value="7">7 Days</option>
                                <option value="30">30 Days</option>
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