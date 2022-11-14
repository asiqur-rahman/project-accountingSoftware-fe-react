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
const moment = require('moment');

const Model = (props) => {
  const history = useHistory()
  const [transactionType, setTransactionType] = useState([])
  const [transactionTypeId, setTransactionTypeId] = useState(0)
  const [accountingHeads, setAccountingHeads] = useState([])
  const [accountFromId, setAccountFromId] = useState(0)
  const [allAssets, setAllAssets] = useState([])
  const [accountToId, setAccountToId] = useState(0)
  const [allAccounts, setAllAccounts] = useState([])
  const [dateTime, setDateTime] = useState(moment().format("YYYY-MM-DD"))
  const [transactionDetails, setTransactionDetails] = useState([])
  const [transactionDetailsUpdateTime, setTransactionDetailsUpdateTime] = useState(0)
  const [updateData, setUpdateData] = useState(false)
  const [isItIncome, setIsItIncome] = useState(false)

    function handleRemoveRow(e, id) {
        if (typeof id != "undefined") {
            // document.getElementById("repeater" + id).innerHTML = ""
            const filteredTransactionDetails=transactionDetails.filter(x=>x.chartOfAccountId!=transactionDetails[id].chartOfAccountId);
            setTransactionDetails(filteredTransactionDetails)
        }
    }

    const amountChangeEvent = (value) =>{
        // return false;
        var oldTransactionDetails =transactionDetails;
        var selectedIdFound=false;

        oldTransactionDetails.map(item=>{
            if(item.chartOfAccountId==accountFromId){
                item.debit=parseInt(value);
                item.credit='';
                selectedIdFound=true;
            }
        })

        if(!selectedIdFound)oldTransactionDetails=[...oldTransactionDetails,{chartOfAccountId:accountFromId,debit:parseInt(value),credit:''}]

        selectedIdFound=false;
        oldTransactionDetails.map(item=>{
            if(item.chartOfAccountId==accountToId){
                item.credit=parseInt(value);
                item.debit='';
                selectedIdFound=true;
            }
        })

        if(!selectedIdFound)oldTransactionDetails=[...oldTransactionDetails,{chartOfAccountId:accountToId,debit:'',credit:parseInt(value)}]
        
        // setTransactionDetails([])
        setTransactionDetails(oldTransactionDetails)
        setTransactionDetailsUpdateTime(transactionDetailsUpdateTime+1)
    }

    const transactionTypeChangeHandler = async (value) => {
        if(value){
            if(value=='401'){
                setIsItIncome(true);
            }
            setAccountFromId(0);
            setAccountToId(0);
            await Axios.get(`/account/byBaseCode/${value}`)
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
        values.amount=parseInt(values.amount)
        var totalDebit=0;
        var totalCredit=0;
        transactionDetails.map(item=>{
            item.debit=parseInt(item.debit===''?0:item.debit);
            item.credit=parseInt(item.credit===''?0:item.credit);
            totalDebit+= item.debit;
            totalCredit+= item.credit;
        })
        if(totalCredit==totalDebit && totalCredit==values.amount){
            const jsonData ={
                debitAccountId:isItIncome?accountFromId:accountToId,
                creditAccountId:isItIncome?accountToId:accountFromId,
                transactionNo:Date.now().toString(),
                dateTime:dateTime,
                amount:values.amount,
                description:values.description,
                isItIncome:isItIncome,
                transactionDetails
            }
            await Axios.post("/transaction/withDetails",jsonData)
            .then((response) => {
                if(response.data.status===201){
                    history.push("/transaction-list");
                }else{
                    alert(response.data.message)
                }
            })
            .catch((e)=>{
                var e=e;
            })

        }else{
            alert("Amount Mismatch !")
        }
    }

    const transactionDetailsChangeEvent = (id,name,value) => {
        transactionDetails.map((item,index)=>{
            if(index==id){
                item[name]=value
            }
        });
        setTransactionDetails(transactionDetails)
        setTransactionDetailsUpdateTime(transactionDetailsUpdateTime+1)
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
                                onChange={(e)=>{amountChangeEvent(e.target.value);}}
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
                                placeholder="Description"
                                type="textarea"
                                className="form-control"
                                errorMessage="Please provide description."
                                validate={{ required: { value: true } }}
                            />
                        </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={12}>
                            <div className="repeater">
                            {transactionDetails && transactionDetails.map((item, idx) => (
                                <React.Fragment key={idx}>
                                <div data-repeater-list="group-a" id={"repeater" + idx} >
                                    <div data-repeater-item className="row">
                                        <div className="mb-3 col-lg-5">
                                            <label htmlFor="name">Account</label>
                                            <Select
                                                options={allAccounts}
                                                value={allAccounts.filter(x=>x.value==item.chartOfAccountId)[0]}
                                                onChange={(e)=>{transactionDetailsChangeEvent(idx,"chartOfAccountId",e.value);}}
                                                name="chartOfAccountId"
                                            />
                                        </div>

                                        <div className="mb-3 col-lg-3">
                                            <label>Debit</label>
                                            <input type="number" name="debit" className="form-control" 
                                            onChange={(e)=>{transactionDetailsChangeEvent(idx,"debit",e.target.value);}}
                                            value={item.debit}/>
                                        </div>

                                        <div className="mb-3 col-lg-3">
                                            <label htmlFor="subject">Credit</label>
                                            <input type="number" name="credit" className="form-control"
                                            onChange={(e)=>{transactionDetailsChangeEvent(idx,"credit",e.target.value);}}
                                            value={item.credit}/>
                                        </div>

                                        <Col lg={1} className="align-self-center mt-4">
                                            <button
                                                data-repeater-delete
                                                type="button"
                                                className="btn btn-danger waves-effect waves-light"
                                                onClick={e => {
                                                    handleRemoveRow(e , idx)
                                                }}>
                                                <i className="bx bx-trash font-size-20 align-middle"></i>
                                            </button>
                                        </Col>
                                    </div>

                                </div>
                                </React.Fragment>
                            ))}
                            <Button
                                onClick={() => {
                                    setTransactionDetails([...transactionDetails,{chartOfAccountId:0,debit:'',credit:''}])
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
