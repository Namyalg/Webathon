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
          firebase.app(); // if already initialized, use that one
      }
      var database = firebase.database().ref('Link');
      var link = window.localStorage.getItem("Linktovideo");
      var name = window.localStorage.getItem("name");
      const storage = firebase.storage();
      var n = window.localStorage.getItem("Name");
      var k = window.localStorage.getItem("Key")
      //var firebaseOrdersCollection = database.ref().child('Questions');
       database.child(link).on('value',(snap)=>{
         //console.log(link);
         //console.log("My name is ");
         //console.log(window.localStorage.getItem("Name"));
         //console.log(window.localStorage.getItem("Key"));
    
         //console.log(snap.val());
         var l = snap.val();
         if(l.charAt(0) == "1"){
            var ytlink = snap.val();
            var h = ytlink.split("=");
            var final = h[h.length - 1];
            ytlink = final;
             //console.log("Yotube");
             var url = "https://www.youtube.com/embed/" + ytlink +"?autoplay=1";
             //console.log(url);
             document.getElementById("myFrame").src = url;
         }
         else if(l.charAt(0) == "2"){
            var url = snap.val();
            url = url.split("^");
            url = url[1];
            //console.log("Drive");
            document.getElementById("myFrame").src = url;
        }
        else{
            var file_url;
            //console.log("device");
            storage.ref(snap.val()).getDownloadURL()
            .then((url) => {
              //console.log(url);
              //console.log("insde");
              file_url = url;
                 document.getElementById("myFrame").src = file_url;
              //console.log(file_url);
                
          });
        }
        //console.log('chat stuff');
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