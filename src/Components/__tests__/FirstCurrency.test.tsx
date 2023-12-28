import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FirstCurrency from '../firstCurrency/FirstCurrency';

jest.mock('../../ConversionContext', () => ({
  useConversion: jest.fn(),
}));

describe('FirstCurrency Component', () => {
  it('should update values when input changes', async () => {
    const setFirstCurrencyValueMock = jest.fn();
    const setMoneyValueMock = jest.fn();

    const mockConversion = {
      value: 1,
      changeValue: jest.fn(),
    };
    jest.spyOn(mockConversion, 'changeValue');

    jest.requireMock('../../ConversionContext').useConversion.mockReturnValue(mockConversion);

    render(
      <FirstCurrency
        currency={['USD', 'EUR']}
        currencyRate={[1, 1.2]}
        setFirstCurrencyValue={setFirstCurrencyValueMock}
        setMoneyValue={setMoneyValueMock}
      />
    );

    userEvent.type(screen.getByLabelText(/insira o valor/i), '42');

    await waitFor(() => {
      expect(mockConversion.changeValue).toHaveBeenCalledWith(42);
    });
    
    await act(async () => {
      expect(setFirstCurrencyValueMock).toHaveBeenCalledWith(1.2);
      expect(setMoneyValueMock).toHaveBeenCalledWith(42);
    });
  });
});
