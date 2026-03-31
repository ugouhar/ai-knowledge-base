import { SUBSCRIBED_NOTES } from "@/lib/constants";

export const getAllSubscribers = (): number[] => {
  const subscribedNotes: number[] = JSON.parse(
    sessionStorage.getItem(SUBSCRIBED_NOTES) || "[]",
  );
  return subscribedNotes;
};

export const addSubscriber = (id: number): void => {
  const subscribedNotes = getAllSubscribers();
  subscribedNotes.push(id);
  sessionStorage.setItem(SUBSCRIBED_NOTES, JSON.stringify(subscribedNotes));
};

export const removeSubscriber = (id: number): void => {
  const subscriberList = getAllSubscribers();
  sessionStorage.setItem(
    SUBSCRIBED_NOTES,
    JSON.stringify(subscriberList.filter((item) => item !== id)),
  );
};

export const isSubscribed = (id: number): boolean => {
  const subscribedNotes = getAllSubscribers();
  return subscribedNotes.includes(id);
};
