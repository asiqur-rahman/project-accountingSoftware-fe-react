import React from "react"
import { Container, Row, Col } from "reactstrap"
// const config = require("../../config");
import Config from "../../config"

const Footer = () => {

  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} {Config.applicationInfo.appName}.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                Design & Develop by <a href={Config.applicationInfo.devOrgLink} target="_blank"><span style={{color: "#fd7014"}}>{Config.applicationInfo.devOrgName}</span></a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
