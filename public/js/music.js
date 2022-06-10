// MUSIC PLAYER

//open music player button
function openCloseMusicPlayer() {
  let m = document.getElementsByClassName("spotify-embeds")[0];
  if (m.style.display == "flex") {
    m.style.display = "none";
  } else {
    m.style.display = "flex";
  }
}
