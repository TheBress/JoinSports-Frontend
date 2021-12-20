import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GETEVENTSCALENDAR } from "../graphql/queries/getEventsCalendar";

export const UserEventsCalendar = (userId, from, to, title) => {
  const {
    data,
    loading,
    refetch: refetchEvents,
  } = useQuery(GETEVENTSCALENDAR, {
    variables: { id: userId, from: from, to: to, title: title },
  });

  const eventsCalendar = useMemo(() => {
    return data;
  }, [data]);

  return {
    eventsCalendar,
    loading,
    refetchEvents,
  };
};
