import { useState } from "react";
import { Row, Col, Card} from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


// styles
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// components
import PageTitle from "../../../components/PageTitle";
import { FormInput } from "../../../components";

const ProductEdit = () => {
  
  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please enter Project Name"),
      reference: yup.string().required("Please enter Project Name"),
      summary: yup.string().required("Please enter Project Name"),
      price: yup.string().required("Please enter Project Name"),
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
          { label: "Settings", path: "/apps/Settings" },
          {
            label: "Update Password",
            path: "/apps/ecommerce/details",
            active: true,
          },
        ]}
        title={"Update Password"}
      />

      <form onSubmit={handleSubmit(() => {})}>
        <Row>
          <Col lg={8}>
            <Card>
              <Card.Body>
                <h5 className="text-uppercase bg-light p-2 mt-0 mb-3">
                  Update Password
                </h5>
                <FormInput
                  name="prevPass"
                  label="Previous Password"
                  
                  containerClass={"mb-3"}
                  register={register}
                  key="prevPass"
                  errors={errors}
                  control={control}
                />
                <FormInput
                  name="newPass"
                  label="New Password"
                  containerClass={"mb-3"}
                  register={register}
                  key="newPass"
                  errors={errors}
                  control={control}
                />
                <FormInput
                  name="cnfrmNewPass"
                  label="Confirm New Password"
                  containerClass={"mb-3"}
                  register={register}
                  key="cnfrmNewPass"
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

export default ProductEdit;
