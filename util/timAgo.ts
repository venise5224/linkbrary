function timeAgo(createdAt: string): string {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  const secondsDiff = Math.floor(
    (currentDate.getTime() - createdDate.getTime()) / 1000
  );
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);

  if (minutesDiff < 1) {
    return `${secondsDiff}초 전`;
  } else if (hoursDiff < 1) {
    return `${minutesDiff}분 전`;
  } else if (daysDiff < 1) {
    return `${hoursDiff}시간 전`;
  } else {
    return `${daysDiff}일 전`;
  }
}

export default timeAgo;
