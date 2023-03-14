import React, { useContext, useEffect } from 'react';
import AuthForm from '../components/forms/auth-form';
import { AppContext } from '../lib';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage(props) {

  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home/activities');
  }, [user, navigate]);

  return (
    <div className="w-11/12 md:w-8/12 max-w-lg mx-auto bg-white pb-10 rounded-xl border border-gray-200 shadow-lg mt-8 mb-8 sm:mt-14">
      <h1 className="font-lora font-medium text-3xl text-center pt-10 mb-6">Register</h1>
      <AuthForm action='sign-up' />
    </div>
  );
}
