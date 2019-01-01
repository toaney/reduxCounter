import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SearchBar.scss";

export default class SearchBar extends Component {
    constructor(props) {
        //creates references for shifting focus and detecting clicks outside of component
        super(props);
        this.searchbarRef = React.createRef();
        this.autocompleteRef = React.createRef();
        this.inputContainerRef = React.createRef();
    }

    searchBarHandler = (e) => {
        //invokes function in the parent component to update parent state value
        this.props.handleOnInputChange(e.target.value);
        //invokes function to filter glossary and update parent state autocomplete array
        this.returnAutocomplete(e.target.value, this.props.glossary);
    }


    returnAutocomplete = (input, glossary) => {
        //takes input and updates parent autocomplete
        const autocompleteList = glossary.filter( term => {
            return term.substr(0, input.length).toUpperCase() === input.toUpperCase();
        })
        !input ? this.props.updateAutocompleteList([]) : this.props.updateAutocompleteList(autocompleteList);
    }

    listItemClick(term){
        //updates parent state value when an autocomplete list item is clicked; focus shifted to search input field
        this.props.updateActiveIndex(0);
        this.props.updateAutocompleteList([]);
        this.props.handleOnInputChange(term);
        this.searchbarRef.current.focus();

    }

    listItemOnKeyDown = (param) => {
        //listens to keystrokes on the autocomplete list; updates focus and parent state activeIndex accordingly
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

    searchBarOnKeyDown = (param) => {
        //listens to keystrokes on the input field; updates focus and parent state activeIndex accordingly
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

    searchBarButtonClick = () => {
        //invokes function defined in the parent component for submitting search
        this.props.submitSearch();
    }

    searchBarButtonKeydown(param) {
        //triggers the search button when the 'enter' key is pressed in the input field
        if (param === 13) {
            this.searchBarButtonClick();
        }
    }

    handleClickOutside = (event) => {
        //checks if autocomplete list is populated and if target click occurred within the searchBar component
        if (this.props.autocomplete[0] && this.inputContainerRef && !this.inputContainerRef.current.contains(event.target)){
            //clears the autocomplete list located in the parent component
            this.props.updateAutocompleteList([]);
        }
    }

    componentDidMount() {
        //add handler to detect clicks outside of the searchBar component
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        //removes handler to detect clicks outside of the searchBar component
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

	render(){
	    const {
            value,
            autocomplete,
            classes,
            placeholder,
            buttonText
        } = this.props;

		return (
            <div className={classes.searchBarContainer}>

                <br />
                <div className={classes.inputContainer} ref={this.inputContainerRef}>
                    <input className={classes.inputField}
                        placeholder={placeholder}
                        value={value}
                        onChange={this.searchBarHandler}
                        onKeyDown={this.searchBarOnKeyDown}
                        ref={this.searchbarRef}
                    />

                    { //ternary operator renders a list if autocomplete values exist within the parent state
                        autocomplete[0] ?
                            <ul className={classes.autocompleteList} ref={this.autocompleteRef}>
                                {this.props.autocomplete.map((term, index) => {
                                    return <li
                                        key={ index }
                                        className={classes.autocompleteItem}
                                        tabIndex="-1"
                                        onClick={() => this.listItemClick(term)}
                                        onKeyDown={this.listItemOnKeyDown}
                                    >{term}</li>;
                                })}
                            </ul>
                            : null
                    }

                </div>
                <button
                    className={classes.searchBarButton}
                    onClick={this.searchBarButtonClick}
                    onKeyDown={this.searchBarButtonKeydown}
                >
                    {buttonText}
                </button>
                <br />
            </div>
		);
	}
}

SearchBar.propTypes = {
    glossary: PropTypes.array,
    value: PropTypes.string,
    autocomplete: PropTypes.array,
    activeIndex: PropTypes.number,
    placeholder: PropTypes.string,
    buttonText: PropTypes.string,
    classes: PropTypes.object
};

SearchBar.defaultProps = {
    glossary: [],
    value: "",
    autocomplete: [],
    activeIndex: 0,
    placeholder: "Search",
    buttonText: "",
    classes: {
        searchBarContainer: "search-container",
        inputContainer: "search-input-container",
        inputField: "search-input",
        autocompleteList: "autocomplete-list",
        autocompleteItem: "autocomplete-item",
        searchBarButton: "submit-button bg-primary glyphicon glyphicon-search",
    }
};
