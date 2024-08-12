import getAllUsers from "@/actions/getAllUsers";
import AdminUsersClient from "./components/AdminUsersClient";

const AdminUsersPage = async () => {
  const users = await getAllUsers();

  return (
    <>
      <AdminUsersClient users={users} />
    </>
  );
};

export default AdminUsersPage;
