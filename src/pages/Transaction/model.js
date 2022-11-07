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
  const [transactionType, setTransactionType] = useState([])
  const [transactionTypeId, setTransactionTypeId] = useState(0)
  const [accountingHeads, setAccountingHeads] = useState([])
  const [accountFromId, setAccountFromId] = useState(0)
  const [allAssets, setAllAssets] = useState([])
  const [accountToId, setAccountToId] = useState(0)
  const [allAccounts, setAllAccounts] = useState([])
  const [dateTime, setDateTime] = useState()
  const [updateData, setUpdateData] = useState(false)

  const [rows, setrows] = useState([])

    function handleRemoveRow(e, id) {
        if (typeof id != "undefined")
            document.getElementById("addr" + id).style.display = "none"
    }

    // chartOfAccountId:item.chartOfAccountId,
    // taxId:item.taxId,
    // debit:item.debit,
    // credit:item.credit,
    // transactionId:data.id

    function handleAddRowNested() {
        const item = { name1: "" }
        setrows([...rows, item])
    }

    const transactionTypeChangeHandler = async (value) => {
        if(value){
            setAccountFromId(0);
            setAccountToId(0);
            await Axios.get(`/account/byParentId/${value}`)
            .then((response) => {
                if(response.data.status===200){
                    setAccountingHeads(response.data.data)
                }else{
                    alert(response.data.message)
                }
            })
            .catch((e)=>{
                alert(e.message)
            })
        }
    }

    const handleSubmit = async (event, errors, values) => {
        values.debitAccountId=accountFromId;
        values.creditAccountId=accountToId;
        values.transactionNo=Date.now().toString();
        values.dateTime=dateTime;
        if(updateData){
            values.id=updateData.id;
            // await Axios.patch(`/cheque/id/${updateData.id}`,values)
            // .then((response) => {
            //     props.handleCallback(response.data)
            // })
            // .catch((e)=>{
            //     alert(e.message)
            // })
        }
        else{
            // await Axios.post("/cheque",values)
            // .then((response) => {
            //     if(response.data.status===201){
            //         history.push("/cheque-list");
            //     }else{
            //         alert(response.data.message)
            //     }
            // })
            // .catch((e)=>{
            //     var e=e;
            // })
        }
    }

  useEffect(async () => {
    if(props.id && props.id > 0){
        // await Axios.get(`/cheque/id/${props.id}`)
        // .then((response) => { 
        // if(response.data.status===200){
        //     setBankAccountId(response.data.data.bankAccountId);
        //     setUpdateData(response.data.data);
        // }
        // })
    }
    await Axios.get("/transaction/typeDD")
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
    if(accountingHeads.length>0 && allAssets.length==0){
        await Axios.get("/transaction/allAssetsDD")
            .then((response) => { 
            if(response.data.status===200){
                setAllAssets(response.data.data);
            }
            else{
                setAllAssets([])
            }
        });

        await Axios.get("/account/allDD")
            .then((response) => { 
            if(response.data.status===200){
                setAllAccounts(response.data.data);
            }
            else{
                setAllAccounts([])
            }
        });
    }
  },[accountingHeads]);


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
                            <Label>Transaction type</Label>
                            <Select
                                options={transactionType}
                                value={transactionType ? transactionType.filter(x=>x.value==transactionTypeId)[0]:null}
                                onChange={(e)=>{transactionTypeChangeHandler(e.value); setTransactionTypeId(e.value);}}
                                name="bankAccountId"
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label>Accounting Head</Label>
                            <Select
                                options={accountingHeads}
                                value={accountingHeads.filter(x=>x.value==accountFromId)[0]}
                                onChange={(e)=>{setAccountFromId(e.value);}}
                                name="accountFromId"
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label>How did you pay</Label>
                            <Select
                                options={allAssets}
                                value={allAssets.filter(x=>x.value==accountToId)[0]}
                                onChange={(e)=>{setAccountToId(e.value);}}
                                name="accountToId"
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label>Date</Label>
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
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label>Amount</Label>
                            <AvField
                            name="amount"
                            placeholder="0"
                            defaultValue={updateData.amount}
                            type="number"
                            errorMessage=" Please provide transaction amount."
                            className="form-control"
                            validate={{ required: { value: true } }}
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
                                        {/* <input type="text" name="accountType" className="form-control" /> */}
                                        <Select
                                            options={allAccounts}
                                            value={allAccounts.filter(x=>x.value==transactionTypeId)[0]}
                                            onChange={(e)=>{transactionTypeChangeHandler(e.value); setTransactionTypeId(e.value);}}
                                            name="bankAccountId2"
                                        />
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
                            {rows.map((item, idx) => (
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
                                    handleAddRowNested()
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
