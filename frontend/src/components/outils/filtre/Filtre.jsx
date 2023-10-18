import axios from "axios";
import React, { useEffect} from "react";

function filtre() {
    const [data,setData] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:3000/api/team')
        .then(res=> setData(res.data))
        .catch(err => console.log(err))
    }, [])
    return(
        <>
            <div className="p-5 bg-light">
                <div className="bg-white shadow border">
                    <input type="text" />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nom</th>
                                <th>Logo</th>
                            </tr>
                            <tbody>
                                {data.map((d, i) => (
                                    <tr key={i}>
                                        <td> {d.id} </td>
                                        <td> {d.nom} </td>
                                        <td> {d.logo} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )
}

export default filtre