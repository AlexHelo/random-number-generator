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
  }
  

  function ChiCuadrada(){
    const chiTable = [
      [
        0, 0.995, 0.99, 0.975, 0.95, 0.9, 0.5, 0.2, 0.1, 0.05, 0.025, 0.02, 0.01,
        0.005, 0.002, 0.001,
      ],
      [
        1, 0.0000397, 0.000157, 0.000982, 0.00393, 0.0158, 0.455, 1.642, 2.706,
        3.841, 5.024, 5.412, 6.635, 7.879, 9.55, 10.828,
      ],
      [
        2, 0.01, 0.02, 0.051, 0.103, 0.211, 1.386, 3.219, 4.605, 5.991, 7.378,
        7.824, 9.21, 10.597, 12.429, 13.816,
      ],
      [
        3, 0.072, 0.115, 0.216, 0.352, 0.584, 2.366, 4.642, 6.251, 7.815, 9.348,
        9.837, 11.345, 12.838, 14.796, 16.266,
      ],
      [
        4, 0.207, 0.297, 0.484, 0.711, 1.064, 3.357, 5.989, 7.779, 9.488, 11.143,
        11.668, 13.277, 14.86, 16.924, 18.467,
      ],
      [
        5, 0.412, 0.554, 0.831, 1.145, 1.61, 4.351, 7.289, 9.236, 11.07, 12.833,
        13.388, 15.086, 16.75, 18.907, 20.515,
      ],
      [
        6, 0.676, 0.872, 1.237, 1.635, 2.204, 5.348, 8.558, 10.645, 12.592,
        14.449, 15.033, 16.812, 18.548, 20.791, 22.458,
      ],
      [
        7, 0.989, 1.239, 1.69, 2.167, 2.833, 6.346, 9.803, 12.017, 14.067, 16.013,
        16.622, 18.475, 20.278, 22.601, 24.322,
      ],
      [
        8, 1.344, 1.646, 2.18, 2.733, 3.49, 7.344, 11.03, 13.362, 15.507, 17.535,
        18.168, 20.09, 21.955, 24.352, 26.124,
      ],
      [
        9, 1.735, 2.088, 2.7, 3.325, 4.168, 8.343, 12.242, 14.684, 16.919, 19.023,
        19.679, 21.666, 23.589, 26.056, 27.877,
      ],
      [
        10, 2.156, 2.558, 3.247, 3.94, 4.865, 9.342, 13.442, 15.987, 18.307,
        20.483, 21.161, 23.209, 25.188, 27.722, 29.588,
      ],
      [
        11, 2.603, 3.053, 3.816, 4.575, 5.578, 10.341, 14.631, 17.275, 19.675,
        21.92, 22.618, 24.725, 26.757, 29.354, 31.264,
      ],
      [
        12, 3.074, 3.571, 4.404, 5.226, 6.304, 11.34, 15.812, 18.549, 21.026,
        23.337, 24.054, 26.217, 28.3, 30.957, 32.909,
      ],
      [
        13, 3.565, 4.107, 5.009, 5.892, 7.042, 12.34, 16.985, 19.812, 22.362,
        24.736, 25.472, 27.688, 29.819, 32.535, 34.528,
      ],
      [
        14, 4.075, 4.66, 5.629, 6.571, 7.79, 13.339, 18.151, 21.064, 23.685,
        26.119, 26.873, 29.141, 31.319, 34.091, 36.123,
      ],
      [
        15, 4.601, 5.229, 6.262, 7.261, 8.547, 14.339, 19.311, 22.307, 24.996,
        27.488, 28.259, 30.578, 32.801, 35.628, 37.697,
      ],
      [
        16, 5.142, 5.812, 6.908, 7.962, 9.312, 15.338, 20.465, 23.542, 26.296,
        28.845, 29.633, 32.0, 34.267, 37.146, 39.252,
      ],
      [
        17, 5.697, 6.408, 7.564, 8.672, 10.085, 16.338, 21.615, 24.769, 27.587,
        30.191, 30.995, 33.409, 35.718, 38.648, 40.79,
      ],
      [
        18, 6.265, 7.015, 8.231, 9.39, 10.865, 17.338, 22.76, 25.989, 28.869,
        31.526, 32.346, 34.805, 37.156, 40.136, 42.312,
      ],
      [
        19, 6.844, 7.633, 8.907, 10.117, 11.651, 18.338, 23.9, 27.204, 30.144,
        32.852, 33.687, 36.191, 38.582, 41.61, 43.82,
      ],
      [
        20, 7.434, 8.26, 9.591, 10.851, 12.443, 19.337, 25.038, 28.412, 31.41,
        34.17, 35.02, 37.566, 39.997, 43.072, 45.315,
      ],
      [
        21, 8.034, 8.897, 10.283, 11.591, 13.24, 20.337, 26.171, 29.615, 32.671,
        35.479, 36.343, 38.932, 41.401, 44.522, 46.797,
      ],
      [
        22, 8.643, 9.542, 10.982, 12.338, 14.041, 21.337, 27.301, 30.813, 33.924,
        36.781, 37.659, 40.289, 42.796, 45.962, 48.268,
      ],
      [
        23, 9.26, 10.196, 11.689, 13.091, 14.848, 22.337, 28.429, 32.007, 35.172,
        38.076, 38.968, 41.638, 44.181, 47.391, 49.728,
      ],
      [
        24, 9.886, 10.856, 12.401, 13.848, 15.659, 23.337, 29.553, 33.196, 36.415,
        39.364, 40.27, 42.98, 45.559, 48.812, 51.179,
      ],
      [
        25, 10.52, 11.524, 13.12, 14.611, 16.473, 24.337, 30.675, 34.382, 37.652,
        40.646, 41.566, 44.314, 46.928, 50.223, 52.62,
      ],
      [
        26, 11.16, 12.198, 13.844, 15.379, 17.292, 25.336, 31.795, 35.563, 38.885,
        41.923, 42.856, 45.642, 48.29, 51.627, 54.052,
      ],
      [
        27, 11.808, 12.879, 14.573, 16.151, 18.114, 26.336, 32.912, 36.741,
        40.113, 43.195, 44.14, 46.963, 49.645, 53.023, 55.476,
      ],
      [
        28, 12.461, 13.565, 15.308, 16.928, 18.939, 27.336, 34.027, 37.916,
        41.337, 44.461, 45.419, 48.278, 50.993, 54.411, 56.892,
      ],
      [
        29, 13.121, 14.256, 16.047, 17.708, 19.768, 28.336, 35.139, 39.087,
        42.557, 45.722, 46.693, 49.588, 52.336, 55.792, 58.301,
      ],
      [
        30, 13.787, 14.953, 16.791, 18.493, 20.599, 29.336, 36.25, 40.256, 43.773,
        46.979, 47.962, 50.892, 53.672, 57.167, 59.703,
      ],
      [
        31, 14.458, 15.655, 17.539, 19.281, 21.434, 30.336, 37.359, 41.422,
        44.985, 48.232, 49.226, 52.191, 55.003, 58.536, 61.098,
      ],
      [
        32, 15.134, 16.362, 18.291, 20.072, 22.271, 31.336, 38.466, 42.585,
        46.194, 49.48, 50.487, 53.486, 56.328, 59.899, 62.487,
      ],
      [
        33, 15.815, 17.074, 19.047, 20.867, 23.11, 32.336, 39.572, 43.745, 47.4,
        50.725, 51.743, 54.776, 57.648, 61.256, 63.87,
      ],
      [
        34, 16.501, 17.789, 19.806, 21.664, 23.952, 33.336, 40.676, 44.903,
        48.602, 51.966, 52.995, 56.061, 58.964, 62.608, 65.247,
      ],
      [
        35, 17.192, 18.509, 20.569, 22.465, 24.797, 34.336, 41.778, 46.059,
        49.802, 53.203, 54.244, 57.342, 60.275, 63.955, 66.619,
      ],
      [
        36, 17.887, 19.233, 21.336, 23.269, 25.643, 35.336, 42.879, 47.212,
        50.998, 54.437, 55.489, 58.619, 61.581, 65.296, 67.985,
      ],
      [
        37, 18.586, 19.96, 22.106, 24.075, 26.492, 36.336, 43.978, 48.363, 52.192,
        55.668, 56.73, 59.892, 62.883, 66.633, 69.346,
      ],
      [
        38, 19.289, 20.691, 22.878, 24.884, 27.343, 37.335, 45.076, 49.513,
        53.384, 56.896, 57.969, 61.162, 64.181, 67.966, 70.703,
      ],
      [
        39, 19.996, 21.426, 23.654, 25.695, 28.196, 38.335, 46.173, 50.66, 54.572,
        58.12, 59.204, 62.428, 65.476, 69.294, 72.055,
      ],
      [
        40, 20.707, 22.164, 24.433, 26.509, 29.051, 39.335, 47.269, 51.805,
        55.758, 59.342, 60.436, 63.691, 66.766, 70.618, 73.402,
      ],
      [
        41, 21.421, 22.906, 25.215, 27.326, 29.907, 40.335, 48.363, 52.949,
        56.942, 60.561, 61.665, 64.95, 68.053, 71.938, 74.745,
      ],
      [
        42, 22.138, 23.65, 25.999, 28.144, 30.765, 41.335, 49.456, 54.09, 58.124,
        61.777, 62.892, 66.206, 69.336, 73.254, 76.084,
      ],
      [
        43, 22.859, 24.398, 26.785, 28.965, 31.625, 42.335, 50.548, 55.23, 59.304,
        62.99, 64.116, 67.459, 70.616, 74.566, 77.419,
      ],
      [
        44, 23.584, 25.148, 27.575, 29.787, 32.487, 43.335, 51.639, 56.369,
        60.481, 64.201, 65.337, 68.71, 71.893, 75.874, 78.75,
      ],
      [
        45, 24.311, 25.901, 28.366, 30.612, 33.35, 44.335, 52.729, 57.505, 61.656,
        65.41, 66.555, 69.957, 73.166, 77.179, 80.077,
      ],
      [
        46, 25.041, 26.657, 29.16, 31.439, 34.215, 45.335, 53.818, 58.641, 62.83,
        66.617, 67.771, 71.201, 74.437, 78.481, 81.4,
      ],
      [
        47, 25.775, 27.416, 29.956, 32.268, 35.081, 46.335, 54.906, 59.774,
        64.001, 67.821, 68.985, 72.443, 75.704, 79.78, 82.72,
      ],
      [
        48, 26.511, 28.177, 30.755, 33.098, 35.949, 47.335, 55.993, 60.907,
        65.171, 69.023, 70.197, 73.683, 76.969, 81.075, 84.037,
      ],
      [
        49, 27.249, 28.941, 31.555, 33.93, 36.818, 48.335, 57.079, 62.038, 66.339,
        70.222, 71.406, 74.919, 78.231, 82.367, 85.351,
      ],
      [
        50, 27.991, 29.707, 32.357, 34.764, 37.689, 49.335, 58.164, 63.167,
        67.505, 71.42, 72.613, 76.154, 79.49, 83.657, 86.661,
      ],
    ];
    valuesDecimal.sort();
    const n = valuesDecimal.length;

  

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
    <Button variant="contained">Crear </Button>
    </Box>

   
     
     
  </div>);
      break;

  }

}


