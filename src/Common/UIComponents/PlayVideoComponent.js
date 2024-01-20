import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import './uicomponent.css';
import { set } from 'date-fns';

import { __DEV } from "../../isDev";
//Import the components you need as ES2015 modules
import { PlayerIcon, PlaybackControls } from 'react-player-controls';
import ReactGA from 'react-ga';
import PremiumModalSection from "../../Components/Sections/HomeSection/PremiumModalSection";
// Import the new video player components
import OpenPlayer from 'openplayerjs';
import 'openplayerjs/dist/openplayer.css';
import Video from '../../Images/test-video.mp4';
import { useSelector, useDispatch } from "react-redux"


const PlayVideoComponent = (props) => {

  __DEV && console.log(props.premium, Video, "video");

  const [playing, setPlaying] = React.useState(false)
  const [url, setUrl] = React.useState("");
  const [pip, setPip] = React.useState(false);
  const [premiumModal, setPremiumModalOpen] = React.useState(false);
  const [controls, setControls] = React.useState(true);
  const [light, setLIght] = React.useState(false);
  const [volume, setVolume] = React.useState(0.8);
  const [muted, setMuted] = React.useState(false);
  const [played, setPlayed] = React.useState(0);
  const [loaded, setLoaded] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [playbackRate, setPlayBackrate] = React.useState(0.0);
  const [loop, setLoop] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState(0);
  const [numSongs, setNumSongs] = React.useState([]);
  const [paidArr, setpaidArr] = React.useState(JSON.parse(localStorage.getItem("userDetails")).paidFor);
  const [userDetails, setUserDetails] = React.useState({});

  console.log(paidArr);


  console.log(JSON.parse(localStorage.getItem("userDetails")));

  const userdata = JSON.parse(localStorage.getItem("userDetails"));

  const user = useSelector(state => state.userDetails);

  useEffect(() => {
    if (user && user._id) {
      setUserDetails(user);
    }
  }, [user])

  const handlePlay = () => {

    var arr = userDetails.paidFor;
    var data = document.querySelector('.op-player');

    if (props.premium === false) {
      if (data && data.id) {
        var player = OpenPlayer.instances[data.id];
        player.play();
      }
    }
    else if (arr && arr.length > 0 && arr.includes(props.contentId)) {
      if (data && data.id) {
        var player = OpenPlayer.instances[data.id];
        player.play();
      }
    }
    else {
      console.log(paidArr, "else")
      setPlaying(false);
      if (data && data.id) {
        var player = OpenPlayer.instances[data.id];
        player.pause();
      }
      setPremiumModalOpen(true);
    }

  }



  const load = () => {

    __DEV && console.log(numSongs);
    if (numSongs) {
      setUrl(numSongs[currentSong]);
      setPlayed(0);
      setLoaded(0);
      setPip(false);
    }

  }

  const handleEnablePIP = () => {
    __DEV && console.log('onEnablePIP')
    setPip(true);
  }

  const handleDisablePIP = () => {
    __DEV && console.log('onDisablePIP')
    setPip(false);
  }

  const handlePause = () => {
    __DEV && console.log('onPause')

    // var arr = userdata.paidFor;
    // if (props.premium === false || arr && arr.length > 0 && arr.includes(props.contentId)) {
    //   setPlaying(false);
    // }
    // else {
    setPlaying(false);
    setPremiumModalOpen(true);
    // }
  }


  const handleEnded = () => {
    __DEV && console.log('onEnded')
    setPlaying(loop);
  }


  const handleProgress = state => {
    __DEV && console.log('onProgress', state)

  }

  const handleDuration = (duration) => {

    setDuration(duration);
  }


  const prevHandler = (data) => {

    setCurrentSong(currentSong - 1);


  }

  const nextHandler = (data) => {

    setCurrentSong(currentSong + 1);
  }

  const handleClose = () => {

    setPremiumModalOpen(!premiumModal)

  }

  React.useEffect(() => {

    setUrl(numSongs[currentSong])

  }, [currentSong, numSongs])



  React.useEffect(() => {

    console.log(url, "url")

  }, [url])



  React.useEffect(() => {

    if (props.hlsUrl.length > 0) {

      const seriesUrl = props.hlsUrl.map(episode => {


        if (episode.hasOwnProperty('content')) {

          if (episode.content.hasOwnProperty('sources')) {
            if (Object.keys(episode.content.sources).length > 0)

              return episode.content.sources.hls;
          }
        }
      });

      __DEV && console.log(seriesUrl);


      setNumSongs(seriesUrl);


    } else {

      const arr = [];

      arr.push(props.url);

      setNumSongs(arr);


    }

  }, [props.hlsUrl, props.url])


  // React.useEffect(() => {

  //   load();

  // }, [numSongs])

  // Here is the new video player function start

  React.useEffect(() => {
    const player = new OpenPlayer('player');
    player.init();
  }, [url]);


  // Here is the new video player function end

  return (
    <div className="playvideo-start">

      <div className='player-wrapper'>

        {/* {/ ====New video player start======== /} */}
        {url &&
          <video id='player' className='op-player__media' controls
            // autoPlay
            // ={props.premium === false || paidArr && paidArr.length > 0 && paidArr.includes(props.contentId)? true:false}
            onPlay={handlePlay}
            // playing={playing}
            playsInline crossOrigin='anonymous'  >
            <source src={url} type={url && 'application/x-mpegURL'} />

          </video>
        }
        {/* {/ ====New video player end======== /} */}


        {/* <div className='previousnextbtndiv'>
          <div className='previoustbtndiv' onClick={prevHandler} >
            <PlayerIcon.Previous width={32} height={32} style={{ marginRight: 32 }} isEnabled={currentSong > 0 ? true : false} />
          </div>
          <div className='nextbtndiv' onClick={nextHandler}>
            <PlayerIcon.Next width={32} height={32} isEnabled={currentSong < numSongs.length - 1 ? true : false} />
          </div>
        </div> */}
        {/* <ReactPlayer
          url={url}
          className='react-player'
          onReady={() => __DEV && console.log('onReady')}
          onStart={() => __DEV && console.log('onStart')}
          onPlay={handlePlay}
          width='100%'
          height='100%'
          playing={playing}
          pip={pip}
          controls={controls}
          light={light}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onReady={() => __DEV && console.log('onReady')}
          onStart={() => __DEV && console.log('onStart')}
          onEnablePIP={handleEnablePIP}
          onDisablePIP={handleDisablePIP}
          onPause={handlePause}
          onBuffer={() => __DEV && console.log('onBuffer')}
          onSeek={e => __DEV && console.log('onSeek', e)}
          onEnded={handleEnded}
          onError={e => __DEV && console.log('onError', e)}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onNext={nextHandler}
          onPrevious={prevHandler}
        >

          <PlaybackControls
            isPlayable={true}
            isPlaying={false}
            hasPrevious={currentSong > 0}
            onPrevious={prevHandler}
            hasNext={currentSong < numSongs.length - 1}
            onNext={nextHandler}
          />

        </ReactPlayer> */}

      </div>
      <PremiumModalSection amount={props.amount} contentId={props.contentId} title={props.title} open={premiumModal} handleClose={handleClose} />
    </div>
  );

}

export default PlayVideoComponent;