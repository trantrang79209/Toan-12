import { Chapter } from '../types/math';

export const CHAPTERS_DATA: Chapter[] = [
  // ==========================================
  // HỌC KỲ 1 (TẬP 1)
  // ==========================================
  {
    id: 'chap-1',
    semester: 1,
    semesterLabel: 'Học kỳ 1 (Tập 1)',
    number: 1,
    title: 'Chương 1: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số',
    description: 'Tính đơn điệu, cực trị, giá trị lớn nhất, giá trị nhỏ nhất, đường tiệm cận và khảo sát vẽ đồ thị hàm số.',
    color: '#0284C7',
    lessons: [
      {
        id: 'lesson-1-1',
        chapterId: 'chap-1',
        order: 1,
        title: 'Tính đơn điệu và cực trị của hàm số',
        readingTime: '15 phút',
        summary: 'Mối liên hệ giữa dấu của đạo hàm f\'(x), tính đồng biến, nghịch biến và các điểm cực trị của hàm số.',
        sections: [
          {
            heading: '1. Tính đơn điệu của hàm số và dấu đạo hàm',
            content: [
              'Cho hàm số y = f(x) có đạo hàm trên khoảng K. Nếu f\'(x) ≥ 0 (hoặc f\'(x) ≤ 0) ∀x ∈ K và dấu bằng chỉ xảy ra tại hữu hạn điểm thì hàm số đồng biến (hoặc nghịch biến) trên K.',
              'CHÚ Ý: Với hàm phân thức bậc nhất trên bậc nhất y = (ax+b)/(cx+d), f\'(x) = (ad-bc)/(cx+d)² luôn mang dấu nghiêm ngặt (> 0 hoặc < 0) trên từng khoảng xác định, tuyệt đối KHÔNG có dấu bằng.'
            ],
            keyPoints: [
              'Khoảng đơn điệu chỉ xét trên từng khoảng rời nhau, dùng chữ "và", không dùng ký hiệu hợp ∪ hay tập hiệu \\.',
              'Đạo hàm triệt tiêu tại hữu hạn điểm không làm mất tính đơn điệu của hàm đa thức.'
            ],
            classicTrap: {
              trapName: 'Ký hiệu kết luận khoảng đơn điệu và dấu bằng hàm nhất biến',
              errorCode: 'SU',
              warning: 'Ghi hàm số đồng biến trên (-∞; 1) ∪ (1; +∞) hoặc lấy cả dấu bằng ad - bc ≥ 0 đối với hàm (ax+b)/(cx+d).',
              tip: 'Luôn kết luận trên từng khoảng riêng biệt và không lấy dấu bằng cho hàm phân thức bậc nhất.'
            }
          },
          {
            heading: '2. Cực trị của hàm số',
            content: [
              'Điểm x₀ là điểm cực trị khi và chỉ khi đạo hàm f\'(x) đổi dấu khi đi qua x₀ (từ dương sang âm là cực đại, từ âm sang dương là cực tiểu).',
              'Quy tắc 2: f\'(x₀) = 0 và f\'\'(x₀) < 0 ⇒ cực đại; f\'(x₀) = 0 và f\'\'(x₀) > 0 ⇒ cực tiểu.'
            ],
            classicTrap: {
              trapName: 'Nhầm lẫn giữa điểm cực trị (x) và giá trị cực trị (y)',
              errorCode: 'DG',
              warning: 'Đề hỏi giá trị cực tiểu của hàm số nhưng học sinh lại khoanh hoành độ x.',
              tip: 'Điểm cực trị hàm số = x; Giá trị cực trị = y; Điểm cực trị của đồ thị = M(x; y).'
            }
          }
        ]
      },
      {
        id: 'lesson-1-2',
        chapterId: 'chap-1',
        order: 2,
        title: 'Giá trị lớn nhất và giá trị nhỏ nhất của hàm số',
        readingTime: '12 phút',
        summary: 'Quy trình tìm GTLN, GTNN trên đoạn, khoảng và giải quyết bài toán mô hình hóa tối ưu thực tế.',
        sections: [
          {
            heading: '1. Quy tắc tìm GTLN và GTNN trên đoạn [a; b]',
            content: [
              'Bước 1: Tìm các điểm xᵢ ∈ (a; b) mà tại đó f\'(xᵢ) = 0 hoặc f\'(xᵢ) không xác định.',
              'Bước 2: Tính các giá trị f(a), f(b) và các f(xᵢ).',
              'Bước 3: So sánh: số lớn nhất là max f(x), số nhỏ nhất là min f(x).'
            ],
            classicTrap: {
              trapName: 'Bỏ quên giá trị tại hai đầu mút [a; b]',
              errorCode: 'QT',
              warning: 'Chỉ giải f\'(x)=0 rồi vội kết luận đó là GTLN/GTNN mà không tính f(a) và f(b).',
              tip: 'Luôn tính đủ bộ giá trị {f(a), f(xᵢ), f(b)} trước khi so sánh.'
            }
          },
          {
            heading: '2. Bài toán mô hình hóa tối ưu hóa thực tiễn',
            content: [
              'Thiết lập hàm mục tiêu f(x) cho chi phí, doanh thu hoặc diện tích/thể tích từ đề bài thực tế.',
              'Xác định rõ ràng điều kiện vật lý thực tế của biến số (x > 0, x < giới hạn hình học).'
            ],
            classicTrap: {
              trapName: 'Sai mô hình bài toán thực tế',
              errorCode: 'MH',
              warning: 'Bài toán làm thùng không nắp nhưng vẫn cộng diện tích cả 2 đáy dẫn đến hàm mục tiêu sai.',
              tip: 'Đọc kỹ chi tiết thực tế: "không nắp", "chỉ sơn mặt ngoài", đơn vị lít sang dm³.'
            }
          }
        ]
      },
      {
        id: 'lesson-1-3',
        chapterId: 'chap-1',
        order: 3,
        title: 'Tiệm cận của đồ thị hàm số',
        readingTime: '12 phút',
        summary: 'Tiệm cận đứng, tiệm cận ngang và tiệm cận xiên (GDPT mới) của đồ thị hàm số phân thức và vô tỉ.',
        sections: [
          {
            heading: '1. Định nghĩa các đường tiệm cận',
            content: [
              'Tiệm cận đứng: x = x₀ nếu lim (x→x₀⁺ hoặc x→x₀⁻) y = ±∞.',
              'Tiệm cận ngang: y = y₀ nếu lim (x→+∞ hoặc x→-∞) y = y₀.',
              'Tiệm cận xiên: y = ax + b (a ≠ 0) nếu lim (x→±∞) [f(x) - (ax + b)] = 0 (thường gặp ở hàm phân thức bậc 2 trên bậc 1).'
            ],
            classicTrap: {
              trapName: 'Nghiệm chung giữa tử số và mẫu số',
              errorCode: 'KT',
              warning: 'Thấy mẫu số triệt tiêu vội kết luận có tiệm cận đứng mà không kiểm tra nghiệm có triệt tiêu với tử số hay không.',
              tip: 'Nếu x = x₀ là nghiệm của cả tử và mẫu, hãy phân tích nhân tử rút gọn hoặc bấm giới hạn kiểm tra.'
            }
          }
        ]
      },
      {
        id: 'lesson-1-4',
        chapterId: 'chap-1',
        order: 4,
        title: 'Khảo sát sự biến thiên và vẽ đồ thị của hàm số',
        readingTime: '15 phút',
        summary: 'Khảo sát các họ hàm chuẩn (bậc ba, phân thức nhất biến, phân thức bậc 2 trên bậc 1) và biện luận tương giao số nghiệm.',
        sections: [
          {
            heading: '1. Quy trình khảo sát và các yếu tố đồ thị',
            content: [
              'Tập xác định, đạo hàm y\', bảng biến thiên, các điểm uốn, tâm đối xứng, trục đối xứng và đồ thị.',
              'Biện luận nghiệm phương trình f(x) = m bằng số giao điểm giữa đồ thị y = f(x) và đường nằm ngang y = m.'
            ],
            classicTrap: {
              trapName: 'Đọc nhầm đồ thị f(x) và f\'(x)',
              errorCode: 'DG',
              warning: 'Đề bài cho đồ thị của đạo hàm f\'(x) nhưng học sinh lại tìm cực trị bằng cách đếm các đỉnh của đồ thị.',
              tip: 'Khoanh tròn tên đồ thị trên đề: nếu là f\'(x), cực trị là giao điểm cắt xuyên qua trục hoành Ox.'
            }
          }
        ]
      }
    ]
  },

  {
    id: 'chap-2',
    semester: 1,
    semesterLabel: 'Học kỳ 1 (Tập 1)',
    number: 2,
    title: 'Chương 2: Vectơ và hệ tọa độ trong không gian',
    description: 'Các phép toán vectơ trong không gian, hệ tọa độ Oxyz, tích có hướng và ứng dụng hình học.',
    color: '#059669',
    lessons: [
      {
        id: 'lesson-2-1',
        chapterId: 'chap-2',
        order: 1,
        title: 'Vectơ trong không gian',
        readingTime: '10 phút',
        summary: 'Quy tắc ba điểm, quy tắc hình hộp, quy tắc hình bình hành, độ dài vectơ và tích vô hướng của hai vectơ trong không gian.',
        sections: [
          {
            heading: '1. Các quy tắc vectơ không gian',
            content: [
              'Quy tắc ba điểm: AB + BC = AC.',
              'Quy tắc hình hộp: Với hình hộp ABCD.A\'B\'C\', vectơ đường chéo AC\' = AB + AD + AA\'.',
              'Tích vô hướng: u.v = |u|.|v|.cos(u, v). Điều kiện vuông góc: u ⊥ v ⇔ u.v = 0.'
            ],
            classicTrap: {
              trapName: 'Áp dụng sai quy tắc hình hộp',
              errorCode: 'KT',
              warning: 'Nhầm lẫn giữa vectơ đường chéo AC\' với các vectơ đường chéo mặt phẳng bên.',
              tip: 'Đường chéo hình hộp xuất phát từ cùng đỉnh A là tổng của 3 vectơ cạnh xuất phát từ đỉnh A.'
            }
          }
        ]
      },
      {
        id: 'lesson-2-2',
        chapterId: 'chap-2',
        order: 2,
        title: 'Hệ tọa độ trong không gian',
        readingTime: '10 phút',
        summary: 'Hệ trục tọa độ Oxyz, tọa độ của một điểm, tọa độ vectơ, hình chiếu vuông góc lên các trục và mặt phẳng tọa độ.',
        sections: [
          {
            heading: '1. Tọa độ điểm và hình chiếu',
            content: [
              'Điểm M(x; y; z) ⇔ OM = x.i + y.j + z.k.',
              'Hình chiếu của M(a; b; c) lên (Oxy) là (a; b; 0); lên (Oxz) là (a; 0; c); lên trục Oz là (0; 0; c).'
            ],
            classicTrap: {
              trapName: 'Nhầm lẫn thành phần tọa độ hình chiếu',
              errorCode: 'DG',
              warning: 'Chiếu lên mặt phẳng (Oxy) khuyết z nhưng học sinh lại cho x hoặc y bằng 0.',
              tip: 'Thuộc khẩu quyết: "Khuyết thành phần nào thì thành phần đó bằng 0".'
            }
          }
        ]
      },
      {
        id: 'lesson-2-3',
        chapterId: 'chap-2',
        order: 3,
        title: 'Biểu thức tọa độ của các phép toán vectơ',
        readingTime: '12 phút',
        summary: 'Cộng trừ vectơ, nhân với số, tích vô hướng, độ dài vectơ và tích có hướng trong không gian Oxyz.',
        sections: [
          {
            heading: '1. Biểu thức tọa độ và tích có hướng',
            content: [
              'u = (x₁; y₁; z₁), v = (x₂; y₂; z₂) ⇒ u.v = x₁x₂ + y₁y₂ + z₁z₂; |u| = √(x₁² + y₁² + z₁²).',
              'Tích có hướng w = [u, v] = (y₁z₂ - z₁y₂; z₁x₂ - x₁z₂; x₁y₂ - y₁x₂).',
              'Ứng dụng: Diện tích tam giác S = 1/2*|[AB, AC]|; Thể tích tứ diện V = 1/6*|[AB, AC].AD|.'
            ],
            classicTrap: {
              trapName: 'Sai dấu ở tung độ của tích có hướng',
              errorCode: 'TT',
              warning: 'Tung độ y của tích có hướng là z₁x₂ - x₁z₂ (hoặc -(x₁z₂ - x₂z₁)), học sinh hay quên đổi dấu trừ.',
              tip: 'Luôn bấm máy tính hoặc thử lại u.w = 0 để kiểm tra tính trực giao.'
            }
          }
        ]
      }
    ]
  },

  {
    id: 'chap-3',
    semester: 1,
    semesterLabel: 'Học kỳ 1 (Tập 1)',
    number: 3,
    title: 'Chương 3: Thống kê – Số đặc trưng đo mức độ phân tán cho mẫu số liệu ghép nhóm',
    description: 'Khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm trong chương trình mới.',
    color: '#7C3AED',
    lessons: [
      {
        id: 'lesson-3-1',
        chapterId: 'chap-3',
        order: 1,
        title: 'Khoảng biến thiên, khoảng tứ phân vị',
        readingTime: '12 phút',
        summary: 'Đo mức độ phân tán bằng khoảng biến thiên R và khoảng tứ phân vị ΔQ = Q₃ - Q₁ của số liệu nhóm.',
        sections: [
          {
            heading: '1. Khoảng biến thiên và công thức tứ phân vị ghép nhóm',
            content: [
              'Khoảng biến thiên R = đầu mút phải nhóm cuối - đầu mút trái nhóm đầu.',
              'Tứ phân vị thứ p: xác định nhóm chứa tứ phân vị dựa vào tần số tích lũy, sau đó dùng công thức nội suy tuyến tính.'
            ],
            classicTrap: {
              trapName: 'Lấy nhầm tần số tích lũy của nhóm trước',
              errorCode: 'TT',
              warning: 'Thay nhầm Cf (tần số tích lũy của nhóm liền trước) thành tần số của chính nhóm đang xét.',
              tip: 'Luôn lập thêm một hàng hoặc cột tần số tích lũy trước khi thế số vào công thức.'
            }
          }
        ]
      },
      {
        id: 'lesson-3-2',
        chapterId: 'chap-3',
        order: 2,
        title: 'Phương sai và độ lệch chuẩn',
        readingTime: '12 phút',
        summary: 'Tính giá trị đại diện của từng nhóm, số trung bình, phương sai s² và độ lệch chuẩn s = √s².',
        sections: [
          {
            heading: '1. Phương sai và độ lệch chuẩn',
            content: [
              'Giá trị đại diện của nhóm [aᵢ; aᵢ₊₁) là cᵢ = (aᵢ + aᵢ₊₁) / 2.',
              'Phương sai s² = 1/n * Σ mᵢ*(cᵢ - x̄)²; Độ lệch chuẩn s = √(s²).'
            ],
            classicTrap: {
              trapName: 'Quên nhân với tần số mᵢ của nhóm',
              errorCode: 'QT',
              warning: 'Khi tính phương sai, chỉ cộng (cᵢ - x̄)² mà quên nhân với tần số mᵢ của nhóm tương ứng.',
              tip: 'Mỗi nhóm có bao nhiêu phần tử thì phải nhân với bấy nhiêu lần tần số mᵢ.'
            }
          }
        ]
      }
    ]
  },

  // ==========================================
  // HỌC KỲ 2 (TẬP 2)
  // ==========================================
  {
    id: 'chap-4',
    semester: 2,
    semesterLabel: 'Học kỳ 2 (Tập 2)',
    number: 4,
    title: 'Chương 4: Nguyên hàm và tích phân',
    description: 'Khái niệm nguyên hàm, bảng nguyên hàm cơ bản, tích phân, phương pháp đổi biến số, từng phần và ứng dụng hình học tính diện tích, thể tích.',
    color: '#D97706',
    lessons: [
      {
        id: 'lesson-4-1',
        chapterId: 'chap-4',
        order: 1,
        title: 'Nguyên hàm',
        readingTime: '14 phút',
        summary: 'Định nghĩa nguyên hàm F\'(x) = f(x), họ nguyên hàm ∫f(x)dx = F(x) + C và các công thức cơ bản.',
        sections: [
          {
            heading: '1. Khái niệm và tính chất nguyên hàm',
            content: [
              'Hàm số F(x) là nguyên hàm của f(x) trên K nếu F\'(x) = f(x) ∀x ∈ K.',
              'Mọi nguyên hàm đều có dạng F(x) + C. Các công thức: ∫x^α dx = x^(α+1)/(α+1) + C (α ≠ -1); ∫1/x dx = ln|x| + C; ∫e^x dx = e^x + C.'
            ],
            classicTrap: {
              trapName: 'Quên trị tuyệt đối ln|x| và quên chia cho hệ số a',
              errorCode: 'KT',
              warning: '∫1/(ax + b)dx = 1/a * ln|ax + b| + C. Học sinh hay quên nhân 1/a và quên dấu giá trị tuyệt đối.',
              tip: 'Với dạng f(ax + b), luôn luôn có hệ số 1/a ở phía trước!'
            }
          }
        ]
      },
      {
        id: 'lesson-4-2',
        chapterId: 'chap-4',
        order: 2,
        title: 'Tích phân',
        readingTime: '15 phút',
        summary: 'Định nghĩa tích phân Newton-Leibniz ∫[a to b] f(x)dx = F(b) - F(a), phương pháp đổi biến số và từng phần.',
        sections: [
          {
            heading: '1. Định nghĩa và công thức tính tích phân',
            content: [
              'Tích phân ∫[a to b] f(x)dx = F(b) - F(a). Tính chất: tách cận ∫[a to b] = ∫[a to c] + ∫[c to b].',
              'Phương pháp từng phần: ∫ u dv = u.v - ∫ v du. Thứ tự ưu tiên đặt u: "Nhất lô, nhì đa, tam lượng, tứ mũ".'
            ],
            classicTrap: {
              trapName: 'Đổi biến số nhưng quên đổi cận tích phân',
              errorCode: 'QT',
              warning: 'Đặt ẩn phụ t = u(x) nhưng giữ nguyên cận x = a, x = b khi thế vào tích phân mới.',
              tip: 'Quy tắc sống còn khi đổi biến tích phân: "Đặt ẩn phụ ⇒ ĐỔI CẬN NGAY".'
            }
          }
        ]
      },
      {
        id: 'lesson-4-3',
        chapterId: 'chap-4',
        order: 3,
        title: 'Ứng dụng hình học của tích phân',
        readingTime: '14 phút',
        summary: 'Tính diện tích hình phẳng giới hạn bởi các đường cong và thể tích khối tròn xoay quanh trục Ox.',
        sections: [
          {
            heading: '1. Diện tích hình phẳng và thể tích tròn xoay',
            content: [
              'Diện tích hình phẳng giữa 2 đồ thị: S = ∫[a to b] |f(x) - g(x)| dx.',
              'Thể tích khối tròn xoay khi quay hình phẳng giới hạn bởi y = f(x), y = 0, x = a, x = b quanh Ox: V = π * ∫[a to b] [f(x)]² dx.'
            ],
            classicTrap: {
              trapName: 'Quên số π và quên bình phương hàm f(x)',
              errorCode: 'KT',
              warning: 'Tính thể tích khối tròn xoay nhưng quên nhân số π ở ngoài hoặc chỉ tích phân f(x) thay vì [f(x)]².',
              tip: 'Thể tích hình tròn xoay xuất phát từ diện tích hình tròn πr² nên BẮT BUỘC có π và f(x)².'
            }
          }
        ]
      }
    ]
  },

  {
    id: 'chap-5',
    semester: 2,
    semesterLabel: 'Học kỳ 2 (Tập 2)',
    number: 5,
    title: 'Chương 5: Phương pháp tọa độ trong không gian (Oxyz)',
    description: 'Phương trình tổng quát của mặt phẳng, phương trình tham số và chính tắc của đường thẳng, phương trình mặt cầu và các bài toán khoảng cách, góc.',
    color: '#0891B2',
    lessons: [
      {
        id: 'lesson-5-1',
        chapterId: 'chap-5',
        order: 1,
        title: 'Phương trình mặt phẳng',
        readingTime: '12 phút',
        summary: 'Mặt phẳng đi qua điểm M và nhận n làm VTPT, phương trình đoạn chắn, khoảng cách từ điểm đến mặt phẳng.',
        sections: [
          {
            heading: '1. Phương trình tổng quát của mặt phẳng',
            content: [
              'Phương trình: A(x - x₀) + B(y - y₀) + C(z - z₀) = 0 ⇔ Ax + By + Cz + D = 0 (với A² + B² + C² > 0).',
              'Khoảng cách: d(M, (P)) = |Ax_M + By_M + Cz_M + D| / √(A² + B² + C²).'
            ],
            classicTrap: {
              trapName: 'Lấy nhầm điểm đi qua làm vectơ pháp tuyến',
              errorCode: 'DG',
              warning: 'Lấy tọa độ điểm M(x₀; y₀; z₀) thế vào vị trí hệ số A, B, C của mặt phẳng.',
              tip: 'Pháp tuyến n = (A; B; C) là hệ số đi cùng x, y, z; M là điểm đi qua.'
            }
          }
        ]
      },
      {
        id: 'lesson-5-2',
        chapterId: 'chap-5',
        order: 2,
        title: 'Phương trình đường thẳng trong không gian',
        readingTime: '14 phút',
        summary: 'Phương trình tham số, phương trình chính tắc của đường thẳng và vị trí tương đối giữa hai đường thẳng.',
        sections: [
          {
            heading: '1. Phương trình đường thẳng',
            content: [
              'Đường thẳng d qua M(x₀; y₀; z₀) có VTCP u = (a; b; c): Phương trình tham số: x = x₀ + at, y = y₀ + bt, z = z₀ + ct.',
              'Phương trình chính tắc (khi abc ≠ 0): (x - x₀)/a = (y - y₀)/b = (z - z₀)/c.'
            ],
            classicTrap: {
              trapName: 'Sai dấu khi đọc vectơ chỉ phương từ phương trình chính tắc',
              errorCode: 'TT',
              warning: 'Phương trình (1 - x)/2 = y/3 = (z + 1)/(-1). Học sinh đọc VTCP là (2; 3; -1) do không đảo dấu hệ số của x ở tử.',
              tip: 'Tử số phải là (x - x₀), nếu là (1 - x) thì phải đổi thành -(x - 1) để mẫu đổi dấu tương ứng.'
            }
          }
        ]
      },
      {
        id: 'lesson-5-3',
        chapterId: 'chap-5',
        order: 3,
        title: 'Phương trình mặt cầu',
        readingTime: '12 phút',
        summary: 'Mặt cầu tâm I(a; b; c) bán kính R, điều kiện để phương trình x² + y² + z² - 2ax - 2by - 2cz + d = 0 là mặt cầu.',
        sections: [
          {
            heading: '1. Phương trình mặt cầu',
            content: [
              'Dạng chính tắc: (x - a)² + (y - b)² + (z - c)² = R².',
              'Dạng tổng quát: x² + y² + z² - 2ax - 2by - 2cz + d = 0 với điều kiện a² + b² + c² - d > 0. Khi đó bán kính R = √(a² + b² + c² - d).'
            ],
            classicTrap: {
              trapName: 'Chia nhầm hệ số tìm tâm I và quên điều kiện R² > 0',
              errorCode: 'KT',
              warning: 'Tìm tọa độ tâm I phải lấy hệ số của x, y, z chia cho -2 (chứ không phải chia cho 2).',
              tip: 'Tâm I = (hệ số x / -2 ; hệ số y / -2 ; hệ số z / -2). R = √(a² + b² + c² - d).'
            }
          }
        ]
      }
    ]
  },

  {
    id: 'chap-6',
    semester: 2,
    semesterLabel: 'Học kỳ 2 (Tập 2)',
    number: 6,
    title: 'Chương 6: Xác suất có điều kiện',
    description: 'Chuyên đề xác suất hiện đại chương trình GDPT mới: Xác suất có điều kiện P(A|B), quy tắc nhân, công thức xác suất toàn phần và công thức Bayes.',
    color: '#E11D48',
    lessons: [
      {
        id: 'lesson-6-1',
        chapterId: 'chap-6',
        order: 1,
        title: 'Xác suất có điều kiện',
        readingTime: '12 phút',
        summary: 'Định nghĩa P(A|B) = P(AB) / P(B) với P(B) > 0, quy tắc nhân xác suất và các biến cố độc lập.',
        sections: [
          {
            heading: '1. Định nghĩa xác suất có điều kiện',
            content: [
              'Cho hai biến cố A và B với P(B) > 0. Xác suất của biến cố A khi biết biến cố B đã xảy ra gọi là xác suất của A với điều kiện B, ký hiệu là P(A|B).',
              'Công thức: P(A|B) = P(AB) / P(B) ⇒ Quy tắc nhân: P(AB) = P(B) * P(A|B) = P(A) * P(B|A).'
            ],
            classicTrap: {
              trapName: 'Lẫn lộn giữa P(A|B) và P(B|A)',
              errorCode: 'DG',
              warning: 'Nhầm lẫn điều kiện biến cố nào xảy ra trước, biến cố nào cần tính xác suất.',
              tip: 'Biến cố ĐÃ BIẾT (điều kiện) luôn đứng ở sau dấu gạch đứng "|": P(Cần tính | Đã biết).'
            }
          }
        ]
      },
      {
        id: 'lesson-6-2',
        chapterId: 'chap-6',
        order: 2,
        title: 'Công thức xác suất toàn phần và công thức Bayes',
        readingTime: '15 phút',
        summary: 'Hệ biến cố đầy đủ {B₁, B₂, ..., Bₙ}, công thức xác suất toàn phần và công thức Bayes trong chẩn đoán y khoa, kiểm định chất lượng.',
        sections: [
          {
            heading: '1. Công thức xác suất toàn phần và Bayes',
            content: [
              'Công thức xác suất toàn phần: P(A) = P(B₁)P(A|B₁) + P(B₂)P(A|B₂) + ... + P(Bₙ)P(A|Bₙ).',
              'Công thức Bayes: P(Bᵢ|A) = [P(Bᵢ) * P(A|Bᵢ)] / P(A). Dùng để tính xác suất hậu nghiệm sau khi quan sát được hiện tượng A.'
            ],
            classicTrap: {
              trapName: 'Không phân hoạch đủ hệ biến cố xung khắc',
              errorCode: 'SU',
              warning: 'Áp dụng công thức Bayes nhưng tổng các xác suất của hệ Bᵢ không bằng 1 hoặc các biến cố không xung khắc từng đôi.',
              tip: 'Luôn vẽ sơ đồ hình cây (tree diagram) để trực quan hóa các nhánh xác suất trước khi thế số.'
            }
          }
        ]
      }
    ]
  }
];
