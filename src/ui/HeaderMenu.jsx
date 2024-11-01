import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          {/* <HiOutlineUser /> */}
          <UserAvatar />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon>
          <Logout />
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
