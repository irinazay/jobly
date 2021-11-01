
   
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Routes from './Routes';
import UserContext from "../auth/UserContext";
import Login from '../auth/LoginForm'
import Signup from '../auth/SignupForm'



test('render 404 ', () => {
    let currentUser = {firstName: 'John', lastName: 'Zaytseva'};
    const { getByText } = render(
        
        <UserContext.Provider value={currentUser}>
             <MemoryRouter initialEntries={['/dhdhdhdh']}>
        <Routes />
      </MemoryRouter>
      </UserContext.Provider>

    );
  
    expect(
      getByText("PAGE NOT FOUND")
    ).toBeInTheDocument();
  });

  test('renders home page ', () => {
    let currentUser = {firstName: 'John', lastName: 'Zaytseva'};
    const { getByText } = render(
        <UserContext.Provider value={currentUser}>
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>
      </UserContext.Provider>
    );
    expect(
      getByText("All the jobs in one, convenient place.")
    ).toBeInTheDocument();

  });

  test('renders redirect to login page ', () => {
    let currentUser = {firstName: 'John', lastName: 'Zaytseva'};
    const { getByText } = render(
        <UserContext.Provider value={currentUser}>
      <MemoryRouter initialEntries={['/companies']}>
        <Routes />
      </MemoryRouter>
      </UserContext.Provider>
    );
    expect(
      getByText("Log In")
    ).toBeInTheDocument();

  });

  test('renders login page ', () => {
    let currentUser = {firstName: 'John', lastName: 'Zaytseva'};
    const { getByText } = render(
        <UserContext.Provider value={currentUser}>
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>
      </UserContext.Provider>
    );
    expect(getByText('Log in')).toBeInTheDocument();

    const link = getByText('Log in');
    fireEvent.click(link);
    expect(getByText('Submit')).toBeInTheDocument();
  });

  test('renders signup page ', () => {
    let currentUser = {firstName: 'John', lastName: 'Zaytseva'};
    const { getByText } = render(
        <UserContext.Provider value={currentUser}>
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>
      </UserContext.Provider>
    );
    expect(getByText('Sign up')).toBeInTheDocument();

    const link = getByText('Sign up');
    fireEvent.click(link);
    expect(getByText('Submit')).toBeInTheDocument();
  });


  test('renders redirect to login page ', () => {
    const { getByLabelText } = render(
       
      <MemoryRouter>
        <Login />
      </MemoryRouter>

    );
    const userNameInputNode = getByLabelText('Username');
    expect(userNameInputNode.value).toMatch('');
    fireEvent.change(userNameInputNode, {target: {value: "testing"}});
    expect(userNameInputNode.value).toMatch('testing');

  });


  test('renders redirect to login page ', () => {
    const { getByLabelText } = render(
       
      <MemoryRouter>
        <Signup />
      </MemoryRouter>

    );
    const userNameInputNode = getByLabelText('Username');
    expect(userNameInputNode.value).toMatch('');
    fireEvent.change(userNameInputNode, {target: {value: "testing"}});
    expect(userNameInputNode.value).toMatch('testing');

  });