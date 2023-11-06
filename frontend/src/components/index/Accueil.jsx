import "./accueil.css"
import burger from '../../assets/repas/burger.png'
import indien from '../../assets/repas/indien.jpg'

const Accueil = () => {
    return <>
        
        <main>
            <section id="carrou">
                <figure>
                    <img src="https://medias.paris2024.org/uploads/2022/09/Opera-ephemere-au-Trocadero-2-Avec-mention.jpg?x-oss-process=image/resize,w_1200,h_675,m_lfit/format,jpeg" alt="" />
                </figure>
            </section>

            <article id="a-propos">
                <h2>A propos</h2>
                <p>Foodball est une application qui permet de rechercher des restaurants diffusant les matchs de football en direct. Que vous souhaitiez soutenir votre équipe préférée ou simplement profiter de l'ambiance sportive, Foodball vous permet de localiser rapidement les restaurants à proximité qui diffusent les matchs que vous souhaitez regarder.
                </p>
                <a href="">En savoir plus</a>
            </article>

            <section id="retrouver">
                <h2>Retrouvez ces plats</h2>

                <div>
                    <figure>
                    <img src={indien} />

                    </figure>
                    <figure id="img2">
                        <img src={burger} />
                    </figure>
                    <figure id="img3">
                        <img src="https://medias.paris2024.org/uploads/2022/09/Opera-ephemere-au-Trocadero-2-Avec-mention.jpg?x-oss-process=image/resize,w_1200,h_675,m_lfit/format,jpeg" alt="" />
                    </figure>
                    <figure id="img4">
                        <img src="https://medias.paris2024.org/uploads/2022/09/Opera-ephemere-au-Trocadero-2-Avec-mention.jpg?x-oss-process=image/resize,w_1200,h_675,m_lfit/format,jpeg" alt="" />
                    </figure>
                    <figure id="img5">
                        <img src="https://medias.paris2024.org/uploads/2022/09/Opera-ephemere-au-Trocadero-2-Avec-mention.jpg?x-oss-process=image/resize,w_1200,h_675,m_lfit/format,jpeg" alt="" />
                    </figure>
                    <figure id="img6">
                        <img src="https://medias.paris2024.org/uploads/2022/09/Opera-ephemere-au-Trocadero-2-Avec-mention.jpg?x-oss-process=image/resize,w_1200,h_675,m_lfit/format,jpeg" alt="" />
                    </figure>
                    <figure id="img7">
                        <img src="https://medias.paris2024.org/uploads/2022/09/Opera-ephemere-au-Trocadero-2-Avec-mention.jpg?x-oss-process=image/resize,w_1200,h_675,m_lfit/format,jpeg" alt="" />
                    </figure>
                    <figure id="img8">
                        <img src={burger} />
                    </figure>
                </div>
            </section>
        
        </main>
    </>
}


export default Accueil;