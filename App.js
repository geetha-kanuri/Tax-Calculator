// import React,{useEffect, useState} from 'react'
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => {
//   const[data,setData]=useState([]);
//   useEffect(()=>{
//     fetch('https://data.covid19india.org/data.json').then(
//       res=>res.json()
//     ).then(jsondata=>setData(jsondata.statewise))
//   },[])
//   return (
//     <div>
//     <center>
//       <h2><u>INDIA COVID-19 DASHBOARD</u></h2>
//       <table className="table">
//       <thead className="thead-dark">
//       <tr>
//       <th>State</th>
//        <th>Confirmed</th>
//         <th>Recovered</th>
//          <th>Deaths</th>
//           <th>Active</th>
//            <th>LastUpdate</th>
//       </tr>
//       </thead>
//       <tbody>
//       {data.map(item=>{
//         return(
//           <tr>
//           <td>{item.state}</td>
//            <td>{item.confirmed}</td>
//             <td>{item.recovered}</td>
//              <td>{item.deaths}</td>
//               <td>{item.active}</td>
//                <td>{item.lastupdatedtime}</td>
//           </tr>
//         )
//       })}
//       </tbody>
//       </table>
//     </center>
//     </div>
//   );
// }

// export default App;


// Inside App.js

import React, { useState } from 'react';

const App = () => {
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Check if age is selected
    if (!age) {
      newErrors.age = 'Age is required';
    }

    // Check if income is a valid number
    if (isNaN(income) || income === '') {
      newErrors.income = 'Income must be a valid number';
    }

    // Check if deductions is a valid number
    if (isNaN(deductions) || deductions === '') {
      newErrors.deductions = 'Deductions must be a valid number';
    }

    setErrors(newErrors);

    // If no errors, calculate tax
    if (Object.keys(newErrors).length === 0) {
      const grossIncome = parseFloat(income) + parseFloat(deductions);
      let tax = 0;

      if (grossIncome > 800000) {
        if (age === '<40') {
          tax = 0.3 * (grossIncome - 800000);
        } else if (age === '≥ 40 & < 60') {
          tax = 0.4 * (grossIncome - 800000);
        } else {
          tax = 0.1 * (grossIncome - 800000);
        }
      }

      // Display modal with tax calculation
      alert(`Tax to be paid: ${tax} Lakhs`);
    }
  };

  return (
    <div style={styles.frame}>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Enter Age Group:</label>
            <select value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="">Select Age</option>
              <option value="<40">&lt;40</option>
              <option value="≥ 40 & < 60">≥ 40 &amp; &lt; 60</option>
              <option value="≥ 60">≥ 60</option>
            </select>
            {errors.age && <span style={styles.error}>{errors.age}</span>}
          </div><br></br>
          <div>
            <label>Enter Extra Income:</label>
            <input
              type="text"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            {errors.income && <span style={styles.error}>{errors.income}</span>}
          </div><br></br>
          <div>
          <label>Enter Gross Income:</label>
          <input
            type="text"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
          />
          {errors.deductions && <span style={styles.error}>{errors.deductions}</span>}
        </div><br></br>
          <div>
          <label>Enter Total Applicable Deductions:</label>
          <input
            type="text"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
          />
          {errors.deductions && <span style={styles.error}>{errors.deductions}</span>}
        </div><br></br>
         
          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  frame: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  formContainer: {
    width: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
  },
  formItem: {
    marginBottom: '10px', 
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  submitButton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  }
};

export default App;
