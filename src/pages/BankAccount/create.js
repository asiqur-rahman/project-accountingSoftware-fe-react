import React, { useState } from "react"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import BankAccountModel from "./model"

const BankAccount = (props) => {

  return (
    <>
      <div className="page-content">
          <Breadcrumbs title="Bank Account" breadcrumbItem="New Bank Account" />
          <BankAccountModel/>
      </div>
    </>
  )
}

export default BankAccount
