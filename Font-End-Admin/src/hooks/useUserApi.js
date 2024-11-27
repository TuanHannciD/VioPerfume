// hooks/useUserApi.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserApi = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [customerUsers, setCustomerUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsersByRole = async (role) => {
      try {
        const response = await axios.get('https://localhost:7262/api/Roles/GetUsersByRole', {
          params: { roles: role }
        });

        if (role === 'Admin') {
          setAdminUsers(response.data);
        } else if (role === 'Customer') {
          setCustomerUsers(response.data);
        }
      } catch (err) {
        setError('Lỗi khi lấy dữ liệu người dùng');
      }
    };

    fetchUsersByRole('Admin');      
    fetchUsersByRole('Customer'); 
  }, []);

  return { adminUsers, customerUsers, error };
};

export default useUserApi;
