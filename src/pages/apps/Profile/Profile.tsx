import { useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


// styles
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// components
import PageTitle from "../../../components/PageTitle";
import FileUploader from "../../../components/FileUploader";
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
      comment: yup.string().required("Please enter Project Name"),
      metatitle: yup.string().required("Please enter Project Name"),
      metakeywords: yup.string().required("Please enter Project Name"),
      metadescription: yup.string().required("Please enter Project Name"),
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

      <form onSubmit={handleSubmit(() => {})}>
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
                  key="prevPass"
                  errors={errors}
                  control={control}
                />
                <FormInput
                  name="contactInfo"
                  label="Contact Information"
                  placeholder="Enter your contact number here"
                  containerClass={"mb-3"}
                  register={register}
                  key="reference"
                  errors={errors}
                  control={control}
                />
                <FormInput
                  name="shippingAddress"
                  label="Shipping Address"
                  placeholder="Enter your shipping address here"
                  containerClass={"mb-3"}
                  register={register}
                  key="confirmNewPass"
                  errors={errors}
                  control={control}
                />
                  <FormInput
                  name="BusinessDetails"
                  label="Shipping Address"
                  placeholder="Enter your business details here"
                  containerClass={"mb-3"}
                  register={register}
                  key="confirmNewPass"
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
