import getAllBands from "@/actions/getAllBands";
import AdminBandsClient from "./components/AdminBandsClient";

const AdminBandsPage = async () => {
  const bands = await getAllBands();

  return (
    <>
      <AdminBandsClient bands={bands} />
    </>
  );
};

export default AdminBandsPage;
