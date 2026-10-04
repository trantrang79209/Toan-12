import { ErrorCode, ExamFeedback, RemedialStep, UserAnswer } from '../types/math';
import { ERROR_CATEGORIES } from '../data/errorCategories';

export function generateAutomatedFeedback(
  answers: UserAnswer[],
  errorDistribution: Record<ErrorCode, number>,
  score: number,
  totalQuestions: number
): ExamFeedback {
  // Determine dominant error
  let maxErrorCount = 0;
  let dominantErrorCode: ErrorCode | undefined = undefined;

  const codes: ErrorCode[] = ['KT', 'TT', 'PP', 'DG', 'SU', 'QT', 'MH'];
  for (const code of codes) {
    const count = errorDistribution[code] || 0;
    if (count > maxErrorCount) {
      maxErrorCount = count;
      dominantErrorCode = code;
    }
  }

  // Grade badge & headline
  let gradeBadge = 'Cần nỗ lực';
  let headline = 'Cần rà soát lại phương pháp học';

  if (score >= 9.0) {
    gradeBadge = 'Xuất sắc';
    headline = 'Phong độ xuất sắc! Nắm rất chắc tư duy toán 12';
  } else if (score >= 8.0) {
    gradeBadge = 'Giỏi';
    headline = 'Kết quả rất tốt! Chỉ còn một số bẫy nhỏ cần hoàn thiện';
  } else if (score >= 6.5) {
    gradeBadge = 'Khá';
    headline = 'Nền tảng khá tốt, cần triệt tiêu các lỗi mất điểm kinh điển';
  } else if (score >= 5.0) {
    gradeBadge = 'Trung bình';
    headline = 'Cần củng cố gấp các quy tắc tính toán và đọc hiểu đề';
  } else {
    gradeBadge = 'Cần bồi dưỡng';
    headline = 'Lỗ hổng kiến thức và kỹ năng cần được khắc phục ngay';
  }

  // Construct diagnosis and pedagogical advice
  let diagnosisText = '';
  let pedagogicalAdvice = '';
  const remedialSteps: RemedialStep[] = [];

  if (dominantErrorCode) {
    const errorInfo = ERROR_CATEGORIES[dominantErrorCode];
    diagnosisText = `Điểm yếu trọng tâm nhất trong bài thi này là ${errorInfo.name} (${maxErrorCount}/${totalQuestions - answers.filter(a => a.isCorrect).length} câu sai). ${errorInfo.description}`;

    switch (dominantErrorCode) {
      case 'KT':
        pedagogicalAdvice = 'Bạn đang bị "hổng chân đế" lý thuyết: quên điều kiện tồn tại, nhầm công thức đạo hàm hoặc điều kiện cực trị. Hãy dừng việc làm đề tràn lan, mở lại Sách giáo khoa đọc kỹ từng định lý và điều kiện nghiệm.';
        remedialSteps.push({
          step: 1,
          title: 'Đọc lại lý thuyết định lý & điều kiện xác định',
          detail: 'Xem lại mục 1 và 2 trong Sách giáo khoa điện tử, ghi chép lại các điều kiện nghiệm bội chẵn và điều kiện phân thức.',
          actionLessonId: 'lesson-1-1',
          actionType: 'read_textbook'
        });
        remedialSteps.push({
          step: 2,
          title: 'Luyện đề củng cố 10 câu chuyên trị Lỗi Kiến Thức (KT)',
          detail: 'Tạo bài thi tùy chỉnh chỉ chọn nhóm lỗi "Lỗi kiến thức" để rèn phản xạ nhận diện bẫy định nghĩa.',
          actionErrorCode: 'KT',
          actionType: 'drill_error'
        });
        remedialSteps.push({
          step: 3,
          title: 'Thi lại bài kiểm tra tổng hợp',
          detail: 'Làm lại bài thi ngẫu nhiên để xác nhận không còn mất điểm ở các câu hỏi nhận biết - thông hiểu.',
          actionType: 'retest'
        });
        break;

      case 'TT':
        pedagogicalAdvice = 'Bạn hiểu cách làm nhưng bị mất điểm do "tai nạn số học": sai dấu âm, rút gọn phân thức ẩu, bấm máy tính thiếu ngoặc. Lỗi này làm lãng phí rất nhiều công sức tư duy!';
        remedialSteps.push({
          step: 1,
          title: 'Xây dựng thói quen nháp 2 cột và kiểm tra dấu',
          detail: 'Luôn đưa đa thức về thứ tự chuẩn bậc giảm dần trước khi tính ad - bc hoặc tích có hướng Oxyz.',
          actionType: 'read_textbook'
        });
        remedialSteps.push({
          step: 2,
          title: 'Luyện 15 câu chống sai sót Tính toán & Biến đổi (TT)',
          detail: 'Luyện tập chế độ bài thi tập trung nhóm lỗi TT để tăng độ chuẩn xác từng phép tính.',
          actionErrorCode: 'TT',
          actionType: 'drill_error'
        });
        remedialSteps.push({
          step: 3,
          title: 'Luyện thói quen kiểm tra Casio u.w = 0',
          detail: 'Thực hành thao tác thử lại nghiệm bằng máy tính cầm tay trong 15 giây cuối mỗi câu.',
          actionType: 'retest'
        });
        break;

      case 'DG':
        pedagogicalAdvice = 'Bạn hay bị "bẫy thị giác và ngôn từ": nhầm đồ thị f(x) thành f\'(x), nhầm điểm cực trị x với giá trị cực trị y, hoặc đọc lướt câu hỏi mệnh đề đúng/sai.';
        remedialSteps.push({
          step: 1,
          title: 'Quy tắc "Gạch chân 3 từ khóa" khi đọc đề',
          detail: 'Trước khi đặt bút giải, luôn gạch chân: 1. Tên đồ thị (f hay f\'); 2. Hỏi x hay y; 3. Chọn Đúng hay Sai.',
          actionType: 'read_textbook'
        });
        remedialSteps.push({
          step: 2,
          title: 'Thực hành 10 câu bẫy Đọc hiểu & Dữ liệu (DG)',
          detail: 'Tập trung giải các bài toán nhận diện đồ thị đạo hàm và phân biệt bộ 3 khái niệm cực trị.',
          actionErrorCode: 'DG',
          actionType: 'drill_error'
        });
        remedialSteps.push({
          step: 3,
          title: 'Tự kiểm tra phản xạ đọc đề',
          detail: 'Tạo bài thi 15 câu với thời gian chuẩn để rèn luyện sự bình tĩnh và tập trung cao độ.',
          actionType: 'retest'
        });
        break;

      case 'PP':
        pedagogicalAdvice = 'Bạn đang chọn hướng đi cồng kềnh hoặc lạm dụng công thức tắt mà không hiểu điều kiện bài toán bị biến dạng. Cần học cách tối ưu con đường giải ngắn nhất và an toàn nhất.';
        remedialSteps.push({
          step: 1,
          title: 'Đối chiếu phương pháp đại số vs tọa độ hóa Oxyz',
          detail: 'Học lại các dạng toán tối ưu và điều kiện của các công thức cực trị tính nhanh.',
          actionType: 'read_textbook'
        });
        remedialSteps.push({
          step: 2,
          title: 'Luyện bài tập Vận dụng nhóm Phương pháp (PP)',
          detail: 'Giải 10 câu chọn lọc yêu cầu so sánh và chọn con đường giải tối ưu.',
          actionErrorCode: 'PP',
          actionType: 'drill_error'
        });
        remedialSteps.push({
          step: 3,
          title: 'Kiểm tra tốc độ và phương pháp giải',
          detail: 'Làm đề thi ngẫu nhiên để rèn thấu đáo tư duy giải quyết vấn đề.',
          actionType: 'retest'
        });
        break;

      case 'SU':
        pedagogicalAdvice = 'Lập luận toán học của bạn còn mang tính ngộ nhận, thừa nhận chiều đảo mà chưa chứng minh, hoặc kết luận tập hợp sai quy chuẩn (như dùng dấu hợp ∪ cho khoảng đơn điệu).';
        remedialSteps.push({
          step: 1,
          title: 'Ôn tập tính chặt chẽ trong suy luận toán học',
          detail: 'Đọc kỹ chuyên đề tính đơn điệu và định lý dấu hiệu cực trị 1 & 2 trong Sách giáo khoa.',
          actionLessonId: 'lesson-1-1',
          actionType: 'read_textbook'
        });
        remedialSteps.push({
          step: 2,
          title: 'Luyện đề nhóm Lỗi Suy luận & Lập luận (SU)',
          detail: 'Thực hành các câu hỏi bẫy logic và mệnh đề tương đương.',
          actionErrorCode: 'SU',
          actionType: 'drill_error'
        });
        remedialSteps.push({
          step: 3,
          title: 'Tự diễn giải lời giải bằng lời',
          detail: 'Tập giải thích lý do vì sao mỗi phương án sai trước khi chọn phương án đúng.',
          actionType: 'retest'
        });
        break;

      case 'QT':
        pedagogicalAdvice = 'Bạn có kiến thức tốt nhưng thường đốt cháy giai đoạn: bỏ quên bước thử lại tham số m, không xét các đầu mút của đoạn khi tìm GTLN/GTNN, hoặc giải xong không đối chiếu điều kiện.';
        remedialSteps.push({
          step: 1,
          title: 'Nắm vững quy trình chuẩn 3 bước giải toán',
          detail: 'Xem lại bài 2 và bài 3: Quy tắc bắt buộc thử lại nghiệm cực trị và so sánh mút [a; b].',
          actionLessonId: 'lesson-1-2',
          actionType: 'read_textbook'
        });
        remedialSteps.push({
          step: 2,
          title: 'Luyện bài tập nhóm Lỗi Quy trình giải (QT)',
          detail: 'Luyện các bài toán tham số và giá trị lớn nhất nhỏ nhất có bẫy đầu mút.',
          actionErrorCode: 'QT',
          actionType: 'drill_error'
        });
        remedialSteps.push({
          step: 3,
          title: 'Thi lại để rèn tính cẩn trọng',
          detail: 'Kiểm soát nhịp độ làm bài, dành 30 giây cuối câu để soát lại bước thử nghiệm.',
          actionType: 'retest'
        });
        break;

      case 'MH':
        pedagogicalAdvice = 'Bạn gặp khó khăn khi chuyển tải bài toán thực tế GDPT 2018 (tối ưu chi phí, diện tích, thể tích) sang mô hình hàm số toán học, hay quên điều kiện vật lý thực tế của ẩn.';
        remedialSteps.push({
          step: 1,
          title: 'Học lại quy trình mô hình hóa toán học thực tiễn',
          detail: 'Đọc bài 3 mục 2: Phân tích bài toán chiếc hộp không nắp và bài toán hàng rào vườn.',
          actionLessonId: 'lesson-1-3',
          actionType: 'read_textbook'
        });
        remedialSteps.push({
          step: 2,
          title: 'Luyện tập các bài toán thực tiễn (MH)',
          detail: 'Thực hành 10 bài toán thực tế đời sống để thuần thục cách đặt ẩn và hàm mục tiêu.',
          actionErrorCode: 'MH',
          actionType: 'drill_error'
        });
        remedialSteps.push({
          step: 3,
          title: 'Đánh giá lại kỹ năng ứng dụng thực tế',
          detail: 'Làm bài kiểm tra có tỉ lệ cao các câu hỏi toán ứng dụng.',
          actionType: 'retest'
        });
        break;
    }
  } else {
    diagnosisText = 'Xin chúc mừng! Bạn đã hoàn thành bài thi với kết quả tuyệt đối hoặc không mắc lỗi sai đáng kể nào.';
    pedagogicalAdvice = 'Hãy duy trì phong độ này bằng cách thử sức với các đề thi có độ khó Vận dụng cao (VDC) hoặc thử sức tạo các đề thi nâng cao ngẫu nhiên 20 câu.';
    remedialSteps.push({
      step: 1,
      title: 'Duy trì luyện tập nâng cao hàng tuần',
      detail: 'Tự tạo đề thi 20 câu tổng hợp từ tất cả các chương để rèn tốc độ tư duy.',
      actionType: 'retest'
    });
    remedialSteps.push({
      step: 2,
      title: 'Khám phá các chương học tiếp theo trong Sách giáo khoa',
      detail: 'Tiếp tục học tập các bài học Chương 2 và Chương 3 để đón đầu kiến thức thi THPT.',
      actionLessonId: 'lesson-2-1',
      actionType: 'read_textbook'
    });
  }

  return {
    headline,
    gradeBadge,
    dominantErrorCode,
    diagnosisText,
    pedagogicalAdvice,
    remedialSteps
  };
}
