import React from 'react';
import TextInput from '../inputs/text-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';
import { subYears } from 'date-fns';
import { AppContext } from '../../lib';

export default class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      description: '',
      fetchingData: false,
      networkError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleDateChange(date) {
    this.setState({
      date
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      fetchingData: true
    }, () => {
      const { user } = this.context;
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user,
        body: JSON.stringify(this.state)
      };
      fetch('/api/workouts', req)
        .then(response => response.json())
        .then(result => {
          this.setState({
            date: new Date(),
            description: '',
            fetchingData: false
          });
        })
        .catch(error => {
          console.error('An error occured!', error);
          this.setState({ networkError: true });
        });
    });
  }

  render() {
    if (this.state.networkError) {
      if (this.state.runIdError) {
        return <NetworkError entryId={this.props.entryId} />;
      }
      return <NetworkError />;
    }
    if (this.state.fetchingData) {
      return <LoadingSpinner />;
    }

    const { handleChange, handleDateChange, handleSubmit } = this;
    const { mode } = this.props;
    const { date, description } = this.state;

    const titleMessage = mode === 'add'
      ? 'Add Workout'
      : 'Edit Workout';

    const buttonText = mode === 'add'
      ? 'Add Workout'
      : 'Save Changes';

    return (
      <form className="w-full" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-lora font-bold mb-4">{titleMessage}</h1>
        <div className="md:flex md:gap-6">
          <div className="w-full">
            <p className="font-lora font-md text-md font-medium pb-2" >Date</p>
            <DatePicker className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500 mb-4" selected={date} onChange={handleDateChange} dateFormat='MM/dd/yyy' maxDate={new Date()} minDate={subYears(new Date(), 80)} required />
            <TextInput type="text" name="description" showLabel={true} label="Description" placeholder="5 miles ez | 8:30 / mile" value={description} onChange={handleChange} />
          </div>
        </div>
        <div className="flex justify-end mt-2 mb-8">
          <button className="md:w-1/3 w-full bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg">{buttonText}</button>
        </div>
      </form>
    );
  }
}
WorkoutForm.contextType = AppContext;
