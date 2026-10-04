import { ErrorCategory, ErrorCode } from '../types/math';

export const ERROR_CATEGORIES: Record<ErrorCode, ErrorCategory> = {
  KT: {
    code: 'KT',
    groupNumber: 1,
    name: 'Nhóm 1: Lỗi kiến thức (KT)',
    shortName: 'Lỗi kiến thức',
    tagline: 'Quên định nghĩa, nhầm lẫn công thức, hiểu sai điều kiện áp dụng định lý',
    color: '#E11D48', // Rose / Red
    textColor: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    description: 'Học sinh thiếu hoặc nhớ sai định nghĩa cơ bản, công thức đạo hàm, tính chất hàm số, điều kiện nghiệm phương trình hoặc quên tập xác định hàm số.',
    coreSymptoms: [
      'Quên đặt điều kiện tập xác định trước khi tính đạo hàm hoặc tìm cực trị',
      'Nhầm lẫn giữa điều kiện cần và điều kiện đủ của cực trị (ngộ nhận f\'(x)=0 là cực trị)',
      'Viết sai công thức đạo hàm hàm hợp (như quên nhân u\' trong [f(u)]\')',
      'Nhầm công thức tích có hướng, tích vô hướng trong hình học không gian Oxyz',
      'Quên tính chất tiệm cận đứng là nghiệm của mẫu nhưng không triệt tiêu tử số',
    ],
    classicExamples: [
      {
        title: 'Bẫy điểm cực trị hàm đa thức bậc bốn',
        problem: 'Tìm số điểm cực trị của hàm số y = x⁴ - 2x² + 3.',
        wrongAnswer: 'Học sinh kết luận hàm số có 1 điểm cực trị vì nhầm công thức nghiệm ab ≥ 0.',
        wrongAnalysis: 'Nhớ sai điều kiện số điểm cực trị của hàm trùng phương y = ax⁴ + bx² + c: nhớ lộn điều kiện ab < 0 có 3 cực trị thành có 1 cực trị.',
        correctAnswer: 'Hàm số có 3 điểm cực trị.',
        correctSolution: 'y\' = 4x³ - 4x = 4x(x² - 1) = 0 ⇔ x = 0 hoặc x = ±1. Đạo hàm đổi dấu 3 lần qua 3 nghiệm phân biệt này nên hàm số có đúng 3 điểm cực trị.',
        preventionRule: 'Học thuộc bản chất thông qua đạo hàm đổi dấu, không học vẹt công thức tắt khi chưa nắm vững quy tắc y\' đổi dấu.'
      },
      {
        title: 'Bẫy tiệm cận đứng của hàm phân thức',
        problem: 'Tìm số tiệm cận đứng của đồ thị hàm số y = (x - 2) / (x² - 4).',
        wrongAnswer: 'Đồ thị có 2 tiệm cận đứng là x = 2 và x = -2 vì nghiệm của mẫu là x = ±2.',
        wrongAnalysis: 'Chỉ tìm nghiệm mẫu số x² - 4 = 0 mà không kiểm tra giới hạn lim hoặc triệt tiêu nghiệm chung với tử số.',
        correctAnswer: 'Đồ thị chỉ có 1 tiệm cận đứng là đường thẳng x = -2.',
        correctSolution: 'Rút gọn y = (x - 2) / [(x - 2)(x + 2)] = 1 / (x + 2) (với x ≠ 2). Khi x → 2 thì y → 1/4 (không tiến tới vô cực, nên x = 2 không là TCĐ). Khi x → -2 thì y → ∞, vậy chỉ có x = -2 là TCĐ.',
        preventionRule: 'Định nghĩa TCĐ: x = x₀ là TCĐ nếu ít nhất một trong các giới hạn một bên lim (x→x₀⁺ hoặc x→x₀⁻) y = ±∞. Luôn kiểm tra nghiệm của mẫu có làm triệt tiêu tử số không.'
      }
    ],
    checklist: [
      'Đã tìm tập xác định D của hàm số chưa?',
      'Công thức đạo hàm hàm hợp đã nhân u\' chưa?',
      'Nghiệm của đạo hàm có phải nghiệm bội chẵn (không đổi dấu) không?',
      'Điều kiện áp dụng định lý có thỏa mãn trên từng khoảng hay cả tập hợp?'
    ]
  },

  TT: {
    code: 'TT',
    groupNumber: 2,
    name: 'Nhóm 2: Lỗi tính toán, biến đổi (TT)',
    shortName: 'Lỗi tính toán, biến đổi',
    tagline: 'Sai dấu, cộng trừ nhân chia nhầm, rút gọn biểu thức ẩu',
    color: '#D97706', // Amber / Orange
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    description: 'Học sinh nắm được phương pháp và công thức nhưng sai sót ở khâu tính toán số học, biến đổi đại số, khai triển hằng đẳng thức hoặc chuyển vế đổi dấu.',
    coreSymptoms: [
      'Chuyển vế phương trình nhưng quên đổi dấu (-a thành +a)',
      'Tính đạo hàm phân thức bậc nhất trên bậc nhất (ad - bc) tính sai dấu của -bc',
      'Khai triển (a - b)² nhầm thành a² - b² hoặc quên số hạng -2ab',
      'Tính định thức tích có hướng tọa độ Oxyz nhầm dấu ở tọa độ y (thành phần j)',
      'Bấm máy tính CASIO nhập thiếu dấu ngoặc đơn dẫn đến kết quả sai lệch',
    ],
    classicExamples: [
      {
        title: 'Bẫy đạo hàm hàm phân thức bậc nhất trên bậc nhất',
        problem: 'Tính đạo hàm của hàm số y = (2x - 3) / (1 - x).',
        wrongAnswer: 'y\' = (2 - (-3)) / (1 - x)² = 5 / (1 - x)².',
        wrongAnalysis: 'Áp dụng quy tắc (ad - bc) nhưng quên xếp mẫu theo đúng thứ tự ax + b, cx + d. Mẫu là (-x + 1) chứ không phải (x - 1). ad - bc = 2*(1) - (-3)*(-1) = 2 - 3 = -1.',
        correctAnswer: 'y\' = -1 / (1 - x)².',
        correctSolution: 'Viết lại: y = (2x - 3) / (-x + 1). Suy ra y\' = [2(1) - (-3)(-1)] / (-x + 1)² = (2 - 3) / (1 - x)² = -1 / (1 - x)²',
        preventionRule: 'Trước khi tính đạo hàm hàm nhất biến (ax+b)/(cx+d), luôn viết biểu thức mẫu số theo thứ tự giảm dần của x để tránh nhầm hệ số c và d.'
      },
      {
        title: 'Bẫy dấu tọa độ tích có hướng Oxyz',
        problem: 'Cho u = (1; 2; 3) và v = (2; 1; -1). Tìm tọa độ vectơ w = [u, v].',
        wrongAnswer: 'w = (-5; 7; -3) do quên dấu trừ ở tọa độ thứ hai.',
        wrongAnalysis: 'Tọa độ y của tích có hướng phải lấy dấu đối -(u₁v₃ - u₃v₁) hoặc tính chéo lùi (u₃v₁ - u₁v₂).',
        correctAnswer: 'w = (-5; 7; -3) -> Đúng ra: y = -(1*(-1) - 3*2) = -(-1 - 6) = 7. Nếu tính u₁v₃ - u₃v₁ = -7 mà quên đổi dấu thành 7 thì sai.',
        correctSolution: 'x = 2*(-1) - 3*1 = -5; y = 3*2 - 1*(-1) = 7; z = 1*1 - 2*2 = -3. Vậy [u, v] = (-5; 7; -3).',
        preventionRule: 'Khi tính tay tích có hướng Oxyz: viết cột phụ tọa độ hoặc bấm máy tính kiểm tra lại vectơ kết quả vuông góc với u và v (u.w = 0).'
      }
    ],
    checklist: [
      'Đã đưa các đa thức về thứ tự chuẩn bậc giảm dần chưa?',
      'Khi nhân chia hai vế với số âm, đã đảo chiều bất đẳng thức chưa?',
      'Đã bấm máy tính kiểm tra lại phép tính số học quan trọng chưa?',
      'Dấu ngoặc đơn trong máy tính cầm tay đã đầy đủ chưa?'
    ]
  },

  PP: {
    code: 'PP',
    groupNumber: 3,
    name: 'Nhóm 3: Lỗi lựa chọn & vận dụng phương pháp (PP)',
    shortName: 'Lỗi phương pháp',
    tagline: 'Chọn phương pháp cồng kềnh, dùng công thức giải nhanh không phù hợp điều kiện',
    color: '#2563EB', // Blue
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    description: 'Học sinh chọn sai công cụ giải toán (như dùng hình học thuần túy thay vì gắn trục tọa độ, lạm dụng máy tính CASIO mà không hiểu giới hạn sai số, hoặc áp dụng công thức tính nhanh mà bài toán bị biến tướng).',
    coreSymptoms: [
      'Lạm dụng Table CASIO để tìm GTLN/GTNN nhưng bước nhảy (step) quá lớn bỏ sót điểm rơi',
      'Dùng công thức cực trị tính nhanh tam giác cân, vuông khi hàm số không phải trùng phương chuẩn',
      'Cố chấp giải phương trình lượng giác/mũ phức tạp bằng đại số thay vì dùng tính đơn điệu (hàm đặc trưng)',
      'Bài toán khoảng cách hình không gian phức tạp không chuyển về phương pháp tọa độ Oxyz hóa',
    ],
    classicExamples: [
      {
        title: 'Bẫy Table CASIO tìm GTNN',
        problem: 'Tìm giá trị nhỏ nhất của f(x) = x⁴ - 10x² + 9 trên đoạn [-4; 4].',
        wrongAnswer: 'Học sinh bấm Table bước nhảy 0.5 ra GTNN là -15.',
        wrongAnalysis: 'Đỉnh cực tiểu xảy ra tại x = ±√5 ≈ ±2.236. Bước nhảy 0.5 đi qua 2.0 (f= -15) và 2.5 (f= -13.43) nên bỏ qua điểm rơi cực tiểu thực sự.',
        correctAnswer: 'Giá trị nhỏ nhất là f(±√5) = -16.',
        correctSolution: 'f\'(x) = 4x³ - 20x = 4x(x² - 5) = 0 ⇔ x = 0, x = ±√5. f(±√5) = (5)² - 10(5) + 9 = 25 - 50 + 9 = -16.',
        preventionRule: 'Dùng CASIO Table để phán đoán vùng giá trị, nhưng khi tìm cực trị, GTLN/GTNN phải luôn kết hợp giải phương trình f\'(x)=0 bằng tay.'
      }
    ],
    checklist: [
      'Phương pháp đang chọn có phải là đường ngắn nhất và an toàn nhất không?',
      'Nếu bấm máy tính, bước nhảy (step) có đủ mịn để không lọt qua điểm rơi không?',
      'Công thức tính nhanh này có điều kiện ràng buộc gì đặc biệt không?'
    ]
  },

  DG: {
    code: 'DG',
    groupNumber: 4,
    name: 'Nhóm 4: Lỗi đọc hiểu & xác định dữ liệu (DG)',
    shortName: 'Lỗi đọc hiểu, dữ liệu',
    tagline: 'Đọc nhầm giả thiết, nhầm f(x) với f\'(x), nhầm x cực trị với y cực trị',
    color: '#0D9488', // Teal
    textColor: 'text-teal-700',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    description: 'Lỗi phát sinh do học sinh đọc lướt đề, nhầm lẫn đồ thị hàm số f(x) với đồ thị của đạo hàm f\'(x), nhầm giữa giá trị cực trị y và điểm cực trị x, hoặc nhầm tiệm cận ngang với tiệm cận đứng.',
    coreSymptoms: [
      'Nhìn đồ thị đạo hàm f\'(x) lại tưởng đồ thị f(x), đếm số đỉnh làm số cực trị',
      'Đề hỏi "giá trị cực đại" (y_CĐ) nhưng lại khoanh "điểm cực đại" (x_CĐ)',
      'Đề hỏi "đồng biến trên khoảng" lại chọn đáp án chứa dấu hợp (∪) thay vì dấu "và"',
      'Nhầm lẫn giữa mặt phẳng song song và vuông góc với đường thẳng',
    ],
    classicExamples: [
      {
        title: 'Bẫy đồ thị f(x) và đồ thị đạo hàm f\'(x)',
        problem: 'Cho đồ thị f\'(x) cắt trục hoành tại 3 điểm và có 2 điểm uốn đỉnh. Hỏi hàm số f(x) có bao nhiêu điểm cực trị?',
        wrongAnswer: 'Hàm số f(x) có 2 điểm cực trị vì nhìn thấy 2 đỉnh trên đồ thị.',
        wrongAnalysis: 'Đọc nhầm đề: đề cho đồ thị f\'(x) nhưng lại phân tích như đồ thị f(x) (đếm số đỉnh).',
        correctAnswer: 'Số điểm cực trị của f(x) là số lần f\'(x) đổi dấu qua trục Ox (số giao điểm cắt xuyên qua trục hoành).',
        correctSolution: 'Cực trị của f(x) là nghiệm của f\'(x)=0 mà qua đó f\'(x) đổi dấu. Nếu f\'(x) cắt xuyên trục hoành tại 3 điểm phân biệt thì f(x) có 3 điểm cực trị.',
        preventionRule: 'Gạch chân ngay dưới tên đồ thị trong đề: "Đồ thị f(x)" hay "Đồ thị đạo hàm f\'(x)". Nếu là f\'(x), cực trị là giao điểm với trục hoành, không phải đỉnh!'
      },
      {
        title: 'Bẫy điểm cực trị vs giá trị cực trị',
        problem: 'Hàm số y = x³ - 3x + 2 đạt cực đại tại điểm nào và giá trị cực đại là bao nhiêu?',
        wrongAnswer: 'Học sinh chọn đáp án "Hàm số đạt giá trị cực đại tại y = -1".',
        wrongAnalysis: 'Lẫn lộn thuật ngữ: điểm cực trị là x, giá trị cực trị là y, điểm cực trị của đồ thị là M(x; y).',
        correctAnswer: 'Hàm số đạt cực đại tại điểm x = -1, và giá trị cực đại là y_CĐ = 4.',
        correctSolution: 'y\' = 3x² - 3 = 0 ⇔ x = ±1. y"(-1) = -6 < 0 nên x = -1 là điểm cực đại của hàm số. y(-1) = 4 là giá trị cực đại.',
        preventionRule: 'Ghi nhớ bộ 3 thuật ngữ: 1. "Điểm cực trị của hàm số" -> hỏi x; 2. "Giá trị cực trị" -> hỏi y; 3. "Điểm cực trị của đồ thị hàm số" -> hỏi tọa độ (x; y).'
      }
    ],
    checklist: [
      'Đề bài cho đồ thị hay bảng biến thiên của f(x) hay f\'(x)?',
      'Câu hỏi yêu cầu tìm x (điểm), y (giá trị) hay M(x;y) (tọa độ điểm)?',
      'Đề bài hỏi MỆNH ĐỀ ĐÚNG hay MỆNH ĐỀ SAI?'
    ]
  },

  SU: {
    code: 'SU',
    groupNumber: 5,
    name: 'Nhóm 5: Lỗi suy luận & lập luận (SU)',
    shortName: 'Lỗi suy luận, lập luận',
    tagline: 'Ngộ nhận chiều suy luận, thừa nhận giả thiết không chứng minh, bỏ quên nghiệm ngoại lai',
    color: '#7C3AED', // Violet / Purple
    textColor: 'text-violet-700',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    description: 'Học sinh suy luận logic thiếu chặt chẽ, ngộ nhận mệnh đề đảo, chia hai vế cho biểu thức chứa biến khi chưa biết khác 0, hoặc bình phương hai vế không đặt điều kiện.',
    coreSymptoms: [
      'Ngộ nhận: "f\'(x₀) = 0 thì x₀ là điểm cực trị" (quên f(x) = x³ có f\'(0)=0 nhưng không là cực trị)',
      'Bình phương hai vế phương trình nhưng không đặt điều kiện vế kia không âm',
      'Chia cả 2 vế của bất phương trình cho một biểu thức chưa rõ âm hay dương',
      'Suy luận hàm số nghịch biến trên (-∞; 1) và (1; +∞) suy ra nghịch biến trên (-∞; 1) ∪ (1; +∞)',
    ],
    classicExamples: [
      {
        title: 'Bẫy kết luận khoảng đồng biến, nghịch biến',
        problem: 'Tìm các khoảng đồng biến của hàm số y = (x + 1) / (x - 1).',
        wrongAnswer: 'Hàm số đồng biến trên R \\ {1} hoặc trên (-∞; 1) ∪ (1; +∞).',
        wrongAnalysis: 'Khái niệm đồng biến chỉ định nghĩa trên từng khoảng hoặc đoạn, không định nghĩa trên phép hợp ∪ hay tập hiệu \\.',
        correctAnswer: 'Hàm số nghịch biến trên từng khoảng (-∞; 1) và (1; +∞).',
        correctSolution: 'y\' = -2 / (x - 1)² < 0 với mọi x ≠ 1. Kết luận đúng: hàm số nghịch biến trên các khoảng (-∞; 1) và (1; +∞). Dùng chữ "và" hoặc dấu chấm phẩy, TUYỆT ĐỐI KHÔNG dùng ký hiệu hợp ∪.',
        preventionRule: 'Không bao giờ được kết luận đồng biến/nghịch biến chứa ký hiệu "∪" hoặc "\\". Luôn dùng chữ "và" giữa các khoảng riêng biệt.'
      }
    ],
    checklist: [
      'Mệnh đề này có đúng cả hai chiều (tương đương) hay chỉ là một chiều (suy ra)?',
      'Khi chia cho biểu thức f(x), biểu thức đó đã được chứng minh khác 0 chưa?',
      'Kết luận có vi phạm định nghĩa toán học chuẩn mực không?'
    ]
  },

  QT: {
    code: 'QT',
    groupNumber: 6,
    name: 'Nhóm 6: Lỗi quy trình giải toán (QT)',
    shortName: 'Lỗi quy trình giải',
    tagline: 'Thiếu bước thử lại điều kiện, lập bảng biến thiên thiếu mút, không so sánh nghiệm',
    color: '#0284C7', // Sky / Cyan
    textColor: 'text-sky-700',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    description: 'Học sinh bỏ qua các bước trọng yếu trong quy trình chuẩn: quên bước thử lại (nhất là trong bài toán tìm m để hàm số đạt cực trị), không xét các mút của đoạn khi tìm GTLN/GTNN, hoặc giải xong quên đối chiếu điều kiện.',
    coreSymptoms: [
      'Tìm m để hàm số đạt cực trị tại x₀: chỉ giải f\'(x₀)=0 mà bỏ qua bước thử lại f\'\'(x₀) hoặc bảng biến thiên',
      'Tìm GTLN/GTNN trên đoạn [a; b]: chỉ tính f(nghiệm) mà quên tính giá trị tại 2 đầu mút f(a), f(b)',
      'Giải phương trình logarit/căn thức: tìm ra x nhưng không đối chiếu lại điều kiện xác định',
      'Viết phương trình mặt phẳng: tìm được vectơ pháp tuyến nhưng lấy nhầm điểm đi qua',
    ],
    classicExamples: [
      {
        title: 'Bẫy tìm tham số m để hàm số đạt cực trị tại một điểm',
        problem: 'Tìm m để hàm số y = x³ - 3mx² + 3m²x + 1 đạt cực đại tại x = 1.',
        wrongAnswer: 'y\'(1) = 3 - 6m + 3m² = 0 ⇔ m = 1. Kết luận m = 1.',
        wrongAnalysis: 'Với m = 1, y = x³ - 3x² + 3x + 1 = (x - 1)³ + 2 có y\' = 3(x - 1)² ≥ 0 với mọi x. Đạo hàm không đổi dấu nên x = 1 KHÔNG PHẢI LÀ CỰC TRỊ!',
        correctAnswer: 'Không có giá trị m nào thỏa mãn yêu cầu bài toán.',
        correctSolution: 'Điều kiện cần: y\'(1) = 0 ⇔ 3m² - 6m + 3 = 0 ⇔ m = 1. Thử lại: Với m = 1, y\' = 3(x - 1)² ≥ 0 ∀x, hàm luôn đồng biến nên không có cực trị. Vậy không tồn tại m.',
        preventionRule: 'Quy trình giải bài toán tham số cực trị tại x₀: BƯỚC 1: Tìm m từ y\'(x₀)=0. BƯỚC 2 (BẮT BUỘC): Thử lại từng giá trị m để kiểm tra y\' có thực sự đổi dấu qua x₀ không!'
      }
    ],
    checklist: [
      'Đã đối chiếu nghiệm tìm được với điều kiện ban đầu chưa?',
      'Đã thực hiện bước thử lại (Check step) chưa?',
      'Khi tìm max/min trên [a;b], đã so sánh cả f(a), f(b) và f(nghiệm) chưa?'
    ]
  },

  MH: {
    code: 'MH',
    groupNumber: 7,
    name: 'Nhóm 7: Lỗi mô hình hóa toán học (MH)',
    shortName: 'Lỗi mô hình hóa',
    tagline: 'Thiết lập hàm mục tiêu sai, đặt ẩn thiếu điều kiện thực tế, nhầm đơn vị đo',
    color: '#059669', // Emerald / Green
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    description: 'Xuất hiện trong các bài toán thực tế GDPT 2018 (tối ưu hóa chi phí sản xuất, tìm diện tích lớn nhất, bài toán nồng độ, lãi suất ngân hàng): học sinh diễn giải sai đề thực tế thành ngôn ngữ đại số, bỏ quên điều kiện vật lý thực tế của ẩn số.',
    coreSymptoms: [
      'Đặt ẩn số x (chiều dài, số lượng sản phẩm) nhưng không có điều kiện x > 0 hoặc x ∈ N*',
      'Bài toán làm thùng không nắp nhưng vẫn cộng diện tích cả 2 đáy',
      'Đổi đơn vị mét sang centimet hoặc triệu đồng sang đồng bị sai bậc lũy thừa',
      'Chọn điểm rơi tối ưu hóa vượt ra ngoài khoảng giá trị khả thi thực tế',
    ],
    classicExamples: [
      {
        title: 'Bẫy bài toán tối ưu thùng chứa không nắp',
        problem: 'Một người thợ muốn gò một chiếc thùng hình hộp chữ nhật đáy vuông, KHÔNG CÓ NẮP, thể tích 500 lít. Tìm cạnh đáy x để diện tích tôn sử dụng là ít nhất.',
        wrongAnswer: 'Học sinh áp dụng công thức diện tích toàn phần của hộp có nắp S = 2x² + 4xh, dẫn đến kết quả sai.',
        wrongAnalysis: 'Đọc lướt đề bỏ qua cụm từ "KHÔNG CÓ NẮP". Chiếc thùng chỉ có 1 đáy nên diện tích tôn là S = x² + 4xh.',
        correctAnswer: 'Cạnh đáy x = 10 dm (hoặc 1 mét).',
        correctSolution: 'Đổi V = 500 lít = 500 dm³. Chiều cao h = 500 / x². Vì thùng không nắp, diện tích tôn S(x) = x² + 4xh = x² + 2000/x (với x > 0). S\'(x) = 2x - 2000/x² = 0 ⇔ 2x³ = 2000 ⇔ x³ = 1000 ⇔ x = 10 dm.',
        preventionRule: 'Với bài toán thực tế: 1. Đọc kỹ chi tiết vật lý ("không nắp", "chỉ sơn mặt ngoài"); 2. Quy đồng đơn vị đo lường trước khi lập hàm số.'
      }
    ],
    checklist: [
      'Đơn vị đo lường của các đại lượng đã đồng nhất chưa (lít, dm³, m, cm)?',
      'Ẩn số thực tế có bị ràng buộc gì không (x > 0, x nguyên dương, x < giới hạn)?',
      'Mô hình hình học thực tế có chi tiết đặc biệt nào bị bỏ quên không (không nắp, hao hụt vật liệu)?'
    ]
  }
};
