import React, { ReactNode, createContext, useContext, useState } from 'react'

interface ConversionContextValue {
    value: number
    changeValue: (newValue: number) => void
}

interface Props {
    children: ReactNode
}

export const ConversionContext = createContext<ConversionContextValue | undefined>(undefined)

const ConversionProvider: React.FC<Props> = ({ children }) => {
	const [value, setValue] = useState(0) 

	const changeValue = (newValue: number) => {
		setValue(newValue)
	}

	return <ConversionContext.Provider value={{
		value,
		changeValue
	}}>{children}</ConversionContext.Provider>
}

export const useConversion = () => {
	const context = useContext(ConversionContext)
	return context
}

export default ConversionProvider