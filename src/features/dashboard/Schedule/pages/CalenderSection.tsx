import { useEffect, useState } from "react";
import CalenderComponent from "../../../../components/Calender/Calender";
import { getAllEvents } from "../../../../api/dashboardAPI/EventsApi/getEvents";
import type { addEventValidationSchemaType } from "../../../../schemas/events/addEventValidationSchema";
import LoadingComponent from "../../../../components/loadingComponent/LoadingComponent";

const CalenderSection = () => {
  const [events, setEvents] = useState<addEventValidationSchemaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const unsubscribe = getAllEvents({
      onData(events) {
        setEvents(events);
        setLoading(false);
      },
      onError(error) {
        setError(error);
        setLoading(false);
      },
    });

    return () => unsubscribe?.();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <p>An Error Occured</p>;

  return (
    <main>
      <CalenderComponent events={events} />
    </main>
  );
};

export default CalenderSection;
