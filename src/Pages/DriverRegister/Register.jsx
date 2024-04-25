import { useState, useContext } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import ErrorIcon from '@mui/icons-material/Error';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { TYPE } from '../../Constants/Constant';
import axios from 'axios';
import Loading from '../../LoadingOverlay/Loading';
import './Register.css';
import { AddContext } from '../../Context/AddContext';

// Values for the validation from react-hook-form
const Register = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
  } = useForm();

  // Custom styles for react select
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
      textTransform: 'uppercase',
      padding: '0rem',
      border: '0rem',
      boxShadow: 'none',
    }),
    singleValue: defaultStyles => ({ ...defaultStyles, color: ' #14161A' }),
    input: provided => ({
      ...provided,
      textTransform: 'uppercase',
    }),
  };
  // Navigation Handler
  const navigate = useNavigate();

  const { setUserEmail } = useContext(AddContext);

  // loading effect
  const [loading, setLoading] = useState(false);

  // USER ALREADY EXIST
  const [userExist, setUserExist] = useState(false);

  // Submit handler for the registration form 'https://migro.onrender.com/api/v1/register'
  const onSubmit = async data => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://migro.onrender.com/api/v1/register',
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phone,
          password: data.passWord,
          type: data.TYPE.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const phone = response.data.phoneNumber || data.phone;
      navigate(`/confirmationPage?phone=${encodeURIComponent(phone)}`);

      setUserEmail(data.email);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setUserExist(true);
      }
      console.error('Error registering user:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleSignIn = () => {
    navigate('/driverform');
  };
  return (
    <div className="driverregister__div">
      <div className="driverregister__divss">
        <div className="driverregisters__div">
          <div className="h4">Logistics</div>
          <form className="form__recorddivs" onSubmit={handleSubmit(onSubmit)}>
            {userExist && (
              <div className="user__error">
                User already exists! Please log in or use a different email.
              </div>
            )}
            {loading && <Loading />}
            <div className="formdivs__record">
              <div className="record__ad">
                <div className="record__inputs">
                  <div className="record__divInp">
                    <PersonIcon className="iconsize" />
                    <div className="record__input">
                      <input
                        type="name"
                        placeholder="First Name"
                        name="firstName"
                        {...register('firstName', {
                          required: 'Please fill out the field',
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message: 'Username must contain only letters.',
                          },
                        })}
                      />
                    </div>
                  </div>
                  {errors.firstName && (
                    <p className="errors">
                      <ErrorIcon className="error__icon" />
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="record__inputs">
                  <div className="record__divInp">
                    <PersonIcon className="iconsize" />
                    <div className="record__input">
                      <input
                        type="name"
                        placeholder="last Name"
                        name="lastName"
                        {...register('lastName', {
                          required: 'Please fill out the field',
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message: 'Username must contain only letters.',
                          },
                        })}
                      />
                    </div>
                  </div>
                  {errors.lastName && (
                    <p className="errors">
                      <ErrorIcon className="error__icon" />
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="record__inputs">
                  <div className="record__divInp">
                    <MailIcon className="iconsize" />
                    <div className="record__input">
                      <input
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        {...register('email', {
                          required: 'Please fill out the field',
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Please enter a valid email',
                          },
                        })}
                      />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="errors">
                      <ErrorIcon className="error__icon" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="record__inputs">
                  <div className="record__divInp">
                    <div className="record__input" id="order2">
                      <div className="ss">
                        <Controller
                          name="TYPE"
                          control={control}
                          render={({ field }) => (
                            <Select
                              className="select"
                              {...field}
                              options={TYPE}
                              placeholder="Type"
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
                  {errors.type && (
                    <p className="errors">
                      <ErrorIcon className="error__icon" />
                      {errors.type.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="record__location">
                <div className="record__inputs">
                  <div className="record__divInp">
                    <CallIcon className="iconsize" />
                    <div className="record__input">
                      <input
                        type="tel"
                        placeholder="phone"
                        name="phone"
                        {...register('phone', {
                          required: 'Please fill out the field',

                          pattern: {
                            // Phone number must start +966
                            value: /^(\+9665|05|9665|009665|96605)[0-9]{8}$/,
                            message: 'Please enter a valid phone number',
                          },
                        })}
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="errors">
                      <ErrorIcon className="error__icon" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="record__inputs">
                  <div className="record__divInp">
                    <LockIcon className="iconsize" />
                    <div className="record__input">
                      <input
                        type="password"
                        placeholder="Password"
                        name="passWord"
                        {...register('passWord', {
                          required: 'Please fill out the field',
                          pattern: {
                            // Password must contain at least one digit, and one special character
                            value:
                              /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                            message: `Invalid password`,
                          },
                          validate: value =>
                            value.toLowerCase() !== 'password' ||
                            "Password cannot be 'password'",
                        })}
                      />
                    </div>
                  </div>
                  {errors.passWord && (
                    <p className="errors">
                      <ErrorIcon className="error__icon" />
                      {errors.passWord.message}
                    </p>
                  )}
                </div>

                <div className="record__inputs">
                  <div className="record__divInp">
                    <LockIcon className="iconsize" />
                    <div className="record__input">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        {...register('confirmPassword', {
                          required: 'Please fill out the field',
                          validate: value => {
                            if (value !== watch('passWord')) {
                              return 'Your passwords do not match';
                            }
                          },
                        })}
                      />
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="errors">
                      <ErrorIcon className="error__icon" />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="record__btn">
              <button type="submit">Register with us</button>
            </div>
            <small>Or</small>
            <div className="register__btn" onClick={handleSignIn}>
              Sign in
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
