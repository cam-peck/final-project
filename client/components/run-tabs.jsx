import React, { useState, useEffect } from 'react';

export default function RunTabs({ children, tab }) {

  const [activeTab, setActiveTab] = useState(null);

  const handleClick = (event, newActiveTab) => {
    event.preventDefault();
    window.location.hash = `#home?tab=${newActiveTab}`;
  };

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  return (
    <div>
      <ul className="flex w-full text-center bg-blue-200">
        { children.map(tab => {
          const { label } = tab.props;
          return (
            <li key={label} className={`${label === activeTab ? 'border-b-2 border-purple-700' : 'border-b-2 border-blue-200'} border-b-2 border-blue-200 w-1/3 p-4`}>
              <a href="#" onClick={event => handleClick(event, label)}>{label}</a>
            </li>
          );
        }) }
      </ul>
      <div>
        { children.map(tabContent => {
          const { label, children } = tabContent.props;
          if (tabContent.props.label === activeTab) {
            return (
              <div key={label}>{children}</div>
            );
          } return '';
        }) }
      </div>
    </div>
  );
}
