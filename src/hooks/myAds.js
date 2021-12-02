import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GETYOURADS } from "../graphql/queries/getAds";

const UserAds = (userId) => {
  const { data, loading } = useQuery(GETYOURADS,{variables:{id:userId}});

  const myAds = useMemo(() => {
       return data;
  }, [data]);

  return {
    myAds,
    loading,
  };
};

export default UserAds;
