import React, { useState, useEffect, useContext } from 'react';
import WorkoutFieldset from '../inputs/workout-fieldset';
import TextInput from '../inputs/text-input';
import CheckboxInput from '../inputs/checkbox-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingSpinner from '../loading-spinner';
import NetworkError from '../network-error';
import { subYears, addYears } from 'date-fns';
import { AppContext, removeTz } from '../../lib';
import NotFound from '../../pages/not-found';

export default function WorkoutForm(props) {
  const { mode, workoutId } = props;

  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [warmupCheck, setWarmupCheck] = useState(false);
  const [workoutCheck, setWorkoutCheck] = useState(true);
  const [cooldownCheck, setCooldownCheck] = useState(false);
  const [warmupDistance, setWarmupDistance] = useState('');
  const [warmupDistanceUnits, setWarmupDistanceUnits] = useState('miles');
  const [warmupNotes, setWarmupNotes] = useState('');
  const [workoutDistance, setWorkoutDistance] = useState('');
  const [workoutDistanceUnits, setWorkoutDistanceUnits] = useState('miles');
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [cooldownDistance, setCooldownDistance] = useState('');
  const [cooldownDistanceUnits, setCooldownDistanceUnits] = useState('miles');
  const [cooldownNotes, setCooldownNotes] = useState('');
  const [fetchingData, setFetchingData] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [idError, setIdError] = useState(false);

  const { user } = useContext(AppContext);

  useEffect(() => {
    const prefillForm = async () => {
      setFetchingData(true);
      const workoutId = Number(props.workoutId);
      const req = {
        method: 'GET',
        headers: {
          'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
        },
        user
      };
      try {
        const response = await fetch(`/api/workouts/${workoutId}`, req);
        if (response.status === 404) {
          setIdError(true);
          setFetchingData(false);
          return;
        }
        const result = await response.json();
        const { date, description, warmupDistance, warmupNotes, workoutDistance, warmupDistanceUnits, workoutDistanceUnits, cooldownDistanceUnits, workoutNotes, cooldownDistance, cooldownNotes } = result;
        const dtDateOnly = removeTz(date);
        const warmupCheck = Boolean(warmupNotes);
        const workoutCheck = Boolean(workoutNotes);
        const cooldownCheck = Boolean(cooldownNotes);
        setDate(dtDateOnly);
        setDescription(description);
        setWarmupCheck(warmupCheck);
        setWorkoutCheck(workoutCheck);
        setCooldownCheck(cooldownCheck);
        setWarmupDistance(warmupDistance);
        setWarmupDistanceUnits(warmupDistanceUnits);
        setWarmupNotes(warmupNotes);
        setWorkoutDistance(workoutDistance);
        setWorkoutDistanceUnits(workoutDistanceUnits);
        setWorkoutNotes(workoutNotes);
        setCooldownDistance(cooldownDistance);
        setCooldownDistanceUnits(cooldownDistanceUnits);
        setCooldownNotes(cooldownNotes);
        setFetchingData(false);
      } catch (err) {
        console.error('An error occured!', err);
        setNetworkError(true);
      }
    };
    if (mode === 'edit') {
      prefillForm();
    }
  }, [mode, props.workoutId, user]);

  const handleSubmit = async event => {
    event.preventDefault();
    setFetchingData(true);
    const body = { date, description, warmupDistanceUnits, workoutDistanceUnits, cooldownDistanceUnits, warmupDistance, warmupNotes, workoutDistance, workoutNotes, cooldownDistance, cooldownNotes };
    const req = {
      method: `${mode === 'add' ? 'POST' : 'PUT'}`,
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('runningfuze-project-jwt')
      },
      user,
      body: JSON.stringify(body)
    };
    try {
      const response = await fetch(`${mode === 'add' ? '/api/workouts' : '/api/workouts/' + workoutId}`, req);
      await response.json();
      setDate(new Date());
      setDescription('');
      setWarmupCheck(false);
      setWorkoutCheck(true);
      setCooldownCheck(false);
      setWarmupDistance('');
      setWarmupDistanceUnits('miles');
      setWarmupNotes('');
      setWorkoutDistance('');
      setWorkoutDistanceUnits('miles');
      setWorkoutNotes('');
      setCooldownDistance('');
      setCooldownDistanceUnits('miles');
      setCooldownNotes('');
      setFetchingData(false);
      window.location.hash = '#workouts';
    } catch (err) {
      console.error('An error occured!', err);
      setNetworkError(true);
    }
  };

  if (idError) return <NotFound />;
  if (networkError) return <NetworkError />;
  if (fetchingData) return <LoadingSpinner />;

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
          <DatePicker className="w-full rounded-lg px-3 py-3.5 border border-gray-300 focus:outline-blue-500 mb-4" selected={date} onChange={date => setDate(date)} dateFormat='MM/dd/yyy' maxDate={addYears(new Date(), 1)} minDate={subYears(new Date(), 80)} required />
        </div>
        {/* Description */}
        <div className="w-full mb-6">
          <TextInput type='text' name='description' value={description} placeholder='Weekly long run @ Eagle Creek Park' onChange={event => setDescription(event.target.value)} showLabel={true} label='Description'/>
        </div>
        {/* Workout Checkboxes */}
        <div className="w-full mb-4">
          <fieldset className="border border-2 border-blue-300 rounded-lg p-5">
            <legend className="font-lora font-md text-lg x2s:text-xl font-medium p-2 bg-blue-200 rounded-md">What sections do you need?</legend>
            <CheckboxInput id='warmupCheck' name='warmupCheck' value={warmupCheck} onChange={event => setWarmupCheck(!warmupCheck)} label='Warmup' checked={warmupCheck}/>
            <CheckboxInput id='workoutCheck' name='workoutCheck' value={workoutCheck} onChange={event => setWorkoutCheck(!workoutCheck)} label='Workout' checked={workoutCheck}/>
            <CheckboxInput id='cooldownCheck' name='cooldownCheck' value={cooldownCheck} onChange={event => setCooldownCheck(!cooldownCheck)} label='Cooldown' checked={cooldownCheck}/>
          </fieldset>
        </div>
        {/* Checkbox Fieldsets */}
        {
          warmupCheck === true
            ? <div className="w-full mb-4">
              <WorkoutFieldset legendLabel='Warmup' onIntegerChange={event => setWarmupDistance(event.target.value)} onDistanceUnitChange={event => setWarmupDistanceUnits(event.target.value)} onNotesChange={event => setWarmupNotes(event.target.value)} integerName='warmupDistance' integerValue={warmupDistance} distanceTypeName='warmupDistanceUnits' distanceTypeValue={warmupDistanceUnits} notesName='warmupNotes' notesValue={warmupNotes} notesPlaceholder='8:30 / mile EZ'/>
            </div>
            : ''
        }
        {
          workoutCheck === true
            ? <div className="w-full mb-4">
              <WorkoutFieldset legendLabel='Workout' onIntegerChange={event => setWorkoutDistance(event.target.value)} onDistanceUnitChange={event => setWorkoutDistanceUnits(event.target.value)} onNotesChange={event => setWorkoutNotes(event.target.value)} integerName='workoutDistance' integerValue={workoutDistance} distanceTypeName='workoutDistanceUnits' distanceTypeValue={workoutDistanceUnits} notesName='workoutNotes' notesValue={workoutNotes} notesPlaceholder='4 x 1k @ 3:20 / k' required={true}/>
            </div>
            : ''
        }
        {
          cooldownCheck === true
            ? <div className="w-full mb-4">
              <WorkoutFieldset legendLabel='Cooldown' onIntegerChange={event => setCooldownDistance(event.target.value)} onDistanceUnitChange={event => setCooldownDistanceUnits(event.target.value)} onNotesChange={event => setCooldownNotes(event.target.value)} integerName='cooldownDistance' integerValue={cooldownDistance} distanceTypeName='cooldownDistanceUnits' distanceTypeValue={cooldownDistanceUnits} notesName='cooldownNotes' notesValue={cooldownNotes} notesPlaceholder='EZ jog'/>
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
