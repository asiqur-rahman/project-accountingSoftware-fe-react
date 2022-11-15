import PropTypes from "prop-types"
import React,{useState, useEffect} from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import AdminSidebarContent from "./SidebarContent/AdminSidebarContent"
import UserSidebarContent from "./SidebarContent/UserSidebarContent"

import avatar2 from "../../assets/images/users/avatar.png"
import * as Session from "../../helpers/session_helper"

const Sidebar = (props) => {

  const [adminUser, setAdminUser ]=useState(false);

  useEffect(() => {
    const sessionUser=Session.getUser()
    if(sessionUser && sessionUser.role_code==='1') setAdminUser(true)
  }, []);

  return (
    <>
      <div className="vertical-menu">
        <div className="h-100">
          <div className="user-wid text-center py-4">
            <div className="user-img">
              <img src={avatar2} alt="" className="avatar-md mx-auto rounded-circle" />
            </div>

              <div className="mt-3">
                <Link to="#" className="text-dark fw-medium font-size-16">{Session.getUser().full_name}</Link>
                <p className="text-body mt-1 mb-0 font-size-13">{Session.getUser().role_name}</p>
              </div>
            </div>
            <div data-simplebar className="h-100">
            {adminUser ? 
            props.type !== "condensed" ? <AdminSidebarContent /> : <AdminSidebarContent />
            : 
            props.type !== "condensed" ? <UserSidebarContent /> : <UserSidebarContent />}
          </div>
          </div>
        </div>
    </>
  )
}

Sidebar.propTypes = {
        type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
        layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
      {}
)(withRouter(withTranslation()(Sidebar)))