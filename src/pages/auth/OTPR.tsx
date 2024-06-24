import { Button, Alert, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { withSwal } from "react-sweetalert2";
import { VerticalForm, FormInput } from "../../components";
import AuthLayout from "./AuthLayout";
import axios from "axios";

interface UserData {
  email: string;
  otp: string;
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

      </Col>
    </Row>
  );
};


const OTPR = withSwal((props: any) => {
  const { t } = useTranslation();
  const { email } = useParams();
  const { swal } = props;
  const navigate = useNavigate();




  /*
  form validation schema
  */
  const schemaResolver = yupResolver(
    yup.object().shape({
      email: yup.string().required(t("Please enter email")),
      otp: yup.string().required(t("Please enter OTP")),
    })
  );

  const verifyOTP = async (data: any) => {

    const params = new URLSearchParams(data).toString();
    const fullUrl = `https://reseller.whitexdigital.com/api/verify_otp?${params}`;
    // Configure Axios to follow redirects

    // Log the full URL
    console.log(fullUrl);
    try {
      let response = await axios.post(fullUrl);
      console.log(response);
      if (response) {
        if (response.status === 200) {
          swal.fire({
            title: "Success!",
            text: "Registration Request Posted Successfully!",
            icon: "success",
          });
          navigate("/auth/login");
        }

      }
      else {
        swal.fire({
          title: "OOPS!",
          text: "Something Went Wrong",
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
  const onSubmit = (formData: UserData) => {
    let data = {
      email: formData["email"],
      otp: formData["otp"]
    }
    verifyOTP(data);
  };



  return (
    <>
      <AuthLayout
        helpText={t(
          "Enter your email address and OTP to send a registration request to admin."
        )}
        bottomLinks={<BottomLink />}
      >

        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{ email: email || "" }}
        >
          <FormInput

            type="email"
            name="email"

            containerClass={"mb-3"}
            style={{ display: "none" }}
          />
          <FormInput
            label={t("OTP")}
            type="text"
            name="otp"
            placeholder="Enter OTP"
            containerClass={"mb-3"}
          ></FormInput>

          <div className="text-center d-grid">
            <Button variant="primary" type="submit">
              {t("Register")}
            </Button>
          </div>
        </VerticalForm>


      </AuthLayout>
    </>
  );
});

export default OTPR;
