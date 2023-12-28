import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function RoleDirector({ children }) {
  const role = useSelector((state)=> state.auth.role)
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'admin') {
      navigate('admin_dashboard');
    } else if (role === 'chef'){
      navigate('/ChefHome')
    }else  {
      navigate('/');
    }
  }, [role, navigate]);

  return children || null;
}

export default RoleDirector;
