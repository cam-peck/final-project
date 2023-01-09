import React from 'react';
import RunMiniCard from '../cards/run-mini-card';

export default function FilteredRuns(props) {
  const { runData, gpxData, openModal } = props;
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
      {
        runData.map(run => {
          let gpsData = null;
          if (gpxData[run.entryId]) {
            gpsData = gpxData[run.entryId];
          }
          return (
            <RunMiniCard
              key={run.entryId}
              entryId={run.entryId}
              date={run.date}
              distance={run.distance}
              distanceUnits={run.distanceUnits}
              duration={run.duration}
              gpxData={gpsData}
              openModal={openModal}
            />
          );
        })
      }
    </div>
  );
}
