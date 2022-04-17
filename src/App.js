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





export default function App() {

  

  const [alignment, setAlignment] = React.useState('mcc');
  const [seed, setSeed] = React.useState('');
  const [size, setSize] = React.useState('');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSeedChange = (event) => {
    setSeed(parseInt(event.target.value));
  };

  const handleSizeChange = (event) => {
    setSize(parseInt(event.target.value));
  };

  function mccCalculate() {
  var squareSeed
  var stringSeed
  var tempSeed
  var values = [];
  var valuesDecimal = [] 
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
    
   console.log(values)

  

   render(
    <div className="App">
    {values.map(name => <h1>{name}</h1>)}
    {valuesDecimal.map(name => <h1>{name}</h1>)}
      </div>
   );

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
  }} variant="contained">Generar</Button>

 
     
     
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
    
    <TextField id="outlined-basic" label="Semilla" variant="outlined" />
    <TextField id="outlined-basic" label="Tamaño" variant="outlined" />
    <TextField id="outlined-basic" label="Multiplicador" variant="outlined" />
    <TextField id="outlined-basic" label="Incremento" variant="outlined" />
    <TextField id="outlined-basic" label="Modulo" variant="outlined" />
    </Box>

    <Button variant="contained">Generar</Button>
     
     
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
    
    <TextField id="outlined-basic" label="Semilla" variant="outlined" />
    <TextField id="outlined-basic" label="Tamaño" variant="outlined" />
    <TextField id="outlined-basic" label="Multiplicador" variant="outlined" />
    <TextField id="outlined-basic" label="Incremento" variant="outlined" />
    <TextField id="outlined-basic" label="Modulo" variant="outlined" />
    </Box>

    <Button variant="contained">Generar</Button>
     
     
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


