<?php
/** connection à la base de donnée postgresql */
$dbconn = pg_connect("host=localhost port=5433 dbname=jeuweb user=postgres password=postgres") or die('Connexion impossible : ' . pg_last_error());

/** récupération des objets de la table objets */
if($_POST['type']=='objets'){ 
    $query = "SELECT * FROM objets ORDER BY id";
    $result = pg_query($query) or die('Échec de la requête : ' . pg_last_error());

    $obj = [];
    while ($ligne = pg_fetch_assoc($result)){
        $obj[] = $ligne;
    
    }
    echo json_encode($obj);

}
/** ajout du score dans la base de donnée */

if($_POST['type']=='Ajoutscore'){

    $score =(int)$_POST['scores'];
    $nom=$_POST['joueur'];


    $q = "INSERT INTO scores VALUES ('$nom','$score') ";
    $result = pg_query($dbconn,$q) or die('Échec de la requête : ' . pg_last_error());

/** si on veut tester l'ajout bdd (mettre un console.log(ajax.response dans le fichier geo.js)*/
    if($result){
        echo json_encode("Data Inserted Successfully");
    }
    else {
        echo json_encode('problem');
    }

}

/** récupération des scores pour l'afficher dans la page des scores */
if($_POST['type']=='getScore'){
    $query = "SELECT * FROM scores ORDER BY score";
    $result = pg_query($query) or die('Échec de la requête : ' . pg_last_error());

    $obj = [];
    while ($ligne = pg_fetch_assoc($result)){

        $obj[] = $ligne;
    
    }

    echo json_encode($obj);

}






?>