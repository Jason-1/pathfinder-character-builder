import React from "react";

// Calculate next year
const nextYear = new Date().getFullYear() + 1;

// create an array from 1970 to next year (1970 + 1 is needed because the array needs to be 57 elements long to include values from 0 to 56 (1970 - 2026))
const Years = Array.from({ length: nextYear - 1970 + 1 }, (_, i) => 1970 + i);

// Create a new array of tax rates based on the year
const TaxRates = Years.map((year) => {
  if (year <= 2000) {
    return 0;
  }
  if (year <= 2020) {
    return 5;
  }
  return 10;
});

const YearsArray = () => {
  return (
    <div>
      <span>{nextYear}</span>
      {Years.map((year, index) => (
        <div key={year}>
          <span>{year}</span>
          <span>: {TaxRates[index]}% Tax</span>
        </div>
      ))}
    </div>
  );
};

export default YearsArray;
