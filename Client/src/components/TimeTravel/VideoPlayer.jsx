
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronDown, ChevronUp } from "react-feather"; // Import icons as needed
import "./VideoPlayer.css"; // Import CSS file

const videos = [
  { 
    title: "Why math is important?", 
    src: "/videos/video1.mp4", 
    description: "Math is a crucial part of our everyday lives, and it plays an essential role in shaping the world around us. In this video, we'll explore the significance of math in various fields like technology, science, engineering, and even economics, and why developing strong math skills is vital.", 
    thumbnail: "/thumbnails/important.jpg" 
  },
  { 
    title: "Why do people get so anxious about maths?", 
    src: "/videos/video2.mp4", 
    description: "Many people experience math anxiety, which can hinder their ability to learn. In this video, we delve into the reasons behind this fear and provide practical strategies for overcoming math anxiety to build confidence and improve performance in math.", 
    thumbnail: "/thumbnails/anxious.jpg" 
  },
  { 
    title: "What is π and its uses?", 
    src: "/videos/video3.mp4", 
    description: "π, or pi, is a mathematical constant that represents the ratio of a circle's circumference to its diameter. In this video, we'll dive into the history and significance of π, how it’s used in various fields like geometry, trigonometry, and engineering, and its practical applications in the real world.", 
    thumbnail: "/thumbnails/pie.jpg" 
  },
  { 
    title: "Application of Trignometry", 
    src: "/videos/video4.mp4", 
    description: "", 
    thumbnail: "/thumbnails/trigo.jpg" 
  },
  { 
    title: "Applications of lines and angles", 
    src: "/videos/video5.mp4", 
    description: "Trigonometry is the branch of mathematics that deals with the relationships between the sides and angles of triangles. This video will introduce you to key concepts like sine, cosine, and tangent, and demonstrate how they are used to solve problems in geometry, physics, engineering, and even in real-world scenarios like navigation and architecture. We’ll also explore the unit circle, trigonometric identities, and applications of trigonometry in various fields.", 
    thumbnail: "/thumbnails/lines.jpg" 
  },
  { 
    title: "Laws of motion", 
    src: "/videos/video6.mp4", 
    description: "Newton’s Laws of Motion are fundamental principles that describe how objects move. This video will guide you through each law and its real-life applications, from the motion of everyday objects to the behavior of planets in space, helping you understand the forces at play in the universe.", 
    thumbnail: "/thumbnails/motion.jpg" 
  },
  { 
    title: "Application of Pythagoras theorem", 
    src: "/videos/video7.mp4", 
    description: "The Pythagorean Theorem is a key concept in geometry that defines the relationship between the sides of a right-angled triangle. This video will explore how to apply the theorem to solve problems in various fields such as architecture, engineering, and navigation.", 
    thumbnail: "/thumbnails/pythagoras.jpg" 
  },
  { 
    title: "Application of Heron's formula", 
    src: "/videos/video8.mp4", 
    description: "Heron's formula is a method used to calculate the area of a triangle when you know the lengths of all three sides. In this video, we’ll demonstrate how to apply Heron's formula and show its practical uses in real-world scenarios like construction and land surveying.", 
    thumbnail: "/thumbnails/herons.jpg" 
  },
  { 
    title: "Shapes", 
    src: "/videos/video9.mp4", 
    description: "Shapes are everywhere around us, and understanding their properties is essential for solving many geometric problems. In this video, we’ll explore the different types of shapes, their properties, and how to calculate their area and perimeter, along with their real-world applications.", 
    thumbnail: "/thumbnails/shapes.jpg" 
  },
  { 
    title: "Calculus", 
    src: "/videos/video10.mp4", 
    description: "Calculus is the branch of mathematics that studies change. This video will introduce you to the fundamental concepts of calculus, including limits, derivatives, and integrals, and demonstrate how they are applied in fields like physics, engineering, and economics to model and solve real-world problems.", 
    thumbnail: "/thumbnails/calculus.jpg" 
  }
];

const VideoPlayer = () => {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  // Update progress bar as the video plays
  const handleTimeUpdate = () => {
    const progressPercentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progressPercentage);
  };

  // Handle user interaction with the progress bar
  const handleProgressClick = (event) => {
    const newTime = (event.nativeEvent.offsetX / progressBarRef.current.offsetWidth) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  // Toggle play and pause
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Handle volume change
  const handleVolumeChange = (event) => {
    videoRef.current.volume = event.target.value;
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Change playback speed
  const changePlaybackSpeed = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  return (
    <div className="main-container">
      <div className="video-player-container">
        {/* Main Video Player */}
        <video ref={videoRef} src={currentVideo.src} className="video" />

        {/* Progress Bar */}
        <div className="progress-bar-container" onClick={handleProgressClick}>
          <div
            className="progress-bar"
            ref={progressBarRef}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* Controls */}
        <div className="controls">
          <button onClick={togglePlay} className="control-btn">
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button onClick={toggleMute} className="control-btn">
            {isMuted ? <VolumeX /> : <Volume2 />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            onChange={handleVolumeChange}
            className="volume-slider"
          />
          <button onClick={handleFullscreen} className="control-btn">
            <Maximize />
          </button>

          {/* Playback Speed */}
          <div className="playback-speed">
        <select onChange={(e) => changePlaybackSpeed(Number(e.target.value))} value={playbackRate} className="speed-dropdown">
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
          <option value="2.5">2.5x</option>
          <option value="3">3x</option>
        </select>
</div>

        </div>

        

        {/* Video Title & Description Toggle */}
        <div className="video-info">
          <h2>{currentVideo.title}</h2>
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="toggle-desc-btn"
          >
            {showDescription ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>

        {/* Video Description */}
        {showDescription && (
          <div className="video-description">
            <p>{currentVideo.description}</p>
          </div>
        )}

        {/* Video List */}
        <div className="video-list">
          {videos.map((video, index) => (
            <button
              key={index}
              className={`video-btn ${currentVideo.src === video.src ? "active" : ""}`}
              onClick={() => {
                setCurrentVideo(video);
                setShowDescription(false);
                setProgress(0); // Reset progress bar when changing video
              }}
            >
              <video src={video.src} className="videoSmall" muted poster={video.thumbnail}/>
              <p className="video-title">{video.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
