import { useContext } from "react";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import OwnerPage from "./OwnerPage";
import ResidentPage from "./ResidentPage";

export default function HomePage() {
  const { userInfo } = useContext(UserContext) as UserContextType;
  const user = userInfo.user;

  return user.ownerToken ? <OwnerPage /> : <ResidentPage />;
}
