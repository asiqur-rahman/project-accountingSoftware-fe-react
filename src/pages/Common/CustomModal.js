import React, { useState, useEffect,useRef  } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Modal
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

import Select from "react-select"

import TableLoader from "../../components/Common/TableLoader"

import Axios from "../../helpers/axios_helper"
import { useHistory  } from "react-router-dom"

const CustomModal = (props) => {
  const history = useHistory()
  const [modal_center, setmodal_center] = useState(false)

  const submitEvent = (response) => {
    setmodal_center(false);
    props.handleCallback(response)
  }

  useEffect(async () => {
    setmodal_center(props.modelShow)
  },[props.modelShow])

  return (
    <Row>
        <Col xl="12">
          <Modal
            size="lg"
            isOpen={modal_center}
            centered={true}>
              
            <div className="modal-header">
              <h5 className="modal-title mt-0">User Active/Inactive Confirmation</h5>
              <button
                type="button"
                onClick={() => {
                  modal_center(false)
                }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              > 
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{padding:"0"}}>
            <Row>
                <Col xl="12">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md="12">
                                  Are you sure you want to 
                                </Col>
                            </Row>
                            <Col style={{textAlign: 'right'}}>
                            <Button color="primary" type="submit" onClick={()=>submitEvent(true)}>
                                Confirm
                            </Button>
                            <Button color="primary" type="submit" onClick={()=>submitEvent(false)}>
                                Cancel
                            </Button>
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </div>
          </Modal>
        </Col>
    </Row>
  )
}

export default CustomModal
