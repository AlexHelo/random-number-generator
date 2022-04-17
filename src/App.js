import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';




export default function App() {

  var randomMethod = "mcc";

  const [alignment, setAlignment] = React.useState('mcc');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    randomMethod = newAlignment;
  };
  console.log(randomMethod);
  
  return (

    
    <div className="App">

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

      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <TextField id="outlined-basic" label="Semilla" variant="outlined" />
      <TextField id="outlined-basic" label="Size" variant="outlined" />
      </Box>
       
       
    </div>
  );
}


