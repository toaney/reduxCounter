
import React ,{Component} from "react";
import PropTypes from "prop-types";

export default class Dropdown extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<select
					name={this.props.name}
					value={this.props.selectedOption}
					onChange={this.props.controlFunc}
					className={this.props.contentWrapperClasses}>
					<option value="">{this.props.placeholder}</option>
					{this.props.options.map(opt => {
						return (
							<option
								key={opt.value}
								value={opt.value}>{opt.label}</option>
						);
					})}
				</select>
			</div>
		);
	}

}
Dropdown.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOption: PropTypes.string,
	controlFunc: PropTypes.func,
	placeholder: PropTypes.string,
	className:PropTypes.string,
	contentWrapperClasses:PropTypes.string
};

Dropdown.defaultProps = {
	className:"form-group",
	contentWrapperClasses:"form-select",
	options:[
		{label: "one", value:1},
		{label:"Two", value:2},
		{label: "three", value:3},
		{label:"four", value:4},
		{label:"five", value:5}
	]
};