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
            size="sm"
            isOpen={modal_center}
            centered={true}>
              
            <div className="modal-header">
              <h5 className="modal-title mt-0">Action Confirmation !</h5>
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
                <CardBody>
                    <Row>
                        <Col md="12">
                            {props.bodyMsg?props.bodyMsg:"Are you sure about this action ?"}
                        </Col>
                    </Row>
                </CardBody>
            </div>
            <div className="modal-footer customBtnArea" style={{textAlign: 'right'}}>
                <Button color="primary" type="submit" className="btn btn-sm" onClick={()=>submitEvent(true)}>
                    Yes
                </Button>
                <Button color="danger" type="submit" className="btn btn-sm" onClick={()=>submitEvent(false)}>
                    No
                </Button>
            </div>
          </Modal>
        </Col>
    </Row>
  )
}

export default CustomModal
