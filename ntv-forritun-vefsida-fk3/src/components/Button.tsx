type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement> 
  text?: string
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary'
}

export function Button(value: 'Submit') {

}