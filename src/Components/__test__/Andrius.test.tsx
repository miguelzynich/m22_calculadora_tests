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
    currencySelect = screen.getByLabelText(/Converter de/i);
  });

  test('renders MainComponent and performs conversion', async () => {
    // Verifica se as opções estão disponíveis
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options.length).toBe(4);

      // Verifica se cada opção é única
      const uniqueValues = new Set(options.map((option) => option.textContent));
      expect(uniqueValues.size).toBe(options.length);
    });

    // Simula a seleção das moedas e inserção de valores
    userEvent.selectOptions(currencySelect, 'USD');
    userEvent.selectOptions(screen.getByLabelText(/Para/i), 'EUR');
    userEvent.type(screen.getByLabelText(/Insira o valor/i), '10');

    // Simula o clique no botão de conversão
    userEvent.click(screen.getByText(/Converter/i));

    // Espera até que o resultado da conversão seja exibido
    await waitFor(() => {
      expect(screen.getByText(/Resultado da Conversão/i)).toBeInTheDocument();
    });

    // Verifica se o resultado da conversão foi renderizado corretamente
    expect(screen.getByText(/Resultado da Conversão/i)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
