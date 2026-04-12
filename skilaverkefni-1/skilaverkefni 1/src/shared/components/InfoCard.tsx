import { Button } from "@/shared/components/ui/button";

type props = {
  infoOnSquare?: string;
  middleButton?: boolean;
  textOnButton?: string;
  bottomText?: string | number;
  onClick?: () => void
}

export function InfoCard({ infoOnSquare, bottomText, middleButton, textOnButton, onClick }: props) {
  if (middleButton) {
    return (
      <div className="rounded-lg border border-border/60 bg-card/70 p-3 bg-linear-to-br from-indigo-500 to-muted/50 shadow-lg shadow-black/50">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{infoOnSquare}</p>
        <p className="text-sm font-medium">{bottomText}</p>
        <Button type="button" className="bg-blue-700" onClick={onClick}>{textOnButton}</Button>
      </div>
    )
  }

  return (

    <div className="rounded-lg border border-border/60 bg-card/70 p-3 bg-linear-to-br from-indigo-500 to-muted/50 shadow-lg shadow-black/50">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{infoOnSquare}</p>
      <p className="text-sm font-medium">{bottomText}</p>
    </div>

  )
}