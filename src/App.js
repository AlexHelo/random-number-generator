import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';






var values = []
var valuesDecimal = []



console.warn = () => {};




export default function App() {

const [open, setOpen] = React.useState(false);
const [open2, setOpen2] = React.useState(false);
const [selectedValue, setSelectedValue] = React.useState(values[1]);


const handleClickOpen = () => {
  setOpen(true);
};

const handleClickOpen2 = () => {
  setOpen2(true);
};

const handleClose = (value) => {
  setOpen(false);
  setSelectedValue(value);
};

const handleClose2 = (value) => {
  setOpen2(false);
  setSelectedValue(value);
};

  

  const [alignment, setAlignment] = React.useState('mcc');
  const [seed, setSeed] = React.useState('');
  const [size, setSize] = React.useState('');
  const [inc, setInc] = React.useState('');
  const [mult, setMult] = React.useState('');
  const [mod, setMod] = React.useState('');
  const [alpha, setAlpha] = React.useState('');
  

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

  const handleAlphaChange = (event) => {
    setAlpha(parseInt(event.target.value));
  };


  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
      values = []
      valuesDecimal = []
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
  
  
  function SimpleDialogPlus(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
      values = []
      valuesDecimal = []
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
  
        <Stack spacing={2} direction="row">
        <Button variant="contained">Chi-Cuadrada</Button>
        <Button  onClick={() => {
    handleClickOpen2();
  }} variant="contained">Kolmogorov-Smirnov</Button>
      </Stack>

      <SimpleDialogSmirnov
        selectedValue={selectedValue}
        open={open2}
        onClose={handleClose2}
      />
      
      </Dialog>
    );
  }
  
  SimpleDialogPlus.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
  
  function SimpleDialogSmirnov(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose2 = () => {
      onClose(selectedValue);
    };
  
    return (
      <Dialog onClose={handleClose2} open={open2}>
        <DialogTitle>Prueba Kolmogorov-Smirnov</DialogTitle>
        
      </Dialog>
    );
  }
  
  SimpleDialogSmirnov.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
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
    else{
      values.push("Estos valores no cumplen con las reglas")
      valuesDecimal.push(0)
    }
  }

  function gmCalculate(){
  
    if (mod >= 0 && seed >= 0 && mult >= 0 && mod > mult && mod > seed){
      var iSeed;
      var tempSeed;
      var riSeed;
  
      iSeed = (seed * mult ) %mod;
      
  
      for (let i = 0; i <= size; i++) {
        values.push(iSeed);
        tempSeed = iSeed;
        iSeed = (tempSeed * mult) %mod;
        riSeed = tempSeed/mod;
        valuesDecimal.push(riSeed);
    
      }
      
    }
    else {
      values.push("Estos valores no cumplen con las reglas")
      valuesDecimal.push(0)
    }   
  }

  function mclmCalculate(){
  


  }

  function Smirnov(){
    var iN = []
    var iNri = []
    var riin = []

    for (let i = 0; i < valuesDecimal.length; i++) {
      

      iN[i] = (i+1)/valuesDecimal.length
      
    } 

    for (let i = 0; i < valuesDecimal.length; i++) {
      iNri[i] = iN[i] - valuesDecimal[i]
  
    }

    riin[0] = valuesDecimal[0]

    for (let i = 1; i < valuesDecimal.length; i++) {
      riin[i] = iN[i-1] - iNri[i]
    }

  var dArr = []
  dArr[0] = Math.max.apply(Math, iNri)
  dArr[1] = Math.max.apply(Math, riin)

  var dMax = Math.max.apply(Math, dArr)

  console.log(dMax)
  console.log(alpha)
  



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

    <Box>
    <TextField id="outlined-basic" label="Alpha" onChange={handleAlphaChange} variant="outlined" />
    </Box>
    
    <Button  onClick={() => {
    mcCalculate();
    handleClickOpen();
  }} variant="contained">Generar</Button>

<SimpleDialogPlus
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

<SimpleDialogPlus
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
    
    <TextField id="outlined-basic" label="Semilla" onChange={handleSeedChange} variant="outlined" />
    <TextField id="outlined-basic" label="Tamaño" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="Multiplicador" onChange={handleMultChange}  variant="outlined" />
    <TextField id="outlined-basic" label="Modulo" onChange={handleModChange} variant="outlined" />
    </Box>
     
    <Button  onClick={() => {
    gmCalculate();
    handleClickOpen();
  }} variant="contained">Generar</Button>

<SimpleDialogPlus
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
     
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


