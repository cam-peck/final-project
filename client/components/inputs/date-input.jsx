import React from 'react';

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
    this.toggleType = this.toggleType.bind(this);
  }

  toggleType() {
    this.setState({
      isActive: !this.state.isActive
    });
  }

  render() {
    const showLabel = this.props.showLabel
      ? ''
      : 'hidden';
    const inputType = this.state.isActive
      ? 'date'
      : 'text';
    return (
      <div className="mb-4 flex flex-col">
        <label className={`${showLabel} font-lora font-medium text-md pb-2`} htmlFor={this.props.name}>{this.props.label}</label>
        <input autoComplete="on" onFocus={() => this.toggleType()} onBlur={() => this.toggleType()} type={inputType} name={this.props.name} id={this.props.name} value={this.props.value} onChange={this.props.onChange} className="rounded-lg px-3 py-3.5 h-[54px] border border-gray-300 focus:outline-blue-500" placeholder={this.props.placeholder} required />
      </div>
    );
  }

}
