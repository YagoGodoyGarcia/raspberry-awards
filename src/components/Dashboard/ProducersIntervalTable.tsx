import { useEffect, useState } from "react";
import { ProducerInterval } from "./interfaces/DataModel"
import { Title, Table } from "@mantine/core";
import { getMovies, getProducersInterval } from "../../services/movieApi";
import { getProducersIntervalFromMovies } from "../../utils/movieUtils";


const ProducersIntervalTable = () => {
    const [max, setMax] = useState<ProducerInterval[]>([]);
    const [min, setMin] = useState<ProducerInterval[]>([]);

    const producersData = () => {
        getProducersInterval().then(({ max, min }) => {
            setMax(max);
            setMin(min);
        }).catch(async ()=>{
            try {
                    const movies = await getMovies(0, 9999)
                    const localResult = getProducersIntervalFromMovies(movies.content)
                    setMax(localResult.max)
                    setMin(localResult.min)
                  } catch (e) {
                    console.error("Failed to process local movie data:", e)
                  }
        });
    }


    useEffect(() => {
        producersData()
    }, [])


    const renderTable = (label: string, data: ProducerInterval[]) => (
        <>
            <Title order={4}>{label}</Title>
            <Table striped highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        <th>Producer</th>
                        <th>Interval</th>
                        <th>Previous Year</th>
                        <th>Following Year</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((p, i) => (
                        <tr key={i}>
                            <td>{p.producer}</td>
                            <td>{p.interval}</td>
                            <td>{p.previousWin}</td>
                            <td>{p.followingWin}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

    return (
        <>
            <Title order={3}>Producers with longest and shortest interval between wins</Title>
            {renderTable('Maximum', max)}
            {renderTable('Minimum', min)}
        </>
    );
}

export default ProducersIntervalTable