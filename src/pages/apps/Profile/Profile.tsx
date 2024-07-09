import { useEffect, useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";



// styles
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// components
import PageTitle from "../../../components/PageTitle";
import { FormInput } from "../../../components";


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
const Profile = () => {

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please enter Project Name"),
      contact: yup.string().required("Please enter Contact Number"),
      business: yup.string().required("Please enter Business Address"),
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
    setValue,
    formState: { errors },
  } = methods;

  const AUTH_SESSION_KEY = "ubold_user";
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem(AUTH_SESSION_KEY);
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      setUserData(parsedUserInfo);

      // Set form values
      setValue("name", parsedUserInfo.username);
      setValue("contact", parsedUserInfo.contact);
      setValue("business", parsedUserInfo.business);

    }
  }, [setValue]);

  const onSubmit = async (data: any) => {
    let newObj = {
      name: data.name,
      contact: data.contact,
      business: data.business
    }
    const params = new URLSearchParams(newObj).toString();

    const fullUrl = `https://reseller.whitexdigital.com/api/update_profile?${params}`;
    try {
      const response = await axios.post(fullUrl);

      // Handle success or failure
      if (response.status === 200) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Profile", path: "/apps/profile" },
          { label: "Profile", path: "/apps/profile", active: true },
        ]}
        title={"Update Profile"}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
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
