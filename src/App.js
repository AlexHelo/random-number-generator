import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { render } from '@testing-library/react';

import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';


const emails = ['username@gmail.com', 'user02@gmail.com'];

var values = []
var valuesDecimal = []


function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
    values = []
    valuesDecimal = []
    

  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <table>
      <tr>
    <th>Numero Aleatorio</th>
    <th>Ri</th>
  </tr>
        {values.map((name, i) => <tr><td>{name}</td><td>{valuesDecimal[i]}</td></tr>)}
      {/* {values.map(name => <h1>{name}</h1>)}
      {valuesDecimal.map(name => <h1>{name}</h1>)} */}
      </table>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


export default function App() {

const [open, setOpen] = React.useState(false);
const [selectedValue, setSelectedValue] = React.useState(values[1]);


const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = (value) => {
  setOpen(false);
  setSelectedValue(value);
};

  

  const [alignment, setAlignment] = React.useState('mcc');
  const [seed, setSeed] = React.useState('');
  const [size, setSize] = React.useState('');
  const [inc, setInc] = React.useState('');
  const [mult, setMult] = React.useState('');
  const [mod, setMod] = React.useState('');
  

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);


  };

  const handleSeedChange = (event) => {
    setSeed(parseInt(event.target.value));
  };

  const handleSizeChange = (event) => {
    setSize(parseInt(event.target.value));
  };
  const handleIncChange = (event) => {
    setInc(parseInt(event.target.value));
  };

  const handleMultChange = (event) => {
    setMult(parseInt(event.target.value));
  };
  const handleModChange = (event) => {
    setMod(parseInt(event.target.value));
  };
  

  function mccCalculate() {
  var squareSeed
  var stringSeed
  var tempSeed
  squareSeed = seed * seed;
  

   for (let i = 0; i <= size; i++) {

    
    stringSeed = squareSeed.toString();
    
    if (stringSeed.length < 8){
      stringSeed = stringSeed.slice(1,5)
    }
    else{
      stringSeed = stringSeed.slice(2,6)
    }
    values.push(stringSeed)
    valuesDecimal.push(stringSeed/10000)
    
    tempSeed = parseInt(stringSeed)

    squareSeed = tempSeed * tempSeed;

  }
  }

  function mcCalculate(){
    var iSeed;
    var tempSeed;
    var riSeed;

    iSeed = (seed * mult + inc) %mod;
    

    for (let i = 0; i <= size; i++) {
      values.push(iSeed);
      tempSeed = iSeed;
      iSeed = (tempSeed * mult + inc) %mod;
      riSeed = tempSeed/mod;
      valuesDecimal.push(riSeed);
  
    }
    console.log(values)
    console.log(valuesDecimal)




  }

  function mcmCalculate(){
    var iSeed;
    var tempSeed;
    var riSeed;
    let primitiveRelative = false;
    let secondCond = false;
    let thirdCond = false;
    let q = 2;

    iSeed = (seed * mult + inc) % mod;
    
    function gcd(a, b) {
      if (b === 0) return a;
      return gcd(b, a % b);
    }
    function isPrime(k) {
      if (k <= 1) return false;

      for (let i = 2; i < k; i++) if (k % i == 0) return false;
  
      return true;
    }
    if (q.isPrime && q % mod ===0 && seed%(mult-1)==0){
      secondCond= true;
    }
    if (mod % 4 === 0 && (mult - 1) % 4 === 0) {
      thirdCond = true;
    }

    

    
    if (gcd(inc, mod) === 1){
      primitiveRelative = true;
    }
    
    
    if(primitiveRelative && thirdCond ){
      for (let i = 0; i <= size; i++) {
        values.push(iSeed);
        tempSeed = iSeed;
        iSeed = (tempSeed * mult + inc) %mod;
        riSeed = tempSeed/mod;
        valuesDecimal.push(riSeed);
    
      }
    }
    



  }

  

  switch (alignment) {
    case 'mcc':
    return(<div className="App">

    <ToggleButtonGroup
    color="primary"
    value={alignment}
    exclusive
    onChange={handleChange}
  >
    <ToggleButton value="mcc">Método de los Centros Cuadrados</ToggleButton>
    <ToggleButton value="mc">Método Congruencial</ToggleButton>
    <ToggleButton value="mcm">Método Congruencial Mixto</ToggleButton>
    <ToggleButton value="gm">Generador Multiplicativo </ToggleButton>
    <ToggleButton value="mclm">Método Congruencial lineal Combinado </ToggleButton>
  </ToggleButtonGroup>

  <h1>Metodo de los Centros Cuadrados</h1>

    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
 
    
    <TextField id="outlined-basic" label="Semilla"  onChange={handleSeedChange} variant="outlined" />
    <TextField id="outlined-basic" label="Tamaño" onChange={handleSizeChange} variant="outlined" />
    </Box>

    <Button  onClick={() => {
    mccCalculate();
    handleClickOpen();
  }} variant="contained">Generar</Button>

   <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />

 
     
     
  </div>);
      break;
    case 'mc':
    return(<div className="App">

    <ToggleButtonGroup
    color="primary"
    value={alignment}
    exclusive
    onChange={handleChange}
  >
    <ToggleButton value="mcc">Método de los Centros Cuadrados</ToggleButton>
    <ToggleButton value="mc">Método Congruencial</ToggleButton>
    <ToggleButton value="mcm">Método Congruencial Mixto</ToggleButton>
    <ToggleButton value="gm">Generador Multiplicativo </ToggleButton>
    <ToggleButton value="mclm">Método Congruencial lineal Combinado </ToggleButton>
  </ToggleButtonGroup>

  <h1>Metodo Congruencial</h1>

    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    
    <TextField id="outlined-basic" label="Semilla" onChange={handleSeedChange} variant="outlined" />
    <TextField id="outlined-basic" label="Tamaño" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="Multiplicador" onChange={handleMultChange}  variant="outlined" />
    <TextField id="outlined-basic" label="Incremento" onChange={handleIncChange} variant="outlined" />
    <TextField id="outlined-basic" label="Modulo" onChange={handleModChange} variant="outlined" />
    </Box>
    <Button  onClick={() => {
    mcCalculate();
    handleClickOpen();
  }} variant="contained">Generar</Button>

<SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    
     
     
  </div>);
      break;
    case 'mcm':
    return(<div className="App">

    <ToggleButtonGroup
    color="primary"
    value={alignment}
    exclusive
    onChange={handleChange}
  >
    <ToggleButton value="mcc">Método de los Centros Cuadrados</ToggleButton>
    <ToggleButton value="mc">Método Congruencial</ToggleButton>
    <ToggleButton value="mcm">Método Congruencial Mixto</ToggleButton>
    <ToggleButton value="gm">Generador Multiplicativo </ToggleButton>
    <ToggleButton value="mclm">Método Congruencial lineal Combinado </ToggleButton>
  </ToggleButtonGroup>

  <h1>Metodo Congruencial Mixto</h1>

    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    
    <TextField id="outlined-basic" label="Semilla" onChange={handleSeedChange} variant="outlined" />
    <TextField id="outlined-basic" label="Tamaño" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="Multiplicador" onChange={handleMultChange}  variant="outlined" />
    <TextField id="outlined-basic" label="Incremento" onChange={handleIncChange} variant="outlined" />
    <TextField id="outlined-basic" label="Modulo" onChange={handleModChange} variant="outlined" />
    </Box>

    <Button  onClick={() => {
    mcmCalculate();
    handleClickOpen();
  }} variant="contained">Generar</Button>

<SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
     
     
  </div>);
      break;
    case 'gm':
    return(<div className="App">

    <ToggleButtonGroup
    color="primary"
    value={alignment}
    exclusive
    onChange={handleChange}
  >
    <ToggleButton value="mcc">Método de los Centros Cuadrados</ToggleButton>
    <ToggleButton value="mc">Método Congruencial</ToggleButton>
    <ToggleButton value="mcm">Método Congruencial Mixto</ToggleButton>
    <ToggleButton value="gm">Generador Multiplicativo </ToggleButton>
    <ToggleButton value="mclm">Método Congruencial lineal Combinado </ToggleButton>
  </ToggleButtonGroup>

  <h1>Generador Multiplicativo</h1>

    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    
    <TextField id="outlined-basic" label="Semilla" variant="outlined" />
    <TextField id="outlined-basic" label="Tamaño" variant="outlined" />
    <TextField id="outlined-basic" label="Multiplicador" variant="outlined" />
    <TextField id="outlined-basic" label="Modulo" variant="outlined" />
    </Box>
     
    <Button variant="contained">Generar</Button>
     
  </div>);
      break;
    case 'mclm':
    return(<div className="App">

    <ToggleButtonGroup
    color="primary"
    value={alignment}
    exclusive
    onChange={handleChange}
  >
    <ToggleButton value="mcc">Método de los Centros Cuadrados</ToggleButton>
    <ToggleButton value="mc">Método Congruencial</ToggleButton>
    <ToggleButton value="mcm">Método Congruencial Mixto</ToggleButton>
    <ToggleButton value="gm">Generador Multiplicativo </ToggleButton>
    <ToggleButton value="mclm">Método Congruencial lineal Combinado </ToggleButton>
  </ToggleButtonGroup>

  <h1>Metodo Congruencial lineal Combinado</h1>

    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    
    <TextField id="outlined-basic" label="No de Funciones" variant="outlined" />
    <TextField id="outlined-basic" label="Semilla" variant="outlined" />
    <TextField id="outlined-basic" label="Tamaño" variant="outlined" />
    <TextField id="outlined-basic" label="Multiplicador" variant="outlined" />
    <TextField id="outlined-basic" label="Modulo" variant="outlined" />
    </Box>

    <Button variant="contained">Generar</Button>
     
     
  </div>);
      break;

  }

}


