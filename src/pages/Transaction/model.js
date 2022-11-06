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
  const [transactionType, setTransactionType] = useState([])
  const [allAssets, setAllAssets] = useState([])
  const [bankAccounts, setbankAccounts] = useState([])
  const [bankAccountId, setBankAccountId] = useState(0)
  const [dateTime, setDateTime] = useState()
  const [updateData, setUpdateData] = useState(false)

  const [rows2, setrows2] = useState([])

    function handleRemoveRow(e, id) {
        if (typeof id != "undefined")
            document.getElementById("addr" + id).style.display = "none"
    }

    function handleAddRowNested1() {
        const item2 = { name1: "" }
        setrows2([...rows2, item2])
    }

  const handleSubmit = async (event, errors, values) => {
    values.bankAccountId=bankAccountId;
    values.dateTime=dateTime;
    if(updateData){
        values.id=updateData.id;
        await Axios.patch(`/cheque/id/${updateData.id}`,values)
        .then((response) => {
            props.handleCallback(response.data)
        })
        .catch((e)=>{
            alert(e.message)
        })
    }
    else{
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
  }

  useEffect(async () => {
    if(props.id && props.id > 0){
        await Axios.get(`/cheque/id/${props.id}`)
        .then((response) => { 
        if(response.data.status===200){
            setBankAccountId(response.data.data.bankAccountId);
            setUpdateData(response.data.data);
        }
        })
    }
    await Axios.get("/transaction/type")
    .then((response) => { 
      if(response.data.status===200){
        setTransactionType(response.data.data);
      }
      else{
        setTransactionType([])
      }
    });
  },[props.id]);

  useEffect(async () => {
    if(transactionType.length>0){
        await Axios.get("/transaction/allAssets")
        .then((response) => { 
        if(response.data.status===200){
            setAllAssets(response.data.data);
        }
        else{
            setAllAssets([])
        }
        });
    }
  },[transactionType]);


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
                            <Label htmlFor="validationCustom01">Transaction type</Label>
                            <Select
                                options={transactionType}
                                value={transactionType.filter(x=>x.value==bankAccountId)[0]}
                                onChange={(e)=>{setBankAccountId(e.value);}}
                                name="bankAccountId"
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">Accounting Head</Label>
                            <Select
                                options={bankAccounts}
                                value={bankAccounts.filter(x=>x.value==bankAccountId)[0]}
                                onChange={(e)=>{setBankAccountId(e.value);}}
                                name="accountFromId"
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">How did you pay</Label>
                            <Select
                                options={allAssets}
                                value={allAssets.filter(x=>x.value==bankAccountId)[0]}
                                onChange={(e)=>{setBankAccountId(e.value);}}
                                name="accountToId"
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
                            defaultValue={updateData.amount}
                            type="number"
                            errorMessage=" Please provide transaction amount."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom05">Description</Label>
                            <AvField
                            name="description"
                            defaultValue={updateData.description}
                            placeholder=" "
                            type="text"
                            className="form-control"
                            id="validationCustom05"
                            />
                        </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={12}>
                            <div className="repeater">
                            <div data-repeater-list="group-a">
                                <div data-repeater-item className="row">
                                    <div className="mb-3 col-lg-5">
                                        <label htmlFor="name">Account</label>
                                        <input type="text" name="accountType" className="form-control" />
                                    </div>

                                    <div className="mb-3 col-lg-3">
                                        <label htmlFor="email">Debit</label>
                                        <input type="number" name="debitAmount" className="form-control" />
                                    </div>

                                    <div className="mb-3 col-lg-3">
                                        <label htmlFor="subject">Credit</label>
                                        <input type="number" name="creditAmount" className="form-control" />
                                    </div>

                                    {/* <div className="mb-3 col-lg-2">
                                        <label htmlFor="message">Message</label>
                                        <textarea id="message" className="form-control"></textarea>
                                    </div> */}

                                    <Col lg={1} className="align-self-center mt-2">
                                        <button
                                            data-repeater-delete
                                            type="button"
                                            className="btn btn-danger waves-effect waves-light">
                                                <i className="bx bx-trash font-size-20 align-middle"></i>
                                        </button>
                                    </Col>
                                </div>

                            </div>
                            {rows2.map((item2, idx) => (
                                <React.Fragment key={idx}>
                                <div data-repeater-list="group-a" id={"addr" + idx} >
                                    <div data-repeater-item className="row">
                                        <div className="mb-3 col-lg-5">
                                            <label htmlFor="name">Account</label>
                                            <input type="text" name="accountType" className="form-control" />
                                        </div>

                                        <div className="mb-3 col-lg-3">
                                            <label htmlFor="email">Debit</label>
                                            <input type="number" name="debitAmount" className="form-control" />
                                        </div>

                                        <div className="mb-3 col-lg-3">
                                            <label htmlFor="subject">Credit</label>
                                            <input type="number" name="creditAmount" className="form-control" />
                                        </div>

                                        <Col lg={1} className="align-self-center mt-2">
                                            <button
                                                data-repeater-delete
                                                type="button"
                                                className="btn btn-danger waves-effect waves-light"
                                                onClick={e => {
                                                    handleRemoveRow(e , idx)
                                                }}><i className="bx bx-trash font-size-20 align-middle"></i>
                                            </button>
                                        </Col>
                                    </div>

                                </div>
                                </React.Fragment>
                            ))}
                            <Button
                                onClick={() => {
                                    handleAddRowNested1()
                                }}
                                color="success"
                                className="btn btn-success mt-3 mt-lg-0"
                                >Add Split
                            </Button>
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
