import React from 'react';

export default class RunMainCard extends React.Component {
  render() {
    const { title, date, description, distance, pace, closeModal } = this.props;
    return (
      <div onClick={event => { if (event.target.id === 'background') { closeModal(); } }} id="background" className="w-full h-screen fixed flex justify-center items-center top-0 left-0 bg-gray-800 bg-opacity-30">
        <div className="relative bg-white rounded-xl p-6 max-w-2xl ml-6 mr-6">
          <button onClick={closeModal} className="absolute -top-4 -right-3 bg-red-400 p-2 rounded-3xl text-white">x</button>
          {/* hero-img */}
          <div className="mb-6">
            <img className="w-full h-56 xxs:h-64 xs:h-80 object-cover rounded-xl" src="/images/placeholder-img-sq.jpg" alt="" />
          </div>
          {/* content */}
          <div className="pl-1">
            {/* content-header */}
            <div className="mb-4">
              <h1 className="font-lora text-xl font-bold">{title}</h1>
              <p className="flex gap-1 font-lora">
                <span>{date}</span>  |
                <span>{distance}</span>  |
                <span>{pace}</span>
              </p>
            </div>
            {/* content-main */}
            <div className="font-roboto max-w-lg mb-4">
              <p>{description}</p>
            </div>
          </div>
          {/* tab-menu
          <div className="modal-footer">
            <RunTabs>
              <div label="Notes">
                <p>Notes</p>
              </div>
              <div label="Pace">
                <p>Pace</p>
              </div>
              <div label="Elevation">
                <p>Elevation</p>
              </div>
            </RunTabs>
          </div> */}
        </div>
      </div>
    );
  }
}
