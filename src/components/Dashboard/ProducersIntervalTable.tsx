import { useEffect, useState } from "react";
import { ProducerInterval } from "./interfaces/DataModel"
import { Title, Table } from "@mantine/core";
import { getProducersInterval } from "../../services/movieApi";


const ProducersIntervalTable = () => {
    const [max, setMax] = useState<ProducerInterval[]>([]);
    const [min, setMin] = useState<ProducerInterval[]>([]);

    const producersData = () => {
        getProducersInterval().then(({ max, min }) => {
            setMax(max);
            setMin(min);
        });
    }


    useEffect(() => {
        producersData()
    }, [])


    const renderTable = (label: string, data: ProducerInterval[]) => (
        <>
            <Title order={4}>{label}</Title>
            <Table striped>
                <thead>
                    <tr>
                        <th>Produtor</th>
                        <th>Intervalo</th>
                        <th>Primeira vitória</th>
                        <th>Última vitória</th>
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
            <Title order={3}>Intervalo entre prêmios (Produtores)</Title>
            {renderTable('Maior intervalo', max)}
            {renderTable('Menor intervalo', min)}
        </>
    );
}

export default ProducersIntervalTable