import React, { useState } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

import Axios from "../../helpers/axios_helper"
import { useNavigate } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const BankAccount = (props) => {
  const navigate  = useNavigate ();

  const handleSubmit = async (event, errors, values) => {
    var abc=values;
    await Axios.post("/bank-account",values)
    .then((response) => {
      if(response.data.status===201){
        navigate("/bank-account-list");
      }else{

      }
      var response=response;
    })
    .catch((e)=>{
      var e=e;
    })
  }

  return (
    <>
      <div className="page-content">
          <Breadcrumbs title="Bank Account" breadcrumbItem="New Bank Account" />
          <Row>
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
                            placeholder="Description"
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
        
      </div>
    </>
  )
}

export default BankAccount
