import storage, { StorageKey } from "@/lib/storage.util";
import { ContactInfo } from "@/types/main";

export const persistUserInfo = (userInfo: ContactInfo) => {
  storage.set(StorageKey.USER_INFO, userInfo, {
    expiration: 1000 * 60 * 60 * 24 * 2, // 2 days
  });
}

export const getUserInfo = (): ContactInfo | null => {
  return storage.get<ContactInfo>(StorageKey.USER_INFO) || null;
}