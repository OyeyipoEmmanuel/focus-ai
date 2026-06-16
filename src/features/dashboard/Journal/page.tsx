import { useEffect, useState } from "react";
import dayjs from "dayjs";
import useNotification from "antd/es/notification/useNotification";
import JournalEditor from "./components/JournalEditor";
import AiInsightsSection from "./components/AiInsightsSection";
import JournalEntries from "./components/JournalEntries";
import { getAllJournals } from "../../../api/dashboardAPI/JournalApi/getJournals";
import { saveJournalToDb } from "../../../api/dashboardAPI/JournalApi/saveJournalToDb";
import type { journalValidationSchemaType } from "../../../schemas/journal/journalValidationSchema";

const Journal = () => {
  const [message, contextHolder] = useNotification();
  const [journalEntry, setJournalEntry] = useState("");
  const [todayEntryId, setTodayEntryId] = useState<string>();
  const [journals, setJournals] = useState<journalValidationSchemaType[]>([]);
  const [loadingJournals, setLoadingJournals] = useState(true);
  const [journalError, setJournalError] = useState<Error>();
  const [hasLocalChanges, setHasLocalChanges] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const unsubscribe = getAllJournals({
      onData(fetchedJournals) {
        setJournals(fetchedJournals);
        setLoadingJournals(false);
      },
      onError(error) {
        setJournalError(error);
        setLoadingJournals(false);
      },
    });

    return () => unsubscribe?.();
  }, []);

  useEffect(() => {
    if (hasLocalChanges) return;

    const todayJournal = journals.find(
      (journal) => journal.journalDate === today
    );

    if (todayJournal) {
      setJournalEntry(todayJournal.content);
      setTodayEntryId(todayJournal.id);
      return;
    }

    setJournalEntry("");
    setTodayEntryId(undefined);
  }, [journals, hasLocalChanges, today]);

  const handleEntryChange = (value: string) => {
    setHasLocalChanges(true);
    setJournalEntry(value);
  };

  const handleSave = async () => {
    if (!journalEntry.trim() || isSaving) return;

    setIsSaving(true);

    try {
      const existingTodayId =
        todayEntryId ??
        journals.find((journal) => journal.journalDate === today)?.id;

      const res = await saveJournalToDb({
        id: existingTodayId,
        content: journalEntry.trim(),
        journalDate: today,
      });

      if (res === "Authentication Error" || res === "An Error Occured!") {
        message.error({ message: res });
        return;
      }

      message.success({ message: res });
      setHasLocalChanges(false);
    } catch {
      message.error({ message: "An Error Occured!" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAnalyze = () => {
    if (!journalEntry.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setShowInsights(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowInsights(true);
    }, 1500);
  };

  const handleJournalDeleted = (journalId: string) => {
    if (journalId === todayEntryId) {
      setJournalEntry("");
      setTodayEntryId(undefined);
      setHasLocalChanges(false);
      setShowInsights(false);
    }
  };

  return (
    <main className="flex flex-col space-y-8">
      {contextHolder}

      <section>
        <h1 className="text-2xl font-semibold text-[#1E293B] md:text-4xl">
          Daily Journal
        </h1>
        <p className="mt-2 max-w-2xl text-sm font-light text-gray-500 md:text-base">
          Reflect on your day. AI will help summarize your progress, suggest
          tomorrow&apos;s priorities, and spot productivity patterns.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <JournalEditor
          value={journalEntry}
          onChange={handleEntryChange}
          onSave={handleSave}
          onAnalyze={handleAnalyze}
          isSaving={isSaving}
          isAnalyzing={isAnalyzing}
        />

        <AiInsightsSection
          isAnalyzing={isAnalyzing}
          showInsights={showInsights}
          hasEntry={journalEntry.trim().length > 0}
        />
      </section>

      <JournalEntries
        journals={journals}
        loading={loadingJournals}
        error={journalError}
        onJournalDeleted={handleJournalDeleted}
        onDeleteSuccess={(msg) => message.success({ message: msg })}
        onDeleteError={(msg) => message.error({ message: msg })}
      />
    </main>
  );
};

export default Journal;
