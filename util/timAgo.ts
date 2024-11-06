function timeAgo(createdAt: string) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  const secondsDiff = Math.floor((currentDate - createdDate) / 1000); // 초 단위 차이
  const minutesDiff = Math.floor(secondsDiff / 60); // 분 단위 차이
  const hoursDiff = Math.floor(minutesDiff / 60); // 시간 단위 차이
  const daysDiff = Math.floor(hoursDiff / 24); // 일 단위 차이

  if (hoursDiff < 1) {
    return `${secondsDiff}초 전`; // 1시간 미만
  } else if (hoursDiff < 24) {
    return `${hoursDiff}시간 전`; // 1일 미만
  } else {
    return `${daysDiff}일 전`; // 1일 이상
  }
}

export default timeAgo;
