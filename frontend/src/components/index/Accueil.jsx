import "./accueil.css";
import ailier from "../../assets/image index/ailier.jpg";
import but from "../../assets/image index/but.jpg";
import centre from "../../assets/image index/centre.jpg";
import echec from "../../assets/image index/echec.jpg";
import equipe from "../../assets/image index/equipe.jpg";
import tactique from "../../assets/image index/tactique.jpg";
import vestiaire from "../../assets/image index/vestiaire.jpg";
import placement from "../../assets/image index/placement.jpg";
import win from "../../assets/image index/win.jpg";
import inscription from "../../assets/resto/inscription.jpg";
import client from "../../assets/humains/pexels-elif-tekkaya-5616321.jpg";
import React, { useEffect } from "react";
import PageIndex from "../../assets/pageIndex.jpg";
const Accueil = () => {

  useEffect(() => {
    // Animation au défilement (code existant)
    const handleScroll = () => {
      const articles = document.querySelectorAll("#index > section > section > article");
      
      articles.forEach((article) => {
        const articleTop = article.getBoundingClientRect().top;
        const articleBottom = article.getBoundingClientRect().bottom;
        
        if (articleTop < window.innerHeight && articleBottom > 0) {
          article.classList.add("visible");
        } else {
          article.classList.remove("visible");
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Simulation de chargement pour améliorer la perception de vitesse
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    return <>
        
        <main id="index">
            <figure>
                <img src={PageIndex} alt="" />
            </figure>

            <article id="a-propos">
                <h2>A propos</h2>
                <p>Foodball est une application qui permet de rechercher des restaurants diffusant les matchs de football en direct. Que vous souhaitiez soutenir votre équipe préférée ou simplement profiter de l'ambiance sportive, Foodball vous permet de localiser rapidement les restaurants à proximité qui diffusent les matchs que vous souhaitez regarder.
                </p>
            </article>

            <section >
                <h2>Alors comme trouvrer le chemin du filet ?</h2>
                <p>Il y aura 2 moyen de trouver le chemin du filet, si vous êtes plutôt une personne qui préfère être sur le terrain prenez le chemin de le role <span>client</span>  mais si vous êtes plutôt stratège prenais le role des <span>restaurateur</span></p>

                    <h2>Client</h2>

                <section>
                    <article>
                        <p>Il faut tous d'abors commencée à attaquer avec votre ailié qui se trouve en haut à droite qui fait un appel en profondeur, il se nomme RESTAURANTS</p>
                        <figure>
                            <img src={ailier} alt="" />
                        </figure>
                    </article>
                    <article>
                        <p>Vous avez le sens du but vous vous placez dans la surface en fonction du restaurant que vous avez en face de vous.</p>
                        <figure>
                            <img src={placement} alt="" />
                        </figure>
                    </article>
                    <article>
                        <p>Votre ailier vous fait un centre !!! vous vous préparer à gagnez votre duel aérien en remplissant un formulaire.</p>
                        <figure>
                            <img src={centre} alt="" />
                        </figure>
                    </article>
                    <article>
                        <p>Vous arrivez à toucher le ballon de la tête, vous prenez le gardien à contre pied et c'est le BUT !!! pour célébrer le but vous gardez le mail qu'on vous à envoyez pour le présentez au restaurant que vous avez choisit.</p>
                        <figure>
                            <img src={win} alt="" />
                        </figure>
                    </article>
                </section>

                    <h2>Restaurateur</h2>

                
                <section>
                    <article>
                        <p>
                            Votre équipe est manque de victoire vous décidez de changer de tactique en cliquant sur le bouton CONNEXION
                        </p>
                        <figure>
                            <img src={echec} alt="" />
                        </figure>
                    </article>
                    <article>
                        <p>
                            Vous décidez d'expliquez au joueur de votre nouvelle tactique de jeu, vous allez en format INSCRIPTION, c'est une formtion plutot sur axés sur la défense. Vous remplissez le formulaire.
                        </p>
                        <figure>
                            <img src={equipe} alt="" />
                        </figure>
                    </article>
                    <article>
                        <p>
                            Une fois cette formtion appliquer, vous voulez partir en contre-attque avec un formation qui ce nomme CONNEXION
                        </p>
                        <figure>
                            <img src={tactique} alt="" />
                        </figure>
                    </article>
                    <article>
                        <p>
                            C'est le jour de match vous expliquez vos tactiques a vos joueurs pour la dernière fois en remplissant toutes les informations du formulaire. ils ENREGISTRENT chaques informations avant de sortir du vestiare et LE MATCHE COMMENCE !!!
                        </p>
                        <figure>
                            <img src={vestiaire} alt="" />
                        </figure>
                    </article>
                    
                </section>
                
            </section>
        </main>
    </>
}


export default Accueil;
