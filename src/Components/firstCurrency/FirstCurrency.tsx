import React, { ChangeEvent, useEffect } from 'react';
import { useConversion } from '../../ConversionContext';
import './styles.css';

interface FirstProps {
  currency: string[];
  currencyRate: number[];
  setFirstCurrencyValue: React.Dispatch<React.SetStateAction<number>>;
  setMoneyValue: React.Dispatch<React.SetStateAction<number>>;
}

const FirstCurrency: React.FC<FirstProps> = ({ currency, currencyRate, setFirstCurrencyValue, setMoneyValue }) => {
  const conversion = useConversion();

  useEffect(() => {
    if (conversion) {
      setFirstCurrencyValue(conversion.value);
    }
  }, [conversion, setFirstCurrencyValue]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (conversion) {
      conversion.changeValue(parseFloat(event.target.value));
    }
  };

  return (
    <div className='firstCurrency'>
      <label htmlFor="moneyValue">Valor</label>
      <input
        type="number"
        id="moneyValue"
        name="moneyValue"
        onChange={(event) => setMoneyValue(parseFloat(event.target.value))}
        aria-label="Insira o valor"
      />
      <label htmlFor="currencySelect">Converter de</label>
      <select data-testid="currencyid1" id="currencySelect" onChange={handleChange} aria-label="Selecione a moeda">
        {currency.map((currency, index) => (
          <option key={index} value={currencyRate[index].toString()}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};


export default FirstCurrency;
