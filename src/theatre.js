
var link = window.localStorage.getItem("Linktovideo");
var name = window.localStorage.getItem("name");
function settheatre() {
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
          firebase.app();
      }
      var database = firebase.database().ref('Link');
      var link = window.localStorage.getItem("Linktovideo");
      var name = window.localStorage.getItem("name");
      const storage = firebase.storage();
      var n = window.localStorage.getItem("Name");
      var k = window.localStorage.getItem("Key")
       database.child(link).on('value',(snap)=>{
         var l = snap.val();
         if(l.charAt(0) == "1"){
            var ytlink = snap.val();
            var h = ytlink.split("=");
            var final = h[h.length - 1];
            ytlink = final;
             var url = "https://www.youtube.com/embed/" + ytlink +"?autoplay=1";
             document.getElementById("myFrame").src = url;
         }
         else if(l.charAt(0) == "2"){
            var url = snap.val();
            url = url.split("^");
            url = url[1];
            document.getElementById("myFrame").src = url;
        }
        else{
            var file_url;
            storage.ref(snap.val()).getDownloadURL()
            .then((url) => {
              file_url = url;
                 document.getElementById("myFrame").src = file_url;       
          });
        }
        console.log("https://chat-at-remo.herokuapp.com/?key=" + k +"&name=" + n);
        document.getElementById("chatit").src = "https://chat-at-remo.herokuapp.com/?key=" + k +"&name=" + n;
      });
    }    
  }
  xhttp.open("GET", `/.netlify/functions/fetch-api-keys`, true);
  xhttp.send();
}
settheatre();
  
  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
