import { useEffect, useState } from "react";
/**
 *
 * EMI Formula: [P x R (1+R)^N] / [(1+R)^N-1]
 *
 * p -> Principal amount: loan - down
 * r -> rate of interest
 * n -> no of years.
 */

function App() {
  const [totalLoanAmount, setTotalLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(5);
  const [rateOfInterest, setRateOfInterest] = useState(6.5);

  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateEMI = () => {
    let interest = rateOfInterest / 12 / 100;
    let tenureInMonths = tenure * 12;

    // Sample: 1000000*0.006*(1+0.006)**120 / ((1+0.006) ** 120 -1)
    let emi =
      (totalLoanAmount * interest * Math.pow(1 + interest, tenureInMonths)) /
      (Math.pow(1 + interest, tenureInMonths) - 1);

    let totalAmt = emi * tenureInMonths;
    let totalInt = totalAmt - totalLoanAmount;

    setMonthlyEMI(Math.floor(emi));
    setTotalAmount(Math.ceil(totalAmt));
    setTotalInterest(Math.ceil(totalInt));
  };

  useEffect(() => {
    calculateEMI();
  }, [totalLoanAmount, tenure, rateOfInterest]);

  const handleTotalLoanChange = (e) => {
    if (e.target.value.length < 6 || e.target.value.length > 8) {
      return;
    }
    setTotalLoanAmount(parseInt(e.target.value));
  };

  const handleTenureChange = (e) => {
    if (e.target.value > 40 || e.target.value < 1) {
      return;
    }
    setTenure(parseInt(e.target.value));
  };

  const handleRateOfInterestChange = (e) => {
    if (e.target.value > 45 || e.target.value < 1) {
      return;
    }
    setRateOfInterest(parseFloat(e.target.value).toFixed(2));
  };

  return (
    <>
      <div className="app">
        <h1>EMI Calculator</h1>
        <div className="loan-container">
          <div className="title-container">
            <label htmlFor="loan-amount" className="label">
              Loan amount
            </label>
            <div className="value-container">
              <span>₹</span>
              <input
                type="number"
                className="input"
                style={{ width: "100px" }}
                value={totalLoanAmount}
                onChange={handleTotalLoanChange}
              />
            </div>
          </div>
          <input
            id="loan-amount"
            name="loan-amount"
            type="range"
            min="100000"
            max="10000000"
            step="10000"
            className="input"
            placeholder="0"
            value={totalLoanAmount}
            onChange={handleTotalLoanChange}
          />
        </div>

        <div className="interest-container">
          <div className="title-container">
            <label htmlFor="interest" className="label">
              Rate of interest (p.a)
            </label>
            <div className="value-container">
              <input
                type="number"
                className="input"
                style={{ width: "100px", textAlign: "right" }}
                value={rateOfInterest}
                onChange={handleRateOfInterestChange}
              />
              <span>%</span>
            </div>
          </div>
          <input
            id="loan-amount"
            name="loan-amount"
            type="range"
            min="1"
            max="45"
            step="0.1"
            className="input"
            value={rateOfInterest}
            onChange={handleRateOfInterestChange}
          />
        </div>

        <div className="tenure-container">
          <div className="title-container">
            <label htmlFor="tenure" className="label">
              Loan tenure
            </label>
            <div className="value-container">
              <input
                type="number"
                className="input"
                style={{ width: "100px", textAlign: "right" }}
                value={tenure}
                onChange={handleTenureChange}
              />
              <span>Yr</span>
            </div>
          </div>

          <input
            name="tenure"
            id="tenure"
            type="range"
            step="1"
            className="input"
            max="40"
            min="1"
            value={tenure}
            onChange={handleTenureChange}
          />
        </div>

        <div className="result-container">
          <div className="values">
            <span>Monthly EMI</span>
            <span>₹ {monthlyEMI.toLocaleString("en-IN")}</span>
          </div>

          <div className="values">
            <span>Principal amount</span>
            <span>₹ {totalLoanAmount.toLocaleString("en-IN")}</span>
          </div>

          <div className="values">
            <span>Total interest</span>
            <span>₹ {totalInterest.toLocaleString("en-IN")}</span>
          </div>

          <div className="values">
            <span>Total amount</span>
            <span>₹ {totalAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      <div className="credits">
        A simple EMI Calculator inspired by <a href="https://groww.in/calculators/emi-calculator">Groww</a>
      </div>
    </>
  );
}

export default App;
