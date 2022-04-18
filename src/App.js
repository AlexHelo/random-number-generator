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
var testResult

var x
var i


console.warn = () => {};




export default function App() {


const [inputList, setInputList] = React.useState([{ Semilla: "", Multiplicador: "" , Modulo: "" }]);

const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};
 
// handle click event of the Remove button
const handleRemoveClick = index => {
  const list = [...inputList];
  list.splice(index, 1);
  setInputList(list);
};
 
// handle click event of the Add button
const handleAddClick = () => {
  setInputList([...inputList, { Semilla: "", Multiplicador: "" , Modulo: ""}]);
};

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
    setAlpha(parseFloat(event.target.value));
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
    Smirnov();
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
        <h1>{testResult}</h1>
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
  

   for (let i = 0; i < size; i++) {

    
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
    

    for (let i = 0; i < size; i++) {
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
      for (let i = 0; i < size; i++) {
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
      
  
      for (let i = 0; i < size; i++) {
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

    var valueHolder = [[]]
    var loopComplete = false
    var counter = 0
    var exitCounter = false

    var tempCounter = 0;


   

    for (let i = 0; i < inputList.length; i++) {
      valueHolder[i] = []
      valueHolder[i].push(parseInt(inputList[i].Semilla));
    }


    while (exitCounter === false) {
     
     
      for (let i = 0; i < inputList.length; i++) {
        counter = 0
        loopComplete = false
  
          while (loopComplete === false) {
           valueHolder[i].push(inputList[i].Multiplicador * valueHolder[i][counter] % inputList[i].Modulo) 
  
           counter = counter + 1
           if (valueHolder[i][counter] === valueHolder[i][0]){
             loopComplete = true
           }
          }
      }  
      
    
    
      
      
      for (let j = 0; j < inputList.length; j++) {

        

        
        if (valueHolder[j][0] === valueHolder[j][valueHolder[0].length-1]){
        
        
          exitCounter = true
        }
        else {

          
          exitCounter = false
          
        }
      }

    }
    
    console.log(valueHolder)



  }

  function Smirnov(){

    const smirnovTable = [
      [0, 0.2, 0.1, 0.05, 0.02, 0.01, 0.005, 0.002, 0.001],
      [1, 0.9, 0.95, 0.975, 0.99, 0.995, 0.9975, 0.999, 0.9995],
      [2, 0.68337, 0.77639, 0.84189, 0.9, 0.92929, 0.95, 0.96838, 0.97764],
      [3, 0.56481, 0.63604, 0.7076, 0.78456, 0.829, 0.86428, 0.9, 0.92065],
      [4, 0.49265, 0.56522, 0.62394, 0.68887, 0.73424, 0.77639, 0.82217, 0.85047],
      [5, 0.44698, 0.50945, 0.56328, 0.62718, 0.66853, 0.70543, 0.75, 0.78137],
      [6, 0.41037, 0.46799, 0.51926, 0.57741, 0.61661, 0.65287, 0.69571, 0.72479],
      [7, 0.38148, 0.43607, 0.48342, 0.53844, 0.57581, 0.60975, 0.65071, 0.6793],
      [8, 0.35831, 0.40962, 0.45427, 0.50654, 0.54179, 0.57429, 0.61368, 0.64098],
      [9, 0.3391, 0.38746, 0.43001, 0.4796, 0.51332, 0.54443, 0.5821, 0.60846],
      [10, 0.3226, 0.36866, 0.40925, 0.45562, 0.48893, 0.51872, 0.555, 0.58042],
      [11, 0.30829, 0.35242, 0.39122, 0.4367, 0.4677, 0.49539, 0.53135, 0.55588],
      [
        12, 0.29577, 0.33815, 0.37543, 0.41918, 0.44905, 0.47672, 0.51047,
        0.53422,
      ],
      [13, 0.2847, 0.32549, 0.36143, 0.40362, 0.43247, 0.45921, 0.49189, 0.5149],
      [14, 0.27481, 0.31417, 0.3489, 0.3897, 0.41762, 0.44352, 0.4752, 0.49753],
      [15, 0.26589, 0.30397, 0.3375, 0.37713, 0.4042, 0.42934, 0.45611, 0.48182],
      [16, 0.25778, 0.29472, 0.32733, 0.36571, 0.39201, 0.41644, 0.44637, 0.4675],
      [17, 0.25039, 0.28627, 0.31796, 0.35528, 0.38086, 0.40464, 0.4338, 0.4554],
      [18, 0.2436, 0.27851, 0.30936, 0.34569, 0.37062, 0.3938, 0.42224, 0.44234],
      [
        19, 0.23735, 0.27136, 0.30143, 0.33685, 0.36117, 0.38379, 0.41156,
        0.43119,
      ],
      [
        20, 0.23156, 0.26473, 0.29408, 0.32866, 0.35241, 0.37451, 0.40165,
        0.42085,
      ],
      [
        21, 0.22517, 0.25858, 0.28724, 0.32104, 0.34426, 0.36588, 0.39243,
        0.41122,
      ],
      [
        22, 0.22115, 0.25283, 0.28087, 0.31394, 0.33666, 0.35782, 0.38382,
        0.40223,
      ],
      [23, 0.21646, 0.24746, 0.27491, 0.30728, 0.32954, 0.35027, 0.37575, 0.3938],
      [
        24, 0.21205, 0.24242, 0.26931, 0.30104, 0.32286, 0.34318, 0.36787,
        0.38588,
      ],
      [25, 0.2079, 0.23768, 0.26404, 0.29518, 0.31657, 0.33651, 0.36104, 0.37743],
      [26, 0.20399, 0.2332, 0.25908, 0.28962, 0.30963, 0.33022, 0.35431, 0.37139],
      [27, 0.2003, 0.22898, 0.25438, 0.28438, 0.30502, 0.32425, 0.34794, 0.36473],
      [28, 0.1968, 0.22497, 0.24993, 0.27942, 0.29971, 0.31862, 0.3419, 0.35842],
      [
        29, 0.19348, 0.22117, 0.24571, 0.27471, 0.29466, 0.31327, 0.33617,
        0.35242,
      ],
      [30, 0.19032, 0.21756, 0.2417, 0.27023, 0.28986, 0.30818, 0.33072, 0.34672],
      [
        31, 0.18732, 0.21412, 0.23788, 0.26596, 0.28529, 0.30333, 0.32553,
        0.34129,
      ],
      [32, 0.18445, 0.21085, 0.23424, 0.26189, 0.28094, 0.2987, 0.32058, 0.33611],
      [
        33, 0.18171, 0.20771, 0.23076, 0.25801, 0.27577, 0.29428, 0.31584,
        0.33115,
      ],
      [
        34, 0.17909, 0.21472, 0.22743, 0.25429, 0.27271, 0.29005, 0.31131,
        0.32641,
      ],
      [35, 0.17659, 0.20185, 0.22425, 0.25073, 0.26897, 0.286, 0.30597, 0.32187],
      [36, 0.17418, 0.1991, 0.22119, 0.24732, 0.26532, 0.28211, 0.30281, 0.31751],
      [37, 0.17188, 0.19646, 0.21826, 0.24404, 0.2618, 0.27838, 0.29882, 0.31333],
      [
        38, 0.16966, 0.19392, 0.21544, 0.24089, 0.25843, 0.27483, 0.29498,
        0.30931,
      ],
      [
        39, 0.16753, 0.19148, 0.21273, 0.23785, 0.25518, 0.27135, 0.29125,
        0.30544,
      ],
      [
        40, 0.16547, 0.18913, 0.21012, 0.23494, 0.25205, 0.26803, 0.28772,
        0.30171,
      ],
      [41, 0.16349, 0.18687, 0.2076, 0.23213, 0.24904, 0.26482, 0.28429, 0.29811],
      [
        42, 0.16158, 0.18468, 0.20517, 0.22941, 0.24613, 0.26173, 0.28097,
        0.29465,
      ],
      [43, 0.15974, 0.18257, 0.20283, 0.22679, 0.24332, 0.25875, 0.27778, 0.2913],
      [44, 0.15795, 0.18051, 0.20056, 0.22426, 0.2406, 0.25587, 0.27468, 0.28806],
      [
        45, 0.15623, 0.17856, 0.19837, 0.22181, 0.23798, 0.25308, 0.27169,
        0.28493,
      ],
      [46, 0.15457, 0.17665, 0.19625, 0.21944, 0.23544, 0.25038, 0.2688, 0.2819],
      [47, 0.15295, 0.17481, 0.1942, 0.21715, 0.23298, 0.24776, 0.266, 0.27896],
      [
        48, 0.15139, 0.17301, 0.19221, 0.21493, 0.23059, 0.24523, 0.26328,
        0.27611,
      ],
      [
        49, 0.14987, 0.17128, 0.19028, 0.21281, 0.22832, 0.24281, 0.26069,
        0.27339,
      ],
      [50, 0.1484, 0.16959, 0.18841, 0.21068, 0.22604, 0.24039, 0.25809, 0.27067],
    ];


    var iN = []
    var iNri = []
    var riin = []
    var alphaIndex

    valuesDecimal.sort();

    for (let i = 0; i < valuesDecimal.length; i++) {
      

      iN[i] = (i+1)/valuesDecimal.length
      
    } 

    for (let i = 0; i < valuesDecimal.length; i++) {
      iNri[i] = iN[i] - valuesDecimal[i]
  
    }

   

    for (let i = 0; i < valuesDecimal.length; i++) {
      riin[i] = (valuesDecimal[i] - (i/valuesDecimal.length))
    }

  var dArr = []
  dArr[0] = Math.max.apply(Math, iNri)
  dArr[1] = Math.max.apply(Math, riin)

  var dMax = Math.max.apply(Math, dArr)


  for (let i = 0; i < smirnovTable[0].length; i++) {
    if (smirnovTable[0][i] == alpha) {
      alphaIndex = i;
      break;
    }
  }

  if (smirnovTable[valuesDecimal.length][alphaIndex] > dMax){
    testResult = "Aceptada por Kolmogorov-Smirnov"

  }
  else{
    testResult = "Rechazada por Kolmogorov-Smirnov"
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

    <Box>
    <TextField id="outlined-basic" label="Alpha" onChange={handleAlphaChange} variant="outlined" />
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
     
    <Box>
    <TextField id="outlined-basic" label="Alpha" onChange={handleAlphaChange} variant="outlined" />
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

    

    {inputList.map((x, i) => {
        return (

          <Box>
            <TextField id="outlined-basic" name = "Semilla" label="Semilla"  value={x.Semilla} onChange={e => handleInputChange(e, i)} variant="outlined" />
            <TextField id="outlined-basic" name = "Multiplicador" label="Multiplicador" value={x.Multiplicador} onChange={e => handleInputChange(e, i)} variant="outlined" />
            <TextField id="outlined-basic" name = "Modulo" label="Modulo" value={x.Modulo} onChange={e => handleInputChange(e, i)} variant="outlined" />
            {inputList.length !== 1 && <Button variant="contained"
              className="mr10"
              onClick={() => handleRemoveClick(i)}>Remove</Button>}
            {inputList.length - 1 === i && <Button variant="contained" onClick={handleAddClick}>Add</Button>}
          
          </Box>
        );
      })}
<div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>

<Button  onClick={() => {
    mclmCalculate();
    handleClickOpen();
  }} variant="contained">Generar</Button>

<SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />

   
     
     
  </div>);
      break;

  }

}


