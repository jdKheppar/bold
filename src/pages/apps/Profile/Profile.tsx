import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
// styles
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// components
import PageTitle from "../../../components/PageTitle";
import { FormInput } from "../../../components";
import { Typeahead } from "react-bootstrap-typeahead";

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
  logo: string;
  shippingaddress: string;
}
interface PaymentDTO {
  id: number;
  name: string;
}

interface MobileFinancialType {
  id: number;
  name: string;
}
interface PaymentDetails {
  account_holder_name: string;
  account_number: number;
  bank_name: string;
  branch_name: string;
  mobile_finance_type: string;
  type: string;
}
const Profile = withSwal((props: any) => {
  const { swal } = props;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [payments, setPayments] = useState<PaymentDTO[]>([
    {
      id: 1,
      name: "Mobile Financial Services"
    },
    {
      id: 2,
      name: "Bank"
    }
  ]);
  const [financialtypes, setFinancialTypes] = useState<MobileFinancialType[]>([
    {
      id: 1,
      name: "Nagad"
    },
    {
      id: 2,
      name: "bKash"
    }
  ]);


  const [financialtypeS, setFinancialTypeS] = useState<MobileFinancialType>();
  const [financialSelections, setFinancialSelections] = useState<MobileFinancialType[]>();
  const [paymentdetails, setPaymentDetails] = useState<PaymentDetails>();

  const [paymentS, setPaymentS] = useState<PaymentDTO>();
  const [paymentSelections, setPaymentSelections] = useState<PaymentDTO[]>();



  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [business, setBusiness] = useState("");
  const [logo, setLogo] = useState("");
  const [shippingaddress, setShippingAddress] = useState("");

  const [bankname, setBankName] = useState("");
  const [branchname, setBranchName] = useState("");
  const [accountholdername, setAccountHolderName] = useState("");
  const [accountnumber, setAccountNumber] = useState("");


  const onChangeFinancialSelection = (selected: MobileFinancialType[]) => {
    setFinancialSelections(selected);
    if (selected && selected[0]) {

      setFinancialTypeS(selected[0]);

    }

  };

  const onChangePaymentSelection = (selected: PaymentDTO[]) => {
    setPaymentSelections(selected);
    if (selected && selected[0]) {

      setPaymentS(selected[0]);

    }

  };




  const fetchPaymentMethods = async () => {
    const fullUrl = "https://reseller.whitexdigital.com/api/payout_methord";
    try {
      const response = await axios.get(fullUrl);
      console.log(response.data.data);
      setPaymentDetails(response.data.data);

    } catch (error) {
      swal.fire({
        title: "Error!",
        text: "Something Went Wrong!",
        icon: "error",
      });
      console.error("API call error:", error);
    }
  };

  const AUTH_SESSION_KEY = "ubold_user";

  useEffect(() => {
    const userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      console.log(parsedUserInfo);
      setUserData(parsedUserInfo);
      setName(parsedUserInfo.username);
      setContact(parsedUserInfo.contact);
      setBusiness(parsedUserInfo.business);
      setLogo(parsedUserInfo.logo);
      setShippingAddress(parsedUserInfo.shippingaddress);
      fetchPaymentMethods();
    }
    else {
      swal.fire({
        title: "Error!",
        text: "Error in fetchig user data!",
        icon: "error",
      });
    }
  }, []);
  useEffect(() => {
    if (paymentdetails) {
      setAccountHolderName(paymentdetails.account_holder_name);
      setAccountNumber(paymentdetails.account_number.toString());
      if (paymentdetails.type == "Bank") {
        setPaymentS({
          id: 2,
          name: "Bank",
        });
        setPaymentSelections([
          {
            id: 2,
            name: "Bank",
          },
        ]);
        setBankName(paymentdetails.bank_name);
        setBranchName(paymentdetails.branch_name);
      }
      else {
        setPaymentS({
          id: 1,
          name: "Mobile Financial Services",
        });
        setPaymentSelections([
          {
            id: 1,
            name: "Mobile Financial Services",
          },
        ]);
        if (paymentdetails.mobile_finance_type == "Nagad") {
          setFinancialTypeS({
            id: 1,
            name: paymentdetails.mobile_finance_type,
          });
          setFinancialSelections([
            {
              id: 1,
              name: paymentdetails.mobile_finance_type,
            },
          ]);
        }
        else {
          setFinancialTypeS({
            id: 2,
            name: paymentdetails.mobile_finance_type,
          });
          setFinancialSelections([
            {
              id: 2,
              name: paymentdetails.mobile_finance_type,
            },
          ]);
        }

      }
    }

  }, [paymentdetails]);

  const handleSubmit = async () => {
    let params;
    if (userData) {
      let newObj = {
        name: name,
        contact: contact,
        business: business,
        logo: logo,
        shipping: shippingaddress,
      };
      params = new URLSearchParams(newObj).toString();
    }

    const fullUrl = `https://reseller.whitexdigital.com/api/update_profile?${params}`;
    try {
      const response = await axios.post(fullUrl);

      // Handle success or failure
      if (response.status === 200) {
        swal.fire({
          title: "Success",
          text: "Profile Updated Successfully!",
          icon: "success",
        });
        let updatedUser = {
          id: userData?.id,
          username: name,
          role: "Admin",
          token: userData?.token,
          business: business,
          contact: contact,
          logo: logo,
          shipping: shippingaddress,

        }
        sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(updatedUser));
      } else {
        swal.fire({
          title: "Error!",
          text: "Failed to update profile!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const updatePaymentDetails = async () => {
    let params;
    let paymentType = paymentS ? paymentS.name : "";
    let mobileFinancialType = financialtypeS ? financialtypeS.name : "";
    let newObj = {
      type: paymentType,
      mobile_finance_type: mobileFinancialType,
      bank_name: bankname,
      branch_name: branchname,
      account_holder_name: accountholdername,
      account_number: accountnumber
    };
    params = new URLSearchParams(newObj).toString();

    const fullUrl = `https://reseller.whitexdigital.com/api/payout_methord?${params}`;
    try {
      const response = await axios.post(fullUrl);

      // Handle success or failure
      if (response.status === 200) {
        swal.fire({
          title: "Success",
          text: "Payment Updated Successfully!",
          icon: "success",
        });

      } else {
        swal.fire({
          title: "Error!",
          text: "Failed to update payment method!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("There was an error updating the payment method!", error);
      alert("An error occurred while updating the payment method.");
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

      <Row>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <h5 className="text-uppercase bg-light p-2 mt-0 mb-3">
                Update Profile Information
              </h5>
              <FormInput
                name="name"
                label="Name"
                placeholder="Enter your name here"
                containerClass={"mb-3"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormInput
                name="contact"
                label="Contact Information"
                placeholder="Enter your contact number here"
                containerClass={"mb-3"}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <FormInput
                name="business"
                label="Business Address"
                placeholder="Enter your business address here"
                containerClass={"mb-2"}
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
              />
              <FormInput
                name="logo"
                label="Logo"
                placeholder="Enter your logo URL here"
                containerClass={"mb-3"}
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
              <FormInput
                name="shippingaddress"
                label="Shipping Address"
                placeholder="Enter your shipping address here"
                containerClass={"mb-3"}
                value={shippingaddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </Card.Body>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn w-sm btn-success waves-effect waves-light p-2 mt-0 m-3 text-uppercase"
            >
              Update Profile
            </button>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <h5 className="text-uppercase bg-light p-2 mt-0 mb-3">
                Update Payment Method
              </h5>
              <div className="mb-3">
                <label htmlFor="payment" className="form-label">
                  Payment
                </label>
                <Typeahead
                  id="select3"
                  labelKey={"name"}

                  multiple={false}
                  onChange={onChangePaymentSelection}
                  options={payments}
                  placeholder="Select a payment method..."
                  selected={paymentSelections}
                />
              </div>
              {
                paymentS?.id == 2 &&
                <>
                  <FormInput
                    name="bank name"
                    label="Bank Name"
                    placeholder="Enter your bank name here"
                    containerClass={"mb-3"}
                    value={bankname}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                  <FormInput
                    name="branch name"
                    label="Branch Name"
                    placeholder="Enter your branch name here"
                    containerClass={"mb-3"}
                    value={branchname}
                    onChange={(e) => setBranchName(e.target.value)}
                  />
                </>
              }
              {
                paymentS?.id == 1 &&
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Finance Type
                  </label>
                  <Typeahead
                    id="financetype"
                    labelKey={"name"}

                    multiple={false}
                    onChange={onChangeFinancialSelection}
                    options={financialtypes}
                    placeholder="Select a mobile finance type here..."
                    selected={financialSelections}
                  />

                </div>
              }

              <FormInput
                name="account holder name"
                label="Account Holder Name"
                placeholder="Enter account holder name here"
                containerClass={"mb-2"}
                value={accountholdername}
                onChange={(e) => setAccountHolderName(e.target.value)}
              />
              <FormInput
                name="account number"
                label="Account Number"
                placeholder="Enter account number here"
                containerClass={"mb-2"}
                value={accountnumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <button
                type="button"
                onClick={updatePaymentDetails}
                className="btn w-sm btn-success waves-effect waves-light p-2 mt-0 text-uppercase"
              >
                Update Payment Details
              </button>

            </Card.Body>
          </Card>

        </Col>
      </Row>
    </>
  );
});

export default Profile;
