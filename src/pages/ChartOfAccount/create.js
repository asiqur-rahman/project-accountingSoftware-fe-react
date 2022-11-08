import React from "react"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import ChartOfAccountModel from "./model"

const ChartOfAccount = () => {

  return (
    <>
      <div className="page-content">
          <Breadcrumbs title="Cheque" breadcrumbItem="New Cheque" />
          <ChartOfAccountModel/>
      </div>
    </>
  )
}

export default ChartOfAccount
