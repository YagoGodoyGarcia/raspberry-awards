import { useEffect, useState } from "react"
import { YearWinner } from "./interfaces/DataModel"
import { Table, Title } from "@mantine/core";
import { getMultipleWinners } from '../../services/movieApi';



const MutipleWinnersTable = () => {

    const [data, setData] = useState<YearWinner[]>([]);


    const fetchData = async () => {
        const result = await getMultipleWinners()
        setData(result.years)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Title order={3}>Anos com mútiplos vencedores</Title>

            <Table striped>
                <thead>
                    <tr>
                        <th>Ano</th>
                        <th>Quantidadede vencedores</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(({ year, winnerCount }) => (
                            <tr key={year}>
                                <td>{year}</td>
                                <td>{winnerCount}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default MutipleWinnersTable;

