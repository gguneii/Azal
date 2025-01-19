import React, { useState, useEffect, useContext } from "react";
import PaymentDetails from './PaymentDetails'
import Stepper from './Stepper'
import FlightInfo from './FlightInfo'
import { Flight } from "../../Context/FlightContext";
import { IoPerson } from "react-icons/io5";
import { FaChild } from "react-icons/fa";
import { MdChildFriendly } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";


function Passengers( {currentStep,setCurrentStep} ) {
  const { passengerData, passengerInformation, setPassengerInformation } = useContext(Flight);
  const [selectedGenderAdult, setSelectedGenderAdult] = useState("");

  const countries = [
    "Azerbaijan",
    "Russia",
    "Turkey",
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "India",
    "Japan",
    "China",
    "Brazil",
  ];
  

  useEffect(() => {
    if (passengerData) {
      setPassengerInformation({
        adults: Array.from({ length: passengerData.adults || 0 }, () => ({
          firstName: "",
          lastName: "",
          gender: "",
          dateofBirth: "",
          documentType: "",
          documentNumber: "",
          issuingCountry: "",
          documentExpiryDate: "",
        })),
        children: Array.from({ length: passengerData.children || 0 }, () => ({
          firstName: "",
          lastName: "",
          gender: "",
          dateofBirth: "",
          documentType: "",
          documentNumber: "",
          issuingCountry: "",
          documentExpiryDate: "",
        })),
        babies: Array.from({ length: passengerData.babies || 0 }, () => ({
          firstName: "",
          lastName: "",
          gender: "",
          dateofBirth: "",
          documentType: "",
          documentNumber: "",
          issuingCountry: "",
          documentExpiryDate: "",
        })),
      });
    }
  }, [passengerData, setPassengerInformation]);
 
  const handleInputChange = (type, index, field, value) => {
    setPassengerInformation((item) => ({
      ...item,
      [type]: item[type].map((passenger, i) =>
        i === index ? { ...passenger, [field]: value } : passenger
      ),
    }));
  };
  



  const [validationErrors, setValidationErrors] = useState({});

  const validatePassengerFields = () => {
    const errors = { adults: [], children: [], babies: [] };
  
    const types = ["adults", "children", "babies"];
    for (const type of types) {
      if (passengerInformation[type]) {
        passengerInformation[type].forEach((passenger, index) => {
          const passengerErrors = {};
          if (!passenger.firstName) passengerErrors.firstName = true;
          if (!passenger.lastName) passengerErrors.lastName = true;
          if (!passenger.gender) passengerErrors.gender = true;
          if (!passenger.dateofBirth) passengerErrors.dateofBirth = true;
          if (!passenger.documentType || !passenger.documentNumber || !passenger.issuingCountry || !passenger.documentExpiryDate) {
            passengerErrors.documentDetails = true;
          }
          errors[type][index] = passengerErrors;
        });
      }
    }
  
    setValidationErrors(errors);
  
    return !Object.values(errors).some((group) =>
      Array.isArray(group)
        ? group.some((fieldErrors) => Object.keys(fieldErrors).length > 0)
        : Object.keys(group).length > 0
    );
  };
  
  useEffect(() => {
    validatePassengerFields();
  }, [passengerInformation]);


  useEffect(() => {
    if (currentStep === 0) {
      setPassengerInformation({
        adults: [],
        children: [],
        babies: [],
        contact: {
          phoneNumber: "",
          email: "",
        },
      });
    }
  }, [currentStep]);

  return (
    <div className=' bg-[#edf1f4] h-full pt-[100px]'>
      <FlightInfo/>
      <Stepper currentStep={1}/>
      <section className=' bg-[#edf1f4] h-full w-[90%] mx-auto mt-4 pb-[300px]'>
        <h1 className='text-[1.3em] my-4'>Complete Passenger Information</h1>
        <section>
          <div>
            {passengerData?.adults > 0 && (
            <div>
                {[...Array(passengerData.adults)].map((_, index) => (
                <div className="my-5" key={`adult-${index}`} >
                  <div className="text-lg items-center text-white flex bg-[#01357E] p-3 rounded-t-lg"><IoPerson />Adults</div>
                  <form key={`adult-${index}`} className="p-4 bg-white rounded-lg  ">
                    <ul className="border-b pb-3 md:flex justify-between w-full md:px-4">
                      <li className="pt-2 md:w-[25%]">
                          <p
                             className={`text-[0.8em] ${
                              validationErrors.adults?.[index]?.firstName ? "text-red-500" : "text-[#6E7583]"
                            }`}
                          >First Name (Latin) *</p>
                        <input
                            className={`w-full border p-2 mb-2 rounded-md ${
                              validationErrors.adults?.[index]?.firstName ? "border-red-500" : ""
                            }`}
                          value={passengerInformation?.adults?.[index]?.firstName || ""}
                          onChange={(e) =>
                            handleInputChange("adults", index, "firstName", e.target.value)
                          }
                          onKeyPress={(e) => {
                            if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                              e.preventDefault(); 
                            }
                          }}
                        />
                      </li>
                      <li className="pt-2 md:w-[25%]">
                          <p className={`text-[0.8em] ${
                              validationErrors.adults?.[index]?.lastName ? "text-red-500" : "text-[#6E7583]"
                            }`}
                          >Last Name (Latin) *</p>
                        <input
                            className={`w-full border p-2 mb-2 rounded-md ${
                              validationErrors.adults?.[index]?.lastName ? "border-red-500" : ""
                            }`}
                          value={passengerInformation?.adults?.[index]?.lastName || ""}
                          onChange={(e) =>
                            handleInputChange("adults", index, "lastName", e.target.value)
                          }
                          onKeyPress={(e) => {
                            if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                              e.preventDefault(); 
                            }
                          }}
                        />
                      </li>
                      <li className="pt-2">
                          <p className={`text-[0.8em] ${
                              validationErrors.adults?.[index]?.gender ? "text-red-500" : "text-[#6E7583]"
                            }`}
                          >Gender *</p>
                        <div className="flex gap-2 ">
                          <button
                            className={`border p-3 w-[50%] rounded-md ${
                              passengerInformation?.adults?.[index]?.gender === "M" ? " border border-blue-500 text-blue-500 " : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault(); 
                              handleInputChange("adults", index, "gender", "M");
                            }}
                          >
                            M
                          </button>
                          <button
                            className={`border p-3 w-[50%] rounded-md ${
                              passengerInformation?.adults?.[index]?.gender === "F" ? "border-blue-500  text-blue-500 " : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault(); 
                              handleInputChange("adults", index, "gender", "F");
                            }}
                          >
                            F
                          </button>
                        </div>
                      </li>
                      <li className="pt-2 md:w-[20%]">
                          <p className={`text-[0.8em] ${
                              validationErrors.adults?.[index]?.dateofBirth ? "text-red-500" : "text-[#6E7583]"
                            }`}
                          >Date of Birth *</p>
                        <input
                            type="date"
                            max="2012-12-01" 
                            value={passengerInformation?.adults?.[index]?.dateofBirth || ""}
                            onChange={(e) =>
                              handleInputChange("adults", index, "dateofBirth", e.target.value)
                            }
                            className={`w-full border p-2 mb-2 rounded-md ${
                              validationErrors?.adults?.[index]?.firstName ? "border-red-500 text-red-500" : ""
                            } text-[#6E7583]`}
                          />
                      </li>
                    </ul>
                    <h1 className="text-[1.3em] my-3 md:p md:w-[30$]-4 md:">Document Details</h1>  
                    <ul className="md:flex md:justify-between md:px-4">
                      <li className="md:w-[25%]">
                        <p className="text-[#6E7583] text-[0.8em]">Document Type *</p>
                        <select
                          name="document"
                          className="w-full border p-2 mb-2 rounded-md mt-2"
                          onChange={(e) =>
                            handleInputChange("adults", index, "documentType", e.target.value)
                          }
                        >
                          <option value="NotSelected">Not Selected</option>
                          <option value="Passport">Passport</option>
                          <option value="ID">New generation biometric identity card</option>
                        </select>
                      </li>
                      <li className="pt-2 md:w-[25%]">
                          <p className={`text-[0.8em] ${
                              validationErrors.adults?.[index]?.documentNumber ? "text-red-500" : "text-[#6E7583]"
                            }`}
                          >Document Number *</p>
                        <input
                           className={`w-full border p-2 mb-2 rounded-md ${
                            validationErrors.adults?.[index]?.documentNumber ? "border-red-500" : ""
                          }`}
                          disabled={
                            passengerInformation?.adults?.[index]?.documentType === "NotSelected" ||
                            !passengerInformation?.adults?.[index]?.documentType
                          }
                          value={passengerInformation?.adults?.[index]?.documentNumber || ""}
                          onChange={(e) =>
                            handleInputChange("adults", index, "documentNumber", e.target.value)
                          }
                        />
                      </li>
                      <li className="md:w-[20%]">
                        <p className="text-[#6E7583] text-[0.8em]">Issuing Country *</p>
                        <select
                          className="w-full border p-2 mb-2 rounded-md mt-2 text-[#6E7583]"
                          disabled={
                            passengerInformation?.adults?.[index]?.documentType === "NotSelected" ||
                            !passengerInformation?.adults?.[index]?.documentType
                          }
                          value={passengerInformation?.adults?.[index]?.issuingCountry || ""}
                          onChange={(e) =>
                            handleInputChange("adults", index, "issuingCountry", e.target.value)
                          }
                        >
                          <option value="NotSelected">Not Selected</option>
                          {countries.map((country, idx) => (
                            <option key={idx} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </li>
                      <li className="md:w-[20%]">
                        <p className="text-[0.8em]">Document Expiry Date *</p>
                        <input
                          type="date"
                          min={new Date(new Date().setMonth(new Date().getMonth() + 3))
                            .toISOString()
                            .split("T")[0]}
                          className="w-full border p-2 mb-2 rounded-md text-[#6E7583]"
                          disabled={
                            passengerInformation?.adults?.[index]?.documentType === "NotSelected" ||
                            !passengerInformation?.adults?.[index]?.documentType
                          }
                          value={passengerInformation?.adults?.[index]?.documentExpiryDate || ""}
                          onChange={(e) =>
                            handleInputChange("adults", index, "documentExpiryDate", e.target.value)
                          }
                        />
                      </li>
                    </ul>

                  </form>
                </div>
              ))}
            </div>
          )}
          </div>
          <div>
            {passengerData?.children > 0 && (
              <div>
                {[...Array(passengerData.children)].map((_, index) => (
                  <div key={`child-${index}`} className="my-5">
                    <div className="text-lg items-center text-white flex bg-[#01357E] p-3 rounded-t-lg">
                      <FaChild  /> Children
                    </div>
                    <form className="p-4 bg-white rounded-lg">
                      <ul className="border-b pb-3 md:flex justify-between w-full md:px-4">
                        <li className="pt-2 md:w-[25%]">
                          <p className={`text-[0.8em] ${
                              validationErrors.children?.[index]?.firstName ? "text-red-500" : "text-[#6E7583]"
                            }`}>First Name (Latin) *</p>
                          <input
                              className={`w-full border p-2 mb-2 rounded-md ${
                                validationErrors.children?.[index]?.firstName ? "border-red-500" : ""
                              }`}
                            value={passengerInformation?.children?.[index]?.firstName || ""}
                            onChange={(e) =>
                              handleInputChange("children", index, "firstName", e.target.value)
                            }
                            onKeyPress={(e) => {
                              if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </li>
                        <li className="pt-2 md:w-[25%]">
                          <p className={`text-[0.8em] ${
                              validationErrors.children?.[index]?.lastName ? "text-red-500" : "text-[#6E7583]"
                            }`}>Last Name (Latin) *</p>
                          <input
                             className={`w-full border p-2 mb-2 rounded-md ${
                              validationErrors.children?.[index]?.lastName ? "border-red-500" : ""
                            }`}
                            value={passengerInformation?.children?.[index]?.lastName || ""}
                            onChange={(e) =>
                              handleInputChange("children", index, "lastName", e.target.value)
                            }
                            onKeyPress={(e) => {
                              if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </li>
                        <li className="pt-2">
                          <p className={`text-[0.8em] ${
                              validationErrors.children?.[index]?.gender ? "text-red-500" : "text-[#6E7583]"
                            }`}>Gender *</p>
                          <div className="flex gap-2">
                            <button
                              className={`border p-3 w-[50%] rounded-md ${
                                passengerInformation?.children?.[index]?.gender === "M"
                                  ? " border border-blue-500 text-blue-500 "
                                  : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleInputChange("children", index, "gender", "M");
                              }}
                            >
                              M
                            </button>
                            <button
                              className={`border p-3 w-[50%] rounded-md ${
                                passengerInformation?.children?.[index]?.gender === "F"
                                  ? "border-blue-500  text-blue-500 "
                                  : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleInputChange("children", index, "gender", "F");
                              }}
                            >
                              F
                            </button>
                          </div>
                        </li>
                        <li className="pt-2 md:w-[20%]">
                          <p className={`text-[0.8em] ${
                              validationErrors.children?.[index]?.dateofBirth ? "text-red-500" : "text-[#6E7583]"
                            }`}>Date of Birth *</p>
                          <input
                            type="date"
                            min="2013-12-01"
                            max={new Date().toISOString().split("T")[0]} 
                            value={passengerInformation?.children?.[index]?.dateofBirth || ""}
                            onChange={(e) =>
                              handleInputChange("children", index, "dateofBirth", e.target.value)
                            }
                            className={`w-full border p-2 mb-2 rounded-md ${
                              validationErrors?.children?.[index]?.dateofBirth ? "border-red-500 text-red-500" : ""
                            } text-[#6E7583]`}
                          />
                        </li>
                      </ul>
                      <h1 className="text-[1.3em] my-3 md:p md:w-[30%]-4 md:">Document Details</h1>
                      <ul className="md:flex md:justify-between md:px-4">
                        <li className="md:w-[25%]">
                          <p className="text-[#6E7583] text-[0.8em]">Document Type *</p>
                          <select
                            name="document"
                            className="w-full border p-2 mb-2 rounded-md mt-2"
                            onChange={(e) =>
                              handleInputChange("children", index, "documentType", e.target.value)
                            }
                          >
                            <option value="NotSelected">Not Selected</option>
                            <option value="Passport">Passport</option>
                            <option value="ID">New generation biometric identity card</option>
                          </select>
                        </li>
                        <li className="pt-2 md:w-[25%]">
                          <p className="text-[#6E7583] text-[0.8em]">Document Number *</p>
                          <input
                            className="w-full border p-2 mb-2 rounded-md"
                            disabled={
                              passengerInformation?.children?.[index]?.documentType ===
                                "NotSelected" || !passengerInformation?.children?.[index]?.documentType
                            }
                            value={passengerInformation?.children?.[index]?.documentNumber || ""}
                            onChange={(e) =>
                              handleInputChange("children", index, "documentNumber", e.target.value)
                            }
                          />
                        </li>
                        <li className="md:w-[20%]">
                          <p className="text-[#6E7583] text-[0.8em]">Issuing Country *</p>
                          <select
                            className="w-full border p-2 mb-2 rounded-md mt-2 text-[#6E7583]"
                            disabled={
                              passengerInformation?.children?.[index]?.documentType ===
                                "NotSelected" || !passengerInformation?.children?.[index]?.documentType
                            }
                            value={passengerInformation?.children?.[index]?.issuingCountry || ""}
                            onChange={(e) =>
                              handleInputChange("children", index, "issuingCountry", e.target.value)
                            }
                          >
                            <option value="NotSelected">Not Selected</option>
                            {countries.map((country, idx) => (
                              <option key={idx} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </li>
                        <li className="md:w-[20%]">
                          <p className="text-[0.8em]">Document Expiry Date *</p>
                          <input
                            type="date"
                            min={new Date(new Date().setMonth(new Date().getMonth() + 3))
                              .toISOString()
                              .split("T")[0]}
                            className="w-full border p-2 mb-2 rounded-md text-[#6E7583]"
                            disabled={
                              passengerInformation?.children?.[index]?.documentType ===
                                "NotSelected" || !passengerInformation?.children?.[index]?.documentType
                            }
                            value={passengerInformation?.children?.[index]?.documentExpiryDate || ""}
                            onChange={(e) =>
                              handleInputChange("children", index, "documentExpiryDate", e.target.value)
                            }
                          />
                        </li>
                      </ul>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {passengerData?.babies > 0 && (
            <div>
              {[...Array(passengerData.babies)].map((_, index) => (
                <div key={`baby-${index}`} className="my-5">
                  <div className="text-lg items-center text-white flex bg-[#01357E] p-3 rounded-t-lg">
                    <MdChildFriendly  /> Infant
                  </div>
                  <form className="p-4 bg-white rounded-lg">
                    <ul className="border-b pb-3 md:flex justify-between w-full md:px-4">
                      <li className="pt-2 md:w-[25%]">
                        <p className={`text-[0.8em] ${
                              validationErrors.babies?.[index]?.firstName ? "text-red-500" : "text-[#6E7583]"
                            }`}>First Name (Latin) *</p>
                        <input
                          className={`w-full border p-2 mb-2 rounded-md ${
                            validationErrors.babies?.[index]?.firstName ? "border-red-500" : ""
                          }`}
                          value={passengerInformation?.babies?.[index]?.firstName || ""}
                          onChange={(e) =>
                            handleInputChange("babies", index, "firstName", e.target.value)
                          }
                          onKeyPress={(e) => {
                            if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </li>
                      <li className="pt-2 md:w-[25%]">
                        <p className={`text-[0.8em] ${
                              validationErrors.babies?.[index]?.lastName ? "text-red-500" : "text-[#6E7583]"
                            }`}>Last Name (Latin) *</p>
                        <input
                          className={`w-full border p-2 mb-2 rounded-md ${
                          validationErrors.babies?.[index]?.lastName ? "border-red-500" : ""
                          }`}
                          value={passengerInformation?.babies?.[index]?.lastName || ""}
                          onChange={(e) =>
                            handleInputChange("babies", index, "lastName", e.target.value)
                          }
                          onKeyPress={(e) => {
                            if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </li>
                      <li className="pt-2">
                        <p className={`text-[0.8em] ${
                              validationErrors.babies?.[index]?.gender ? "text-red-500" : "text-[#6E7583]"
                            }`}>Gender *</p>
                        <div className="flex gap-2">
                          <button
                            className={`border p-3 w-[50%] rounded-md ${
                              passengerInformation?.babies?.[index]?.gender === "M"
                                ? " border border-blue-500 text-blue-500 "
                                : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleInputChange("babies", index, "gender", "M");
                            }}
                          >
                            M
                          </button>
                          <button
                            className={`border p-3 w-[50%] rounded-md ${
                              passengerInformation?.babies?.[index]?.gender === "F"
                                ? "border-blue-500  text-blue-500 "
                                : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleInputChange("babies", index, "gender", "F");
                            }}
                          >
                            F
                          </button>
                        </div>
                      </li>
                      <li className="pt-2 md:w-[20%]">
                        <p className={`text-[0.8em] ${
                              validationErrors.babies?.[index]?.dateofBirth ? "text-red-500" : "text-[#6E7583]"
                            }`}>Date of Birth *</p>
                        <input
                          type="date"
                          min="2023-12-31"
                          max={new Date().toISOString().split("T")[0]} 
                          value={passengerInformation?.babies?.[index]?.dateofBirth || ""}
                          onChange={(e) =>
                            handleInputChange("babies", index, "dateofBirth", e.target.value)
                          }
                          className={`w-full border p-2 mb-2 rounded-md ${
                            validationErrors?.babies?.[index]?.dateofBirth ? "border-red-500 text-red-500" : ""
                          } text-[#6E7583]`}
                        />
                      </li>
                    </ul>
                    <h1 className="text-[1.3em] my-3 md:p md:w-[30%]-4 md:">Document Details</h1>
                    <ul className="md:flex md:justify-between md:px-4">
                      <li className="md:w-[25%]">
                        <p className="text-[#6E7583] text-[0.8em]">Document Type *</p>
                        <select
                          name="document"
                          className="w-full border p-2 mb-2 rounded-md mt-2"
                          onChange={(e) =>
                            handleInputChange("babies", index, "documentType", e.target.value)
                          }
                        >
                          <option value="NotSelected">Not Selected</option>
                          <option value="Passport">Passport</option>
                          <option value="ID">New generation biometric identity card</option>
                        </select>
                      </li>
                      <li className="pt-2 md:w-[25%]">
                        <p className="text-[#6E7583] text-[0.8em]">Document Number *</p>
                        <input
                          className="w-full border p-2 mb-2 rounded-md"
                          disabled={
                            passengerInformation?.babies?.[index]?.documentType ===
                              "NotSelected" || !passengerInformation?.babies?.[index]?.documentType
                          }
                          value={passengerInformation?.babies?.[index]?.documentNumber || ""}
                          onChange={(e) =>
                            handleInputChange("babies", index, "documentNumber", e.target.value)
                          }
                        />
                      </li>
                      <li className="md:w-[20%]">
                        <p className="text-[#6E7583] text-[0.8em]">Issuing Country *</p>
                        <select
                          className="w-full border p-2 mb-2 rounded-md mt-2 text-[#6E7583]"
                          disabled={
                            passengerInformation?.babies?.[index]?.documentType ===
                              "NotSelected" || !passengerInformation?.babies?.[index]?.documentType
                          }
                          value={passengerInformation?.babies?.[index]?.issuingCountry || ""}
                          onChange={(e) =>
                            handleInputChange("babies", index, "issuingCountry", e.target.value)
                          }
                        >
                          <option value="NotSelected">Not Selected</option>
                          {countries.map((country, idx) => (
                            <option key={idx} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </li>
                      <li className="md:w-[20%]">
                        <p>Document Expiry Date *</p>
                        <input
                          type="date"
                          min={new Date(new Date().setMonth(new Date().getMonth() + 3))
                            .toISOString()
                            .split("T")[0]}
                          className="w-full border p-2 mb-2 rounded-md text-[#6E7583]"
                          disabled={
                            passengerInformation?.babies?.[index]?.documentType ===
                              "NotSelected" || !passengerInformation?.babies?.[index]?.documentType
                          }
                          value={passengerInformation?.babies?.[index]?.documentExpiryDate || ""}
                          onChange={(e) =>
                            handleInputChange("babies", index, "documentExpiryDate", e.target.value)
                          }
                        />
                      </li>
                    </ul>
                  </form>
                </div>
              ))}
            </div>
            )}
          </div>
        </section>
        <div className="bg-white rounded-lg">
          <div className="flex bg-[#01357E] text-white items-center p-3 rounded-t-lg">
            <MdContactPhone />
            <h1 className="p-2">Contact Information</h1>  
          </div>
          <ul className="p-3 md:flex justify-between">
            <li className="pt-2 md:w-[35%]">
              <p
                className={`text-[0.8em] ${
                  validationErrors?.contact?.phoneNumber ? 'text-red-500' : 'text-[#6E7583]'
                }`}
              >
                Phone Number *
              </p>
              <input
                type="tel"
                placeholder="+994 50 123 45 67"
                className={`w-full border p-2 mb-2 rounded-md ${
                  validationErrors?.contact?.phoneNumber ? 'border-red-500' : ''
                  }`}
                  maxLength={12} 
                pattern="^\+994\s\d{2}\s\d{3}\s\d{2}\s\d{2}$"
                onKeyPress={(e) => !/[0-9+\s]/.test(e.key) && e.preventDefault()}
              />
            </li>
            <li className="pt-2 md:w-[35%]">
              <p
                className={`text-[0.8em] ${
                  validationErrors?.contact?.email ? 'text-red-500' : 'text-[#6E7583]'
                }`}
              >
                Email *
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full border p-2 mb-2 rounded-md ${
                  validationErrors?.contact?.email ? 'border-red-500' : ''
                }`}
              />
            </li>
            </ul>
        </div>
      </section>
      <PaymentDetails
        currentStep={1}
        passengerInformation={passengerInformation}
        validatePassengerFields={validatePassengerFields}
        validationErrors={validationErrors}
      />
    </div>
  )
}

export default Passengers