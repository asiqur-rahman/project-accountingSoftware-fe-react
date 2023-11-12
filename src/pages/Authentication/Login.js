import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"

import { Row, Col, Alert, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError, socialLogin } from "../../store/actions"

// import images
import logo from "../../assets/images/logo-sm-dark.png"
import bim from "../../assets/images/acPro/bim.png"
import giz from "../../assets/images/acPro/giz.jpg"
import eAcPro from "../../assets/images/acPro/eAcPro.png"

import Config from "../../config"
import Axios from "../../helpers/axios_helper"
import * as Session from "../../helpers/session_helper"
import { useHistory } from "react-router-dom";

const Login = (props) => {

  const history = useHistory()
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  // handleValidSubmit
  const handleValidSubmit = async (event, values) => {
    await Axios.post("/auth/login", values)
    .then(function (response) {
      if(response.data.status===200){
        Session.setSession(response.data)
        history.push('/')
      }else{
        setNotification(response.data.message)
      }
    })
    .catch(function (error) {
      setNotification(error.message)
    })
  }
  return (
    <>
      <div className="account-pages pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5} xl={4}>
              <div className="card overflow-hidden">
                {/* <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Welcome Back !</h5>
                    <p className="text-white-50 mb-0">Sign in to continue to e-Accounting360.</p>
                    <Link to="/" className="logo logo-admin mt-4">
                      <img src={eAcPro} alt="" height="30" />
                    </Link>
                  </div>
                </div> */}
                <div className='row pt-sm-3'>
                  <div className='col-md-6' style={{textAlign:"center"}}>
                      <img src={bim} alt="" height="120" />
                  </div>
                  <div className='col-md-6' style={{textAlign:"center"}}>
                      <img src={giz} alt="" height="120" />
                  </div>
                  <div className='col-md-12 pt-sm-3' style={{textAlign:"center"}}>
                      <img src={eAcPro} alt="" height="55" />
                  </div>
                </div>
                <div className="card-body pt-3">
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {notification && typeof notification === "string" ? (
                        <Alert color="danger">{notification}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          name="username"
                          label="Username"
                          value=""
                          className="form-control"
                          placeholder="Enter useranme"
                          type="text"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          value=""
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      {/* <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted"><i
                          className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
                      </div> */}
                    </AvForm>

                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                {/* <p>Don't have an account ? <Link to="/register"
                  className="fw-medium text-primary"> Signup now </Link> </p> */}
                <p>
                  © {new Date().getFullYear()} e-Accounting360 <br/> Powered by <a href={Config.applicationInfo.devOrgLink} target="_blank"><span style={{color: "#fd7014"}}>{Config.applicationInfo.devOrgName}</span></a>
                </p>
              </div>
            </Col>
          </Row>

        </Container>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}