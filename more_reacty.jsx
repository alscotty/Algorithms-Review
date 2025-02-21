import { useState } from 'react'

export default function App() {
  const [mortgageNums, setMortgageNums] = useState({
    'loanAmount': '',
    'annualInterestRate': '',
    'loanTerm': ''
  })

  const updateNums = (e) => {
    const newVal = e.target.value === '' ? '' : Number(e.target.value);
    console.log(e.target.name)
    console.log({newVal})

    if (newVal !== '' && isNaN(newVal)) {
      return;
    } else {

    setMortgageNums({
      ...mortgageNums,
      [e.target.name]: newVal
    })

    }
  }

  const calculateMonthlyPayment = (loanAmount, annualInterestRate, loanTerm) => {
    if (!loanAmount || !annualInterestRate || !loanTerm) return 0;
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    return (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  }

  const { loanAmount, annualInterestRate, loanTerm } = mortgageNums;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, annualInterestRate, loanTerm);

  return (
    <form>
      <h3>Mortgage Calculator</h3>
      Loan Amount in $<input value={loanAmount} type="number" placeholder='0' name='loanAmount' onChange={e=>updateNums(e)}/>
      <br/>
      Annual Interest Rate %<input value={annualInterestRate} type="number" placeholder='0' name='annualInterestRate' onChange={e=>updateNums(e)}/>
      <br/>
      Loan Term in yrs<input value={loanTerm} type="number" placeholder='0' name='loanTerm' onChange={e=>updateNums(e)}/>
      <br/>
      <h4>Monthly Payment: ${monthlyPayment.toFixed(2)}</h4>
    </form>
  );
}
