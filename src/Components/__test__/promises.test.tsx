import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainComponent from '../mainComponent/MainComponent';
import { Response as FetchResponse } from 'node-fetch'; // Renomeie o tipo para evitar conflitos de nome


jest.mock('node-fetch');
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

describe('MainComponent', () => {
  let currencySelect: HTMLElement;

  beforeEach(async () => {
    const currencyApi = {
      base: 'USD',
      date: '2018-02-13',
      rates: {
        CAD: 1.260046,
        CHF: 0.933058,
        EUR: 0.806942,
        GBP: 0.719154,
        USD: 1.0,
      },
    };
    
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(currencyApi),
      headers: { 'Content-Type': 'application/json' },
      ok: true,
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'basic',
      url: 'https://example.com',
      clone: jest.fn(),
    } as unknown as Response);

    // Renderiza o componente
    render(<MainComponent />);

    // Espera até que os dados da API sejam carregados
    await waitFor(() => {
      expect(screen.getByText(/Conversão de valores/i)).toBeInTheDocument();
    });

    // Define a variável currencySelect
  });

  test('renders MainComponent and performs conversion', async () => {
    // Verifica se as opções estão disponíveis
    await waitFor(() => {
      const options1 = screen.getAllByTestId('currencyid1')
      const options2 = screen.getAllByTestId('currencyid2')


      // Verifica se cada opção é única
      const uniqueValues1 = new Set(options1.map((option) => option.textContent));
      expect(uniqueValues1.size).toBe(options1.length);

      const uniqueValues2 = new Set(options2.map((option) => option.textContent));
      expect(uniqueValues2.size).toBe(options2.length);
    });

    // Simula a seleção das moedas e inserção de valores
    userEvent.selectOptions(screen.getByLabelText(/Converter de/i), 'USD');
    //userEvent.selectOptions(screen.getByLabelText(/Para/i), 'USD');
    userEvent.type(screen.getByLabelText(/Insira o valor/i), '10');

    // Simula o clique no botão de conversão
    userEvent.click(screen.getByText(/Conversor/i));

    // Espera até que o resultado da conversão seja exibido
    await waitFor(() => {
      expect(screen.getByTestId('finalValue')).toBeInTheDocument();
    });

  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
