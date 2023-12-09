import React, { useEffect, useState } from 'react'
import ConversionContext from '../../ConversionContext'
import FirstCurrency from '../firstCurrency/FirstCurrency'
import './styles.css'
import SecondCurrency from '../secondCurrency/SecondCurrency'
import StorageContext from '../../StorageContext'
import StorageComponent from '../storageComponent/StorageComponent'

interface CurrencyApi {
  rates: Record<string, number>
}

const MainComponent: React.FC = () => {
	const [currency, setCurrency] = useState<string[]>([])
	const [currencyRate, setCurrencyRate] = useState<number[]>([])
	const [moneyValue, setMoneyValue] = useState<number>(0)
	const [firstCurrencyValue, setFirstCurrencyValue] = useState<number>(0)
	const [secondCurrencyValue, setSecondCurrencyValue] = useState<number>(0)
	const [finalValue, setFinalValue] = useState<number>(0)

	useEffect(() => {
		fetch('http://data.fixer.io/api/latest?access_key=28de673aed819346e5898b32c3cedcd1')
			.then((res) => res.json())
			.then((result: CurrencyApi) => {
				const currencies: string[] = Object.keys(result.rates)
				const rates: number[] = Object.values(result.rates)
				setCurrency(currencies)
				setCurrencyRate(rates)
			})
	}, [])

	const handleClick = () => {
		const firstConversion = 1/firstCurrencyValue
		const secondConversion = firstConversion * secondCurrencyValue
		const convertedValue = parseFloat((secondConversion * moneyValue).toFixed(2))
		setFinalValue(convertedValue)
	}

	return (
		<div className="main">
			<h1>Conversão de valores</h1>
			<div className="mainContainer">
				<ConversionContext>
					<FirstCurrency setMoneyValue={setMoneyValue} setFirstCurrencyValue={setFirstCurrencyValue} currency={currency} currencyRate={currencyRate} />
				</ConversionContext>
				<ConversionContext>
					<SecondCurrency setSecondCurrencyValue={setSecondCurrencyValue} currency={currency} currencyRate={currencyRate} />
				</ConversionContext>
				<button onClick={handleClick}>Converter</button>
				<p>{finalValue === 0? null : finalValue}</p>
			</div>
			<StorageContext>
				<StorageComponent finalValue = {finalValue}/>
			</StorageContext>
		</div>
	)
}

export default MainComponent