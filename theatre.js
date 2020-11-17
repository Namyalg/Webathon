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
  var link = window.localStorage.getItem("Linktovideo");
  var name = window.localStorage.getItem("name");
  const storage = firebase.storage();
  var n = window.localStorage.getItem("Name");
  var k = window.localStorage.getItem("Key")
  //var firebaseOrdersCollection = database.ref().child('Questions');
   database.child(link).on('value',(snap)=>{
     console.log(link);
     console.log("My name is ");
     console.log(window.localStorage.getItem("Name"));
     console.log(window.localStorage.getItem("Key"));

     console.log(snap.val());
     var l = snap.val();
     if(l.charAt(0) == "1"){
        var ytlink = snap.val();
        var h = ytlink.split("=");
        var final = h[h.length - 1];
        ytlink = final;
         console.log("Yotube");
         var url = "https://www.youtube.com/embed/" + ytlink +"?autoplay=1";
         console.log(url);
         document.getElementById("myFrame").src = url;
     }
     else if(l.charAt(0) == "2"){
        var url = snap.val();
        url = url.split("^");
        url = url[1];
        console.log("Drive");
        document.getElementById("myFrame").src = url;
    }
    else{
        var file_url;
        console.log("devide");
        storage.ref(snap.val()).getDownloadURL()
        .then((url) => {
          //console.log(url);
          //console.log("insde");
          file_url = url;
             document.getElementById("myFrame").src = file_url;
          console.log(file_url);
            
      });
    }
    //console.log('chat stuff');
    console.log("https://chat-at-remo.herokuapp.com/?key=" + k +"&name=" + n);
    document.getElementById("chatit").src = "https://chat-at-remo.herokuapp.com/?key=" + k +"&name=" + n;
  });
 
  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }