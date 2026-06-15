import { useState } from "react";
import dayjs from "dayjs";
import CardUi from "../../Home/component/CardUi";
import emptyEventImg from "../../../../assets/noTaskIllustration-Photoroom.webp";
import type { journalValidationSchemaType } from "../../../../schemas/journal/journalValidationSchema";
import { LuNotebookPen } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import ConfirmDeleteJournal from "./ConfirmDeleteJournal";

type JournalEntriesProps = {
  journals: journalValidationSchemaType[];
  loading: boolean;
  error?: Error;
  onJournalDeleted: (journalId: string) => void;
  onDeleteError: (message: string) => void;
  onDeleteSuccess: (message: string) => void;
};

const JournalEntries = ({
  journals,
  loading,
  error,
  onJournalDeleted,
  onDeleteError,
  onDeleteSuccess,
}: JournalEntriesProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const today = dayjs().format("YYYY-MM-DD");

  const toggleExpanded = (id?: string) => {
    if (!id) return;
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <section className="flex flex-col space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-[#1E293B]">Your Journals</h2>
        <p className="text-sm font-light text-gray-500">
          All entries you&apos;ve saved, including today
        </p>
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-primaryblue-300 border-t-transparent" />
        </div>
      )}
      {error && <p className="text-sm text-red-500">An Error Occured</p>}

      {!loading && journals.length === 0 && (
        <span>
          <img
            src={emptyEventImg}
            alt="No journal entries"
            className="mx-auto w-full md:max-w-[70%] lg:max-w-[50%]"
          />
        </span>
      )}

      {!loading && journals.length > 0 && (
        <div className="flex flex-col space-y-3">
          {journals.map((journal) => {
            const isExpanded = expandedId === journal.id;
            const isToday = journal.journalDate === today;
            const formattedDate = dayjs(journal.journalDate).format(
              "dddd, MMMM D, YYYY"
            );

            return (
              <CardUi key={journal.id}>
                <div className="flex items-start space-x-3">
                  <span className="rounded-full bg-primaryblue-300/10 p-2 text-primaryblue-300">
                    <LuNotebookPen />
                  </span>

                  <div className="flex w-full flex-col space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#1E293B]">
                          {formattedDate}
                        </h3>
                        {isToday && (
                          <span className="rounded-full bg-primaryblue-300 px-2 py-0.5 text-xs text-white">
                            Today
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleExpanded(journal.id)}
                          className="cursor-pointer text-xs font-light text-gray-400 hover:text-gray-600"
                        >
                          {isExpanded ? "Hide" : "Read"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            journal.id && setDeleteTargetId(journal.id)
                          }
                          className="cursor-pointer text-red-500 hover:opacity-70"
                          aria-label="Delete journal entry"
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpanded(journal.id)}
                      className="w-full cursor-pointer text-left"
                    >
                      <p
                        className={`text-sm font-light text-black/60 ${isExpanded ? "" : "line-clamp-2"}`}
                      >
                        {journal.content}
                      </p>
                    </button>
                  </div>
                </div>
              </CardUi>
            );
          })}
        </div>
      )}

      {deleteTargetId && (
        <ConfirmDeleteJournal
          journalId={deleteTargetId}
          openModal={Boolean(deleteTargetId)}
          setOpenModal={(open) => {
            if (!open) setDeleteTargetId(null);
          }}
          onDeleted={() => {
            onDeleteSuccess("Journal Deleted!");
            onJournalDeleted(deleteTargetId);
            setDeleteTargetId(null);
          }}
          onError={(message) => {
            onDeleteError(message);
            setDeleteTargetId(null);
          }}
        />
      )}
    </section>
  );
};

export default JournalEntries;
