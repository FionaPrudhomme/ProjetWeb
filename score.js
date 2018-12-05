var score = document.getElementById('score');

var ajax = new XMLHttpRequest();    
ajax.open('POST', 'BDDPhp.php',true);
ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

ajax.responseType = 'json';
ajax.send('type=getScore');
ajax.onload = function() {
    var l = ajax.response;
  
    for(i=0;i<l.length;i++){
        score.innerHTML += "<tr> <td>"+l[i].joueur+" </td><td>"+l[i].score+" </td></tr>";

    }
}