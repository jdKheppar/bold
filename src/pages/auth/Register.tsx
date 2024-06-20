import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { withSwal } from "react-sweetalert2";
import axios from "axios";

//actions
import { resetAuth, signupUser } from "../../redux/actions";

import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";

interface UserData {
  name: string;
  email: string;
  password: string;
}

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-white-50">
          {t("Already have account?")}{" "}
          <Link to={"/auth/login"} className="text-white ms-1">
            <b>{t("Sign In")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const Register = withSwal ((props: any) => {
  const { t } = useTranslation();
  const { swal } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, userSignUp, error } = useSelector((state: RootState) => ({
    loading: state.Auth.loading,
    error: state.Auth.error,
    userSignUp: state.Auth.userSignUp,
  }));

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required(t("Please enter Fullname")),
      email: yup
        .string()
        .required("Please enter Email")
        .email("Please enter valid Email"),
      password: yup.string().required(t("Please enter Password")),
    })
  );
  const getOTP = async (data: any) => {

    const params = new URLSearchParams(data).toString();
    const fullUrl = `https://reseller.whitexdigital.com/api/register?${params}`;
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
        navigate("/auth/verifyOTPR");
      }
    } catch (error) {
      console.error("API call error:", error);
      swal.fire({
        title: "Error!",
        text: "Something Went Wrong!",
        icon: "error",
      });
      throw error;
    }
  }

  /*
   * handle form submission
   */
  const onSubmit = (formData: UserData) => {
    getOTP(formData);
  };

  return (
    <>
      {userSignUp ? <Navigate to={"/auth/confirm"}></Navigate> : null}

      <AuthLayout
        helpText={t(
          "Don't have an account? Create your account, it takes less than a minute"
        )}
        bottomLinks={<BottomLink />}
      >
        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{}}
        >
          <FormInput
            label={t("Full Name")}
            type="text"
            name="name"
            placeholder={t("Enter your name")}
            containerClass={"mb-3"}
          />
          <FormInput
            label={t("Email address")}
            type="email"
            name="email"
            placeholder={t("Enter your email")}
            containerClass={"mb-3"}
          />
          <FormInput
            label={t("Password")}
            type="password"
            name="password"
            placeholder={t("Enter your password")}
            containerClass={"mb-3"}
          />         

          <div className="text-center d-grid">
            <Button variant="success" type="submit" disabled={loading}>
              {t("Get OTP")}
            </Button>
          </div>
        </VerticalForm>

        
      </AuthLayout>
    </>
  );
});

export default Register;
