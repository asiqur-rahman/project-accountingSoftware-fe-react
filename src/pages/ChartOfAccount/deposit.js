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
import { useHistory  } from "react-router-dom"


const Model = (props) => {
  const history = useHistory()
  const [chartOfAccounts, setChartOfAccounts] = useState([])
  const [chartOfAccountId, setChartOfAccountId] = useState(0)
  const [currencies, setCurrencies] = useState([])
  const [currencyId, setCurrencyId] = useState(0)
  const [updateData, setUpdateData] = useState(false)

  const handleSubmit = async (event, errors, values) => {
    if(parseInt(values.amount)<0){
      alert("Deposit balance can't be negative")
    }
    else if(updateData){
      values.parentId=updateData.parentId;
      values.currencyId=updateData.currencyId;
      values.isActive=1;
      values.id=updateData.id;
      values.dateTime=new Date();
      values.name=updateData.name;
      await Axios.patch(`/account/id/${updateData.id}`,values)
      .then((response) => {
      if(response.data.status===201){
        props.handleCallback(response.data)
      }else{
          alert(response.data.message)
      }
      })
      .catch((e)=>{
          var e=e;
      })
  }
  else{
    values.parentId=chartOfAccountId;
    values.currencyId=currencyId;
    values.isActive=1;
        await Axios.post("/account",values)
        .then((response) => {
        if(response.data.status===201){
            history.push("/chart-of-account-list");
        }else{
            alert(response.data.message)
        }
        })
        .catch((e)=>{
            var e=e;
        })
    }
  }

  useEffect(async () => {
    if(props.id && props.id > 0){
        await Axios.get(`/account/id/${props.id}`)
        .then((response) => { 
        if(response.data.status===200){
            setChartOfAccountId(response.data.data.parentId)
            setCurrencyId(response.data.data.currencyId)
            const splitedName =response.data.data.name.split(":")
            response.data.data.name=splitedName[splitedName.length-1]
            setUpdateData(response.data.data);
        }
        })
    }
    await Axios.get("/account/allDD")
    .then((response) => { 
      if(response.data.status===200){
        setChartOfAccounts(response.data.data);
      }
      else{
        setChartOfAccounts([])
      }
    }).catch(e=>{
        setChartOfAccounts([])
    });

    await Axios.get("/account/currency/dropdown")
    .then((response) => { 
      if(response.data.status===200){
        setCurrencies(response.data.data);
      }
      else{
        setCurrencies([])
      }
    }).catch(e=>{
        setCurrencies([])
    });
  },[props.id]);


  return (
        <Row>
        {(!props.id || props.id===0 || (props.id>0 && updateData) ) &&
        <Col xl="12">
            <Card>
                <CardBody>
                    <AvForm className="needs-validation" onSubmit={handleSubmit}>
                    <Row>
                        <Col md="6">
                          <div className="mb-3">
                              <Label htmlFor="validationCustom03">Current Balance</Label>
                              <AvField
                              name="currentAmount"
                              placeholder="0"
                              defaultValue={updateData['accountBalances.amount']}
                              type="number"
                              readOnly={true}
                              className="form-control"
                              validate={{ required: { value: false } }}
                              id="validationCustom03"
                              />
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="mb-3">
                              <Label htmlFor="validationCustom04">Deposit Amount</Label>
                              <AvField
                              name="amount"
                              placeholder="0"
                              type="number"
                              errorMessage=" Please provide balance."
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom04"
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
        }
    </Row>
  )
}

export default Model
