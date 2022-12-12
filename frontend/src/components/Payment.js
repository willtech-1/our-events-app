import React, { useState } from "react";
import { Link } from "react-router-dom";
// import modal component
import Modal from "./Modal";

const Payment = () => {
  // contact form state
  const [formValues, setFormValues] = useState({
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  //modal text
  const [modalText, setModalText] = useState("");
  //toggle modal
  const close = () => setModalOpen(false);
  //modal state
  const [modalOpen, setModalOpen] = useState(false);

  //handle change function
  const handleChange = (e) => {
    setFormValues((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // handleSubmit function
  const handleSubmit = (e) => {
    // prevent page from being refreshed
    e.preventDefault();
    // modal logic
    // if user sends valid values
    if (
      formValues.fullName &&
      formValues.cardNumber &&
      formValues.expiryDate &&
      formValues.cvv
    ) {
      setModalOpen(!modalOpen);
      //set values into their default state
      setFormValues({ fullName: "", cardNumber: "", expiryDate: "", cvv: "" });
      setModalText("Payment successful!");
      // if user sends empty input values or invalid credentials
    } else {
      // if there is an error show it to the user
      setModalOpen(true);
      setModalText("Please enter valid values!");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-blue-300">
        <br />
        <div className="h-auto w-2/4 bg-white p-3 rounded-lg mt-12">
          <p className="text-2xl font-semibold text-center">Payment Details</p>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="input_text mt-6 relative">
              {" "}
              <input
                type="text"
                className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b"
                placeholder="Full Name"
                onChange={handleChange}
                value={formValues.fullName}
                name="fullName"
              />{" "}
              <span className="absolute left-0 text-sm -top-4">
                Cardholder Name
              </span>{" "}
              <i className="absolute left-2 top-4 text-gray-400 fa fa-user"></i>{" "}
            </div>
            <div className="input_text mt-8 relative">
              {" "}
              <input
                type="text"
                className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b "
                placeholder="0000 0000 0000 0000"
                data-slots="0"
                data-accept="\d"
                size="19"
                onChange={handleChange}
                value={formValues.cardNumber}
                name="cardNumber"
              />{" "}
              <span className="absolute left-0 text-sm -top-4">
                Card Number
              </span>{" "}
              <i className="absolute left-2 top-[14px] text-gray-400 text-sm fa fa-credit-card"></i>{" "}
            </div>
            <div className="mt-8 flex gap-5 ">
              <div className="input_text relative w-full">
                {" "}
                <input
                  type="text"
                  className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b "
                  placeholder="mm/yyyy"
                  data-slots="my"
                  onChange={handleChange}
                  value={formValues.expiryDate}
                  name="expiryDate"
                />{" "}
                <span className="absolute left-0 text-sm -top-4">Expiry</span>{" "}
                <i className="absolute left-2 top-4 text-gray-400 fa fa-calendar-o"></i>{" "}
              </div>
              <div className="input_text relative w-full">
                {" "}
                <input
                  type="text"
                  className="h-12 pl-7 outline-none px-2 focus:border-blue-900 transition-all w-full border-b "
                  placeholder="000"
                  data-slots="0"
                  data-accept="\d"
                  size="3"
                  onChange={handleChange}
                  value={formValues.cvv}
                  name="cvv"
                />{" "}
                <span className="absolute left-0 text-sm -top-4">CVV</span>{" "}
                <i className="absolute left-2 top-4 text-gray-400 fa fa-lock"></i>{" "}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              {" "}
              <button
                type="submit"
                className="outline-none pay h-12 bg-orange-600 text-white mb-3 hover:bg-orange-700 rounded-lg w-1/2 cursor-pointer transition-all"
              >
                Pay
              </button>{" "}
            </div>
          </form>
          {/* Modal component conditional rendering*/}
          {modalOpen && (
            <Modal modalOpen={modalOpen} handleClose={close} text={modalText} />
          )}
          <br />
          <div>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              style={{ textDecoration: "none" }}
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
