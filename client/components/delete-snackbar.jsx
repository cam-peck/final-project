import React from 'react';

export default class DeleteSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const active = this.state.isOpen === false
      ? 'flex'
      : 'hidden';
    return (
      <section className={`w-full ${active} justify-center pl-6 pr-6 absolute transition-all duration-300 bottom-8`}>
        <div className="w-full max-w-2xl flex items-center justify-between bg-gray-900 opacity-90 rounded-lg py-4 px-5 z-10">
          <div>
            <h1 className="text-white">Are you sure you&apos;d like to remove this workout?</h1>
          </div>
          <div className="flex flex-nowrap items-center">
            <button className="bg-red-600 text-white rounded-2xl px-4 py-3 mr-6">Delete</button>
            <i className="fa-solid fa-x text-white text-xl hover:cursor-pointer" />
          </div>
        </div>
      </section>
    );
  }

}
