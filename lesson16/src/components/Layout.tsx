import { Outlet, useNavigate } from 'react-router-dom';

const navClass = ({isActive}: {isActive: boolean}) => {
  return [
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-primary text-primary-foreground'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
  ].join(' ');
}

export function Layout() {
  const navTo = useNavigate();

  return (
    <div className="bg-background min-h-screen">
      <header className="border-border bg-card/50 border-b backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <p className="text-foreground text-sm font-semibold tracking-tight">
            Lesson 16
          </p>
          <nav className="flex flex-wrap gap-2" aria-label="Main navigation">
            
            <button
              type="button"
              className={navClass({isActive: false})}
              onClick={() => navTo('/')}
            >
              Home
            </button>
            
            <button
              type="button"
              className={navClass({isActive: false})}
              onClick={() => navTo('about', )}
            >
              About
            </button>
            <button
              type="button"
              className={navClass({isActive: false})}
              onClick={() => navTo('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={navClass({isActive: false})}
              onClick={() => navTo('signup')}
            >
              Signup
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Outlet/>
      </main>
    </div>
  );
}
