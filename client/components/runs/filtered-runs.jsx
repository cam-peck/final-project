import React from 'react';
import RunMiniCard from '../cards/run-mini-card';

export default function FilteredRuns(props) {
  const { runData } = props.data;
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
      {
        runData.map(run => {
          return (
            <RunMiniCard
              key={run.entryId}
              entryId={run.entryId}
              date={run.date}
              distance={run.distance}
              distanceUnits={run.distanceUnits}
              duration={run.duration}
              openModal={props.openModal}
            />
          );
        })
      }
    </div>
  );
}
