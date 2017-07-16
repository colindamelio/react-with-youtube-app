import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoDetail from "./components/video_detail";
import VideoList from "./components/video_list";
import _ from 'lodash';

const API_KEY = "AIzaSyCP5-9AC_98iAF_aXXwlTEGg5m5830vqaM";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    }

    this.videoSearch('surfboards');
  }

  videoSearch(searchTerm) {
    YTSearch({ key: API_KEY, searchTerm: searchTerm }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          onSearchTermChange={(searchTerm) => {this.videoSearch(searchTerm)}}
         />
        <VideoDetail
          video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={(selectedVideo) => {this.setState({selectedVideo})}}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
