import { getAllInscription } from "../../../service/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Login from "./Connexion";

const Connexion_user_list = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      getAllInscription().then((result) => {
        setUsers(result.data);
      });
    }, []);

    const { utilasateurName } = useParams();

    const usersFiltres = users.filter((user) =>
      user.nom === parseInt(utilasateurName)
    );

    return (<>
        <section id="connexion_user">
        {usersFiltres.map((utilisateur) => (
          <Login
            email={utilisateur.email}
            id={utilisateur.id}
            nom={utilisateur.name}
            />
        ))}
        </section>
    </>
    );
};

export default Connexion_user_list;