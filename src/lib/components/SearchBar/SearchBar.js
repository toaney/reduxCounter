import React, { Component } from "react";
//import PropTypes from "prop-types";
//import classnames from "classnames";

import "./SearchBar.scss"


class SearchBar extends Component { // define a new class called SearchBar and give it all the functionality that React.Component has
	constructor(props) {
		super(props);
		const glossary = this.props.glossary;

							//const classes = {
							//	...SearchBar.defaultProps.classes,
							//	...this.props.classes
							//};


        					//array of autocomplete terms
        					//this.glossary = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


        this.searchBarHandler = this.searchBarHandler.bind(this);
        this.listItemClick = this.listItemClick.bind(this);
        this.listItemOnKeyDown = this.listItemOnKeyDown.bind(this);
        this.searchBarOnKeyDown = this.searchBarOnKeyDown.bind(this);
        this.searchBarButtonClick = this.searchBarButtonClick.bind(this);
        this.searchBarButtonKeydown = this.searchBarButtonKeydown.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.searchBarHandler = this.searchBarHandler.bind(this);

		//create refs on the search input field and the autocomplete list
		this.searchbarRef = React.createRef();
		this.autocompleteRef = React.createRef();
		this.setWrapperRef = this.setWrapperRef.bind(this);
    }

	searchBarHandler(e) {
		this.props.handleOnInputChange(e.target.value);
							//this.onInputChange(event.target.value);
        this.returnAutocomplete(e.target.value, this.props.glossary);
        					//this.searchBarKeyPress(event)
	}

							//onInputChange(value) {
							//	this.setState({value});
							//	//this.props.onSearchTermChange(value)
							//}

    returnAutocomplete(input, glossary){
        // take input and create autocomplete list
        const autocompleteList = glossary.filter( term => {
            return term.substr(0, input.length).toUpperCase() === input.toUpperCase();
        })

        //ternary conditional operator to update autocomplete list; updates autocomplete list to an empty array if there is no input value
        					//!input ? (this.setState({autocomplete: []})) : (this.setState({autocomplete: autocompleteList}));
		!input ? this.props.updateAutocompleteList([]) : this.props.updateAutocompleteList(autocompleteList);
    }

    //click list item

    listItemClick(term, index){
							//console.log(index + " " + term);
							//this.setState({activeIndex : 0});
							//this.setState({value: term});
							//this.setState({autocomplete: []})
        this.searchbarRef.current.focus();
							//console.log(term);
        this.props.updateActiveIndex(0);
        this.props.updateAutocompleteList([]);
        this.props.handleOnInputChange(term);

    }

    listItemOnKeyDown(param){
		param.preventDefault();

        switch(param.keyCode){
            case 38 ://case arrow up
                let thisIndex = this.props.activeIndex;
                if (thisIndex > (0)) {
                    this.autocompleteRef.current.children[(thisIndex - 1)].focus();
                    		//this.setState({activeIndex: (this.props.activeIndex - 1)})
                    this.props.updateActiveIndex(thisIndex - 1)
                } else {
                    this.autocompleteRef.current.children[(this.props.autocomplete.length - 1)].focus();
                    		//this.setState({activeIndex: (this.props.autocomplete.length - 1)})
                    this.props.updateActiveIndex(this.props.autocomplete.length - 1)
                }
                return;
            case 40 ://case arrow down
                let currentIndex = this.props.activeIndex;
				if (currentIndex < (this.props.autocomplete.length - 1)) {
                    this.autocompleteRef.current.children[(currentIndex + 1)].focus();
                    		//this.setState({activeIndex: (this.props.activeIndex + 1)})
                    this.props.updateActiveIndex(currentIndex + 1)
				} else {
                    this.autocompleteRef.current.children[0].focus();
							//this.setState({activeIndex: 0})
                    this.props.updateActiveIndex(0)
				}
                return;
            case 13 ://case enter key
                this.autocompleteRef.current.children[this.props.activeIndex].click();
                return;
            case 27 ://case escape key
                this.searchbarRef.current.focus();
                			//this.setState({activeIndex: 0});
                this.props.updateActiveIndex(0)
                return;
            default://default
                return;
        }
	}

    //searchbar keydown listener to shift focus on up/down arrow keydowns
    searchBarOnKeyDown(param){
		switch(param.keyCode){
			case 38 ://case arrow down
                param.preventDefault();
				if (this.props.autocomplete[0]){
                    this.autocompleteRef.current.lastChild.focus();
                    		//this.setState({activeIndex: (this.props.autocomplete.length - 1)});
                    this.props.updateActiveIndex(this.props.autocomplete.length - 1);
				}
                return;
            case 40 ://case arrow up
                param.preventDefault();
                if (this.props.autocomplete[0]) {
                    this.autocompleteRef.current.firstChild.focus();
                    		//this.setState({activeIndex: 0});
                    this.props.updateActiveIndex(0);
                }
                return;
            case 13 ://case enter
                console.log('enter key');
                //simulate form submission
                this.searchBarButtonClick();
                return;
			default://default
				return;
		}
	}

	searchBarButtonClick() {
		alert(`Your search term: ${this.props.value}`);
	}

    searchBarButtonKeydown(param) {
		if (param === 13) {
			this.searchBarButtonClick();
		}
    }

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		//this.wrapperRef = node;
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            //this.setState({autocomplete: []})
            //this.props.updateAutocompleteList([]);
			//alert('you clicked outside the component');
		}
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	render() { // this is still a function
		//must return JSX
        const {glossary,
			value,
			autocomplete,
			activeIndex,
			placeholder} = this.props;

		return (
			<div className="searchbar-container">

				<br />
				<div className="searchbar-dropdown" ref={this.setWrapperRef}>
					<input
					className="searchbar-input myInput"
					value={value}
					placeholder={placeholder}
					name= "myCountry"
					//onChange={event => this.onInputChange(event.target.value)}
					onChange={this.searchBarHandler}
                    onKeyDown={this.searchBarOnKeyDown}
                    ref={this.searchbarRef}/>


					{ //ternary operator renders a list if autocomplete values exist
                        this.props.autocomplete[0] ?
                            <ul className="searchbar-dropdown-list" tabIndex="-1" ref={this.autocompleteRef}>
                                {this.props.autocomplete.map((term, index) => {
                                        return <li
											key={ index }
											className="dropdown-item"
											tabIndex="0"
											onClick={() => this.listItemClick(term)}
											onKeyDown={this.listItemOnKeyDown}
										>{term}</li>;
                                })}
                            </ul>
							: null
					}

				</div>
                <button
					className="searchbar-button"
					onClick={() => this.searchBarButtonClick()}
					onKeyDown={this.searchBarButtonKeydown}
				>
					<span className="glyphicon glyphicon-search"></span>
				</button>
				<br />
			</div>
		);
	}
}


export default SearchBar;

//SearchBar.propTypes = {
//	onSearchTermChange: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//};

SearchBar.defaultProps = {
    value: "",
    autocomplete: [],
    activeIndex: 0,
	placeholder: "Search",
    classes: {
        searchbarInput: "searchbar-input",
        searchbarButton: "searchbar-button",
        searchbarDropdown: "searchbar-dropdown",
        searchbarDropdownContent: "searchbar-dropdown-content",
        searchbarDropdownList: "searchbar-dropdown-list",
        dropdownItem: "dropdown-item"
    }
};
