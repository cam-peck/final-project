import React from 'react';
import FloatingInput from './floating-input';

export default class RunForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      date: '',
      duration: '',
      distance: 0,
      hasGpx: null
    };
  }

  handleChange(event) {
    // handleChange code here

  }

  handleSubmit(event) {
    event.preventDefault();
    // handelSubmit code here

  }

  render() {
    const { title, description, date, duration, distance, hasGpx } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div className="max-w-md mx-auto">
        <form onSubmit={this.handleSubmit}>
          <FloatingInput type="email" name="email" placeholder="Email Address" value={title} onChange={handleChange} />
          <FloatingInput type="password" name="password" placeholder="Password" value={title} onChange={handleChange} />
          <div className="pl-4 pr-4">
            <button className="w-full bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg">Add run</button>
          </div>
        </form>
      </div>
    );
  }
}
