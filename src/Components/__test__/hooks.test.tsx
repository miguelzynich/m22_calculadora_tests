import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import StorageComponent from '../storageComponent/StorageComponent';
import StorageProvider from '../../StorageContext';

describe('StorageComponent', () => {
  it('should update storage value on button click', async () => {
    const { getByText, queryByText } = render(
      <StorageProvider>
        <StorageComponent finalValue={42} />
      </StorageProvider>
    );

    await waitFor(() => {
        expect(queryByText('Contexto de armazenamento não disponível.')).not.toBeInTheDocument();
    });

    
    act(() => {
        fireEvent.click(getByText('Exibir resultados passados'));
      });

      await waitFor(() => {
        expect(queryByText('Contexto de armazenamento não disponível.')).not.toBeInTheDocument();

    });
  });
});
