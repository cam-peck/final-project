import React from 'react';
import { AppContext } from '../../lib';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      displayName: '',
      dateOfBirth: ''
    };
  }

  componentDidMount() {
    const { user } = this.context;
    const req = {
      method: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user
    };
    fetch('/api/profile', req)
      .then(response => response.json())
      .then(result => {
        const { email, displayName, dateOfBirth } = result;
        this.setState({
          email,
          displayName,
          dateOfBirth
        });
      });
  }

  render() {
    return (
      <section className="pl-6 pr-6 max-w-6xl m-auto mt-6">
        <h1 className="font-lora font-medium text-2xl mb-6">My Profile</h1>
        <div className="bg-white border border-gray-400 rounded-lg p-4 max-w-xl">
          <div className="mb-8 font-lora">
            <p className="font-medium text-lg">Hi, Cameron!</p>
            <p>Account Information</p>
          </div>
          <div className="font-roboto flex flex-col gap-4">
            <p className="font-medium">Email: </p>
            <p>runningiscool@gmail.com</p>
            <hr />
            <p className="font-medium">Name: </p>
            <p>Cameron Peck</p>
            <hr />
            <p className="font-medium">Birthday: </p>
            <p>09/18/2002</p>
          </div>
        </div>
      </section>
    );
  }
}
Profile.contextType = AppContext;
