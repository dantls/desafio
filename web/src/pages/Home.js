import React ,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button , Container, TextField, Grid} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import api from './../services/api';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  textField: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(10),
    width: 100,
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 800,
    minHeight: 600,
    margin: `${theme.spacing(5)}px auto`,
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(10),
    marginTop: theme.spacing(5),
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(10),
    marginTop: theme.spacing(5),
  },
}));
function Home() {
  const classes = useStyles();

  const [from,setFrom] = useState('');
  const [to,setTo] = useState('');
  const [hours,setHours] = useState();
  
  
  async function handleCalculate(event) {
    event.preventDefault();

    console.log(from);
    console.log(to);
    const response = await api.get('calculate', {
      params: {
        from,
        to
      }
    });
    setHours(response.data)
 }


  return (
  <Container>
       <Paper 
        className={classes.paper}
        display="flex"
        justifyContent="center"
        container
       >
        <Typography 
          className={classes.title} 
          color="textSecondary" 
          variant="h5" 
          gutterBottom
        >
          Desafio Técnico - Proveu
        </Typography>
      <Grid className={classes.container}>       
            <TextField
              id="time"
              label="Início"
              type="time"
              defaultValue="07:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 60, 
              }}
              value={from}
              onChange={(event)=>{ setFrom(event.target.value)}}
            />
            <TextField
              id="time"
              label="Final"
              type="time"
              defaultValue="07:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 60,
              }}
              value={to}
              onChange={(event)=>{ setTo(event.target.value)}}
                />
                <Button 
                  variant="contained" 
                  component="span"
                  color="primary"
                  type="submit"
                  onClick={handleCalculate}
                >
                  Enviar
                </Button>
         </Grid>
         {hours &&
            <main>
            <Typography 
                      className={classes.subTitle} 
                      color="textSecondary" 
                      variant="h5" 
                      gutterBottom
                >
                    Em um período das {from} as {to}, o colaborador deve receber {hours.horas_noturnas} hora(s) diurna(s)
                    e {hours.horas_diurnas} hora(s) noturna(s)
                </Typography>          
              </main>
         }
     </Paper>
   
  </Container>
  );
}

export default Home;
