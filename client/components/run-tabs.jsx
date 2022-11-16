import React from 'react';

export default class RunTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'activities'
    };
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <ul className="flex w-full text-center bg-blue-200 md:hidden">
          {children.map(tab => {
            const { label } = tab.props;
            return (
              <li key={label} className={`${label === this.props.tab ? 'border-b-2 border-purple-700' : 'border-b-2 border-blue-200'} w-1/3 p-4`}>
                <a href={`#home?tab=${label}`} >{label.charAt(0).toUpperCase() + label.slice(1)}</a>
              </li>
            );
          })}
        </ul>
        <div>
          {children.map(tabContent => {
            const { label, children } = tabContent.props;
            if (label === this.props.tab) {
              return (
                <div key={label}>{children}</div>
              );
            } return '';
          })}
        </div>
      </div>
    );
  }
}