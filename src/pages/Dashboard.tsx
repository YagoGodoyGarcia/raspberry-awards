import { Container, Grid, Paper, Title } from '@mantine/core';
import MultipleWinnersTable from '../components/Dashboard/MultipleWinnersTable';
import TopStudiosTable from '../components/Dashboard/TopStudiosTable';
import ProducersIntervalTable from '../components/Dashboard/ProducersIntervalTable';
import WinnersByYearTable from '../components/Dashboard/WinnersByYearTable';

const Dashboard = () => {
  return (
    <Container size="xl" py="lg">
      <Title order={3} mb="md">Dashboard</Title>

      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="xs" p="md" radius="md">
            <MultipleWinnersTable />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="xs" p="md" radius="md">
            <TopStudiosTable />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="xs" p="md" radius="md">
            <ProducersIntervalTable />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="xs" p="md" radius="md">
            <WinnersByYearTable />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Dashboard;
