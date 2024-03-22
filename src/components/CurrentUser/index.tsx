import User from "@/interfaces/User";

const CurrentUser = ({user}: { user: User | null }) => {
  return (
    <div>
      {user ? `Hello, ${user.name}` : 'Loading...'}
    </div>
  );
}

export default CurrentUser;