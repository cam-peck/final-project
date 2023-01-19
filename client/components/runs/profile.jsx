import React from 'react';
import { AppContext, removeTz } from '../../lib';
import { format } from 'date-fns';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      displayName: '',
      dateOfBirth: '',
      fetchingData: true,
      networkError: false
    };
  }

  async componentDidMount() {
    const { user } = this.context;
    const req = {
      method: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user
    };
    try {
      const response = await fetch('/api/profile', req);
      const result = await response.json();
      const { email, displayName, dateOfBirth } = result;
      this.setState({
        email,
        displayName,
        dateOfBirth,
        fetchingData: false
      });
    } catch (err) {
      console.error('An error occured!', err);
      this.setState({ networkError: true });
    }
  }

  render() {
    if (this.state.networkError) {
      return <NetworkError />;
    }
    if (this.state.fetchingData) {
      return <LoadingSpinner />;
    }
    const { email, displayName, dateOfBirth } = this.state;
    const dtDateOnly = removeTz(dateOfBirth);
    return (
      <section className="pl-6 pr-6 max-w-6xl m-auto mt-6 mb-6">
        <h1 className="font-lora font-medium text-2xl mb-6">My Profile</h1>
        <div className="shadow-sm rounded-xl max-w-xl">
          <div className="font-lora bg-blue-200 p-6 rounded-xl rounded-b-none border border-b-0 border-gray-300">
            <p className="font-medium text-xl">Hi, {displayName}!</p>
            <p className="text-md">Account Information</p>
          </div>
          <div className="bg-white border border-gray-300 border-t-0 rounded-xl rounded-t-none font-roboto flex flex-col gap-3 p-6">
            <div className="flex flex-col gap-1.5">
              <p className="font-medium">Email:</p>
              <p>{email}</p>
            </div>
            <hr className="border"/>
            <div className="flex flex-col gap-1.5">
              <p className="font-medium">Display Name:</p>
              <p>{displayName}</p>
            </div>
            <hr className="border"/>
            <div className="flex flex-col gap-1.5">
              <p className="font-medium">Birthday:</p>
              <p>{format(dtDateOnly, 'MMMM do, yyyy')}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
Profile.contextType = AppContext;
