import React from 'react';
import TextInput from './text-input';

export default class Progress extends React.Component {
  render() {
    return (
      <section className="pl-6 pr-6 mb-8 max-w-md md:max-w-6xl m-auto">
        <TextInput />
      </section>
    );
  }

}

{ /* <div className="w-full bg-blue-800 text-white flex justify-between items-center rounded-xl">
  <div className="flex items-center gap-6">
    <div className="w-14 ml-4">
      <img className="rounded-3xl" src="/images/placeholder-img-sq.jpg" alt="" />
    </div>
    <div className="flex flex-col gap-2 font-roboto">
      <h2 className="font-medium text-lg">October 2nd, 2022</h2>
      <p><span>4.2 miles</span> | <span>7:58 / mi</span></p>
    </div>
  </div>
  <div className="w-28">
    <img className="rounded-tr-lg rounded-br-lg" src="/images/placeholder-img-sq.jpg" alt="" />
  </div>
</div> */ }
