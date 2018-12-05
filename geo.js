/** Récupération des objets de geoloc.php */
var map = L.map('mapid', {
    center: [48.841329,2.587972],
    zoom: 15
});


var inventaire = document.getElementById('img');

/** Les icons apparaissent seulement au niveau 13 de zoom */

map.on('zoomend', function() {
    if (map.getZoom() <13){
            map.removeLayer(lay);
    }   
    else{
        map.addLayer(lay);
    }
    
});





/** Ajout de la carte */

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/** Creation d'un groupe de couches et ajout à la carte*/
var lay = L.featureGroup().addTo(map);

/** Création de l'icon clé */
var ICle = L.icon({
    iconUrl: 'icon/SkeletonKey.png',
    iconSize: [60, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
/** Création de l'icon coffre */
var ICoffre = L.icon({
    iconUrl: 'icon/coffre.jpg',
    iconSize: [30, 30],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
/** Création de l'icon de l'indice binaire */

var Ibinaire = L.icon({ 
    iconUrl: 'icon/binaire.png', 
    iconSize: [98, 105],
    iconAnchor: [96, 100],
    popupAnchor: [-3, -76],
    
});

/** Création de l'icon personne */

var IPersonne = L.icon({ 
    iconUrl: 'icon/personne.png', 
    iconSize: [98, 105],
    iconAnchor: [96, 100],
    popupAnchor: [-3, -76],
    
});

/** Création de l'icon personne retrouvé */

var IGagne = L.icon({ 
    iconUrl: 'icon/gagne.png', 
    iconSize: [98, 105],
    iconAnchor: [96, 100],
    popupAnchor: [-3, -76],
    
});

/** Création de l'icon du digicode */

var IDigi = L.icon({ 
    iconUrl: 'icon/picto-coffre-fort.png', 
    iconSize: [98, 105],
    iconAnchor: [96, 100],
    popupAnchor: [-3, -76],
    
});

/** Icon Aeroport */
var IAeroport = L.icon({ 
    iconUrl: 'icon/aeroport.jpg', 
    iconSize: [100, 100],
    iconAnchor: [100, 130],
    popupAnchor: [-3, -76],
    
});

/** Icon Mtp */
var IMtp = L.icon({ 
    iconUrl: 'icon/mtp.png', 
    iconSize: [100, 100],
    iconAnchor: [100, 130],
    popupAnchor: [-3, -76],
    
});
/** Identifiant quand on a finis le jeu */

function show_prompt() {
    var name = prompt('Please enter your name');
    if (name != null && name != "") {
        return name;
    }
    else{
        alert('entrez un nom de joueur valide'),
        show_prompt();
    }
    
}


/** Requette Ajax */

var ajax = new XMLHttpRequest();    
ajax.open('POST', 'BDDphp.php',true);
ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

ajax.responseType = 'json';
ajax.send('type=objets');
/** fonction ajax lors du chargement */
ajax.onload = function() {
    

    /** réponse ajax */
    var l = ajax.response;
    /** création des principaux markers */
    var cle = L.marker(([l[0].lat, l[0].long]),{icon: ICle});
    var coffre = L.marker(([l[1].lat, l[1].long]),{icon: ICoffre});
    var binaire = L.marker([l[6].lat,  l[6].long], {icon: Ibinaire}).bindPopup("Un peu de calcul :p ");
    var digicode = L.marker([l[2].lat, l[2].long],{icon: IDigi}).bindPopup("Vous avez besoin d'un code pour débloquer cet indice, Dirigez vous à Montmartre, endroit préferé de Vincent<img src='icon/emoji.jpg' height='10' width='10'>, <object type= 'text/html' data='Digicode/Digicode.html' height= '300' width= '300'> ");
    var debut = L.marker([l[4].lat, l[4].long],{icon: IPersonne}).bindPopup("<object type= 'text/html' data='affichage.html' height= '200' width= '200'> ");
    var mtp = L.marker([l[5].lat, l[5].long], {icon: IMtp}).bindPopup("Je sais où est parti Vincent,Glissez la souris pour trouver les coordonnées de la ville où habite ses parents<object type='text/html' data='Meknes.html' > ");
    var meknes = L.marker([l[3].lat, l[3].long],{icon: IGagne}).bindPopup("<object type= 'text/html' data='gagne.html' height= '200' width= '200'> ");
    var indicecle = L.marker([l[7].lat, l[7].long],{icon: IAeroport});
    
    lay.addLayer(cle);
    lay.addLayer(coffre);
    lay.addLayer(digicode);
    lay.addLayer(debut);
    lay.addLayer(mtp);
    lay.addLayer(meknes);

    
       
    /**click sur la cle */
    cle.on('click', function() { 
        /** Enleve la cle de la carte */
        cle.remove();
        /** Ajoute la cle à l'inventaire */
        inventaire.innerHTML = "<img src="+"icon/SkeletonKey.png"+" id='cle' alt= 'cle'></img>";
        /**récupère la div cle */
        imagecle = document.getElementById('cle');
        /** On affiche un indice */
        lay.addLayer(indicecle);
       
        


    });
    /** click sur le coffre */
    coffre.on('click',function(){
        /** on ouvre le coffre uniquement si on a la cle dans s'inventaire*/
        if(imagecle != null){
            /** on enleve le coffre */
            coffre.remove();
            /** on enleve la cle de l'inventaire */
            imagecle.style.display = 'none';
            /** On affiche l'indice */
            lay.addLayer(binaire);
      
    
      
       
  
            
    
        }        
    });
    /** click sur vincent à meknes */
    meknes.on('click',function(){
        /** on récupère le nom du joueur */
        var joueur = show_prompt();
        console.log(joueur);
        /** Ajout du score à la base de donnée */
        var aja = new XMLHttpRequest();    
        aja.open('POST', 'BDDPhp.php');
        aja.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        console.log(sec);
        aja.send('type=Ajoutscore&scores='+sec+'&'+'joueur='+joueur);
        /** vous avez gagner + votre score + redirection vers la page des scores */
        setTimeout(function(){ 
                alert("Vous avez gagner!! votre score est de "+sec+" secondes");
                document.location="scores.php";
            
            }, 5000);
    })
        

}

/** On perd si on met plus de 15min à finir le jeu... */
setTimeout(function () {
    document.location.href="perdu.php";;
}, 900000);


/** score */
var sec = 0;
function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
    $("#seconds").html(pad(++sec%60));
    $("#minutes").html(pad(parseInt(sec/60,10)));
}, 1000);

















