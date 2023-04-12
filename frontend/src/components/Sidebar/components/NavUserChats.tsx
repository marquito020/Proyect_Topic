import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { RiChat4Line } from "react-icons/ri";

import { RootState } from "../../../redux/store";
import { useGetUserChatsQuery } from "../../../services/chat.service";

function NavUserChats() {
  const user = useSelector((state: RootState) => state.user);
  const { data, isLoading, error, isError } = useGetUserChatsQuery(user._id);

  if (isLoading) return <div>Loading chats</div>;
  else if (isError)
    return (
      <div>
        Error: <>{error}</>
      </div>
    );

  return (
    <>
      {data?.map((chat) => (
        <li key={chat._id}>
          <NavLink
            to={`/chats/${chat._id}`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#131517] "
                : "flex items-center mb-1 gap-4 hover:bg-[#131517] transition-colors py-2 px-4 rounded-lg"
            }
          >
            <RiChat4Line />
            {`Chat: ${chat._id?.substring(0, 8)}...`}
          </NavLink>
        </li>
      ))}
    </>
  );
}

export default NavUserChats;
