import { Table, Title } from "@mantine/core"
import { Studio } from "./interfaces/DataModel"
import { useEffect, useState } from "react";
import { getTopStudios } from "../../services/movieApi";



const TopStudiosTable = () => {

    const [studios, setStudios] = useState<Studio[]>([]);

    const studiosData = () => {
        getTopStudios().then((res) => setStudios(res.studios));
    }

    useEffect(() => {
        studiosData()
    }, [])
    return (
        <>
            <Title order={3}>Top 3 estúdios com mais vitórias</Title>

            <Table striped>
                <thead>
                    <tr>
                        <th>Estúdio</th>
                        <th>Vitórias</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        studios.slice(0, 3).map((studios, i) => (
                            <tr key={i}>
                                <td>{studios.name}</td>
                                <td>{studios.winCount}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default TopStudiosTable