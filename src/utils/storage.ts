import { ExamResult, ErrorCode } from '../types/math';

const STORAGE_KEY_RESULTS = 'toan12_exam_results_v1';
const STORAGE_KEY_COMPLETED_LESSONS = 'toan12_completed_lessons_v1';

export function getExamHistory(): ExamResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_RESULTS);
    if (!data) return [];
    return JSON.parse(data) as ExamResult[];
  } catch {
    return [];
  }
}

export function saveExamResult(result: ExamResult): void {
  try {
    const history = getExamHistory();
    const updated = [result, ...history];
    localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(updated.slice(0, 50))); // Keep last 50
  } catch (e) {
    console.error('Failed to save exam result', e);
  }
}

export function clearExamHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_RESULTS);
  } catch (e) {
    console.error('Failed to clear exam history', e);
  }
}

export function getCompletedLessons(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_COMPLETED_LESSONS);
    if (!data) return ['lesson-1-1'];
    return JSON.parse(data) as string[];
  } catch {
    return ['lesson-1-1'];
  }
}

export function toggleLessonCompleted(lessonId: string): string[] {
  try {
    const current = getCompletedLessons();
    let updated: string[];
    if (current.includes(lessonId)) {
      updated = current.filter(id => id !== lessonId);
    } else {
      updated = [...current, lessonId];
    }
    localStorage.setItem(STORAGE_KEY_COMPLETED_LESSONS, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function calculateCumulativeErrorStats(): Record<ErrorCode, number> {
  const history = getExamHistory();
  const totals: Record<ErrorCode, number> = {
    KT: 0,
    TT: 0,
    PP: 0,
    DG: 0,
    SU: 0,
    QT: 0,
    MH: 0
  };

  history.forEach(res => {
    (Object.keys(res.errorDistribution) as ErrorCode[]).forEach(code => {
      totals[code] = (totals[code] || 0) + (res.errorDistribution[code] || 0);
    });
  });

  return totals;
}
