import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

import ChatArea from "./ChatArea";
// dummy data

// ChatApp
const ChatApp = () => {

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Apps", path: "/apps/chat" },
          { label: "Chat", path: "/apps/chat", active: true },
        ]}
        title={"Chat with Admin"}
      />

      <Row  className="justify-content-center align-items-center">
       
        <Col lg={10} xl={10}>
          <ChatArea />
        </Col>
      </Row>
    </>
  );
};

export default ChatApp;
