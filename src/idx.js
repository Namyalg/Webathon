function loadXMLDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var resp = JSON.parse(this.responseText);
        console.log(resp);
        console.log("here");
        xhttp.open("GET", `/.netlify/functions/fetch-api-keys`, true);
        xhttp.send();
        }
    }
}
loadXMLDoc();
    