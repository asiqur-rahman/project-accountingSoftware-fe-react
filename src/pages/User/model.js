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

import Select from "react-select"

import TableLoader from "../../components/Common/TableLoader"

import Axios from "../../helpers/axios_helper"
import { useHistory  } from "react-router-dom"

const Model = (props) => {
  const history = useHistory()
  const [roles, setroles] = useState([])
  const [roleId, setRoleId] = useState(0)
  const [updateData, setUpdateData] = useState(false)

  const handleSubmit = async (event, errors, values) => {
    values.roleId=roleId;
    values.isActive=1;
    values.branchId=1;

    if(updateData){
        values.id=updateData.id;
        values.userDetailId=updateData.userDetailId;
        await Axios.patch(`/user/id/${updateData.id}`,values)
        .then((response) => {
            if(response.data.status === 200)props.handleCallback(response.data)
            else{
                alert(response.data.message)
            }
        })
        .catch((e)=>{
            alert(e.message)
        })
    }
    else{
        await Axios.post("/user",values)
        .then((response) => {
        if(response.data.status===201){
            history.push("/user-list");
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
        await Axios.get(`/user/id/${props.id}`)
        .then((response) => { 
        if(response.data.status===200){
            setRoleId(response.data.data['userDetail.role.id']);
            const userData={
                id:response.data.data.id,
                firstName:response.data.data['userDetail.firstName'],
                lastName:response.data.data['userDetail.lastName'],
                email:response.data.data['userDetail.email'],
                contactNo:response.data.data['userDetail.contactNo'],
                address:response.data.data['userDetail.address'],
                username:response.data.data.username,
                userDetailId:response.data.data.userDetailId,
            }
            setUpdateData(userData);
        }
        })
    }
    await Axios.get("/user/role/dropdown")
    .then((response) => { 
      if(response.data.status===200){
        setroles(response.data.data);
      }
      else{
        setroles([])
      }
    }).catch(e=>{
      setroles([])
    });
  },[props.id]);


  return (
        <Row>
        {(!props.id || props.id===0 || (props.id>0 && updateData) ) ?
        <Col xl="12">
            <Card>
                <CardBody>
                    <AvForm className="needs-validation" onSubmit={handleSubmit}>
                    <Row>
                    <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom01">First Name</Label>
                            <AvField
                                name="firstName"
                                defaultValue={updateData.firstName}
                                placeholder="First Name"
                                type="text"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                errorMessage=" Please provide a first name."
                                id="validationCustom01"
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom02">Last Name</Label>
                            <AvField
                            name="lastName"
                            placeholder="Last Name"
                            defaultValue={updateData.lastName}
                            type="text"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            errorMessage=" Please provide last name."
                            id="validationCustom02"
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom03">Role</Label>
                            <Select
                                options={roles}
                                value={roles.filter(x=>x.value==roleId)[0]}
                                onChange={(e)=>{setRoleId(e.value);}}
                                name="roleId"
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom04">Username</Label>
                            <AvField
                            name="username"
                            defaultValue={updateData.username}
                            placeholder="Username"
                            type="text"
                            validate={{ required: { value: true } }}
                            errorMessage=" Please provide username."
                            className="form-control"
                            id="validationCustom04"
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom05">Contact No</Label>
                            <AvField
                            name="contactNo"
                            defaultValue={updateData.contactNo}
                            placeholder="Contact No"
                            type="text"
                            validate={{ required: { value: true } }}
                            errorMessage=" Please provide contact no."
                            className="form-control"
                            id="validationCustom05"
                            />
                        </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom06">Email</Label>
                            <AvField
                            name="email"
                            defaultValue={updateData.email}
                            placeholder="Email"
                            type="email"
                            validate={{ required: { value: true } }}
                            errorMessage=" Please provide email."
                            className="form-control"
                            id="validationCustom06"
                            />
                        </div>
                        </Col>
                        <Col md="12">
                        <div className="mb-3">
                            <Label htmlFor="validationCustom07">Address</Label>
                            <AvField
                            name="address"
                            defaultValue={updateData.address}
                            placeholder="Address"
                            type="text"
                            validate={{ required: { value: true } }}
                            errorMessage=" Please provide address."
                            className="form-control"
                            id="validationCustom07"
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
        :
        <TableLoader/>
        }
    </Row>
  )
}

export default Model
