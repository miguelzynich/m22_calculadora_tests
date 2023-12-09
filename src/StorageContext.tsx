import React, { ReactNode, createContext, useContext, useState } from 'react'

interface StorageContextValue {
    value: string[]
    storageValue: (newValue: string) => void
}

interface Props {
    children: ReactNode
}

export const StorageContext = createContext<StorageContextValue | undefined>(undefined)

const StorageProvider: React.FC<Props> = ({ children }) => {
	const [value, setValue] = useState<string[]>([]) 

	const storageValue = (newValue: string) => {
		if (newValue != '0') {
			setValue((prevValue)=> [...prevValue, newValue])
		}
	}

	return <StorageContext.Provider value={{
		value,
		storageValue
	}}>{children}</StorageContext.Provider>
}

export const useStorage = () => {
	const context = useContext(StorageContext)
	return context
}

export default StorageProvider