import React from "react"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import UserModel from "./model"

const UserCreate = () => {

  return (
    <>
      <div className="page-content">
          <Breadcrumbs title="User" breadcrumbItem="New User" />
          <UserModel/>
      </div>
    </>
  )
}

export default UserCreate
