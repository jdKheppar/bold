import { useEffect, useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


interface UserData {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
  business: string;
  contact: string;
}

// styles
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// components
import PageTitle from "../../../components/PageTitle";
import { FormInput } from "../../../components";

const Profile = () => {

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please enter Project Name"),
      contactInfo: yup.string().required("Please enter Contact Number"),
      shippingAddress: yup.string().required("Please enter your shipping address"),
      BusinessDetails: yup.string().required("Please enter BusinessDetails"),
    })
  );

  /*
   * form methods
   */
  const methods = useForm({ resolver: schemaResolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

function customHandleSubmit(){

}


  const AUTH_SESSION_KEY = "ubold_user";
  useEffect(() => {
    let userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (userInfo) {
      const { username,business, contact } = JSON.parse(userInfo);
      
    }
  })
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Profile", path: "/apps/Profile" },
          {
            label: "Profile",
            path: "/apps/profile",
            active: true,
          },
        ]}
        title={"Update Profile"}
      />

      <form onSubmit={customHandleSubmit}>
        <Row>
          <Col lg={8}>
            <Card>
              <Card.Body>
                <h5 className="text-uppercase bg-light p-2 mt-0 mb-3">
                  Update Profile
                </h5>
                <FormInput
                  name="name"
                  label="Name"
                  placeholder="Enter your name here"
                  containerClass={"mb-3"}
                  register={register}
                  key="name"
                  errors={errors}
                  control={control}
                />
                <FormInput
                  name="contact"
                  label="Contact Information"
                  placeholder="Enter your contact number here"
                  containerClass={"mb-3"}
                  register={register}
                  key="contact"
                  errors={errors}
                  control={control}
                />
               
                <FormInput
                  name="business"
                  label="Business Address"
                  placeholder="Enter your business address here"
                  containerClass={"mb-3"}
                  register={register}
                  key="business"
                  errors={errors}
                  control={control}
                />

              </Card.Body>
            </Card>
          </Col>

        </Row>

        <Row>
          <Col lg={8}>
            <div className="text-right mb-3">

              <button
                type="submit"
                className="btn w-sm btn-success waves-effect waves-light me-1"
              >
                Update
              </button>

            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default Profile;
