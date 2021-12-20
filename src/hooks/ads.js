import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GETAD, GETADS, GET_LAST_ADS } from "../graphql/queries/getAds";

export const UserAds = (userId) => {
  const {
    data,
    loading,
    refetch: refetchAds,
  } = useQuery(GETADS, { variables: { id: userId } });

  const myAds = useMemo(() => {
    return data;
  }, [data]);

  return {
    myAds,
    loading,
    refetchAds,
  };
};

export const UserAd = (userId) => {
  const { data, loading } = useQuery(GETAD, { variables: { id: userId } });

  const Ad = useMemo(() => {
    return data;
  }, [data]);

  return {
    Ad,
    loading,
  };
};

export const LastAds = () => {
  const { data, loading } = useQuery(GET_LAST_ADS);

  const lastAds = useMemo(() => {
    return data;
  }, [data]);

  return {
    lastAds,
    loading,
  };
};
