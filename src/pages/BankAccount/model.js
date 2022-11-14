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

import Axios from "../../helpers/axios_helper"
import { useHistory  } from "react-router-dom"


const Model = (props) => {
  const history = useHistory()
  const [updateData, setUpdateData] = useState(false)

  const handleSubmit = async (event, errors, values) => {
    if(updateData){
        values.id=updateData.id;
        await Axios.patch(`/bank-account/id/${updateData.id}`,values)
        .then((response) => {
            props.handleCallback(response.data)
        })
        .catch((e)=>{
            console.log(e.message)
        })
    }
    else{
        await Axios.post("/bank-account",values)
        .then((response) => {
        if(response.data.status===201){
            history.push("/bank-account-list");
        }else{
            console.log(response.data.message)
        }
        })
        .catch((e)=>{
            var e=e;
        })
    }
  }

  useEffect(async () => {
    if(props.id && props.id > 0){
        await Axios.get(`/bank-account/id/${props.id}`)
        .then((response) => { 
        if(response.data.status===200){
            setUpdateData(response.data.data);
        }
        })
    }
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
                            <Label htmlFor="validationCustom02">Bank Name</Label>
                            <AvField
                                name="name"
                                placeholder="Bank Name"
                                defaultValue={updateData.name}
                                type="text"
                                errorMessage="Please provide bank name"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom02"
                            />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-3">
                            <Label htmlFor="validationCustom03">Account Title</Label>
                            <AvField
                                name="accountTitle"
                                defaultValue={updateData.accountTitle}
                                placeholder="Account Title"
                                type="text"
                                errorMessage=" Please provide account title."
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom03"
                            />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-3">
                            <Label htmlFor="validationCustom05">Account Number</Label>
                            <AvField
                                name="accountNumber"
                                defaultValue={updateData.accountNumber}
                                placeholder="Account Number"
                                type="text"
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
                                placeholder="Description"
                                type="textarea"
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
        }
    </Row>
  )
}

export default Model
