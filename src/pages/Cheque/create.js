import React, { useState } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Button,
  CardTitle,
  CardSubtitle,
  InputGroup,
  Label,
  Input
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import Select from "react-select";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const FormValidations = () => {

    const [rows2, setrows2] = useState([])

    function handleRemoveRow(e, id) {
        if (typeof id != "undefined")
            document.getElementById("addr" + id).style.display = "none"
    }

    function handleAddRowNested1() {
        const item2 = { name1: "" }
        setrows2([...rows2, item2])
    }

    const handleSubmit = (event, errors, values) => {
      var abc=values;
    }

  return (
    <>
      <div className="page-content">
          <Breadcrumbs title="Transaction" breadcrumbItem="New Transaction" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation" onSubmit={handleSubmit}>
                    <Row>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Transaction type</Label>
                          <Select
                            options={[{ label: "Tent", value: "Tent" }]}
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Accounting Head</Label>
                          <AvField
                            name="accountingHead"
                            placeholder="Last name"
                            type="text"
                            errorMessage="Enter Last name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">How did you pay</Label>
                          <AvField
                            name="city"
                            placeholder="City"
                            type="text"
                            errorMessage=" Please provide a valid city."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">Date</Label>
                            <Flatpickr
                              className="form-control d-block"
                              placeholder="dd M, yyyy"
                              options={{
                                altInput: true,
                                altFormat: "F j, Y",
                                dateFormat: "Y-m-d",
                                defaultDate: "today"
                              }}
                              id="validationCustom04"
                            />
                        </div>
                      </Col>
                      <Col md="4">
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
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Description</Label>
                          <AvField
                            name="zip"
                            placeholder=" "
                            type="text"
                            errorMessage=" Please provide a valid zip."
                            className="form-control"
                            validate={{ required: { value: true } }}
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

          </Row>
        
      </div>
    </>
  )
}

export default FormValidations
