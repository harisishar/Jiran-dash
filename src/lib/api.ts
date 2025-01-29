import { User } from "./utils";

export const userApi = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      console.log('Fetching users...');
      const response = await fetch('/api/User/GetAllUser', {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText} - ${errorData.message}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  updateUser: async (user: Partial<User>): Promise<void> => {
    try {
      const response = await fetch('https://jiran-webapi.onrender.com/User/Update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update user: ${response.status} ${response.statusText} - ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  createUser: async (user: Partial<User>): Promise<void> => {
    try {
      const response = await fetch('https://jiran-webapi.onrender.com/User/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create user: ${response.status} ${response.statusText} - ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
};