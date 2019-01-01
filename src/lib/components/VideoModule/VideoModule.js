import React, { Component } from "react";
import YTSearch from "youtube-api-search";
import VideoList from "../VideoList/VideoList";
import SearchBar from "../VideoSearchBar/VideoSearchBar";
import VideoDetail from "../VideoDetail/VideoDetail";
import _ from "lodash"

const API_KEY = "AIzaSyDWY97_jsWo8Ph_ag0zQ-2B6kMeJhYJkjk";


// Create a new component. This component should produce some HTML
class VideoModule extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch("Asurion - who we are");
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]

			});
			// this.setState({ videos: videos }) only works when the key and the property are the same variable name
		});
	}

	render() {
		const videoSearch = _.debounce((term) => {
			this.videoSearch(term)
		}, 300);


		return (
			<div className="container">
				<div className='row'>
					<div className="col-sm-12">
						<SearchBar onSearchTermChange={videoSearch}/>
					</div>
				</div>
				<div className='row'>
					<div className="col-md-8">
						<VideoDetail video={this.state.selectedVideo} />
					</div>
					<div className="col-md-4">
						<VideoList
							onVideoSelect={selectedVideo => this.setState({selectedVideo})}
							videos={this.state.videos} />
					</div>
				</div>
			</div>
		);
	}
}

export default VideoModule;

