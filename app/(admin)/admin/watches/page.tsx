import getAllWatches from "@/actions/getAllWatches";
import AdminWatchesClient from "./components/AdminWatchesClient";

const AdminWatchesPage = async () => {
  const watches = await getAllWatches();

  return (
    <>
      <AdminWatchesClient watches={watches} />
    </>
  );
};

export default AdminWatchesPage;
