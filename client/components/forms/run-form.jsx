import React, { createRef } from 'react';
import { calculatePace, AppContext, removeTz, getLatLonDistanceInKm } from '../../lib';
import TextInput from '../inputs/text-input';
import DatePicker from 'react-datepicker';
import UploadRunCard from '../cards/upload-run-card';
import { subYears, intervalToDuration, differenceInSeconds, parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import DistanceInput from '../inputs/distance-input';
import DurationInput from '../inputs/duration-input';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';
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
      gpxFile: '',
      gpxPath: [],
      fetchingData: false,
      networkError: false,
      idError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.prefillForm = this.prefillForm.bind(this);
    this.toggleGpxTrue = this.toggleGpxTrue.bind(this);
    this.handleGpxData = this.handleGpxData.bind(this);
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
    }, () => {
      const entryId = Number(this.props.entryId);
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      fetch(`/api/runs/${entryId}`, req)
        .then(response => {
          if (response.status === 404) {
            this.setState({ idError: true });
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('Error 404');
          } else {
            return response.json();
          }
        })
        .then(result => {
          const { title, description, date, duration, distance, distanceUnits, hasGpx } = result;
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
            fetchingData: false,
            networkError: false,
            idError: false
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
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(event.target.result, 'text/xml');
        const date = xmlDoc.querySelector('name').textContent.split(' ')[1];
        const trkptData = xmlDoc.querySelectorAll('trkpt');
        const path = [];
        for (let i = 0; i < trkptData.length; i++) {
          const runObj = {};
          runObj.lat = parseFloat(trkptData[i].getAttribute('lat'));
          runObj.lng = parseFloat(trkptData[i].getAttribute('lon'));
          path.push(runObj);
        }
        const startTime = trkptData[0].querySelector('time').textContent;
        const endTime = trkptData[trkptData.length - 1].querySelector('time').textContent;
        const durationInSeconds = differenceInSeconds(parseISO(endTime), parseISO(startTime));
        const durationObj = intervalToDuration({ start: 0, end: durationInSeconds * 1000 });
        const distance = getLatLonDistanceInKm(path);
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
      fetchingData: true,
      gpxFile: this.fileInputRef.current.files[0]
    }, () => {
      const { user } = this.context;
      const { mode, entryId } = this.props;
      const req = {
        method: `${mode === 'add' ? 'POST' : 'PUT'}`,
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user,
        body: JSON.stringify(this.state)
      };
      fetch(`${mode === 'add' ? '/api/runs' : '/api/runs/' + entryId}`, req)
        .then(response => response.json())
        .then(result => {
          if (this.state.hasGpx) {
            const formData = new FormData();
            formData.append('file', this.state.gpxFile);
            const options = {
              method: 'POST',
              body: formData,
              headers: {
                'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
              },
              user
            };
            fetch('/api/runs/gpxData/' + result.entryId, options)
              .then(response => response.json())
              .then(result => {
                this.setState({ hasGpx: false, fileData: null });
              })
              .catch(error => {
                console.error('An error occured!', error);
                this.setState({ networkError: true });
              });
          }
          this.setState({
            title: '',
            description: '',
            date: new Date(),
            durationHours: '',
            durationMinutes: '',
            durationSeconds: '',
            distance: '',
            distanceUnits: 'miles',
            hasGpx: false,
            fetchingData: false
          });
          window.location.hash = '#home?tab=activities';
        })
        .catch(error => {
          console.error('An error occured!', error);
          this.setState({ networkError: true });
        });
    });
  }

  render() {
    if (this.state.idError) {
      return <NotFound />;
    }
    if (this.state.networkError) {
      return <NetworkError />;
    }
    if (this.state.fetchingData) {
      return <LoadingSpinner />;
    }
    const { title, description, date, distance, distanceUnits, durationHours, durationMinutes, durationSeconds, gpxPath } = this.state;
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
            <UploadRunCard fileInputRef={fileInputRef} toggleGpxTrue={toggleGpxTrue} handleGpxData={handleGpxData} gpxPath={gpxPath}/>
          </div>
          <div className="md:flex md:gap-6">
            <div className="w-full">
              <p className="font-lora font-md text-md font-medium pb-2" >Date</p>
              <DatePicker className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500 mb-4" selected={date} onChange={handleDateChange} dateFormat='MM/dd/yyy' maxDate={new Date()} minDate={subYears(new Date(), 80)} required/>
              <DistanceInput integerName='distance' integerValue={distance} distanceTypeName='distanceUnits' distanceTypeValue={distanceUnits} onChange={handleChange}/>
              <DurationInput value={durationObj} onChange={handleChange}/>
              <TextInput type="pace" name="pace" placeholder="0:00 / mi" value={pace} showLabel={true} label="Pace" onChange={handleChange} />
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
