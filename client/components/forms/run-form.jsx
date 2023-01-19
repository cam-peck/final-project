import React, { createRef } from 'react';
import { calculatePace, AppContext, removeTz, parseGpxData } from '../../lib';
import TextInput from '../inputs/text-input';
import DatePicker from 'react-datepicker';
import UploadRunCard from '../cards/upload-run-card';
import { subYears } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import DistanceInput from '../inputs/distance-input';
import DurationInput from '../inputs/duration-input';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';
import TimeoutError from '../timeout-error';
import NotFound from '../../pages/not-found';

export default class RunForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      date: new Date(),
      durationHours: '',
      durationMinutes: '',
      durationSeconds: '',
      distance: '',
      distanceUnits: 'miles',
      hasGpx: false,
      gpxPath: [],
      fetchingData: false,
      networkError: false,
      timeoutError: false,
      idError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.prefillForm = this.prefillForm.bind(this);
    this.toggleGpxTrue = this.toggleGpxTrue.bind(this);
    this.handleGpxData = this.handleGpxData.bind(this);
    this.retryTimeout = this.retryTimeout.bind(this);
    this.fileInputRef = createRef();
  }

  componentDidMount() {
    if (this.props.mode === 'edit') {
      this.prefillForm();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.entryId !== prevProps.entryId) {
      this.prefillForm();
    }
  }

  prefillForm() {
    const { user } = this.context;
    this.setState({
      fetchingData: true
    }, async () => {
      const entryId = Number(this.props.entryId);
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      try {
        const response = await fetch(`/api/runs/${entryId}`, req);
        if (response.status === 404) {
          this.setState({ idError: true });
          return;
        }
        const result = await response.json();
        const { runData, gpxData } = result;
        const { title, description, date, duration, distance, distanceUnits, hasGpx } = runData;
        const splitDuration = duration.split(':');
        const dtDateOnly = removeTz(date);
        this.setState({
          title,
          description,
          date: dtDateOnly,
          durationHours: splitDuration[0],
          durationMinutes: splitDuration[1],
          durationSeconds: splitDuration[2],
          distance,
          distanceUnits,
          hasGpx,
          gpxPath: gpxData,
          fetchingData: false,
          networkError: false,
          idError: false
        });
      } catch (err) {
        console.error('An error occured!', err);
        this.setState({ networkError: true });
      }
    });
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

  toggleGpxTrue() {
    this.setState({ hasGpx: true });
  }

  handleGpxData(event) {
    const file = event.target.files[0];
    if (file.size > 10485760) {
      this.fileInputRef.current.value = '';
      alert('File is too large. Maximum file size is 10MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsedData = parseGpxData(event.target.result);
        const { date, path, distance, durationObj } = parsedData;
        this.setState({
          date: removeTz(new Date(date)),
          gpxPath: path,
          distance,
          distanceUnits: 'kilometers',
          durationHours: String(durationObj.hours),
          durationMinutes: String(durationObj.minutes),
          durationSeconds: String(durationObj.seconds)
        });
      } catch (error) {
        this.fileInputRef.current.value = '';
        alert('Could not read GPX data. Check your GPX file to ensure data is valid.');
        console.error(error);
      }
    };
    reader.readAsText(file);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      fetchingData: true
    }, async () => {
      const { user } = this.context;
      const { mode, entryId } = this.props;
      const req = {
        method: `${mode === 'add' ? 'POST' : 'PUT'}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user,
        body: JSON.stringify(this.state)
      };
      try {
        const response = await fetch(`${mode === 'add' ? '/api/runs' : '/api/runs/' + entryId}`, req);
        const result = await response.json();
        if (result.error) {
          this.setState({ timeoutError: true });
          return;
        }
        window.location.hash = '#home?tab=activities';
      } catch (err) {
        console.error('An error occured!', err);
        this.setState({ networkError: true });
      }
    });
  }

  retryTimeout() {
    this.setState({ timeoutError: false });
  }

  render() {
    if (this.state.idError) {
      return <NotFound />;
    }
    if (this.state.networkError) {
      return <NetworkError />;
    }
    if (this.state.timeoutError) {
      return <TimeoutError handleSubmit={this.handleSubmit} retryTimeout={this.retryTimeout}/>;
    }
    if (this.state.fetchingData) {
      return <LoadingSpinner />;
    }
    const { title, description, date, distance, distanceUnits, durationHours, durationMinutes, durationSeconds, gpxPath, hasGpx } = this.state;
    const { handleChange, handleSubmit, handleDateChange, toggleGpxTrue, fileInputRef, handleGpxData } = this;
    const { mode } = this.props;
    const durationObj = { durationHours, durationMinutes, durationSeconds };
    const pace = calculatePace(distance, distanceUnits, durationHours, durationMinutes, durationSeconds);

    const titleMessage = mode === 'add'
      ? 'Add Run'
      : 'Edit Run';

    const buttonText = mode === 'add'
      ? 'Add Run'
      : 'Save Changes';

    return (
      <form className="w-full" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-lora font-bold mb-4">{titleMessage}</h1>
        <section className="md:flex gap-6">
          <div className="md:w-2/4 w-full flex-shrink-0 mt-0.5">
            <UploadRunCard fileInputRef={fileInputRef} toggleGpxTrue={toggleGpxTrue} handleGpxData={handleGpxData} gpxPath={gpxPath} hasGpx={hasGpx}/>
          </div>
          <div className="md:flex md:gap-6">
            <div className="w-full">
              <p className="font-lora font-md text-md font-medium pb-2" >Date</p>
              <DatePicker className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500 mb-4" selected={date} onChange={handleDateChange} dateFormat='MM/dd/yyy' maxDate={new Date()} minDate={subYears(new Date(), 80)} disabled={hasGpx} required/>
              <DistanceInput integerName='distance' integerValue={distance} distanceTypeName='distanceUnits' distanceTypeValue={distanceUnits} onChange={handleChange} disabled={hasGpx}/>
              <DurationInput value={durationObj} onChange={handleChange} disabled={hasGpx}/>
              <TextInput type="pace" name="pace" placeholder="0:00 / mi" value={pace} showLabel={true} label="Pace" onChange={handleChange} disabled={hasGpx} />
            </div>
          </div>
        </section>
        <TextInput type="text" name="title" showLabel={true} label="Title" placeholder="Morning Sun Run" value={title} onChange={handleChange} />
        <TextInput type="text" name="description" showLabel={true} label="Description" placeholder="Easy run with great weather -- nice recovery day" value={description} onChange={handleChange} />
        <div className="flex justify-end mt-2 mb-8">
          <button className="md:w-1/3 w-full bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg">{buttonText}</button>
        </div>
      </form>
    );
  }
}
RunForm.contextType = AppContext;
