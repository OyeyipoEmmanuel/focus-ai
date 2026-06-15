import { MdOutlineDangerous } from "react-icons/md";
import { Button } from "antd";
import ModalComponent from "../../../../components/modal/ModalComponent";
import { deleteJournalFromDb } from "../../../../api/dashboardAPI/JournalApi/deleteJournalFromDb";

type ConfirmDeleteJournalProps = {
  journalId: string;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  onDeleted: () => void;
  onError: (message: string) => void;
};

const ConfirmDeleteJournal = ({
  journalId,
  openModal,
  setOpenModal,
  onDeleted,
  onError,
}: ConfirmDeleteJournalProps) => {
  const handleDelete = async () => {
    const res = await deleteJournalFromDb(journalId);

    if (res === "Journal Deleted!") {
      setOpenModal(false);
      onDeleted();
      return;
    }

    onError(res);
  };

  return (
    <ModalComponent open={openModal} onCancel={() => setOpenModal(false)}>
      <section className="mx-auto flex flex-col items-center space-y-4">
        <MdOutlineDangerous className="text-7xl text-red-500" />

        <p className="text-4xl text-black/70">Are you Sure?</p>

        <p className="text-center text-[15px] text-black/40">
          Do you really want to delete this journal entry? This process cannot
          be undone.
        </p>

        <div className="flex flex-row items-center space-x-4">
          <button
            type="button"
            className="cursor-pointer rounded-md border border-black/40 px-4 py-1"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>

          <Button
            danger
            style={{
              background: "red",
              color: "white",
              padding: "4px 16px 4px 16px",
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </section>
    </ModalComponent>
  );
};

export default ConfirmDeleteJournal;
