import {
  formatDistanceToNowStrict,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  differenceInMinutes,
} from 'date-fns';
import { ko } from 'date-fns/locale'; 

function dateFormat(dateInput) {
  const date = new Date(dateInput); 
  const now = new Date(); 

  if (date > now) {
    return formatDistanceToNowStrict(date, { addSuffix: true, locale: ko });
  }

  const hoursDiff = differenceInHours(now, date);
  const daysDiff = differenceInDays(now, date);
  const weeksDiff = differenceInWeeks(now, date);
  const monthsDiff = differenceInMonths(now, date);
  const yearsDiff = differenceInYears(now, date);


  // 1. 1시간~23시간 내: '시간' 단위
  if (hoursDiff >= 1 && hoursDiff <= 23) {
    return `${hoursDiff}시간 전`;
  }
  // 2. 24시간 이후~6일 이내: '일' 단위 
  else if (daysDiff >= 1 && daysDiff <= 6) {
    return `${daysDiff}일 전`;
  }
  // 3. 7일 이후~3주 이내: '주' 단위 
  else if (weeksDiff >= 1 && weeksDiff <= 3) {
    return `${weeksDiff}주일 전`;
  }
  // 4. 4주 이후~11개월 이내: '개월' 단위 
  else if (monthsDiff >= 1 && monthsDiff <= 11) {
    return `${monthsDiff}개월 전`;
  }
  // 5. 12개월 이후: '년' 단위
  else if (yearsDiff >= 1) {
    return `${yearsDiff}년 전`;
  }
  // 그 외 (1시간 미만): '방금 전' 또는 '분' 단위로 처리
  else {
    const minutesDiff = Math.round(differenceInMinutes(now, date));
    if (minutesDiff === 0) {
        return "방금 전";
    } else {
        return `${minutesDiff}분 전`;
    }
  }
}

export default dateFormat