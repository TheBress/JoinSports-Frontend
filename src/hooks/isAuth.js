import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { ISAUTH } from "../graphql/queries/isAuth";

const IsAuth = () => {
  const { data, loading } = useQuery(ISAUTH);
  const me = useMemo(() => {
     return data;
  }, [data]);

  return {
    me,
    loading,
  };
};

export default IsAuth;
