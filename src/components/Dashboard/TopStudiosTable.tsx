import { Table, Title } from "@mantine/core"
import { Studio } from "./interfaces/DataModel"
import { useEffect, useState } from "react"
import { getMovies, getTopStudios } from "../../services/movieApi"
import { getTopStudiosByWins } from "../../utils/movieUtils"

const TopStudiosTable = () => {
  const [studios, setStudios] = useState<Studio[]>([])

  const fetchStudios = async () => {
    try {
      const res = await getTopStudios()
      setStudios(res.studios || [])
    } catch (err) {
      console.error("Failed to fetch top studios:", err)

      try {
              const movies = await getMovies(0, 9999)
              const localResult = getTopStudiosByWins(movies.content)
              console.log(localResult)
              setStudios(localResult)
            } catch (e) {
              console.error("Failed to process local movie data:", e)
            }
    }
  }

  useEffect(() => {
    fetchStudios()
  }, [])

  return (
    <>
      <Title order={3} mb="sm">Top 3 studios with most wins</Title>

      <Table striped highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Studio</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {studios.slice(0, 3).map((studio, index) => (
            <tr key={index}>
              <td>{studio.name}</td>
              <td>{studio.winCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default TopStudiosTable
