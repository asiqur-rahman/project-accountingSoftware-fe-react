import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import * as Session from "../../helpers/session_helper"
import { logoutUser } from "../../store/actions"

const Logout = props => {
  useEffect(() => {
    Session.removeSession();
    props.logoutUser(props.history);
  })

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
  logoutUser: PropTypes.func
}

export default withRouter(connect(null, { logoutUser })(Logout))
