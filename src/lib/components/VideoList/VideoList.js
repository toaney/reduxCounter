import React from "react";
import VideoListItem from "../VideoListItem/VideoListItem";
import PropTypes from "prop-types";

const VideoList = (props) => {

	const videoItems = props.videos.map((video) => {
		return (
			<VideoListItem
				onVideoSelect={props.onVideoSelect}
				key={video.etag}
				video={video} />
		);

	});

	return (
		<ul style={props.style}
			className="list-group">
			{videoItems}
		</ul>
	);

}


export default VideoList;


VideoList.propTypes = {
	style: PropTypes.object,
	videos: PropTypes.array,
	onVideoSelect: PropTypes.func,
};