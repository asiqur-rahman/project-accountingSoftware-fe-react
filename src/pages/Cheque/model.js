import React, { useState, useEffect,useRef  } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import Select from "react-select"

import Axios from "../../helpers/axios_helper"
import { useHistory,useParams  } from "react-router-dom"
// import { useParams } from "react-router"


const Model = (props) => {
  const history = useHistory();
  const params = useParams();
  // let [searchParams, setSearchParams] = useSearchParams();
  const [bankAccounts, setbankAccounts] = useState([])
  const [bankAccountId, setBankAccountId] = useState(0)
  const [dateTime, setDateTime] = useState()

  const handleSubmit = async (event, errors, values) => {
    values.bankAccountId=bankAccountId;
    values.dateTime=dateTime;
    await Axios.post("/cheque",values)
    .then((response) => {
      if(response.data.status===201){
        history.push("/cheque-list");
      }else{
        alert(response.data.message)
      }
    })
    .catch((e)=>{
      var e=e;
    })
  }

  useEffect(async () => {
    console.log(params)
    await Axios.get("/bank-account/dropdown")
    .then((response) => { 
      if(response.data.status===200){
        setbankAccounts(response.data.data);
      }
      else{
        setbankAccounts([])
      }
    }).catch(e=>{
      setbankAccounts([])
    });
  },[params]);


  return (
        <Row>
        <Col xl="12">
            <Card>
            <CardBody>
                <AvForm className="needs-validation" onSubmit={handleSubmit}>
                <Row>
                    <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom01">Bank</Label>
                        <Select
                        options={bankAccounts}
                        value={bankAccounts.filter(x=>x.value==bankAccountId)[0]}
                        onChange={(e)=>{setBankAccountId(e.value);}}
                        name="bankAccountId"
                        />
                    </div>
                    </Col>
                    <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom03">Cheque Number</Label>
                        <AvField
                        name="number"
                        placeholder="Cheque Number"
                        type="text"
                        errorMessage=" Please provide a cheque number."
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom03"
                        />
                    </div>
                    </Col>
                    <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom04">Date</Label>
                        <Flatpickr
                            name="dateTime"
                            className="form-control d-block"
                            placeholder="dd M, yyyy"
                            options={{
                            altInput: true,
                            altFormat: "F j, Y",
                            dateFormat: "Y-m-d",
                            defaultDate: "today"
                            }}
                            onChange={(selectedDates, dateStr, instance) => {
                            // const firstDate = selectedDates[0];
                            // console.log({ firstDate, dateStr });
                            setDateTime(dateStr);
                            }}
                            id="validationCustom04"
                        />
                    </div>
                    </Col>
                    <Col md="6">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom05">Amount</Label>
                        <AvField
                        name="amount"
                        placeholder="0"
                        type="number"
                        errorMessage=" Please provide transaction amount."
                        className="form-control"
                        validate={{ required: { value: true } }}
                        id="validationCustom05"
                        />
                    </div>
                    </Col>
                    <Col md="12">
                    <div className="mb-3">
                        <Label htmlFor="validationCustom05">Description</Label>
                        <AvField
                        name="description"
                        placeholder=" "
                        type="text"
                        className="form-control"
                        id="validationCustom05"
                        />
                    </div>
                    </Col>
                </Row>
                <Col style={{textAlign: 'right'}}>
                <Button color="primary" type="submit">
                    Submit
                </Button>
                </Col>
                </AvForm>
            </CardBody>
            </Card>
        </Col>

        </Row>
  )
}

export default Model
