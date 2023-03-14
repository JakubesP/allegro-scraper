import dotenv from 'dotenv';
import mongoose from 'mongoose';

export const config = async () => {
  dotenv.config();
  const {
    PAGE_URL,
    PAGES_NUMBER,
    MONGO_DB_URL,
    MONGO_DB_NAME,
    BUTTON_ACTIONS_DELAY,
    HEADLESS,
  } = process.env;
  if (
    !(
      PAGE_URL &&
      PAGES_NUMBER &&
      MONGO_DB_URL &&
      MONGO_DB_NAME &&
      BUTTON_ACTIONS_DELAY &&
      HEADLESS
    )
  )
    throw new Error('Invalid config');

  await mongoose.connect(MONGO_DB_URL, {
    dbName: MONGO_DB_NAME,
  });

  return {
    pageUrl: PAGE_URL,
    pagesNumber: Number(PAGES_NUMBER),
    timestamp: Date.now(),
    buttonActionsDelay: Number(BUTTON_ACTIONS_DELAY),
    headless: HEADLESS === 'true',
  };
};
