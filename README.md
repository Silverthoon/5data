**

# Documentation Technique 5DATA

## Avant de lire ce document technique, veuillez lire attentivement les documents suivants

- Projet_de_5DATA.pdf
- Manifest_projet.ipynb


## **Prérequis**

Pour la mise ne place de l'architecture et le l'exécution des divers scripts, assurez-vous d'avoir une version à jour de docker ainsi que de nodejs.
N'hesitez pas à suivre la procédure d'intallation de docker sur leur site officiel et pour installer nodejs exécutez dans votre terminal la commande suivante:
**sudo apt-get install nodejs -y**

Installez ensuite docker-compose avec la commande suivante **sudo apt install docker-compose**

Il faudra aussi installer npm avec la commande suivante: **sudo apt-get install npm**

Pour la génération des données le module "Faker" est obligatoire. Pour l'ajouter exécuter: **npm i faker**

## **Géneration des données**

Vous pouvez génerez les données à partir du script se trouvant dans le chemin suivant /data/data.js
en exécutant à la racine du projet **node ./data/data.js <nombre de données à générer>** .

Une fois les deux fichiers json générés, veuillez les déplacez dans le dossier **./services/mongo-cluster/samples**

## **Deploiement des services**

Tout d'abord initier un docker swarm avec votre machine en tant que Master avec la commande suivante:

**docker swarm init --advertise-addr 127.0.0.1**

Créer un réseau bridge  avec pour nom **supinfo**, et un autre réseau en overlay appelé **5data-overlay**
	
- docker network create supinfo --driver bridge 
- docker network create 5data-overlay --driver overlay

   
	Services Mongo

Rendez-vous ensuite dans le dossier **./services/mongo-cluster** et lancer la commande suivante afin de deployer le service mongodb
        - *docker-compose -f mongo.yml up -d*
Tester la disponibilité de votre service en vous rendant sur http://localhost:8000
		
    Services Spark
Afin de deployer les services spark , vous devez lancer le build de l'image suivi du deploiement des différents services.
Rendez-vous dans le dossier **./services/spark-cluster** et lancer les commandes suivantes au fur et à mesure:
- docker build -t cluster-apache-spark:3.0.2 . 
- docker-compose up -d

Une fois les services master et worker de spark sont démarrés, vous pouvez vous rendre sur l'url suivante afin d'avoir un aperçu des processus exécuté http://localhost:9090

    Test du service spark

Rendez-vous dans votre editeur de code, puis lancer le main.py, une fois l'exécution terminé, vous aurez une nouvelle base de données sur l'interface mongo avec une collection contenant le résultat des calculs.

	Services mongochart
Pour deployér votre service mongochart, suivez intégralement le tutoriel sur ce lien https://docs.mongodb.com/charts/current/installation/
 N'oubliez pas de remplacer  le docker stack par celui-ci 
 **docker stack deploy -c chart.yml mongodb-charts**



