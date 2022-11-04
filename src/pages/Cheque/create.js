import React from "react"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import ChequeRecordModel from "./model"

const ChequeRecord = () => {

  return (
    <>
      <div className="page-content">
          <Breadcrumbs title="Cheque" breadcrumbItem="New Cheque" />
          <ChequeRecordModel/>
      </div>
    </>
  )
}

export default ChequeRecord
