import { Button, Row, Col } from "react-bootstrap";
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { withSwal } from "react-sweetalert2";
import { VerticalForm, FormInput } from "../../components/";
import AuthLayout from "./AuthLayout";
import axios from "axios";
import { APICore, setAuthorization } from "../../helpers/api/apiCore";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";



// actions
import { loginUser } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";


interface UserData {
  email: string;
  otp: string;
  password: string;
}
const api = new APICore();
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
  const [otpSent, setOTPSent] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { user, userLoggedIn, loading, error } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
    })
  );
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

    try {
      let response = await axios.post(fullUrl);
      if (response.status === 200) {
        if (response.data.otp_sent) {
          swal.fire({
            title: "Success!",
            text: "OTP sent successfully!",
            icon: "success",
          });
          navigate(`/auth/verifyOTP/${data.email}`);
        }
        else {
          data["otp"] = "";
          dispatch(loginUser(data["email"], data["otp"], data["password"]));
          setOTPSent(false);
          return false;
        }

      }
      else if (response.status === 401) {
        swal.fire({
          title: "Error!",
          text: "Invalid Credentials!",
          icon: "error",
        });
      }
      else {
        swal.fire({
          title: "Error!",
          text: "Something Went Wrong!",
          icon: "error",
        });
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
  handle form submission
  */
  const onSubmit = async (formData: UserData) => {


    const OTPSEND = await getOTP(formData);

    if (!otpSent) {
      console.log("I am going to dispatch this");

    }
  };
  const location = useLocation();
  //
  // const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/apps/dashboard';
  const redirectUrl = location?.search?.slice(6) || "/apps/dashboard";

  return (
    <>
      {(userLoggedIn || user) && <Navigate to={redirectUrl}></Navigate>}
      <AuthLayout
        helpText={t(
          "Enter your email address and password to get OTP on your email."
        )}
        bottomLinks={<BottomLink />}
      >

        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{ email: "mohammadjunaed858@gmail.com", password: "password" }}
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
              {t("Login")}
            </Button>
          </div>
        </VerticalForm>


      </AuthLayout>
    </>
  );
});

export default Login;
