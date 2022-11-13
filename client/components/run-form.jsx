import React from 'react';
import { calculatePace, todaysDate } from '../lib';
import TextInput from './text-input';
import DateInput from './date-input';
import DistanceInput from './distance-input';
import DurationInput from './duration-input';
import UploadRunCard from './upload-run-card';

export default class RunForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      date: '',
      durationHours: '',
      durationMinutes: '',
      durationSeconds: '',
      distance: '',
      distanceType: 'miles',
      hasGpx: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // placeholder for edit run --> prefill the form and code up a new fetch request if inputs have changed
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/runs', req)
      .then(response => response.json())
      .then(result => {
        console.log('submit successful: ', this.state);
      });
  }

  render() {
    // console.log('State After: ', this.state);
    const { title, description, date, distance, distanceType, durationHours, durationMinutes, durationSeconds } = this.state;
    const { handleChange, handleSubmit } = this;
    const durationObj = { durationHours, durationMinutes, durationSeconds };
    const pace = calculatePace(distance, distanceType, durationHours, durationMinutes, durationSeconds);
    const today = todaysDate();
    return (
      <div className="max-w-md md:max-w-6xl mx-auto px-6">
        <form className="mt-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-lora font-bold mb-4">Add Run</h1>
          <div className="md:flex md:gap-6">
            <div className="md:w-2/4 w-full">
              <UploadRunCard />
            </div>
            <div className="md:w-2/4 w-full">
              <DateInput type="date" name="date" placeholder="" value={date} dateMin="1942-01-01" dateMax={today} showLabel={true} label="Date" onChange={handleChange} />
              <DistanceInput distanceValue={distance} distanceTypeValue={distanceType} onChange={handleChange}/>
              <DurationInput value={durationObj} onChange={handleChange}/>
              <TextInput type="pace" name="pace" placeholder="0:00 / mi" value={pace} showLabel={true} label="Pace" onChange={handleChange} />
            </div>
          </div>
          <TextInput type="text" name="title" showLabel={true} label="Title" placeholder="Morning Sun Run" value={title} onChange={handleChange} />
          <TextInput type="text" name="description" showLabel={true} label="Description" placeholder="Easy run with great weather -- nice recovery day" value={description} onChange={handleChange} />
          <div className="flex justify-end mt-2 mb-8">
            <button className="md:w-1/4 w-full bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg">Add run</button>
          </div>
        </form>
      </div>
    );
  }
}
