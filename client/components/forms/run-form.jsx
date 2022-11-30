import React from 'react';
import { calculatePace, todaysDate, AppContext } from '../../lib';
import TextInput from '../inputs/text-input';
import DateInput from '../inputs/date-input';
import DistanceInput from '../inputs/distance-input';
import DurationInput from '../inputs/duration-input';
import UploadRunCard from '../cards/upload-run-card';

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
    const { route, user } = this.context;
    if (route.params.get('mode') === 'edit') {
      const entryId = Number(route.params.get('entryId'));
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      fetch(`/api/runs/${entryId}`, req)
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
    const { route, user } = this.context;
    const mode = route.params.get('mode');
    const req = {
      method: `${mode === 'add' ? 'POST' : 'PUT'}`,
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user,
      body: JSON.stringify(this.state)
    };
    fetch(`${mode === 'add' ? '/api/runs' : '/api/runs/' + route.params.get('entryId')}`, req)
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
    const buttonText = this.context.route.params.get('mode') === 'add'
      ? 'Add Run'
      : 'Save Changes';
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
          <button className="md:w-1/4 w-full bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg">{buttonText}</button>
        </div>
      </form>
    );
  }
}
RunForm.contextType = AppContext;
