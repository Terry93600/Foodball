Qu'est-ce qu'une base de données
*********************************

Une base de données c’est un ensemble de données stockées sur un support informatique organisées et structurées.

Pour pouvoir gérer et interagir avec cette base de données, il va falloir lui envoyer des messages que l’on appelle “requêtes”.

Il va aussi lui falloir un système permettant de gérer cette base (SGBD) et un langage pour transmettre les instructions (SQL : Structured Query Language).

Nous allons utiliser MySQL comme système SGBD (Système de Gestion de Base de Données).
La plupart des SGBD sont basés sur un modèle client-serveur. 
C'est-à-dire que la base de données se trouve sur un serveur.

Acronyme:
***************************************
MCD = Modèle Conceptuel de Données
Le modèle conceptuel de données nous permet de nous fournir un plan de notre base de données avant de la créer.
(Tout comme pour une maison : Avant de la construire, on établit un plan de construction).

SGBD = Systéme de Gestion de Base de Données
Le SGBD permet d'accueillir, d'exploiter et de faire fonctionner les bases de données (moteur).
Nous utiliserons Mysql (d'autres SGBD existe : Oracle, Sql Server, PostgreSQL, etc.).

BDD = Base De Données
La base de données représente l'emplacement des données sauvegardées

SQL = Structured Query Langage
Le langage de requête SQL nous permet d'échanger des informations avec la base de données
Une fois que les informations ont été enregistrées, il est important de pouvoir les gérer (ajout, modification, suppression, consultation).
Toutes ces actions de gestion et manipulation passeront par une requête SQL.

Etape de création d'un projet informatique
******************************************
- Receuil des besoins => création d'un cahier des charges
- Diagrammes et modélisations 
- Conception => définition des choix techniques (choix des langages, framework...)
- programmation
- test 
- Déploiement => mise en production

Dictionnaire de données
*****************************

Il permet de faire la liste de l’ensemble des données utilisées dans l’outil et de définir le type de 
données
Il peut être réalisé en parallèle du MCD

Modélisation d'une base de donnée
**********************************
Avant de créer une base de données, il est essentiel de se poser et de réfléchir sur la modélisation.
En effet, une base de données va servir de support à une application informatique (pas le droit à l'erreur).
Il faut donc faire un recueil des besoins précis : cahier des charges, interview, ancien système informatique et tout document permettant de bien cerner les besoins.
Toutes les informations receuillis vont servir à constituer le dictionnaire des données (voir exemple PDF dico).

La modélisation repose sur des concepts simples :

Entité : Objet du monde réel avec une existante indépendante
Association : lien logique entre entités => défini par un verbe et éventuellement des attributs
Un attribut : propriété d'une entité ou d'une association

La cardinalité est une notion OBLIGATOIRE du modèle qui permet de préciser l'association et d'imposer des contraintes comme par exemple obliger une commande à avoir au moins un produit commandé. Les choix des cardinalités sont discutables en fonction des besoins et du contexte. Les cardinalités permettent de connaitre le chiffre minimum et maximum d'enregistrement pour une relation.

Exemple : 

        {1,1}              {0,n}
Homme -------  Fils de  --------   Femme

Dans notre exemple, un homme est le fils d’une femme et d’une seule (minimum = 1, maximum = 1).
En revanche, une femme peut avoir plusieurs enfants ou aucun (minimum = 0, maximum = n).

Méthode MERISE (méthode d'analyse et de conception des bases de données => Méthode d'Etude et de Réalisation Pour Système d'Entreprise)
------------------------------------------------------------------------

Elle se décompose en 3 niveaux : 

- niveau conceptuel (MCD)
    C'est une représentation graphique et structurée des informations stockées en BDD. Il permet de définir les dépendances fonctionnelles*.
    Ce modèle est notamment destiné à éviter les redondances d'informations (voir PDF redondance)

    On trouve dans le MCD les entités (regroupement d'informations permettant de définir un objet ou un individu au sein du système d'information), les associations et les cardinalités.
    
    Nota : En ce qui concerne les associations, on leur donne souvent un nom de verbe ex : "acheter", "est facturé". 
    Les associations peuvent être porteuse de données ex : à l'association "est facturé" nous pourrions rajouter qté. 
    Pour qu'une association soit porteuse de données, il faut qu'elle soit dans une relation de type N,N.
    Une association peut être binaire (lien entre 2 entités) ou bien ternaire (lien entre 3 entités) ou encore réfléxive 
   
- niveau logique ou organisationnel (MLD)
    Le MLD ajoute au MCD la notion d'organisation. Le MLD indique donc comment les données seront organisées.
    C'est dans le niveau logique qu'on va ajouter les clefs étrangères, on les reliera alors par une flèche. 

    Pour les associations 1,N (CIF contrainte d'intégrités fonctionnelle), la clef du côté N de la relation devient clef étrangère du coté 1 de la relation, si cette relation avait des attributs, ils iront aussi du coté 1 de la relation. 

    Pour les associations N,N (CIM = contrainte d'intégrité multiple) une nouvelle association sera créer regroupant les clefs étrangères des entités associés ainsi que l'attribut de l'association

  
- niveau physique (MPD)
                              Conceptuel    logique         physique
    Dans le modèle physique, les entités > Relation > deviennent des tables
    Dans le modèle physique, les attributs > attributs > deviennent des champs
    Dans le modèle physique, les identifiants > clef primaire > deviennent des clef primaire

(voir pdf MLD-MPD)

Pour réaliser notre modélisation un outil : looping


Définition DF

Une donnée B dépend fonctionnellement (ou est en dépendance fonctionnelle) d’une donnée A lorsque la connaissance de la valeur de la donnée A nous permet la connaissance d’une et au maximum une seule valeur de la donnée B.
Par exemple :
La connaissance de la valeur d’un numéro de client nous permet de connaître sans ambiguïté la valeur d’un et d’un seul nom de client.
Dans la fiche d’adhérent, l’adhérent numéro 1 a pour nom Baptiste.

Formalisme
----------
Le formalisme de représentation d’une dépendance fonctionnelle est le suivant :
Numéro adhérent images/fleche.PNG (Nom adhérent, prénom, adresse, code postal, ville, téléphone, mail, date d’adhésion)
X détermine Y ou Y dépend fonctionnellement de X

Normalisation 
------------------
Le processus de normalisation est réalisé en étape et a pour objectif =>  une base de donnée avec une structure simple, stable avec un minimum de redondances... (normalisée)
On utilise surtout les 3 premières forme normal de normalisation (mais il en existe 8)

1ère forme normal : 
Elle possède une clef primaire (naturelle=>reférence, num sécu ou artificiel => numérotation autoincrémenté généré artificiellement on préfèrera l'artificiel) qui sert à identifier chaque ligne de façon unique et la valeur de chaque attribut est atomique (= indivisible, non décomposable exemple si nous avions dans un attribut : Salma Felouki cette valeur ne serait pas atomique parce qu'elle peux être divisé en 2 attributs : nom : felouki, prénom : salma, idem pour une adresse, pour être atomique il faudra la décomposer avec les attributs rue, ville, code postal ... pour respecter la 1FN)


2ème forme normal :
Nota : Elle concerne souvent que les tables dont la clef primaire est composée de plusieurs attributs. 
Elle est en 1FN et tous ses attributs non-cles dépendent complètement de la cle primaire (pas de dépendance partielle)

3ème forme normal : 
2ème forme normal et on n'y trouve aucune dépendance transitive entre les attributs non clef et la cle primaire

vidéo sur la normalisation
https://www.youtube.com/watch?v=HRMO_sn9sJM



Cas pratique
--------------
Conception d'un système de paie pour une PME, selon les instructions suivantes : 
- La saisie des informations dans l'outils sera réalisée par la secrétaire à l'exeption de la prime qu'elle ne pourra pas voir
- la saisie de la prime sera à faire par le dirigeant
- les fiches de paie seront généré par le dirigeant
- les salariés  pourront récupérer les fiches de paie dans un système de récupération distinct du système de paie
- la publication des fiches de paie se fera de manière automatique du système de paie vers l'espace salarié

UML : Diagramme des cas d'utilisations (diagramme UC use case)
------------------------------------
Quels sont les acteurs : 
La secrétaire
Le patron

Que vont-il pouvoir faire ? 
La secrétaire : 
- Gestion des salariés
- MAJ de la grille des salaires

Le patron :
-----------
- Saisie des primes
- Validation des bulletin de salaire

(voir le diagramme de cas d'utilisation réalisé sur https://gitmind.com/app/flowchart/cb43bd1e88f3d74a1a968661b08cc3dc)

Maquettage des différents écrans de  l'outil
---------------------
Voir les maquettes


