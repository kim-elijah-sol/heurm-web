export type AnalyticsResult =
  | 0 // 미수행
  | 1 // 거의 미수행
  | 2 // 대부분 수행
  | 3 // 완벽 수행
  | 'rest' // 쉬는 날
  | 'past'; // flow 가 등록되지 않은 날
