import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Divider, Box } from '@mui/material';
import NavBar from '../Bars/NavBar.jsx';
import Footer from '../Bars/Footer';
import SideBar from '../Bars/SideBar.jsx';

const leaders = [
  { name: "William F. McKeon", position: "President and CEO", image: "./William-F-McKeon-1.png" },
  { name: "Denise Castillo", position: "Chief Financial Officer", image: "./Denise-Castillo-Rhodes.png" },
  { name: "Isaac J. Middleton", position: "Chief Operating Officer", image: "./Isaac J. Middleton.jpg" },
  { name: "Isaac J. Middleton", position: "Chief Operating Officer", image: "./Isaac J. Middleton.jpg" },
  { name: "Isaac J. Middleton", position: "Chief Operating Officer", image: "./Isaac J. Middleton.jpg" },
  { name: "Isaac J. Middleton", position: "Chief Operating Officer", image: "./Isaac J. Middleton.jpg" },
  { name: "Isaac J. Middleton", position: "Chief Operating Officer", image: "./Isaac J. Middleton.jpg" },
  { name: "Ashley McPhail", position: "Vice President", image: "./Ashley-McPhail.png" },
  { name: "Ashley McPhail", position: "Vice President", image: "./Ashley-McPhail.png" },
  { name: "Ashley McPhail", position: "Vice President", image: "./Ashley-McPhail.png" },
  { name: "Ashley McPhail", position: "Vice President", image: "./Ashley-McPhail.png" },
  { name: "Ashley McPhail", position: "Vice President", image: "./Ashley-McPhail.png" },
];
const LeadershipPage = () => {
  return (
    <>
      <NavBar />
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
                <SideBar children={'Leader Ship'}/>


{/* Main Content */}
<Box sx={{
  display: 'flex',
  justifyContent: 'center',
  flexBasis: '80%',
}}>
  <Box sx={{
    marginBottom: '100px',
    padding:' 0 30px'
  }}>
    <Grid item xs={12}>
      <Box sx={{
        paddingLeft: '20px'
      }}>
        <Typography variant="h1" align="left" gutterBottom sx={{ marginTop: '5rem' }}>
          Leadership
        </Typography>
        <Divider sx={{ width: '25%', height: '3px', backgroundColor: 'black', marginBottom: '1rem' }} />
        <Typography variant="h4" align="left" gutterBottom sx={{ marginBottom: '3rem' }}>
          CMC Executive Team
        </Typography>
      </Box>
      <Box sx={{
        padding: "0 0"
      }}>
        <Grid container spacing={5} justifyContent="center" sx={{ paddingLeft: 0, paddingRight: 0 }}>
          {leaders.map((leader, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} display="flex" justifyContent="center" sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <Card sx={{ maxWidth: 300, minWidth: 300 }}>
                <CardMedia
                  component="img"
                  alt={leader.name}
                  height="300"
                  image={leader.image}
                  title={leader.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {leader.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" style={{ fontSize: '18px' }}>
                    {leader.position}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  </Box>
</Box>
</Box>
<Footer />
</>
);
};
export default LeadershipPage;