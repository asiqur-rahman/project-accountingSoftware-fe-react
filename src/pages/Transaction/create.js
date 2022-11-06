import React from "react"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import TransactionModel from "./model"

const FormValidations = () => {

  return (
    <>
      <div className="page-content">
          <Breadcrumbs title="Transaction" breadcrumbItem="New Transaction" />
          <TransactionModel/>
      </div>
    </>
  )
}

export default FormValidations
