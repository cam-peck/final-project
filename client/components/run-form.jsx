import React from 'react';
import { calculatePace, todaysDate, AppContext } from '../lib';
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
      distanceUnits: 'miles',
      hasGpx: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.mode === 'edit') {
      const { route, user } = this.context;
      const entryId = Number(route.params.get('entryId'));
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      fetch(`api/runs/${entryId}`, req)
        .then(response => response.json())
        .then(result => {
          const { title, description, date, duration, distance, distanceUnits, hasGpx } = result[0];
          const splitDuration = duration.split(':');
          const formattedDate = date.split('T')[0];
          this.setState({
            title,
            description,
            date: formattedDate,
            durationHours: splitDuration[0],
            durationMinutes: splitDuration[1],
            durationSeconds: splitDuration[2],
            distance,
            distanceUnits,
            hasGpx
          });
        });
    }
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
      user: this.context.user,
      body: JSON.stringify(this.state)
    };
    fetch('/api/runs', req)
      .then(response => response.json())
      .then(result => {
        this.setState({
          title: '',
          description: '',
          date: '',
          durationHours: '',
          durationMinutes: '',
          durationSeconds: '',
          distance: '',
          distanceUnits: 'miles',
          hasGpx: false
        });
        window.location.hash = '#home?tab=activities';
      });
  }

  render() {
    const { title, description, date, distance, distanceUnits, durationHours, durationMinutes, durationSeconds } = this.state;
    const { handleChange, handleSubmit } = this;
    const durationObj = { durationHours, durationMinutes, durationSeconds };
    const pace = calculatePace(distance, distanceUnits, durationHours, durationMinutes, durationSeconds);
    const today = todaysDate();
    return (
      <form onSubmit={handleSubmit}>
        <div className="md:flex md:gap-6">
          <div className="md:w-2/4 w-full">
            <UploadRunCard />
          </div>
          <div className="md:w-2/4 w-full">
            <DateInput type="date" name="date" placeholder="" value={date} dateMin="1942-01-01" dateMax={today} showLabel={true} label="Date" onChange={handleChange} />
            <DistanceInput distanceValue={distance} distanceTypeValue={distanceUnits} onChange={handleChange}/>
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
    );
  }
}
RunForm.contextType = AppContext;
