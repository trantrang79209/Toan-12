import { Question } from '../types/math';

export const QUESTIONS_BANK: Question[] = [
  // =========================================================================
  // CHƯƠNG 1: ỨNG DỤNG ĐẠO HÀM ĐỂ KHẢO SÁT VÀ VẼ ĐỒ THỊ HÀM SỐ
  // =========================================================================

  // --- BÀI 1: TÍNH ĐƠN ĐIỆU VÀ CỰC TRỊ CỦA HÀM SỐ ---
  {
    id: 'q-1-1-1',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-1',
    content: 'Cho hàm số y = (x + 2) / (x - 1). Khẳng định nào sau đây là ĐÚNG về tính đơn điệu của hàm số?',
    difficulty: 'NB',
    primaryErrorTrap: 'SU',
    trapDescription: 'Bẫy ký hiệu kết luận đồng biến/nghịch biến dùng dấu hợp ∪ hoặc tập hiệu \\.',
    recommendedTip: 'Tính chất đơn điệu chỉ định nghĩa trên từng khoảng riêng biệt rời nhau, dùng chữ "và".',
    options: [
      { id: 'A', text: 'Hàm số nghịch biến trên (-∞; 1) ∪ (1; +∞)', isCorrect: false, errorGroup: 'SU', errorNote: 'Dùng ký hiệu hợp "∪" là sai định nghĩa suy luận toán học cơ bản.' },
      { id: 'B', text: 'Hàm số nghịch biến trên từng khoảng (-∞; 1) và (1; +∞)', isCorrect: true },
      { id: 'C', text: 'Hàm số đồng biến trên từng khoảng (-∞; 1) và (1; +∞)', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính nhầm đạo hàm ad - bc = 1*(-1) - 2*1 = -3 < 0 thành số dương.' },
      { id: 'D', text: 'Hàm số nghịch biến trên R \\ {1}', isCorrect: false, errorGroup: 'SU', errorNote: 'Dùng ký hiệu tập hiệu "\\" sai quy tắc kết luận tính đơn điệu.' }
    ],
    explanation: 'Tập xác định: D = R \\ {1}. Đạo hàm: y\' = [1*(-1) - 2*1] / (x - 1)² = -3 / (x - 1)² < 0 với mọi x ≠ 1. Do đó hàm số nghịch biến trên từng khoảng (-∞; 1) và (1; +∞).'
  },
  {
    id: 'q-1-1-2',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-1',
    content: 'Hàm số y = -x³ + 3x² - 1 đồng biến trên khoảng nào dưới đây?',
    difficulty: 'NB',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy tính dấu hệ số a < 0 của tam thức bậc hai (trong trái ngoài cùng).',
    recommendedTip: 'Khi a < 0, tam thức mang dấu dương (+) ở TRONG khoảng hai nghiệm.',
    options: [
      { id: 'A', text: '(0; 2)', isCorrect: true },
      { id: 'B', text: '(-∞; 0)', isCorrect: false, errorGroup: 'TT', errorNote: 'Nhầm dấu của tam thức bậc hai khi hệ số a = -3 âm (tưởng ngoài cùng dấu dương).' },
      { id: 'C', text: '(2; +∞)', isCorrect: false, errorGroup: 'TT', errorNote: 'Nhầm khoảng nghiệm ngoài của y\' mang dấu âm thành đồng biến.' },
      { id: 'D', text: '(-2; 0)', isCorrect: false, errorGroup: 'TT', errorNote: 'Giải phương trình -3x² + 6x = 0 tính sai nghiệm thành x = -2 và x = 0.' }
    ],
    explanation: 'y\' = -3x² + 6x = -3x(x - 2). Cho y\' = 0 ⇔ x = 0 hoặc x = 2. Vì hệ số a = -3 < 0 nên y\' > 0 khi x ∈ (0; 2). Vậy hàm số đồng biến trên khoảng (0; 2).'
  },
  {
    id: 'q-1-1-3',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-1',
    content: 'Cho hàm số y = f(x) có bảng biến thiên: Tại x = 2, f\'(x) đổi dấu từ dương sang âm và f(2) = 5. Khẳng định nào sau đây là ĐÚNG?',
    difficulty: 'NB',
    primaryErrorTrap: 'DG',
    trapDescription: 'Bẫy phân biệt giữa điểm cực đại (x) và giá trị cực đại (y).',
    recommendedTip: 'Điểm cực đại của hàm số là x; giá trị cực đại là y.',
    options: [
      { id: 'A', text: 'Hàm số đạt cực đại tại x = 2 và giá trị cực đại bằng 5', isCorrect: true },
      { id: 'B', text: 'Hàm số đạt giá trị cực đại bằng 2', isCorrect: false, errorGroup: 'DG', errorNote: 'Nhầm điểm cực trị x = 2 thành giá trị cực trị y.' },
      { id: 'C', text: 'Điểm cực đại của hàm số là (2; 5)', isCorrect: false, errorGroup: 'DG', errorNote: 'Điểm có tọa độ (2; 5) là điểm cực đại của ĐỒ THỊ hàm số, không phải của hàm số.' },
      { id: 'D', text: 'Hàm số đạt cực tiểu tại x = 2', isCorrect: false, errorGroup: 'KT', errorNote: 'Đạo hàm đổi dấu từ dương (+) sang âm (-) là cực đại, nhớ nhầm thành cực tiểu.' }
    ],
    explanation: 'Vì f\'(x) đổi dấu từ dương (+) sang âm (-) khi qua x = 2 nên x = 2 là điểm cực đại của hàm số. Giá trị cực đại tương ứng là f(2) = 5.'
  },
  {
    id: 'q-1-1-4',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-1',
    content: 'Tìm tất cả các giá trị của tham số m để hàm số y = (x + m) / (x + 1) đồng biến trên từng khoảng xác định.',
    difficulty: 'TH',
    primaryErrorTrap: 'KT',
    trapDescription: 'Bẫy lấy cả dấu bằng trong hàm nhất biến (ad - bc ≥ 0 là SAI).',
    recommendedTip: 'Hàm số nhất biến (ax+b)/(cx+d) đồng biến ⇔ ad - bc > 0 (không có dấu bằng).',
    options: [
      { id: 'A', text: 'm < 1', isCorrect: true },
      { id: 'B', text: 'm ≤ 1', isCorrect: false, errorGroup: 'KT', errorNote: 'Lấy cả dấu bằng m = 1 khiến hàm suy biến thành y = 1 (hàm hằng, không đơn điệu).' },
      { id: 'C', text: 'm > 1', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính đạo hàm nhầm ad - bc thành m - 1 > 0 thay vì 1 - m > 0.' },
      { id: 'D', text: 'm ≥ 1', isCorrect: false, errorGroup: 'KT', errorNote: 'Vừa tính nhầm dấu ad - bc vừa lấy sai dấu bằng.' }
    ],
    explanation: 'Tập xác định: D = R \\ {-1}. y\' = (1 - m) / (x + 1)². Hàm số đồng biến trên từng khoảng xác định khi và chỉ khi y\' > 0 ∀x ≠ -1 ⇔ 1 - m > 0 ⇔ m < 1.'
  },
  {
    id: 'q-1-1-5',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-1',
    content: 'Số điểm cực trị của hàm số y = x³ là:',
    difficulty: 'TH',
    primaryErrorTrap: 'SU',
    trapDescription: 'Bẫy ngộ nhận: f\'(x₀) = 0 suy ra x₀ là điểm cực trị.',
    recommendedTip: 'f\'(x₀) = 0 nhưng f\'(x) KHÔNG ĐỔI DẤU thì x₀ không phải là điểm cực trị.',
    options: [
      { id: 'A', text: '0', isCorrect: true },
      { id: 'B', text: '1', isCorrect: false, errorGroup: 'SU', errorNote: 'Thấy y\'(0) = 0 ngộ nhận x = 0 là cực trị dù đạo hàm không đổi dấu.' },
      { id: 'C', text: '2', isCorrect: false, errorGroup: 'KT', errorNote: 'Nhầm quy tắc số cực trị hàm bậc ba tối đa là 2.' },
      { id: 'D', text: '3', isCorrect: false, errorGroup: 'PP', errorNote: 'Đoán mò không dựa trên đạo hàm.' }
    ],
    explanation: 'y\' = 3x² ≥ 0 ∀x ∈ R. Đạo hàm triệt tiêu tại x = 0 nhưng không đổi dấu khi qua 0, do đó hàm số luôn đồng biến trên R và không có cực trị nào.'
  },
  {
    id: 'q-1-1-6',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-1',
    content: 'Tìm tất cả các giá trị của tham số m để hàm số y = x³ - 3mx² + 3(m² - 1)x đạt cực đại tại x = 1.',
    difficulty: 'VD',
    primaryErrorTrap: 'QT',
    trapDescription: 'Bẫy bỏ qua bước thử lại hoặc kiểm tra điều kiện y"(1) < 0.',
    recommendedTip: 'Điều kiện hàm số đạt cực đại tại x₀: y\'(x₀) = 0 và y"(x₀) < 0.',
    options: [
      { id: 'A', text: 'm = 2', isCorrect: true },
      { id: 'B', text: 'm = 0', isCorrect: false, errorGroup: 'KT', errorNote: 'Với m = 0 thì y"(1) = 6 > 0 nên x = 1 là điểm CỰC TIỂU, không phải cực đại.' },
      { id: 'C', text: 'm = 0 hoặc m = 2', isCorrect: false, errorGroup: 'QT', errorNote: 'Chỉ giải y\'(1) = 0 ra m = 0 và m = 2 mà quên kiểm tra điều kiện cực đại y"(1) < 0.' },
      { id: 'D', text: 'm = -2', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính sai nghiệm của phương trình bậc hai.' }
    ],
    explanation: 'y\' = 3x² - 6mx + 3(m² - 1); y"(x) = 6x - 6m. Để x = 1 là điểm cực đại: y\'(1) = 0 ⇔ 3m(m - 2) = 0 ⇔ m = 0 hoặc m = 2. Thử lại: Với m = 0 ⇒ y"(1) = 6 > 0 (loại). Với m = 2 ⇒ y"(1) = -6 < 0 (nhận). Vậy m = 2.'
  },

  // --- BÀI 2: GIÁ TRỊ LỚN NHẤT VÀ GIÁ TRỊ NHỎ NHẤT CỦA HÀM SỐ ---
  {
    id: 'q-1-2-1',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-2',
    content: 'Giá trị nhỏ nhất của hàm số f(x) = x³ - 3x + 1 trên đoạn [0; 2] là:',
    difficulty: 'NB',
    primaryErrorTrap: 'QT',
    trapDescription: 'Bẫy chỉ tính f(0) và f(2) mà quên tính f(nghiệm y\'=0) tại x = 1.',
    recommendedTip: 'So sánh tất cả các giá trị: f(0), f(1), f(2).',
    options: [
      { id: 'A', text: '-1', isCorrect: true },
      { id: 'B', text: '1', isCorrect: false, errorGroup: 'QT', errorNote: 'Chỉ tính tại đầu mút f(0) = 1 và f(2) = 3 nên chọn số nhỏ hơn là 1.' },
      { id: 'C', text: '3', isCorrect: false, errorGroup: 'DG', errorNote: 'Đề hỏi giá trị nhỏ nhất nhưng lại khoanh giá trị lớn nhất (f(2) = 3).' },
      { id: 'D', text: '0', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính nhầm f(1) = 1 - 3 + 1 = -1 thành 0.' }
    ],
    explanation: 'f\'(x) = 3x² - 3 = 0 ⇔ x = ±1. Vì x ∈ [0; 2] nên nhận x = 1. Tính f(0) = 1; f(1) = -1; f(2) = 3. Số nhỏ nhất là -1.'
  },
  {
    id: 'q-1-2-2',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-2',
    content: 'Một bác nông dân dùng 40 mét lưới thép rào một mảnh vườn hình chữ nhật tựa vào một bức tường đá có sẵn (chỉ rào 3 cạnh: 2 rộng, 1 dài). Diện tích lớn nhất của mảnh vườn là:',
    difficulty: 'VD',
    primaryErrorTrap: 'MH',
    trapDescription: 'Bẫy chu vi rào 3 cạnh 2x + y = 40, không phải 2(x + y) = 40.',
    recommendedTip: 'Đọc kỹ: tựa vào bức tường đá nghĩa là chiều dài cạnh tường không cần rào.',
    options: [
      { id: 'A', text: '200 m²', isCorrect: true },
      { id: 'B', text: '100 m²', isCorrect: false, errorGroup: 'MH', errorNote: 'Áp dụng công thức rào 4 cạnh 2(x + y) = 40 ⇒ x = y = 10 ⇒ S = 100 m².' },
      { id: 'C', text: '400 m²', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính nhầm 40² / 4.' },
      { id: 'D', text: '150 m²', isCorrect: false, errorGroup: 'PP', errorNote: 'Ước lượng sai kích thước.' }
    ],
    explanation: 'Gọi chiều rộng là x (m, x > 0). Chiều dài là y = 40 - 2x. Diện tích S(x) = x(40 - 2x) = 40x - 2x². S\'(x) = 40 - 4x = 0 ⇔ x = 10 m. Khi đó y = 20 m. Diện tích lớn nhất là S = 10 * 20 = 200 m².'
  },
  {
    id: 'q-1-2-3',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-2',
    content: 'Người ta muốn mạ vàng một chiếc hộp hình lập phương không nắp có thể tích 64 cm³. Diện tích cần mạ vàng là bao nhiêu?',
    difficulty: 'TH',
    primaryErrorTrap: 'MH',
    trapDescription: 'Bẫy chiếc hộp KHÔNG NẮP chỉ có 5 mặt (1 đáy + 4 mặt bên).',
    recommendedTip: 'Hộp lập phương có nắp là 6 mặt; không nắp là 5 mặt!',
    options: [
      { id: 'A', text: '80 cm²', isCorrect: true },
      { id: 'B', text: '96 cm²', isCorrect: false, errorGroup: 'MH', errorNote: 'Tính diện tích toàn phần cả 6 mặt: 6 * 4² = 96 cm² (quên chi tiết KHÔNG NẮP).' },
      { id: 'C', text: '64 cm²', isCorrect: false, errorGroup: 'DG', errorNote: 'Nhầm lẫn số đo diện tích với thể tích đề bài cho (64).' },
      { id: 'D', text: '16 cm²', isCorrect: false, errorGroup: 'QT', errorNote: 'Chỉ tính diện tích một mặt đáy.' }
    ],
    explanation: 'Thể tích hình lập phương V = a³ = 64 cm³ ⇒ cạnh a = 4 cm. Chiếc hộp không nắp gồm 1 đáy và 4 mặt bên, tổng cộng có 5 mặt hình vuông cạnh 4 cm. Diện tích cần mạ vàng là S = 5 * a² = 5 * 16 = 80 cm².'
  },

  // --- BÀI 3: TIỆM CẬN CỦA ĐỒ THỊ HÀM SỐ ---
  {
    id: 'q-1-3-1',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-3',
    content: 'Đường tiệm cận đứng của đồ thị hàm số y = (2x + 1) / (x - 3) là:',
    difficulty: 'NB',
    primaryErrorTrap: 'DG',
    trapDescription: 'Bẫy nhầm tiệm cận đứng (x = x₀) với tiệm cận ngang (y = y₀).',
    recommendedTip: 'Tiệm cận ĐỨNG là x = số; tiệm cận NGANG là y = số.',
    options: [
      { id: 'A', text: 'x = 3', isCorrect: true },
      { id: 'B', text: 'y = 2', isCorrect: false, errorGroup: 'DG', errorNote: 'Đề hỏi tiệm cận ĐỨNG nhưng lại khoanh tiệm cận NGANG y = 2.' },
      { id: 'C', text: 'x = -3', isCorrect: false, errorGroup: 'TT', errorNote: 'Giải x - 3 = 0 ra x = -3 (sai dấu).' },
      { id: 'D', text: 'y = 3', isCorrect: false, errorGroup: 'DG', errorNote: 'Lấy số 3 nhưng đặt vào biến y thay vì x.' }
    ],
    explanation: 'Mẫu số x - 3 = 0 ⇔ x = 3. Khi x → 3 thì tử số 2(3) + 1 = 7 ≠ 0, nên lim y = ±∞. Do đó x = 3 là tiệm cận đứng.'
  },
  {
    id: 'q-1-3-2',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-3',
    content: 'Đồ thị hàm số y = (x - 1) / (x² - 1) có bao nhiêu đường tiệm cận đứng?',
    difficulty: 'TH',
    primaryErrorTrap: 'KT',
    trapDescription: 'Bẫy triệt tiêu nghiệm chung x = 1 giữa tử số và mẫu số.',
    recommendedTip: 'x² - 1 = (x - 1)(x + 1). Nghiệm x = 1 bị triệt tiêu với tử số nên KHÔNG PHẢI là tiệm cận đứng!',
    options: [
      { id: 'A', text: '1', isCorrect: true },
      { id: 'B', text: '2', isCorrect: false, errorGroup: 'KT', errorNote: 'Chỉ tìm nghiệm mẫu x² - 1 = 0 ra x = ±1 rồi kết luận có 2 TCĐ mà quên triệt tiêu nghiệm x = 1.' },
      { id: 'C', text: '0', isCorrect: false, errorGroup: 'TT', errorNote: 'Rút gọn sai biểu thức.' },
      { id: 'D', text: '3', isCorrect: false, errorGroup: 'DG', errorNote: 'Đếm cả tiệm cận ngang vào tiệm cận đứng.' }
    ],
    explanation: 'y = (x - 1) / [(x - 1)(x + 1)] = 1 / (x + 1) với x ≠ 1. Khi x → 1: lim y = 1/2 (hữu hạn, không là TCĐ). Khi x → -1: lim y = ∞. Vậy chỉ có x = -1 là tiệm cận đứng duy nhất.'
  },
  {
    id: 'q-1-3-3',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-3',
    content: 'Tìm tiệm cận xiên của đồ thị hàm số y = (x² + 2x - 1) / (x + 1). (Chương trình GDPT mới)',
    difficulty: 'TH',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy chia đa thức tử cho mẫu: y = ax + b + r / (x + c).',
    recommendedTip: 'Chia đa thức: (x² + 2x - 1) = (x + 1)(x + 1) - 2 ⇒ y = x + 1 - 2/(x + 1). TCX là y = x + 1.',
    options: [
      { id: 'A', text: 'y = x + 1', isCorrect: true },
      { id: 'B', text: 'y = x + 2', isCorrect: false, errorGroup: 'TT', errorNote: 'Chia đa thức tính sai hệ số tự do b.' },
      { id: 'C', text: 'y = x - 1', isCorrect: false, errorGroup: 'TT', errorNote: 'Sai dấu khi lấy phần dư.' },
      { id: 'D', text: 'y = 2x + 1', isCorrect: false, errorGroup: 'PP', errorNote: 'Lấy đạo hàm tử chia đạo hàm mẫu ngộ nhận là TCX.' }
    ],
    explanation: 'Thực hiện phép chia: (x² + 2x - 1) : (x + 1) = x + 1 dư -2. Do lim (x→±∞) [-2/(x + 1)] = 0 nên đường thẳng y = x + 1 là tiệm cận xiên.'
  },

  // --- BÀI 4: KHẢO SÁT SỰ BIẾN THIÊN VÀ VẼ ĐỒ THỊ HÀM SỐ ---
  {
    id: 'q-1-4-1',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-4',
    content: 'Đường cong trong hình vẽ là đồ thị của hàm số nào dưới đây? (Đồ thị đi qua gốc O, có 2 cực trị, nhánh cuối khi x → +∞ thì y → -∞)',
    difficulty: 'NB',
    primaryErrorTrap: 'KT',
    trapDescription: 'Bẫy dấu hệ số cao nhất a: nhánh cuối đi xuống nghĩa là a < 0.',
    recommendedTip: 'Nhánh bên phải cùng đi xuống ⇒ a < 0. Nhánh bên phải cùng đi lên ⇒ a > 0.',
    options: [
      { id: 'A', text: 'y = -x³ + 3x', isCorrect: true },
      { id: 'B', text: 'y = x³ - 3x', isCorrect: false, errorGroup: 'KT', errorNote: 'Nhánh cuối đi xuống tương ứng a < 0 nhưng chọn hàm có a = 1 > 0.' },
      { id: 'C', text: 'y = -x⁴ + 2x²', isCorrect: false, errorGroup: 'DG', errorNote: 'Đồ thị là hình chữ N ngược của hàm bậc ba nhưng chọn hàm trùng phương.' },
      { id: 'D', text: 'y = -x³ + 3x²', isCorrect: false, errorGroup: 'TT', errorNote: 'Hàm số này không đi đối xứng qua gốc tọa độ O.' }
    ],
    explanation: 'Hàm số bậc ba với hệ số a < 0 có dạng chữ N ngược đi xuống bên phải, qua O(0; 0) và nhận O làm tâm đối xứng là y = -x³ + 3x.'
  },
  {
    id: 'q-1-4-2',
    chapterId: 'chap-1',
    lessonId: 'lesson-1-4',
    content: 'Cho hàm số y = f(x) có bảng biến thiên với y_CĐ = 3 (tại x = -1) và y_CT = -2 (tại x = 2). Phương trình f(x) = 1 có bao nhiêu nghiệm thực phân biệt?',
    difficulty: 'TH',
    primaryErrorTrap: 'DG',
    trapDescription: 'Bẫy tương giao đồ thị: đường y = 1 nằm giữa y_CT = -2 và y_CĐ = 3.',
    recommendedTip: 'So sánh mức độ cao: -2 < 1 < 3. Đường thẳng y = 1 cắt cả 3 nhánh biến thiên nên có 3 nghiệm.',
    options: [
      { id: 'A', text: '3', isCorrect: true },
      { id: 'B', text: '2', isCorrect: false, errorGroup: 'DG', errorNote: 'Tưởng số 1 trùng với một cực trị nào đó.' },
      { id: 'C', text: '1', isCorrect: false, errorGroup: 'SU', errorNote: 'Nghĩ rằng chỉ cắt 1 nhánh ngoài cùng.' },
      { id: 'D', text: '4', isCorrect: false, errorGroup: 'PP', errorNote: 'Nhầm với hàm bậc bốn.' }
    ],
    explanation: 'Vì -2 < 1 < 3 nên đường thẳng y = 1 cắt đồ thị hàm số tại đúng 3 điểm phân biệt, tương ứng 3 nghiệm thực.'
  },

  // =========================================================================
  // CHƯƠNG 2: VECTƠ VÀ HỆ TỌA ĐỘ TRONG KHÔNG GIAN
  // =========================================================================

  // --- BÀI 1: VECTƠ TRONG KHÔNG GIAN ---
  {
    id: 'q-2-1-1',
    chapterId: 'chap-2',
    lessonId: 'lesson-2-1',
    content: 'Cho hình hộp ABCD.A\'B\'C\'D\'. Khẳng định nào sau đây là ĐÚNG về quy tắc hình hộp?',
    difficulty: 'NB',
    primaryErrorTrap: 'KT',
    trapDescription: 'Bẫy quy tắc hình hộp: AC\' = AB + AD + AA\'.',
    recommendedTip: 'Vectơ đường chéo xuất phát từ đỉnh A là tổng 3 vectơ cạnh cùng xuất phát từ A.',
    options: [
      { id: 'A', text: 'AC\' = AB + AD + AA\'', isCorrect: true },
      { id: 'B', text: 'AC\' = AB + AD + AC', isCorrect: false, errorGroup: 'KT', errorNote: 'Nhầm vectơ cạnh bên AA\' thành vectơ đường chéo đáy AC.' },
      { id: 'C', text: 'AC\' = A\'B\' + A\'D\' + A\'A', isCorrect: false, errorGroup: 'SU', errorNote: 'Ngược chiều vectơ chiều cao.' },
      { id: 'D', text: 'AC\' = AB + BC + CD', isCorrect: false, errorGroup: 'PP', errorNote: 'Cộng liên tiếp các cạnh quanh đáy.' }
    ],
    explanation: 'Theo quy tắc hình hộp, vectơ đường chéo nối 2 đỉnh đối diện qua tâm hình hộp bằng tổng 3 vectơ xuất phát từ cùng đỉnh đó: AC\' = AB + AD + AA\'.'
  },
  {
    id: 'q-2-1-2',
    chapterId: 'chap-2',
    lessonId: 'lesson-2-1',
    content: 'Cho tứ diện đều ABCD có cạnh bằng a. Tính tích vô hướng AB . AC.',
    difficulty: 'TH',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy tam giác đều góc 60 độ: cos 60° = 1/2.',
    recommendedTip: 'AB.AC = |AB|.|AC|.cos(BAC) = a*a*cos(60°) = a²/2.',
    options: [
      { id: 'A', text: 'a² / 2', isCorrect: true },
      { id: 'B', text: 'a² * √3 / 2', isCorrect: false, errorGroup: 'TT', errorNote: 'Nhầm cos(60°) thành sin(60°) = √3/2.' },
      { id: 'C', text: 'a²', isCorrect: false, errorGroup: 'KT', errorNote: 'Quên nhân cos góc xen giữa hai vectơ.' },
      { id: 'D', text: '-a² / 2', isCorrect: false, errorGroup: 'TT', errorNote: 'Sai dấu của góc nhọn tam giác đều.' }
    ],
    explanation: 'Vì ABC là tam giác đều cạnh a nên góc giữa AB và AC là 60°. Ta có AB.AC = |AB|.|AC|.cos 60° = a * a * (1/2) = a²/2.'
  },

  // --- BÀI 2: HỆ TỌA ĐỘ TRONG KHÔNG GIAN ---
  {
    id: 'q-2-2-1',
    chapterId: 'chap-2',
    lessonId: 'lesson-2-2',
    content: 'Trong không gian Oxyz, hình chiếu vuông góc của điểm M(2; -3; 5) lên mặt phẳng (Oxy) có tọa độ là:',
    difficulty: 'NB',
    primaryErrorTrap: 'DG',
    trapDescription: 'Bẫy hình chiếu lên mặt phẳng tọa độ: Khuyết biến nào thì biến đó bằng 0.',
    recommendedTip: 'Chiếu lên (Oxy) thì z = 0, giữ nguyên x và y: M\'(2; -3; 0).',
    options: [
      { id: 'A', text: '(2; -3; 0)', isCorrect: true },
      { id: 'B', text: '(0; 0; 5)', isCorrect: false, errorGroup: 'DG', errorNote: 'Đây là hình chiếu lên trục Oz, không phải mặt phẳng (Oxy).' },
      { id: 'C', text: '(2; 0; 5)', isCorrect: false, errorGroup: 'DG', errorNote: 'Đây là hình chiếu lên mặt phẳng (Oxz).' },
      { id: 'D', text: '(0; -3; 5)', isCorrect: false, errorGroup: 'DG', errorNote: 'Đây là hình chiếu lên mặt phẳng (Oyz).' }
    ],
    explanation: 'Hình chiếu lên (Oxy) khuyết z nên z = 0, giữ nguyên x = 2 và y = -3. Tọa độ là (2; -3; 0).'
  },
  {
    id: 'q-2-2-2',
    chapterId: 'chap-2',
    lessonId: 'lesson-2-2',
    content: 'Trong không gian Oxyz, cho A(1; 2; -1) và B(3; 0; 5). Tọa độ trung điểm I của đoạn thẳng AB là:',
    difficulty: 'NB',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy trung điểm: x_I = (x_A + x_B) / 2.',
    recommendedTip: 'Cộng tọa độ hai đầu mút rồi chia đôi: ((1+3)/2 ; (2+0)/2 ; (-1+5)/2) = (2; 1; 2).',
    options: [
      { id: 'A', text: '(2; 1; 2)', isCorrect: true },
      { id: 'B', text: '(4; 2; 4)', isCorrect: false, errorGroup: 'QT', errorNote: 'Cộng tọa độ nhưng quên chia đôi.' },
      { id: 'C', text: '(2; -2; 6)', isCorrect: false, errorGroup: 'KT', errorNote: 'Lấy B trừ A (tọa độ vectơ AB) thay vì trung điểm.' },
      { id: 'D', text: '(1; -1; 3)', isCorrect: false, errorGroup: 'TT', errorNote: 'Lấy (B - A)/2.' }
    ],
    explanation: 'Tọa độ trung điểm I là ((1 + 3)/2 ; (2 + 0)/2 ; (-1 + 5)/2) = (2; 1; 2).'
  },

  // --- BÀI 3: BIỂU THỨC TỌA ĐỘ CỦA CÁC PHÉP TOÁN VECTƠ ---
  {
    id: 'q-2-3-1',
    chapterId: 'chap-2',
    lessonId: 'lesson-2-3',
    content: 'Trong không gian Oxyz, cho hai vectơ u = (1; 0; 2) và v = (-1; 2; 1). Tọa độ của vectơ tích có hướng [u, v] là:',
    difficulty: 'TH',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy tính định thức tọa độ y: -(1*1 - 2*(-1)) = -3.',
    recommendedTip: 'w = (y₁z₂ - z₁y₂; z₁x₂ - x₁z₂; x₁y₂ - y₁x₂) = (0 - 4; -2 - 1; 2 - 0) = (-4; -3; 2).',
    options: [
      { id: 'A', text: '(-4; -3; 2)', isCorrect: true },
      { id: 'B', text: '(-4; 3; 2)', isCorrect: false, errorGroup: 'TT', errorNote: 'Quên đổi dấu tọa độ y của tích có hướng.' },
      { id: 'C', text: '(4; 3; -2)', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính [v, u] thay vì [u, v] (ngược dấu toàn bộ).' },
      { id: 'D', text: '(-4; -3; -2)', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính sai tọa độ z: 1*2 - 0*(-1) = 2 ghi thành -2.' }
    ],
    explanation: 'x = 0*1 - 2*2 = -4; y = 2*(-1) - 1*1 = -3; z = 1*2 - 0*(-1) = 2. Vậy [u, v] = (-4; -3; 2).'
  },

  // =========================================================================
  // CHƯƠNG 3: THỐNG KÊ – SỐ ĐẶC TRƯNG ĐO ĐỘ PHÂN TÁN
  // =========================================================================

  // --- BÀI 1: KHOẢNG BIẾN THIÊN, KHOẢNG TỨ PHÂN VỊ ---
  {
    id: 'q-3-1-1',
    chapterId: 'chap-3',
    lessonId: 'lesson-3-1',
    content: 'Một mẫu số liệu ghép nhóm gồm các nhóm: [20; 30), [30; 40), [40; 50), [50; 60), [60; 70). Khoảng biến thiên R của mẫu số liệu ghép nhóm này là:',
    difficulty: 'NB',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy khoảng biến thiên ghép nhóm: R = mút phải nhóm cuối - mút trái nhóm đầu.',
    recommendedTip: 'R = a_k - a_0 = 70 - 20 = 50.',
    options: [
      { id: 'A', text: '50', isCorrect: true },
      { id: 'B', text: '40', isCorrect: false, errorGroup: 'TT', errorNote: 'Lấy 60 - 20 thay vì 70 - 20.' },
      { id: 'C', text: '10', isCorrect: false, errorGroup: 'KT', errorNote: 'Lấy độ dài của 1 nhóm (70 - 60 = 10).' },
      { id: 'D', text: '45', isCorrect: false, errorGroup: 'PP', errorNote: 'Lấy trung điểm nhóm cuối trừ trung điểm nhóm đầu.' }
    ],
    explanation: 'Khoảng biến thiên của mẫu số liệu ghép nhóm là R = a_k - a_0 = 70 - 20 = 50.'
  },
  {
    id: 'q-3-1-2',
    chapterId: 'chap-3',
    lessonId: 'lesson-3-1',
    content: 'Biết mẫu số liệu ghép nhóm có Q₁ = 32.5 và Q₃ = 58.2. Khoảng tứ phân vị ΔQ của mẫu số liệu là:',
    difficulty: 'NB',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy công thức khoảng tứ phân vị: ΔQ = Q₃ - Q₁.',
    recommendedTip: 'ΔQ = 58.2 - 32.5 = 25.7.',
    options: [
      { id: 'A', text: '25.7', isCorrect: true },
      { id: 'B', text: '26.7', isCorrect: false, errorGroup: 'TT', errorNote: 'Trừ nhầm nhớ 1 trong phép tính số thập phân.' },
      { id: 'C', text: '90.7', isCorrect: false, errorGroup: 'KT', errorNote: 'Cộng Q₁ + Q₃ thay vì trừ.' },
      { id: 'D', text: '45.35', isCorrect: false, errorGroup: 'SU', errorNote: 'Tính (Q₁ + Q₃)/2 (trung vị) thay vì khoảng tứ phân vị.' }
    ],
    explanation: 'Khoảng tứ phân vị của mẫu số liệu ghép nhóm là ΔQ = Q₃ - Q₁ = 58.2 - 32.5 = 25.7.'
  },

  // --- BÀI 2: PHƯƠNG SAI VÀ ĐỘ LỆCH CHUẨN ---
  {
    id: 'q-3-2-1',
    chapterId: 'chap-3',
    lessonId: 'lesson-3-2',
    content: 'Một mẫu số liệu ghép nhóm có phương sai s² = 16. Độ lệch chuẩn s của mẫu số liệu này là:',
    difficulty: 'NB',
    primaryErrorTrap: 'KT',
    trapDescription: 'Bẫy độ lệch chuẩn s = √(s²).',
    recommendedTip: 'Độ lệch chuẩn là căn bậc hai số học của phương sai: s = √16 = 4.',
    options: [
      { id: 'A', text: '4', isCorrect: true },
      { id: 'B', text: '256', isCorrect: false, errorGroup: 'KT', errorNote: 'Bình phương phương sai (16² = 256) thay vì khai căn.' },
      { id: 'C', text: '8', isCorrect: false, errorGroup: 'TT', errorNote: 'Lấy 16 chia 2 thay vì căn bậc hai.' },
      { id: 'D', text: '±4', isCorrect: false, errorGroup: 'KT', errorNote: 'Độ lệch chuẩn là số không âm, không lấy giá trị âm.' }
    ],
    explanation: 'Độ lệch chuẩn s là căn bậc hai số học của phương sai: s = √(16) = 4.'
  },

  // =========================================================================
  // CHƯƠNG 4: NGUYÊN HÀM VÀ TÍCH PHÂN
  // =========================================================================

  // --- BÀI 1: NGUYÊN HÀM ---
  {
    id: 'q-4-1-1',
    chapterId: 'chap-4',
    lessonId: 'lesson-4-1',
    content: 'Họ nguyên hàm của hàm số f(x) = 1 / (2x + 1) trên khoảng (-1/2; +∞) là:',
    difficulty: 'NB',
    primaryErrorTrap: 'KT',
    trapDescription: 'Bẫy ∫1/(ax+b)dx = 1/a * ln|ax+b| + C.',
    recommendedTip: 'Luôn nhớ chia cho hệ số a: a = 2 nên có 1/2 ở trước ln.',
    options: [
      { id: 'A', text: '1/2 * ln(2x + 1) + C', isCorrect: true },
      { id: 'B', text: 'ln(2x + 1) + C', isCorrect: false, errorGroup: 'KT', errorNote: 'Quên chia cho hệ số a = 2 của biểu thức (2x + 1).' },
      { id: 'C', text: '2 * ln(2x + 1) + C', isCorrect: false, errorGroup: 'TT', errorNote: 'Nhân với 2 thay vì chia cho 2.' },
      { id: 'D', text: '-1 / (2x + 1)² + C', isCorrect: false, errorGroup: 'PP', errorNote: 'Nhầm sang đạo hàm của hàm phân thức.' }
    ],
    explanation: 'Theo công thức nguyên hàm mở rộng: ∫ 1/(ax + b) dx = 1/a * ln|ax + b| + C. Ở đây a = 2 và trên khoảng (-1/2; +∞) thì 2x + 1 > 0 nên ∫ 1/(2x + 1) dx = 1/2 * ln(2x + 1) + C.'
  },
  {
    id: 'q-4-1-2',
    chapterId: 'chap-4',
    lessonId: 'lesson-4-1',
    content: 'Tìm nguyên hàm F(x) của hàm số f(x) = e^(3x) biết F(0) = 2.',
    difficulty: 'TH',
    primaryErrorTrap: 'QT',
    trapDescription: 'Bẫy tìm hằng số C: F(0) = 1/3 + C = 2 ⇒ C = 5/3.',
    recommendedTip: '∫e^(3x)dx = 1/3*e^(3x) + C. Thế x = 0: 1/3*e^0 + C = 1/3 + C = 2.',
    options: [
      { id: 'A', text: 'F(x) = 1/3 * e^(3x) + 5/3', isCorrect: true },
      { id: 'B', text: 'F(x) = 1/3 * e^(3x) + 2', isCorrect: false, errorGroup: 'QT', errorNote: 'Tưởng F(0) = 2 thì C = 2 (quên rằng e^0 = 1).' },
      { id: 'C', text: 'F(x) = 3 * e^(3x) - 1', isCorrect: false, errorGroup: 'KT', errorNote: 'Lấy đạo hàm của e^(3x) thay vì lấy nguyên hàm.' },
      { id: 'D', text: 'F(x) = 1/3 * e^(3x) + 1', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính 2 - 1/3 = 5/3 nhầm thành 1.' }
    ],
    explanation: 'F(x) = ∫ e^(3x) dx = 1/3 * e^(3x) + C. F(0) = 1/3 * e^0 + C = 1/3 + C = 2 ⇔ C = 5/3. Vậy F(x) = 1/3 * e^(3x) + 5/3.'
  },

  // --- BÀI 2: TÍCH PHÂN ---
  {
    id: 'q-4-2-1',
    chapterId: 'chap-4',
    lessonId: 'lesson-4-2',
    content: 'Cho tích phân I = ∫[0 to 1] (2x + 3) dx. Giá trị của I bằng:',
    difficulty: 'NB',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy tính nguyên hàm x² + 3x và thế cận: 1 + 3 - 0 = 4.',
    recommendedTip: '∫[0 to 1] (2x + 3) dx = [x² + 3x] từ 0 đến 1 = (1 + 3) - 0 = 4.',
    options: [
      { id: 'A', text: '4', isCorrect: true },
      { id: 'B', text: '5', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính nhầm 2x lấy nguyên hàm thành 2x² thay vì x².' },
      { id: 'C', text: '3', isCorrect: false, errorGroup: 'QT', errorNote: 'Quên tính tích phân của số hạng 2x.' },
      { id: 'D', text: '2', isCorrect: false, errorGroup: 'TT', errorNote: 'Trừ nhầm giá trị.' }
    ],
    explanation: 'I = [x² + 3x] từ 0 đến 1 = (1² + 3*1) - (0² + 3*0) = 4.'
  },
  {
    id: 'q-4-2-2',
    chapterId: 'chap-4',
    lessonId: 'lesson-4-2',
    content: 'Khi tính tích phân I = ∫[0 to 1] x * e^(x²) dx bằng cách đặt t = x², tích phân I chuyển thành dạng nào?',
    difficulty: 'TH',
    primaryErrorTrap: 'QT',
    trapDescription: 'Bẫy dt = 2x dx ⇒ x dx = 1/2 dt. Quên hệ số 1/2.',
    recommendedTip: 'Đặt t = x² ⇒ dt = 2x dx ⇒ x dx = dt / 2. Đổi cận: x=0 ⇒ t=0; x=1 ⇒ t=1.',
    options: [
      { id: 'A', text: '1/2 * ∫[0 to 1] e^t dt', isCorrect: true },
      { id: 'B', text: '∫[0 to 1] e^t dt', isCorrect: false, errorGroup: 'KT', errorNote: 'Quên nhân hệ số 1/2 khi đổi vi phân x dx = dt/2.' },
      { id: 'C', text: '2 * ∫[0 to 1] e^t dt', isCorrect: false, errorGroup: 'TT', errorNote: 'Nhân 2 thay vì chia 2.' },
      { id: 'D', text: '1/2 * ∫[0 to 2] e^t dt', isCorrect: false, errorGroup: 'QT', errorNote: 'Đổi cận sai: thế x = 1 vào t = x² ra t = 2.' }
    ],
    explanation: 'Đặt t = x² ⇒ dt = 2x dx ⇔ x dx = dt/2. Với x = 0 ⇒ t = 0; với x = 1 ⇒ t = 1. Khi đó I = ∫[0 to 1] e^t * (dt/2) = 1/2 * ∫[0 to 1] e^t dt.'
  },

  // --- BÀI 3: ỨNG DỤNG HÌNH HỌC CỦA TÍCH PHÂN ---
  {
    id: 'q-4-3-1',
    chapterId: 'chap-4',
    lessonId: 'lesson-4-3',
    content: 'Diện tích hình phẳng giới hạn bởi đồ thị hàm số y = x², trục hoành Ox và hai đường thẳng x = 0, x = 3 là:',
    difficulty: 'NB',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy tích phân S = ∫[0 to 3] x² dx = x³/3 từ 0 đến 3 = 27/3 = 9.',
    recommendedTip: 'S = [x³/3] từ 0 đến 3 = 3³/3 = 9.',
    options: [
      { id: 'A', text: '9', isCorrect: true },
      { id: 'B', text: '27', isCorrect: false, errorGroup: 'QT', errorNote: 'Chỉ tính x³ tại x = 3 mà quên chia cho 3.' },
      { id: 'C', text: '3', isCorrect: false, errorGroup: 'TT', errorNote: 'Chia nhầm 9 cho 3.' },
      { id: 'D', text: '9π', isCorrect: false, errorGroup: 'KT', errorNote: 'Nhầm sang công thức thể tích khối tròn xoay (nhân thêm π).' }
    ],
    explanation: 'Diện tích hình phẳng là S = ∫[0 to 3] x² dx = [x³/3] từ 0 đến 3 = 27/3 = 9.'
  },
  {
    id: 'q-4-3-2',
    chapterId: 'chap-4',
    lessonId: 'lesson-4-3',
    content: 'Thể tích khối tròn xoay tạo thành khi quay hình phẳng giới hạn bởi đường cong y = √x, trục Ox và hai đường thẳng x = 1, x = 4 quanh trục Ox là:',
    difficulty: 'TH',
    primaryErrorTrap: 'KT',
    trapDescription: 'Bẫy V = π * ∫[a to b] [f(x)]² dx: [√x]² = x. Quên số π hoặc quên bình phương.',
    recommendedTip: 'V = π * ∫[1 to 4] (√x)² dx = π * ∫[1 to 4] x dx = π * [x²/2] từ 1 đến 4.',
    options: [
      { id: 'A', text: '15π / 2', isCorrect: true },
      { id: 'B', text: '15 / 2', isCorrect: false, errorGroup: 'KT', errorNote: 'Quên nhân hệ số π trong công thức thể tích khối tròn xoay.' },
      { id: 'C', text: '14π / 3', isCorrect: false, errorGroup: 'PP', errorNote: 'Tích phân √x thay vì (√x)².' },
      { id: 'D', text: '8π', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính 16/2 - 1/2 nhầm thành 8.' }
    ],
    explanation: 'V = π * ∫[1 to 4] (√x)² dx = π * ∫[1 to 4] x dx = π * [x²/2] từ 1 đến 4 = π * (16/2 - 1/2) = 15π/2.'
  },

  // =========================================================================
  // CHƯƠNG 5: PHƯƠNG PHÁP TỌA ĐỘ TRONG KHÔNG GIAN (OXYZ)
  // =========================================================================

  // --- BÀI 1: PHƯƠNG TRÌNH MẶT PHẲNG ---
  {
    id: 'q-5-1-1',
    chapterId: 'chap-5',
    lessonId: 'lesson-5-1',
    content: 'Trong không gian Oxyz, phương trình mặt phẳng đi qua điểm M(1; -2; 3) và có vectơ pháp tuyến n = (2; -1; 4) là:',
    difficulty: 'NB',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy khai triển hằng số D: A(x - x₀) + B(y - y₀) + C(z - z₀) = 0.',
    recommendedTip: '2(x - 1) - 1(y + 2) + 4(z - 3) = 2x - y + 4z - (2 + 2 + 12) = 2x - y + 4z - 16 = 0.',
    options: [
      { id: 'A', text: '2x - y + 4z - 16 = 0', isCorrect: true },
      { id: 'B', text: '2x - y + 4z + 16 = 0', isCorrect: false, errorGroup: 'TT', errorNote: 'Chuyển vế tính sai dấu của hệ số tự do D.' },
      { id: 'C', text: 'x - 2y + 3z - 16 = 0', isCorrect: false, errorGroup: 'DG', errorNote: 'Lấy tọa độ điểm làm hệ số của x, y, z thay vì vectơ pháp tuyến.' },
      { id: 'D', text: '2x - y + 4z - 8 = 0', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính nhầm 2(1) + (-1)(-2) + 4(3) = 16 thành 8.' }
    ],
    explanation: 'Phương trình mặt phẳng: 2(x - 1) - 1(y + 2) + 4(z - 3) = 0 ⇔ 2x - y + 4z - 16 = 0.'
  },
  {
    id: 'q-5-1-2',
    chapterId: 'chap-5',
    lessonId: 'lesson-5-1',
    content: 'Trong không gian Oxyz, khoảng cách từ gốc tọa độ O(0; 0; 0) đến mặt phẳng (P): 2x - 2y + z + 6 = 0 bằng:',
    difficulty: 'NB',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy độ dài vectơ pháp tuyến: √(2² + (-2)² + 1²) = √9 = 3.',
    recommendedTip: 'd(O, (P)) = |0 + 0 + 0 + 6| / √(2² + (-2)² + 1²) = 6 / 3 = 2.',
    options: [
      { id: 'A', text: '2', isCorrect: true },
      { id: 'B', text: '6', isCorrect: false, errorGroup: 'QT', errorNote: 'Quên chia cho độ dài vectơ pháp tuyến √(A² + B² + C²).' },
      { id: 'C', text: '3', isCorrect: false, errorGroup: 'TT', errorNote: 'Lấy 6 chia 2.' },
      { id: 'D', text: '1', isCorrect: false, errorGroup: 'PP', errorNote: 'Tính sai độ dài pháp tuyến thành 6.' }
    ],
    explanation: 'd(O, (P)) = |2(0) - 2(0) + 1(0) + 6| / √(2² + (-2)² + 1²) = 6 / √9 = 6/3 = 2.'
  },

  // --- BÀI 2: PHƯƠNG TRÌNH ĐƯỜNG THẲNG TRONG KHÔNG GIAN ---
  {
    id: 'q-5-2-1',
    chapterId: 'chap-5',
    lessonId: 'lesson-5-2',
    content: 'Trong không gian Oxyz, một vectơ chỉ phương của đường thẳng d: (1 - x)/2 = (y + 1)/(-3) = z/4 là:',
    difficulty: 'TH',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy (1 - x)/2 = -(x - 1)/2 = (x - 1)/(-2). VTCP có hoành độ là -2!',
    recommendedTip: 'Đưa về chuẩn (x - x₀)/a: (1 - x)/2 = (x - 1)/(-2). Vectơ chỉ phương là (-2; -3; 4).',
    options: [
      { id: 'A', text: 'u = (-2; -3; 4) hoặc (2; 3; -4)', isCorrect: true },
      { id: 'B', text: 'u = (2; -3; 4)', isCorrect: false, errorGroup: 'TT', errorNote: 'Đọc trực tiếp mẫu số 2 ở hoành độ mà không đổi dấu (1 - x) thành (x - 1).' },
      { id: 'C', text: 'u = (1; -1; 0)', isCorrect: false, errorGroup: 'KT', errorNote: 'Lấy tọa độ điểm đi qua nhầm thành vectơ chỉ phương.' },
      { id: 'D', text: 'u = (2; 3; 4)', isCorrect: false, errorGroup: 'TT', errorNote: 'Sai dấu cả tung độ y.' }
    ],
    explanation: 'Viết lại phương trình d theo dạng chuẩn: (x - 1)/(-2) = (y + 1)/(-3) = z/4. Do đó một vectơ chỉ phương là u = (-2; -3; 4) (hoặc nhân với -1 thành (2; 3; -4)).'
  },
  {
    id: 'q-5-2-2',
    chapterId: 'chap-5',
    lessonId: 'lesson-5-2',
    content: 'Trong không gian Oxyz, đường thẳng đi qua điểm M(1; 2; -3) và vuông góc với mặt phẳng (P): x - 2y + 3z - 5 = 0 có phương trình tham số là:',
    difficulty: 'NB',
    primaryErrorTrap: 'KT',
    trapDescription: 'Bẫy đường thẳng vuông góc mặt phẳng thì VTCP của đường thẳng chính là VTPT của mặt phẳng.',
    recommendedTip: 'd ⊥ (P) ⇒ u_d = n_P = (1; -2; 3). Phương trình: x = 1 + t, y = 2 - 2t, z = -3 + 3t.',
    options: [
      { id: 'A', text: 'x = 1 + t, y = 2 - 2t, z = -3 + 3t', isCorrect: true },
      { id: 'B', text: 'x = 1 + t, y = -2 + 2t, z = 3 - 3t', isCorrect: false, errorGroup: 'DG', errorNote: 'Lấy nhầm tọa độ điểm M thành (1; -2; 3).' },
      { id: 'C', text: 'x = 2 + t, y = -1 - 2t, z = 4 + 3t', isCorrect: false, errorGroup: 'PP', errorNote: 'Lấy nhầm số liệu điểm khác.' },
      { id: 'D', text: 'x = 1 - t, y = 2 - 2t, z = -3 - 3t', isCorrect: false, errorGroup: 'TT', errorNote: 'Sai dấu các hệ số chỉ phương.' }
    ],
    explanation: 'Vì đường thẳng d ⊥ (P) nên d nhận VTPT n = (1; -2; 3) làm VTCP. Đường thẳng đi qua M(1; 2; -3) nên có phương trình tham số: x = 1 + t, y = 2 - 2t, z = -3 + 3t.'
  },

  // --- BÀI 3: PHƯƠNG TRÌNH MẶT CẦU ---
  {
    id: 'q-5-3-1',
    chapterId: 'chap-5',
    lessonId: 'lesson-5-3',
    content: 'Trong không gian Oxyz, tọa độ tâm I và bán kính R của mặt cầu (S): (x - 2)² + (y + 1)² + (z - 4)² = 25 là:',
    difficulty: 'NB',
    primaryErrorTrap: 'TT',
    trapDescription: 'Bẫy R = √25 = 5 và đổi dấu (y + 1) ⇒ y_I = -1.',
    recommendedTip: '(x - a)² + (y - b)² + (z - c)² = R² ⇒ I(a; b; c) và R = √R².',
    options: [
      { id: 'A', text: 'I(2; -1; 4) và R = 5', isCorrect: true },
      { id: 'B', text: 'I(-2; 1; -4) và R = 5', isCorrect: false, errorGroup: 'TT', errorNote: 'Quên đổi dấu tọa độ tâm khi từ phương trình chính tắc rút ra.' },
      { id: 'C', text: 'I(2; -1; 4) và R = 25', isCorrect: false, errorGroup: 'KT', errorNote: 'Quên khai căn bậc hai của 25 để tìm bán kính R.' },
      { id: 'D', text: 'I(2; 1; 4) và R = 5', isCorrect: false, errorGroup: 'TT', errorNote: 'Sai dấu ở tung độ y.' }
    ],
    explanation: 'Phương trình chính tắc (x - a)² + (y - b)² + (z - c)² = R² có a = 2, b = -1, c = 4 và R² = 25 ⇒ R = 5. Tâm I(2; -1; 4), R = 5.'
  },
  {
    id: 'q-5-3-2',
    chapterId: 'chap-5',
    lessonId: 'lesson-5-3',
    content: 'Trong không gian Oxyz, tìm điều kiện của m để phương trình x² + y² + z² - 2x + 4y - 6z + m = 0 là phương trình của một mặt cầu.',
    difficulty: 'TH',
    primaryErrorTrap: 'KT',
    trapDescription: 'Bẫy điều kiện mặt cầu: a² + b² + c² - d > 0.',
    recommendedTip: 'a = 1, b = -2, c = 3, d = m. Điều kiện: 1² + (-2)² + 3² - m > 0 ⇔ 14 - m > 0 ⇔ m < 14.',
    options: [
      { id: 'A', text: 'm < 14', isCorrect: true },
      { id: 'B', text: 'm ≤ 14', isCorrect: false, errorGroup: 'KT', errorNote: 'Lấy cả dấu bằng m = 14 (khi R = 0 phương trình suy biến thành 1 điểm, không là mặt cầu).' },
      { id: 'C', text: 'm > 14', isCorrect: false, errorGroup: 'TT', errorNote: 'Chuyển vế giải ngược chiều bất phương trình.' },
      { id: 'D', text: 'm < 7', isCorrect: false, errorGroup: 'TT', errorNote: 'Tính sai 1 + 4 + 9 = 14 thành 7.' }
    ],
    explanation: 'Hệ số: a = 1, b = -2, c = 3, d = m. Phương trình là mặt cầu khi và chỉ khi a² + b² + c² - d > 0 ⇔ 1² + (-2)² + 3² - m > 0 ⇔ 14 - m > 0 ⇔ m < 14.'
  },

  // =========================================================================
  // CHƯƠNG 6: XÁC SUẤT CÓ ĐIỀU KIỆN
  // =========================================================================

  // --- BÀI 1: XÁC SUẤT CÓ ĐIỀU KIỆN ---
  {
    id: 'q-6-1-1',
    chapterId: 'chap-6',
    lessonId: 'lesson-6-1',
    content: 'Gieo một con xúc xắc cân đối và đồng chất. Biết rằng số chấm xuất hiện là số lẻ. Tính xác suất để số chấm xuất hiện là số nguyên tố.',
    difficulty: 'TH',
    primaryErrorTrap: 'DG',
    trapDescription: 'Bẫy không gian mẫu bị thu hẹp trong xác suất có điều kiện.',
    recommendedTip: 'Số lẻ gồm {1, 3, 5} (3 khả năng). Trong đó số nguyên tố là {3, 5} (2 khả năng) ⇒ P = 2/3.',
    options: [
      { id: 'A', text: '2/3', isCorrect: true },
      { id: 'B', text: '1/2', isCorrect: false, errorGroup: 'DG', errorNote: 'Lấy số nguyên tố chia cho toàn bộ 6 mặt của xúc xắc: 3/6 = 1/2 (quên điều kiện đã cho).' },
      { id: 'C', text: '1/3', isCorrect: false, errorGroup: 'KT', errorNote: 'Tưởng số 1 là số nguyên tố.' },
      { id: 'D', text: '3/4', isCorrect: false, errorGroup: 'TT', errorNote: 'Đếm sai số phần tử.' }
    ],
    explanation: 'Gọi B là biến cố "xuất hiện số chấm lẻ": B = {1; 3; 5} ⇒ n(B) = 3. Gọi A là biến cố "xuất hiện số nguyên tố": A = {2; 3; 5}. Giao AB = {3; 5} ⇒ n(AB) = 2. Xác suất có điều kiện P(A|B) = n(AB) / n(B) = 2/3.'
  },
  {
    id: 'q-6-1-2',
    chapterId: 'chap-6',
    lessonId: 'lesson-6-1',
    content: 'Cho hai biến cố A và B có P(A) = 0.4; P(B) = 0.5 và P(A ∩ B) = 0.2. Tính xác suất có điều kiện P(A|B).',
    difficulty: 'NB',
    primaryErrorTrap: 'KT',
    trapDescription: 'Bẫy công thức P(A|B) = P(AB) / P(B), chia cho biến cố điều kiện B chứ không phải A.',
    recommendedTip: 'P(A|B) = P(AB) / P(B) = 0.2 / 0.5 = 0.4.',
    options: [
      { id: 'A', text: '0.4', isCorrect: true },
      { id: 'B', text: '0.5', isCorrect: false, errorGroup: 'KT', errorNote: 'Tính P(B|A) = 0.2 / 0.4 = 0.5 (nhầm vị trí điều kiện).' },
      { id: 'C', text: '0.2', isCorrect: false, errorGroup: 'DG', errorNote: 'Lấy luôn xác suất đồng thời P(AB) = 0.2.' },
      { id: 'D', text: '0.8', isCorrect: false, errorGroup: 'TT', errorNote: 'Lấy 0.4 / 0.5 = 0.8.' }
    ],
    explanation: 'Theo định nghĩa xác suất có điều kiện: P(A|B) = P(A ∩ B) / P(B) = 0.2 / 0.5 = 0.4.'
  },

  // --- BÀI 2: CÔNG THỨC XÁC SUẤT TOÀN PHẦN VÀ CÔNG THỨC BAYES ---
  {
    id: 'q-6-2-1',
    chapterId: 'chap-6',
    lessonId: 'lesson-6-2',
    content: 'Có hai hộp đựng bi. Hộp I có 4 bi đỏ và 6 bi xanh. Hộp II có 7 bi đỏ và 3 bi xanh. Chọn ngẫu nhiên một hộp rồi từ đó lấy ra 1 viên bi. Tính xác suất để viên bi lấy ra có màu đỏ.',
    difficulty: 'TH',
    primaryErrorTrap: 'SU',
    trapDescription: 'Bẫy công thức xác suất toàn phần: P(Đỏ) = P(H₁)*P(Đ|H₁) + P(H₂)*P(Đ|H₂).',
    recommendedTip: 'P(Đỏ) = 1/2 * (4/10) + 1/2 * (7/10) = 1/2 * 0.4 + 1/2 * 0.7 = 0.2 + 0.35 = 0.55.',
    options: [
      { id: 'A', text: '0.55', isCorrect: true },
      { id: 'B', text: '0.50', isCorrect: false, errorGroup: 'SU', errorNote: 'Đoán mò trung bình 50%.' },
      { id: 'C', text: '0.40', isCorrect: false, errorGroup: 'QT', errorNote: 'Chỉ tính xác suất lấy ở Hộp I.' },
      { id: 'D', text: '0.70', isCorrect: false, errorGroup: 'QT', errorNote: 'Chỉ tính xác suất lấy ở Hộp II.' }
    ],
    explanation: 'Gọi H₁, H₂ lần lượt là biến cố chọn Hộp I và Hộp II ⇒ P(H₁) = P(H₂) = 0.5. Gọi A là biến cố lấy được bi đỏ. P(A|H₁) = 4/10 = 0.4; P(A|H₂) = 7/10 = 0.7. Theo công thức xác suất toàn phần: P(A) = P(H₁)P(A|H₁) + P(H₂)P(A|H₂) = 0.5 * 0.4 + 0.5 * 0.7 = 0.55.'
  },
  {
    id: 'q-6-2-2',
    chapterId: 'chap-6',
    lessonId: 'lesson-6-2',
    content: 'Tỷ lệ người mắc bệnh X trong một cộng đồng là 2% (0.02). Một xét nghiệm y tế chẩn đoán có độ chính xác: người có bệnh xét nghiệm dương tính 95% (0.95); người không có bệnh xét nghiệm vẫn dương tính giả 5% (0.05). Biết một người có kết quả xét nghiệm DƯƠNG TÍNH, tính xác suất thực sự người đó bị mắc bệnh X (dùng công thức Bayes).',
    difficulty: 'VDC',
    primaryErrorTrap: 'MH',
    trapDescription: 'Bẫy nghịch lý chẩn đoán dương tính giả trong y tế: số ca dương tính giả từ 98% người khỏe mạnh lấn át số ca dương tính thật.',
    recommendedTip: 'P(Bệnh|+) = P(B)P(+|B) / [P(B)P(+|B) + P(Không)P(+|Không)] = (0.02 * 0.95) / (0.02*0.95 + 0.98*0.05).',
    options: [
      { id: 'A', text: 'Xấp xỉ 27.9%', isCorrect: true },
      { id: 'B', text: '95%', isCorrect: false, errorGroup: 'MH', errorNote: 'Ngộ nhận xác suất mắc bệnh bằng độ nhạy xét nghiệm 95% (bỏ qua tỷ lệ dương tính giả).' },
      { id: 'C', text: '50%', isCorrect: false, errorGroup: 'PP', errorNote: 'Đoán mò may rủi.' },
      { id: 'D', text: '2%', isCorrect: false, errorGroup: 'DG', errorNote: 'Lấy luôn tỷ lệ mắc bệnh tự nhiên ban đầu.' }
    ],
    explanation: 'Gọi B là biến cố bị bệnh ⇒ P(B) = 0.02; P(Không B) = 0.98. Gọi + là biến cố xét nghiệm dương tính. P(+|B) = 0.95; P(+|Không B) = 0.05. Xác suất toàn phần P(+) = 0.02*0.95 + 0.98*0.05 = 0.019 + 0.049 = 0.068. Theo công thức Bayes: P(B|+) = (0.02 * 0.95) / 0.068 = 0.019 / 0.068 ≈ 0.2794 = 27.94%. Dù xét nghiệm chuẩn 95%, khi dương tính thì xác suất thực sự có bệnh chỉ ~28% do tỷ lệ bệnh trong dân số thấp.'
  }
];
