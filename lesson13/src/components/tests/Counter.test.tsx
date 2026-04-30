import { Counter } from "./Counter";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


describe('Counter', async () => {
  const user = userEvent.setup()

  it('Should render counter', async () => {
    render(<Counter/>);

    expect(screen.findByRole('button')).toBeTruthy()
  });
  
  it('Should decrement', async () => {
    render(<Counter/>);

    await user.click(screen.getByRole('button', {name: /Minnka/i}))

    expect(screen.getByText('-1')).toBeTruthy();
  })

  it('Should increment', async () => {
    render(<Counter/>);

    await user.click(screen.getByRole('button', {name: /Hækka/i}));

    expect(screen.getByText('1')).toBeTruthy();
 })

 it('Should reset', async () => {
  render(<Counter/>);

  await user.click(screen.getByRole('button', {name: /Hækka/i}))

  expect(screen.getByText('1')).toBeTruthy()

  await user.click(screen.getByRole('button', {name: /Endurstilla/i}));

  expect(screen.getByText('0')).toBeTruthy()
 })
});
