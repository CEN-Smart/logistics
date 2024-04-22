import React, { useContext } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AddContext } from '../../Context/AddContext';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const { handleSubmissionPage, submissionSuccessful } = useContext(AddContext);
  const navigate = useNavigate();

  const onSuccessfulAddingAd = () => {
    handleSubmissionPage();
    navigate('/');
  };

  return (
    <div>
      {submissionSuccessful && (
        <section className="success__session">
          <div className="success__div">
            <div className="check">
              <CheckCircleIcon
                style={{ fontSize: '5rem', color: 'rgb(230,156,49)' }}
              />
            </div>
            <h1>Yeah !!</h1>
            <p>Your Advert is successfully placed</p>
            <button className="success__btn" onClick={onSuccessfulAddingAd}>
              Done
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default SuccessPage;
