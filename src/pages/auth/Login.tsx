import React, { useEffect } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { withSwal } from "react-sweetalert2";



// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";
import axios from "axios";

interface UserData {
  email: string;
  password: string;
}

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p>
          <Link to={"/auth/forget-password"} className="text-white-50 ms-1">
            {t("Forgot your password?")}
          </Link>
        </p>
        <p className="text-white-50">
          {t("Don't have an account?")}{" "}
          <Link to={"/auth/register"} className="text-white ms-1">
            <b>{t("Sign Up")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};


const Login = withSwal((props: any) => {
  const { t } = useTranslation();
  const { swal } = props;
  const navigate = useNavigate();
  /*
  form validation schema
  */
  const schemaResolver = yupResolver(
    yup.object().shape({
      email: yup.string().required(t("Please enter email")),
      password: yup.string().required(t("Please enter Password")),
    })
  );

  const getOTP = async (data: any) => {

    const params = new URLSearchParams(data).toString();
    const fullUrl = `https://reseller.whitexdigital.com/api/login?${params}`;
    // Configure Axios to follow redirects

    // Log the full URL
    console.log(fullUrl);
    try {
      let response = await axios.post(fullUrl);
      if (response.status === 200) {
        swal.fire({
          title: "Success!",
          text: "OTP sent successfully!",
          icon: "success",
        });
        navigate("/auth/verifyOTP");
      }
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  }
  /*
  handle form submission
  */
  const onSubmit = (formData: UserData) => {
    getOTP(formData);

  };

  const location = useLocation();
  //
  // const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/apps/dashboard';
  const redirectUrl = location?.search?.slice(6) || "/apps/dashboard";

  return (
    <>
      <AuthLayout
        helpText={t(
          "Enter your email address and password to get OTP on your email."
        )}
        bottomLinks={<BottomLink />}
      >

        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{ email: "asdasd@asd.asd", password: "asdasd@asd.asd" }}
        >
          <FormInput
            label={t("Email")}
            type="email"
            name="email"
            placeholder="Enter your email "
            containerClass={"mb-3"}
          />
          <FormInput
            label={t("Password")}
            type="password"
            name="password"
            placeholder="Enter your password"
            containerClass={"mb-3"}
          ></FormInput>

          <div className="text-center d-grid">
            <Button variant="primary" type="submit" >
              {t("Get OTP")}
            </Button>
          </div>
        </VerticalForm>


      </AuthLayout>
    </>
  );
});

export default Login;
