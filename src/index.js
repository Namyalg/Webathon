function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
}
var file_name;
function uploadFile() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {   
        var resp = JSON.parse(this.responseText);
        var firebaseConfig = {
          apiKey: resp.apiKey,
          authDomain : resp.authDomain,
          projectId : resp.projectId,
          databaseURL: resp.databaseURL,
          storageBucket : resp.storageBucket,
          messagingSenderId : resp.messagingSenderId,
          appId : resp.appId,
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }else {
            firebase.app(); // if already initialized, use that one
        }
        const storage = firebase.storage();
        var storageRef = firebase.storage().ref();
        // Get the file from DOM
        alert("The file upload might take a while, hang on till then :)");
        var file = document.getElementById("device").files[0];
        console.log(file);
        //dynamically set reference to the file name
        alert("on the way to upload");
        var thisRef = storageRef.child(file.name);
        file_name = file.name;
        //put request upload file to firebase storage
        thisRef.put(file).then(function(snapshot) {
            alert("File Uploaded");
        });
        }
    }
    xhttp.open("GET", `/.netlify/functions/fetch-api-keys`, true);
    xhttp.send();
  }

  function searchGenre() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {   
        var resp = JSON.parse(this.responseText);
        const YOUTUBE_API_KEY = resp.YoutubeKey;
        const getSearchTerm = document.getElementById("search").value;
        const Search = document.getElementById("search").value;
        //const YOUTUBE_API_KEY = "AIzaSyDPMD5omw8N_S0XmemMIdebJ1AgQ0R7XA0";
        //const YOUTUBE_API_KEY = "AIzaSyAfBswyF70BNHYTpln2FA1Lkiq3mbrbD2I";
        //url from YouTube docs modified for my random term and API key,
        //const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${getSearchTerm()}&key=${YOUTUBE_API_KEY}`;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${getSearchTerm}&key=${YOUTUBE_API_KEY}`;
        //fetch function following the aforementioned process
        //const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${Search}&key=${YOUTUBE_API_KEY}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
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
        });
        document.getElementById("search").value = "";  
      }
    }
    xhttp.open("GET", `/.netlify/functions/fetch-api-keys`, true);
    xhttp.send();
  }

function saveroom() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {   
        var resp = JSON.parse(this.responseText);
        var firebaseConfig = {
          apiKey: resp.apiKey,
          authDomain : resp.authDomain,
          projectId : resp.projectId,
          databaseURL: resp.databaseURL,
          storageBucket : resp.storageBucket,
          messagingSenderId : resp.messagingSenderId,
          appId : resp.appId,
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }else {
            firebase.app(); // if already initialized, use that one
        }
        
        var roomkey, ytlink;
        //var file_name;
        var database = firebase.database().ref('Link');
        roomkey = getRandomString(10);
        //alert(keyo);
        //document.getElementById("device").value;
        //document.getElementById("name").value;
        alert("A room key will be provided, use this to enter your theatre!!");
        alert(roomkey);
        //console.log(keyo);
        if (document.getElementById("link").value.length == 0 && document.getElementById("drive").value.length == 0){
            console.log("uploadingfle");
            console.log(file_name);
            database.child(roomkey).set(file_name);
            
        }
        else if(document.getElementById("device").value.length == 0 && document.getElementById("drive").value.length == 0){
                ytlink = document.getElementById("link").value;
                ytlink = "1^" + ytlink;
                alert("setting link in fb");
                database.child(roomkey).set(ytlink);   
            }
        else{
            ytlink = document.getElementById("drive").value;
            ytlink = "2^" + ytlink;
            database.child(roomkey).set(ytlink);
        }
        document.getElementById("device").value = "";
        document.getElementById("drive").value = "";
        document.getElementById("link").value = "";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
      }    
    }
    xhttp.open("GET", `/.netlify/functions/fetch-api-keys`, true);
    xhttp.send();
}


function sendtoroom(){
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
