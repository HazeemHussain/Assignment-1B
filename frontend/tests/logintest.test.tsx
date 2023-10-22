import React from 'react';
//Using imports to simulate rendering 
import { render, fireEvent, waitFor } from '@testing-library/react';
//using axios a library used for testing with HTTP requests
import axios from 'axios';
//importing the Navdropdown component that is being tested
import LoginForm from '../src/components/userLogin/LoginForm'; 
// this will mock axios it is done to prevent any HTTP requests during unit testing
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
//specifiying compoent to be tested
describe('LoginForm', () => {
//this defines the scenario which is being tested in LoginForm
  it('calls onLoginSuccess with correct credentials', async () => {
    
    const onLoginSuccess = jest.fn();
    const { getByText, getByLabelText } = render(<LoginForm onLoginSuccess={onLoginSuccess} />);

    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: {}, 
    });
//simulating user entering password and username through fireEvent 
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'Moderator' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'Moderator' } });
    fireEvent.click(getByText('Log In'));

    // the assertion checks for if onLoginSucsess function is called on sucsessful login 
    await waitFor(() => {
      expect(onLoginSuccess).toHaveBeenCalled();
    });
  });

});


