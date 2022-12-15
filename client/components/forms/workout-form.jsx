import React from 'react';
import TextInput from '../inputs/text-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';

export default class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      description: '',
      fetchingData: false,
      networkError: false
    };
  }

  render() {
    return <h1>Workout Form!!!</h1>;
  }
}
