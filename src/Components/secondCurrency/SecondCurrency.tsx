import React, { ChangeEvent, useEffect } from 'react';
import { useConversion } from '../../ConversionContext';
import './styles.css';

interface SecondProps {
  currency: string[];
  currencyRate: number[];
  setSecondCurrencyValue: React.Dispatch<React.SetStateAction<number>>;
}

const SecondCurrency: React.FC<SecondProps> = ({ currency, currencyRate, setSecondCurrencyValue }) => {
  const conversion = useConversion();

  useEffect(() => {
    if (conversion) {
      setSecondCurrencyValue(conversion.value);
    }
  }, [conversion, setSecondCurrencyValue]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (conversion) {
      conversion.changeValue(parseFloat(event.target.value));
    }
  };

  // Certifique-se de retornar algo do componente
  return (
    <div className='secondCurrency'>
      <label>Para</label>
      <select data-testid="currencyid2" id="currencySelect" onChange={handleChange} aria-label="Selecione a moeda">
        {currency.map((currency, index) => (
          <option key={index} value={currencyRate[index].toString()}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SecondCurrency;
