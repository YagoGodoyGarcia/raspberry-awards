import { Container, Grid, Paper, Title } from '@mantine/core';
import MultipleWinnersTable from '../components/Dashboard/MultipleWinnersTable';
import TopStudiosTable from '../components/Dashboard/TopStudiosTable';
import ProducersIntervalTable from '../components/Dashboard/ProducersIntervalTable';
import WinnersByYearTable from '../components/Dashboard/WinnersByYearTable';

const Dashboard = () => {
  return (
    <Container size="xl" py="lg">
      <Title order={3} mb="md">
        Dashboard
      </Title>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="lg" radius="lg" withBorder>
            <MultipleWinnersTable />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="lg" radius="lg" withBorder>
            <TopStudiosTable />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="lg" radius="lg" withBorder>
            <ProducersIntervalTable />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="lg" radius="lg" withBorder>
            <WinnersByYearTable />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Dashboard;
