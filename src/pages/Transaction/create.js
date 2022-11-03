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
  Label,
  Input
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

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

  return (
    <>
      <div className="page-content">
          <Breadcrumbs title="Transaction" breadcrumbItem="New Transaction" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm className="needs-validation">
                    <Row>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">Transaction type</Label>
                          <AvField
                            name="firstname"
                            placeholder="First name"
                            type="text"
                            errorMessage="Enter First Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Accounting Head</Label>
                          <AvField
                            name="lastname"
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
                          <AvField
                            name="state"
                            placeholder="State"
                            type="text"
                            errorMessage="Please provide a valid state."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                          />
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Amount</Label>
                          <AvField
                            name="zip"
                            placeholder="Zip Code"
                            type="text"
                            errorMessage=" Please provide a valid zip."
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
                            placeholder="Zip Code"
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
                            <Form className="repeater" encType="multipart/form-data">
                            <div data-repeater-list="group-a">
                                <div data-repeater-item className="row">
                                    <div className="mb-3 col-lg-5">
                                        <label htmlFor="name">Account</label>
                                        <input type="text" id="name" name="untyped-input" className="form-control" />
                                    </div>

                                    <div className="mb-3 col-lg-3">
                                        <label htmlFor="email">Debit</label>
                                        <input type="number" id="email" className="form-control" />
                                    </div>

                                    <div className="mb-3 col-lg-3">
                                        <label htmlFor="subject">Credit</label>
                                        <input type="number" id="subject" className="form-control" />
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
                                            <input type="text" id="name" name="untyped-input" className="form-control" />
                                        </div>

                                        <div className="mb-3 col-lg-3">
                                            <label htmlFor="email">Debit</label>
                                            <input type="number" id="email" className="form-control" />
                                        </div>

                                        <div className="mb-3 col-lg-3">
                                            <label htmlFor="subject">Credit</label>
                                            <input type="tenumberxt" id="subject" className="form-control" />
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
                            </Form>
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
