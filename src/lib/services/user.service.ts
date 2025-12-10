import storage, { StorageKey } from "@/lib/storage.util";
import { ContactInfo } from "@/types/main";
import posthog from "posthog-js";

export const persistUserInfo = (userInfo: ContactInfo) => {
  posthog.identify(userInfo.email, {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
  });
  storage.set(StorageKey.USER_INFO, userInfo, {
    expiration: 1000 * 60 * 60 * 24 * 2, // 2 days
  });
}

export const getUserInfo = (): ContactInfo | null => {
  return storage.get<ContactInfo>(StorageKey.USER_INFO) || null;
}

export const getUserDistinctId = () => {
  const distinctId = storage.get<string>(StorageKey.USER_DISTINCT_ID) || null;

  if (!distinctId) {
    const newDistinctId = crypto.randomUUID();
    storage.set(StorageKey.USER_DISTINCT_ID, newDistinctId, {
      expiration: 1000 * 60 * 60 * 24 * 30, // 2 days
    });
    return newDistinctId;
  }

  return distinctId;
}