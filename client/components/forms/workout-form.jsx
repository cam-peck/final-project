import React from 'react';
import WorkoutFieldset from '../inputs/workout-fieldset';
import TextInput from '../inputs/text-input';
import CheckboxInput from '../inputs/checkbox-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';
import { subYears } from 'date-fns';
import { AppContext, removeTz } from '../../lib';

export default class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      description: '',
      warmupCheck: false,
      workoutCheck: false,
      cooldownCheck: false,
      warmupDistance: '',
      warmupDistanceUnits: 'miles',
      warmupNotes: '',
      workoutDistance: '',
      workoutDistanceUnits: 'miles',
      workoutNotes: '',
      cooldownDistance: '',
      cooldownDistanceUnits: 'miles',
      cooldownNotes: '',
      fetchingData: false,
      networkError: false,
      workoutIdError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.prefillForm = this.prefillForm.bind(this);
  }

  componentDidMount() {
    if (this.props.mode === 'edit') {
      this.prefillForm();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.workoutId !== prevProps.workoutId) {
      this.prefillForm();
    }
  }

  prefillForm() {
    const { user } = this.context;
    this.setState({
      fetchingData: true
    }, () => {
      const workoutId = Number(this.props.workoutId);
      const req = {
        method: 'GET',
        headers: {
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      fetch(`/api/workouts/${workoutId}`, req)
        .then(response => response.json())
        .then(result => {
          if (result.length === 0) {
            this.setState({ networkError: true, workoutIdError: true });
            return;
          }
          const { date, description, warmupCheck, workoutCheck, cooldownCheck, warmupDistance, warmupNotes, workoutDistance, warmupDistanceUnits, workoutDistanceUnits, cooldownDistanceUnits, workoutNotes, cooldownDistance, cooldownNotes } = result[0];
          const dtDateOnly = removeTz(date);
          this.setState({
            date: dtDateOnly,
            description,
            warmupCheck,
            workoutCheck,
            cooldownCheck,
            warmupDistance,
            warmupDistanceUnits,
            warmupNotes,
            workoutDistance,
            workoutDistanceUnits,
            workoutNotes,
            cooldownDistance,
            cooldownDistanceUnits,
            cooldownNotes,
            fetchingData: false,
            networkError: false
          });
        })
        .catch(error => {
          console.error('An error occured!', error);
          this.setState({ networkError: true });
        });
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    if (name === 'warmupCheck' || name === 'workoutCheck' || name === 'cooldownCheck') {
      this.setState({
        [name]: !this.state[name]
      });
    } else {
      this.setState({
        [name]: value
      });
    }

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
            warmupCheck: false,
            workoutCheck: false,
            cooldownCheck: false,
            warmupDistance: '',
            warmupDistanceUnits: 'miles',
            warmupNotes: '',
            workoutDistance: '',
            workoutDistanceUnits: 'miles',
            workoutNotes: '',
            cooldownDistance: '',
            cooldownDistanceUnits: 'miles',
            cooldownNotes: '',
            fetchingData: false
          });
          window.location.hash = '#workouts';
        })
        .catch(error => {
          console.error('An error occured!', error);
          this.setState({ networkError: true });
        });
    });
  }

  render() {
    if (this.state.networkError) {
      if (this.state.workoutIdError) {
        return <NetworkError id={this.props.workoutId} />;
      }
      return <NetworkError />;
    }
    if (this.state.fetchingData) {
      return <LoadingSpinner />;
    }

    const { handleChange, handleDateChange, handleSubmit } = this;
    const { mode } = this.props;
    const { date, description, warmupCheck, workoutCheck, cooldownCheck, warmupDistance, warmupNotes, workoutDistance, warmupDistanceUnits, workoutDistanceUnits, cooldownDistanceUnits, workoutNotes, cooldownDistance, cooldownNotes } = this.state;
    const titleMessage = mode === 'add'
      ? 'Add Workout'
      : 'Edit Workout';

    const buttonText = mode === 'add'
      ? 'Add Workout'
      : 'Save Changes';

    return (
      <section className="max-w-md md:max-w-4xl mx-auto px-6 mt-4">
        <form className="w-full" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-lora font-bold mb-4">{titleMessage}</h1>
          {/* Date */}
          <div className="w-full">
            <p className="font-lora font-md text-md font-medium pb-2" >Date</p>
            <DatePicker className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500 mb-4" selected={date} onChange={handleDateChange} dateFormat='MM/dd/yyy' maxDate={new Date()} minDate={subYears(new Date(), 80)} required />
          </div>
          {/* Description */}
          <div className="w-full mb-6">
            <TextInput type='text' name='description' value={description} placeholder='Weekly long run @ Eagle Creek Park' onChange={handleChange} showLabel={true} label='Description'/>
          </div>
          {/* Workout Checkboxes */}
          <div className="w-full mb-4">
            <fieldset className="border border-2 border-blue-300 rounded-lg p-5">
              <legend className="font-lora font-md text-lg x2s:text-xl font-medium p-2 bg-blue-200 rounded-md">What sections do you need?</legend>
              <CheckboxInput id='warmupCheck' name='warmupCheck' value={warmupCheck} onChange={handleChange} label='Warmup'/>
              <CheckboxInput id='workoutCheck' name='workoutCheck' value={workoutCheck} onChange={handleChange} label='Workout'/>
              <CheckboxInput id='cooldownCheck' name='cooldownCheck' value={cooldownCheck} onChange={handleChange} label='Cooldown'/>
            </fieldset>
          </div>
          {/* Checkbox Fieldsets */}
          {
          warmupCheck === true
            ? <div className="w-full mb-4">
              <WorkoutFieldset legendLabel='Warmup' integerName='warmupDistance' integerValue={warmupDistance} distanceTypeName='warmupDistanceUnits' distanceTypeValue={warmupDistanceUnits} notesName='warmupNotes' notesValue={warmupNotes} notesPlaceholder='8:30 / mile EZ' onChange={handleChange} />
            </div>
            : ''
        }
          {
          workoutCheck === true
            ? <div className="w-full mb-4">
              <WorkoutFieldset legendLabel='Workout' integerName='workoutDistance' integerValue={workoutDistance} distanceTypeName='workoutDistanceUnits' distanceTypeValue={workoutDistanceUnits} notesName='workoutNotes' notesValue={workoutNotes} notesPlaceholder='4 x 1k @ 3:20 / k' onChange={handleChange} />
            </div>
            : ''
        }
          {
          cooldownCheck === true
            ? <div className="w-full mb-4">
              <WorkoutFieldset legendLabel='Cooldown' integerName='cooldownDistance' integerValue={cooldownDistance} distanceTypeName='cooldownDistanceUnits' distanceTypeValue={cooldownDistanceUnits} notesName='cooldownNotes' notesValue={cooldownNotes} notesPlaceholder='EZ jog' onChange={handleChange} />
            </div>
            : ''
        }
          {/* Submit */}
          <div className="flex justify-end mt-2 mb-8">
            <button className="md:w-1/3 w-full bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg">{buttonText}</button>
          </div>
        </form>
      </section>
    );
  }
}
WorkoutForm.contextType = AppContext;
