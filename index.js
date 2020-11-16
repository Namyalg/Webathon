// Your web app's Firebase configuration
function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
var keyo, ytlink;
var file_name;
var firebaseConfig = {
    apiKey: "AIzaSyDq1GV2WLn6OPG-tqRxdx2Fuc6TFoXjTxM",
    authDomain: "streaming-aas.firebaseapp.com",
    databaseURL: "https://streaming-aas.firebaseio.com",
    projectId: "streaming-aas",
    storageBucket: "streaming-aas.appspot.com",
    messagingSenderId: "236357322940",
    appId: "1:236357322940:web:160c3bc4050e9f7cbe68b9"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database().ref('Link');
  function saveroom(){
    keyo = getRandomString(10);
    //alert(keyo);
    //document.getElementById("device").value;
    //document.getElementById("name").value;
    alert(keyo);
    console.log(keyo);
    sendkey(keyo);
    if (document.getElementById("link").value.length == 0 && document.getElementById("drive").value.length == 0){
        console.log(file_name);
        database.child(keyo).set(file_name);
    }
    else if(document.getElementById("device").value.length == 0 && document.getElementById("drive").value.length == 0){
            ytlink = document.getElementById("link").value;
            //var h = ytlink.split("=");
            //var final = h[h.length - 1];
            ytlink = "1^" + ytlink;
            database.child(keyo).set(ytlink);
        }
    else{
        ytlink = document.getElementById("drive").value;
        ytlink = "2^" + ytlink;
        database.child(keyo).set(ytlink);
    }
        alert("Your key is " + keyo + "\n" + "You will receive an email !");
        document.getElementById("link").value = "";
        document.getElementById("device").value = "";
        document.getElementById("name").value = "";
  } 

  //var firebaseOrdersCollection = database.ref().child('Questions');
   
  /*database.child("abcde").on('value',(snap)=>{
    var url = "https://www.youtube.com/embed/" + snap.val() +"?autoplay=1&mute=1"
    console.log(url);
    document.getElementById("myFrame").src = url;
  });
*/
function gotoroom(){
    //window.localStorage.setItem("ytlink", ytlink);
    //console.log(localStorage.getItem("ytlink"));
    var name = document.getElementById("name-ag").value;
    var fire = firebase.database().ref('Link');
    var val = document.getElementById("your-key").value;
    window.localStorage.setItem("Name" , name);
    window.localStorage.setItem("Key" , val);
    console.log(val);
    alert(name);
    alert(val);
    fire.on("value", gotData);
    function gotData(data) {
        data = data.val();
        //console.log(data);
        let keys = Object.keys(data);
        console.log(keys);
        console.log(keys.length);
        var present = keys.includes(val);
        console.log(present);
        //window.location.href = "why.html";
        if (present == true) {
            window.localStorage.setItem("Linktovideo", val);
            window.localStorage.setItem("name", name);
            //url = "theatre.html?key=" + val + "&name=" + name;
            console.log(url);
            console.log(present);
            //window.location.replace(url);
        } else {
            alert("Stay Calm And Enter The Correct Key, Mind the spaces😁!");
            document.getElementById("name-ag").value = "";
            document.getElementById("your-key").value = "";
        }
        
    }
    return false;
}

function printfd(){
    console.log("HELLLL");
    var name = document.getElementById("name-ag").value;
    //var fire = firebase.database().ref('Link');
    var val = document.getElementById("your-key").value;
    window.localStorage.setItem("Name" , name);
    window.localStorage.setItem("Key" , val);
    console.log(val);
    window.localStorage.setItem("Linktovideo", val);
    window.localStorage.setItem("name", name);
    window.location.href = "theatre.html?key=" + val + "&name=" + name;
    return false;
}
function sendkey(key) {
    console.log("sending");
    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    Email.send({

        Host: "smtp.gmail.com",
        Username: "vstream342@gmail.com",
        Password: "vstream123$",
        To: email,
        From: "vstream342@gmail.com",
        Subject: "VStream Confirmation",
        Body: "Hey " + name + "<br>" + "Your key is " + key ,
    })
}

function searchit(){
    //const getSearchTerm = () => searchTerms[Math.floor(Math.random() * (searchTerms.length-1))];
const getSearchTerm = document.getElementById("search").value;
    const Search = document.getElementById("search").value;
const YOUTUBE_API_KEY = "AIzaSyDPMD5omw8N_S0XmemMIdebJ1AgQ0R7XA0";
//url from YouTube docs modified for my random term and API key,
//const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${getSearchTerm()}&key=${YOUTUBE_API_KEY}`;
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${getSearchTerm}&key=${YOUTUBE_API_KEY}`;
//fetch function following the aforementioned process
//const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${Search}&key=${YOUTUBE_API_KEY}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
            for(var i = 1; i <= 20; i++){
                if(data.items[i].id.videoId != undefined){
                    //console.log( document.getElementById(i).href);
                    console.log(data.items[i]);
                    console.log(data.items[i].snippet.thumbnails.medium.url);
                    document.getElementById(i*100).src = data.items[i].snippet.thumbnails.medium.url;
                    document.getElementById(i).href = "https://www.youtube.com/watch?v=" + data.items[i].id.videoId;
                    document.getElementById(i*10).innerHTML = "https://www.youtube.com/watch?v=" + data.items[i].id.videoId;
                    console.log(data.items[i].id.videoId);
            }
    }
    //console.log above is to help access proper data in the JSON
    //object
    //set iframe source to proper URL (notice same dynamic strings 
    //used above)
    //document.getElementById("video").src = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
});
document.getElementById("search").value = "";     
}

const storage = firebase.storage();
function uploadFile(){ 
  // Created a Storage Reference with root dir
  var storageRef = firebase.storage().ref();
  // Get the file from DOM
  alert("The file upload might take a while, hang on till then :)");
  var file = document.getElementById("device").files[0];
  console.log(file);
  //dynamically set reference to the file name
  var thisRef = storageRef.child(file.name);
  file_name = file.name;
  //put request upload file to firebase storage
  thisRef.put(file).then(function(snapshot) {
     alert("File Uploaded");
     //console.log('Uploaded a blob or file!');
  });
}