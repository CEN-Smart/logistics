import { useEffect, useState, useContext } from 'react';
import CallIcon from '@mui/icons-material/Call';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../LoadingOverlay/Loading';
import './Confirm.css';
import { AddContext } from '../../Context/AddContext';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  // React hook form validation
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const [otploading, setOtpLoading] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  console.log('query params', queryParams.get('email'));
  const phoneParam = queryParams.get('phone');
  const emailParam = queryParams.get('email');
  const { userEmail } = useContext(AddContext);
  console.log('email', userEmail);

  useEffect(() => {}, [phoneParam]);

  const onSubmit = async values => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        'https://migro.onrender.com/api/v1/otp/verify-otp',
        { email: userEmail, otp: values.confirm },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/driverform');
    } catch (error) {
      console.error('Error during OTP verification:', error.message);
    } finally {
      setLoading(false);
    }
  };
  const resendOtp = async () => {
    try {
      setOtpLoading('otp will be sent to your email');
      const api = `https://migro.onrender.com/api/v1/otp/resend-otp?email=${emailParam}`;
      const result = await axios.post(api);

      if (result.status === 200) {
        setOtpLoading('sent success');
        console.log('Resent successfully');
      }
    } catch (error) {
      console.error('Error during OTP resend:', error.message);
    } finally {
      setTimeout(() => {
        setOtpLoading('');
      }, 3000);
    }
  };

  return (
    <div className="confirm__div">
      <div className="confirm__divs">
        <div className="verify__icon">
          {loading && <Loading />}
          <CallIcon className="verify__icons" style={{ fontSize: '2rem' }} />
        </div>
        <div className="confirm__divss">
          <h1>Phone verification</h1>
          <div className="confirm__content">
            input the otp sent to your number <span>{phoneParam}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="confirm__form">
          {errors.confirm && <p className="errors">{errors.confirm.message}</p>}
          <div className="confirm__input">
            <input
              type="text"
              placeholder=""
              name="confirm"
              {...register('confirm', {
                required: 'Please fill in the field',
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Only numbers are allowed',
                },
              })}
            />
          </div>

          <div className="btnss">
            <button type="submit">Verify</button>
          </div>
          <small>
            <span onClick={resendOtp}>resend</span> the otp code
          </small>
          {otploading}
        </form>
      </div>
    </div>
  );
};
export default ConfirmationPage;
