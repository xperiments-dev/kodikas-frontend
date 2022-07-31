import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const formatTime = (createdAt: string) => {
  const now = dayjs();
  return dayjs(createdAt).from(now);
};
