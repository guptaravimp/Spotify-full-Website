console.log("this is javacsript ")
function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
      return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
async function getsongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/")
  let response = await a.text();
  console.log(response);
  let div = document.createElement("div")
  div.innerHTML = response;
  let as = div.getElementsByTagName("a")
  console.log(as)
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1])
    }
  }
  return songs;

}
const playmusic=(track,pause=false)=>{
  currentsong.src="/songs/"+track
  // let audio=new Audio("/songs/"+track)
  if(!pause){
    currentsong.play();
    play.src="play1.svg"
  }
  
  document.querySelector(".songinfo").innerHTML=decodeURI(track);
  document.querySelector(".songtime").innerHTML="00:00/00:00"

}
let currentsong=new Audio();
async function main() {
  // get the list of all song 
  
  let songs = await getsongs();
  playmusic(songs[0],true)
  console.log(songs);
  let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
  for (const song of songs) {
    songul.innerHTML = songul.innerHTML + `<li>
  
              <img class="invert" src="music.svg" alt="">
              <div class="info">
                <div class="songname">${song.replaceAll("%20", " ")} </div>
                <div class="songartist">Ravi gupta</div>
              </div>
              <div class="playnow">
                
                <img class="invert" src="play.svg" alt="">
              </div>
  </li>`;

  }
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playmusic(e.querySelector(".info").firstElementChild.innerHTML);
    })
   
  })

  play.addEventListener("click",()=>{
    if(currentsong.paused){
      currentsong.play()
      play.src="play1.svg"
     
    }
    else{
      currentsong.pause();
      play.src="pause.svg"
    }
  })


     currentsong.addEventListener("timeupdate",()=>{
      console.log(currentsong.currentTime,currentsong.duration);
      document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`;
      document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%";
     })
     document.querySelector(".seekbar").addEventListener("click",e=>{
      
      document.querySelector(".circle").style.left=(e.offsetX/e.target.getBoundingClientRect().width)*100+"%";
      currentsong.currentTime=((currentsong.duration)*(e.offsetX/e.target.getBoundingClientRect().width)*100)/100;
     })
  // //play audio
  // var audio = new Audio(songs[0]);
  // // audio.play();

  // audio.addEventListener("loadeddata", () => {
  //   console.log(audio.duration, audio.currentSrc, audio.currentTime)
  // });
}
main();