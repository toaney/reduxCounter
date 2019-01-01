import React, { Component } from "react";
import PropTypes from "prop-types";
import "./VideoSearchBar.scss"

class SearchBar extends Component { // define a new class called SearchBar and give it all the functionality that React.Component has
	constructor(props) {
		super(props);

		this.state = { input: "" };
	}

	render() { // this is still a function
		//must return JSX
		return (
			<div className="video-search-container">
				<input
					className="video-search-input"
					value={this.state.input}
					placeholder=" Search"
					onChange={event => this.onInputChange(event.target.value)} /><br />
			</div>
		);
	}

	onInputChange(input) {
		this.setState({input});
		this.props.onSearchTermChange(input);

	}

	/*
	onInputChange(e) { // can also use handleInputChange - industry standard
		console.log(e.target.value);
	}
	*/
}

/*
const SearchBar = () => {
	return <input />;
};
*/

export default SearchBar;

SearchBar.propTypes = {
	onSearchTermChange: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
