import React from 'react';

export default class RunTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Activities'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event, newActiveTab) => {
    this.setState({ activeTab: newActiveTab });
  };

  render() {
    const { activeTab } = this.state;
    const { children } = this.props;
    const { handleClick } = this;

    return (
      <div>
        <ul className="flex w-full text-center bg-blue-200 md:hidden">
          {children.map(tab => {
            const { label } = tab.props;
            return (
              <li key={label} className={`${label === activeTab ? 'border-b-2 border-purple-700' : 'border-b-2 border-blue-200'} w-1/3 p-4`}>
                <button onClick={event => handleClick(event, label)}>{label}</button>
              </li>
            );
          })}
        </ul>
        <div>
          {children.map(tabContent => {
            const { label, children } = tabContent.props;
            if (tabContent.props.label === activeTab) {
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
