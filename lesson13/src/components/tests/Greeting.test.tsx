import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Greeting } from "./Greeting";

describe('Greeting', async () => {
  const user = userEvent.setup();

  it('Should render', () => {
    render(<Greeting/>);
    expect(screen.findByRole('textbox', {name: /Nafn/i})).toBeTruthy()
  })

  it('Should say "Halló, {userInput}!"', async () => {
    render(<Greeting/>);

    await user.keyboard('odinn')
    await user.click(screen.getByRole('button', {name: /Senda/i}))

    expect(screen.findByText('Halló, odinn!')).toBeTruthy()
  })
});
