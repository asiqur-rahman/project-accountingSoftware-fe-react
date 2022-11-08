import React from "react"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import ChartOfAccountModel from "./model"

const ChartOfAccount = () => {

  return (
    <>
      <div className="page-content">
          <Breadcrumbs title="Char of Account" breadcrumbItem="New Char of Account" />
          <ChartOfAccountModel/>
      </div>
    </>
  )
}

export default ChartOfAccount
