import React, { useEffect, useState } from 'react'
import { useStorage } from '../../StorageContext'
import './styles.css'

interface StorageProps {
  finalValue: number
}

const StorageComponent: React.FC<StorageProps> = ({ finalValue }) => {
  const [data, setData] = useState<string>(localStorage.getItem('dados') || '')
  const [visible, setVisible] = useState<boolean>(false)
  const storage = useStorage()

  useEffect(() => {
    setData(finalValue.toString())
  }, [finalValue])

  useEffect(() => {
    storage?.storageValue(data)
  }, [data])

  const handleClick = () => {
    setVisible((prevVisible) => !prevVisible)
  }

  return (
    <div className='storageComponent'>
      <button onClick={handleClick}>Exibir resultados passados</button>
      {storage ? (
        visible && (
          <div>
            {storage.value.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )
      ) : (
        <p>Contexto de armazenamento não disponível.</p>
      )}
    </div>
  )
}

export default StorageComponent
