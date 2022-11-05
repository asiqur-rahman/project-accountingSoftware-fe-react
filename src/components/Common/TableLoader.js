import React from "react"
import { Col } from "reactstrap"
import "./tableLoader.scss"

const TableLoader = props => {
  return (
    <Col className="col-12" style={{textAlign:"center"}}>
      <div className="table-loader"><div></div><div></div><div></div></div>
    </Col>
  )
}

export default TableLoader
