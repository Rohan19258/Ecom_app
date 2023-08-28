import React, { Fragment, useState } from "react";
import "./Shipping.css";
import Toastify from "./otherscomponent/toast";
// import MetaData from "../layout/MetaData";
// import { useAlert } from "react-alert";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Shipping = () => {

  // const alert = useAlert();
  // const { shippingInfo } = useSelector((state) => state.cart);

const navigate=useNavigate()
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  // const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState();
  const [phoneNo, setPhoneNo] = useState();

const notify=()=>{
  toast.error("Phone Number should be 10 digits Long", {
    theme: "colored"
  })
}



const fillup=()=>{
  toast.warning("Please fill all the field", {
    theme: "colored"
  })
}
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
     notify()
      return;
    }


      const shippinginfo={
        "address":address,
        "city":city,
        "pincode":pinCode,
        "phoneNo":phoneNo
      }
     
  localStorage.setItem("shippinginfo",JSON.stringify(shippinginfo))

   navigate("/cart/checkout/confirmorder")

  };

  return (
    <Fragment>
      {/* <h1>Shipping Details</h1> */}

      {/* <CheckoutSteps activeStep={0} /> */}
      <ToastContainer />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              {/* <HomeIcon /> */} 
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              {/* <LocationCityIcon /> */}
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              {/* <PinDropIcon /> */}
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              {/* <PhoneIcon /> */}
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            {/* <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div> */}

            {/* {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )} */}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              // disabled={phoneNo ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
