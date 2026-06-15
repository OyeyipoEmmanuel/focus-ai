import React, { useMemo } from "react";
import type { CalendarProps } from "antd";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import type { addEventValidationSchemaType } from "../../schemas/events/addEventValidationSchema";
import { getEventTypeColor } from "../../constants/eventTypeColors";

type CalenderComponentProps = {
  events: addEventValidationSchemaType[];
};

const CalenderComponent: React.FC<CalenderComponentProps> = ({ events }) => {
  const eventsByDate = useMemo(() => {
    const map = new Map<string, addEventValidationSchemaType[]>();

    events.forEach((event) => {
      if (!event.eventDate) return;

      const existing = map.get(event.eventDate) ?? [];
      existing.push(event);
      map.set(event.eventDate, existing);
    });

    return map;
  }, [events]);

  const dateCellRender = (value: Dayjs) => {
    const dayEvents = eventsByDate.get(value.format("YYYY-MM-DD")) ?? [];

    return (
      <ul className="events">
        {dayEvents.map((event) => (
          <li key={event.id ?? `${event.eventName}-${event.eventDate}`}>
            <span className="flex items-center gap-1">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: getEventTypeColor(event.eventType) }}
              />
              <span className="truncate text-xs">{event.eventName}</span>
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") {
      return dateCellRender(current);
    }
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default CalenderComponent;
