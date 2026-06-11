import { useNavigate } from "react-router";

export const ProfilePageButton = () => {
  const nav = useNavigate();
  return (
    <button
      onClick={() => nav("/profile")}
      className="rounded-md bg-green-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-600"
    >
      Profile
    </button>
  )
}