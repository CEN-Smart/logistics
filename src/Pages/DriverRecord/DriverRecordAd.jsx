import { useContext, useState } from 'react';
// import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useForm, Controller } from 'react-hook-form';
import { tripDestination } from '../../Constants/Constant';
import Select from 'react-select';
import { vehicleType } from '../../Constants/Constant';
import './DriverRecord.css';
import Loading from '../../LoadingOverlay/Loading';
import { AddContext } from '../../Context/AddContext';
import LuggageIcon from '@mui/icons-material/Luggage';
import axios from 'axios';

const DriverRecordAd = () => {
  const { setSubmissionSuccessful, setSubmissionError } =
    useContext(AddContext);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  // loading effect

  // Submit handler for the registration form
  const [loading, setLoading] = useState(false);
  const onSubmit = async data => {
    const dataFormat = {
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      phone: data.phone,
      from_city: data.initialDestination.value,
      from_province: data.fromProvince,
      from_neighborhood: data.fromNeighborhood,
      to_city: data.finalDestination.value,
      to_province: data.toProvince,
      to_neighborhood: data.toNeighborhood,
      truck_type: data.vehicle.value,
      type_of_load: data.typeOfLoad,
    };
    try {
      console.log(data);
      setLoading(true);
      const headers = {
        'Content-Type': 'application/json',
      };
      const API_ENDPOINT = 'https://migro.onrender.com/api/ads/add';
      const result = await axios.post(API_ENDPOINT, dataFormat, headers);
      console.log(result.data);
      setSubmissionSuccessful(true);
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 409) {
        setSubmissionError(true);
      } else {
        setSubmissionError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? '#212529' : 'white',
      backgroundColor: state.isSelected ? 'rgb(255,224,138)' : '#212529',
    }),
    control: defaultStyles => ({
      ...defaultStyles,
      backgroundColor: '#fffff',
      color: 'rgb(219,219,219)',
      // textTransform: "upperCase",
      padding: '0rem',
      border: '0rem',
      boxShadow: 'none',
    }),
    singleValue: defaultStyles => ({ ...defaultStyles, color: ' #14161A' }),
  };
  return (
    <div>
      <form className="form__recorddivs" onSubmit={handleSubmit(onSubmit)}>
        {loading && <Loading />}
        <div className="formdivs__record">
          <div className="record__ad">
            <div
              className={`record__inputs ${errors.fromProvince ? 'error' : ''}`}
            >
              <div
                className={`record__divInp ${
                  errors.fromProvince ? 'error' : ''
                }`}
              >
                <PersonIcon className="iconsize" />
                <div className="record__input">
                  <input
                    type="name"
                    placeholder="First Name"
                    name="firstName"
                    {...register('firstName', {
                      required: 'Please fill out the field',
                    })}
                  />
                </div>
              </div>
              {/* {errors.firstName && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.firstName.message}
                </p>
              )} */}
            </div>

            <div className={`record__inputs ${errors.lastName ? 'error' : ''}`}>
              <div
                className={`record__divInp ${errors.lastName ? 'error' : ''}`}
              >
                <PersonIcon className="iconsize" />
                <div className="record__input">
                  <input
                    type="name"
                    placeholder="last Name"
                    name="lastName"
                    {...register('lastName', {
                      required: 'Please fill out the field',
                    })}
                  />
                </div>
              </div>
              {/* {errors.lastName && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.lastName.message}
                </p>
              )} */}
            </div>

            <div className={`record__inputs ${errors.email ? 'error' : ''}`}>
              <div className={`record__divInp ${errors.email ? 'error' : ''}`}>
                <MailIcon className="iconsize" />
                <div className="record__input">
                  <input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    {...register('email', {
                      required: 'Please fill out the field',
                    })}
                  />
                </div>
              </div>
              {/* {errors.email && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.email.message}
                </p>
              )} */}
            </div>

            <div className={`record__inputs ${errors.phone ? 'error' : ''}`}>
              <div className={`record__divInp ${errors.phone ? 'error' : ''}`}>
                <CallIcon className="iconsize" />
                <div className="record__input">
                  <input
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                    {...register('phone', {
                      required: 'Please fill out the field',
                    })}
                  />
                </div>
              </div>
              {/* {errors.phone && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.phone.message}
                </p>
              )} */}
            </div>
            <div
              className={`record__inputs ${errors.typeOfLoad ? 'error' : ''}`}
            >
              <div
                className={`record__divInp ${errors.typeOfLoad ? 'error' : ''}`}
              >
                <LuggageIcon className="iconsize" />
                <div className="record__input">
                  <input
                    type="text"
                    placeholder="Type Of Load"
                    name="typeOfLoad"
                    {...register('typeOfLoad', {
                      required: 'Please fill out the field',
                    })}
                  />
                </div>
              </div>
              {/* {errors.typeOfLoad && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.typeOfLoad.message}
                </p>
              )} */}
            </div>

            <div
              className={`record__inputs ${errors.typeOfLoad ? 'error' : ''}`}
            >
              <div
                className={`record__divInp ${errors.vehicle ? 'error' : ''}`}
              >
                <LocalShippingIcon className="iconloc" />
                <div className="record__input">
                  <div className="ss">
                    <Controller
                      name="vehicle"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={vehicleType}
                          placeholder="Type of vehicle"
                          // name="vehicle"
                          isSearchable
                          noOptionsMessage={() => 'no location found'}
                          styles={customStyles}
                        />
                      )}
                      defaultValue=""
                      rules={{
                        required: 'please select',
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* {errors.vehicle && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.vehicle.message}
                </p>
              )} */}
            </div>
          </div>

          <div className="record__location">
            <div
              className={`record__inputs ${
                errors.finalDestination ? 'error' : ''
              }`}
            >
              <div
                className={`record__divInp ${
                  errors.finalDestination ? 'error' : ''
                }`}
              >
                <LocationOnIcon className="iconloc" />
                <div className="record__input">
                  <div className="ss">
                    <Controller
                      name="finalDestination"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={tripDestination}
                          placeholder="From City"
                          // name="finalDestination"
                          isSearchable
                          noOptionsMessage={() => 'no location found'}
                          styles={customStyles}
                        />
                      )}
                      defaultValue=""
                      rules={{
                        required: 'please select',
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* {errors.finalDestination && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.finalDestination.message}
                </p>
              )} */}
            </div>
            <div
              className={`record__inputs ${
                errors.initialDestination ? 'error' : ''
              }`}
            >
              <div
                className={`record__divInp ${
                  errors.initialDestination ? 'error' : ''
                }`}
              >
                <LocationOnIcon className="iconloc" />
                <div className="record__input">
                  <div className="ss">
                    <Controller
                      name="initialDestination"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={tripDestination}
                          placeholder="To City"
                          // name="finalDestination"
                          isSearchable
                          noOptionsMessage={() => 'no location found'}
                          styles={customStyles}
                        />
                      )}
                      defaultValue=""
                      rules={{
                        required: 'please select',
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* {errors.initialDestination && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.initialDestination.message}
                </p>
              )} */}
            </div>
            <div
              className={`record__inputs ${
                errors.initialDestination ? 'error' : ''
              }`}
            >
              <div
                className={`record__divInp ${
                  errors.initialDestination ? 'error' : ''
                }`}
              >
                <LocationOnIcon className="iconsize" />
                <div className="record__input">
                  <input
                    type="text"
                    placeholder="From Province"
                    name="fromProvince"
                    {...register('fromProvince', {
                      required: 'Please fill out the field',
                    })}
                  />
                </div>
              </div>
              {/* {errors.fromProvince && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.fromProvince.message}
                </p>
              )} */}
            </div>

            <div
              className={`record__inputs ${errors.toProvince ? 'error' : ''}`}
            >
              <div
                className={`record__divInp ${errors.toProvince ? 'error' : ''}`}
              >
                <LocationOnIcon className="iconsize" />
                <div className="record__input">
                  <input
                    type="text"
                    placeholder="To Province"
                    name="toProvince"
                    {...register('toProvince', {
                      required: 'Please fill out the field',
                    })}
                  />
                </div>
              </div>
              {/* {errors.toProvince && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.toProvince.message}
                </p>
              )} */}
            </div>
            <div
              className={`record__inputs ${errors.toProvince ? 'error' : ''}`}
            >
              <div
                className={`record__divInp ${errors.toProvince ? 'error' : ''}`}
              >
                <LocationOnIcon className="iconsize" />
                <div className="record__input">
                  <input
                    type="text"
                    placeholder="From Neigborhood"
                    name="fromNeighborhood"
                    {...register('fromNeighborhood', {
                      required: 'Please fill out the field',
                    })}
                  />
                </div>
              </div>
              {/* {errors.fromNeighborhood && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.fromNeighborhood.message}
                </p>
              )} */}
            </div>

            <div
              className={`record__inputs ${
                errors.toNeighborhood ? 'error' : ''
              }`}
            >
              <div
                className={`record__divInp ${
                  errors.toNeighborhood ? 'error' : ''
                }`}
              >
                <LocationOnIcon className="iconsize" />
                <div className="record__input">
                  <input
                    type="text"
                    placeholder="To Neigborhood"
                    name="toNeighborhood"
                    {...register('toNeighborhood', {
                      required: 'Please fill out the field',
                    })}
                  />
                </div>
              </div>
              {/* {errors.toNeighborhood && (
                <p className="errors">
                  <ErrorIcon className="error__icon" />
                  {errors.toNeighborhood.message}
                </p>
              )} */}
            </div>
          </div>
        </div>
        <div className="record__btn">
          <button type="submit">Submit an ad</button>
        </div>
      </form>
    </div>
  );
};

export default DriverRecordAd;
