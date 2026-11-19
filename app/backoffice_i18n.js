(function () {
  const TR = {
    "Charge X Back Office": "Charge X Back Office",
    "ระบบจัดการหลังบ้านสถานีชาร์จ EV": "EV Charging Back Office System",
    การยืนยันตัวตนและการเข้าใช้งาน: "Authentication & Login",
    "จัดการสิทธิ์ผู้ดูแลระบบ คูปองส่วนลด ข่าวสาร และตรวจสอบสถานะตู้ชาร์จแบบศูนย์กลาง":
      "Centralized role access, discount coupons, news, and station monitoring.",
    "ระดับสิทธิ์ผู้ใช้งาน (Role)": "User Role Permissions",
    "บัญชีทดสอบด่วน (คลิกเพื่อกรอกข้อมูล)":
      "Quick Demo Accounts (Click to Fill)",
    "เข้าสู่ระบบ Back Office": "Signed in to Back Office",
    "เข้าด้วย Username (Super Admin) หรืออีเมลบริษัท @chargex.co.th":
      "Sign in with Username (Super Admin) or @chargex.co.th company email",
    "Username / อีเมลบริษัท": "Username / Company Email",
    "เช่น superadmin หรือ name@chargex.co.th":
      "e.g. superadmin or name@chargex.co.th",
    รหัสผ่าน: "Password",
    รหัสผ่านตามเกณฑ์ความปลอดภัย: "Password meeting security rules",
    แสดงหรือซ่อนรหัสผ่าน: "Toggle password visibility",
    นโยบายความปลอดภัยรหัสผ่าน: "Password Security Policy",
    เงื่อนไขความปลอดภัยรหัสผ่าน: "Password Security Rules",
    เข้าสู่ระบบ: "Sign In",
    "ยาว 8+ ตัว": "8+ chars",
    "พิมพ์ใหญ่ A–Z": "Uppercase A–Z",
    "พิมพ์เล็ก a–z": "Lowercase a–z",
    "ตัวเลข 0–9": "Digit 0–9",
    สัญลักษณ์: "Symbol",
    "กรุณากรอก Username หรืออีเมลบริษัท":
      "Please enter Username or company email",
    กรุณากรอกรหัสผ่าน: "Please enter your password",
    "รหัสผ่านไม่ผ่านเกณฑ์ความปลอดภัย (ต้องยาว 8+ ตัว มี A–Z, a–z, 0–9 และสัญลักษณ์)":
      "Password fails security policy (8+ chars with A–Z, a–z, 0–9 & symbol)",
    "บัญชี Operator ต้องเข้าสู่ระบบด้วยอีเมลบริษัท (@chargex.co.th) เท่านั้น":
      "Operator accounts must sign in using a company email (@chargex.co.th) only",
    บัญชีนี้ถูกระงับการใช้งานชั่วคราว: "This account is temporarily suspended",
    "Username / อีเมล หรือรหัสผ่านไม่ถูกต้อง":
      "Invalid username/email or password",
    เมนูจัดการ: "Navigation",
    "แผงบริหาร (Dashboard)": "Executive Dashboard",
    "จัดการ Operator": "Manage Operators",
    คูปองและโปรโมชั่น: "Coupons & Promos",
    ข่าวสารและประกาศ: "News & Updates",
    "Monitor ตู้ชาร์จ": "Station Monitor",
    เปลี่ยนรหัสผ่าน: "Change Password",
    ออกจากระบบ: "Signed Out",
    "บัญชีผู้ดูแลระบบและ Operator": "Admin & Operator Accounts",
    "เฉพาะ Super Admin ที่สามารถเพิ่มบัญชี Operator (ต้องใช้อีเมลบริษัท @chargex.co.th)":
      "Only Super Admin can add Operator accounts (requires @chargex.co.th email)",
    "+ เพิ่ม Operator": "+ Add Operator",
    "ชื่อ-นามสกุล": "Full Name",
    Role: "Role",
    ขอบเขตสิทธิ์: "Permissions",
    สถานะ: "Status",
    จัดการ: "Actions",
    ใช้งาน: "Active",
    ระงับ: "Suspended",
    เปิดสิทธิ์: "Enable",
    ระงับสิทธิ์: "Suspend",
    ลบ: "Delete",
    ผู้ดูแลหลัก: "Root Admin",
    "เพิ่มบัญชี Operator": "Add Operator Account",
    "บังคับใช้อีเมลบริษัท (@chargex.co.th) และรหัสผ่านปลอดภัย":
      "Requires @chargex.co.th company email and secure password",
    ปิด: "Close",
    ปิดหน้าต่าง: "Close",
    "ชื่อ-นามสกุล Operator": "Operator Full Name",
    "เช่น สมชาย ใจดี": "e.g. Somchai Jaidee",
    "อีเมลบริษัท (@chargex.co.th เท่านั้น)":
      "Company Email (@chargex.co.th only)",
    "เช่น somchai@chargex.co.th": "e.g. somchai@chargex.co.th",
    รหัสผ่านเริ่มต้น: "Initial Password",
    สุ่มรหัสผ่านปลอดภัย: "Generate Secure Password",
    "8+ ตัว: A-Z, a-z, 0-9 และสัญลักษณ์": "8+ chars: A-Z, a-z, 0-9 & symbol",
    "สิทธิ์ที่ได้รับ: กำหนดคูปอง, ข่าวสาร และ Monitor (ไม่สามารถเพิ่ม Operator ได้)":
      "Scope: Coupons, News & Monitor only (cannot manage Operators)",
    ยกเลิก: "Cancel",
    "สร้างบัญชี Operator": "Create Operator",
    "กรุณากรอกชื่อ-นามสกุล": "Please enter full name",
    "Operator ต้องใช้อีเมลบริษัท (@chargex.co.th) เท่านั้น":
      "Operator must use a @chargex.co.th company email only",
    อีเมลบริษัทนี้มีในระบบแล้ว: "This company email already exists",
    รหัสผ่านใหม่: "New Password",
    บันทึกรหัสผ่าน: "Save Password",
    กำหนดคูปองส่วนลดและโปรโมชั่น: "Manage Coupons & Promotions",
    "สร้างหรือปรับสถานะคูปอง (ซิงค์กับหน้ากระเป๋าเงินและสรุปผลชาร์จอัตโนมัติ)":
      "Create or toggle coupons (synced to Wallet & Charging Complete)",
    "+ สร้างคูปองใหม่": "+ Create Coupon",
    เปิดใช้งาน: "Active",
    ปิดใช้งาน: "Inactive",
    กำหนดข่าวสารและแคมเปญโปรโมชัน: "Manage News & Campaigns",
    "เผยแพร่ข่าวสาร แคมเปญ และแจ้งเตือนหน้าหลักของแอป Charge X":
      "Publish news, campaigns, and Charge X home updates",
    "+ เพิ่มข่าวสาร": "+ Add News",
    เพิ่มข่าวสาร: "Add News",
    เผยแพร่: "Published",
    ฉบับร่าง: "Draft",
    ซ่อน: "Unpublish",
    "Monitor สถานะตู้ชาร์จแบบ Real-time": "Real-time Charger Monitor",
    "ติดตามการทำงาน หัวชาร์จ และสลับสถานะบำรุงรักษาเฉพาะจุด":
      "Track charger telemetry and toggle maintenance status",
    รีเฟรชสถานะ: "Refresh Telemetry",
    กำลังชาร์จ: "Charging",
    ออนไลน์: "Online",
    บำรุงรักษา: "Maintenance",
    ตั้งบำรุงรักษา: "Set Maint.",
    เปิดบริการ: "Go Online",
    สร้างคูปองใหม่: "Create Coupon",
    รหัสคูปอง: "Coupon Code",
    "เช่น FLASH60": "e.g. FLASH60",
    ชื่อคูปอง: "Coupon Title",
    "เช่น ลดค่าชาร์จ ฿60": "e.g. ฿60 off charging",
    "ส่วนลด (บาท)": "Discount (THB)",
    "ยอดชาร์จขั้นต่ำ (บาท)": "Min Spend (THB)",
    บันทึกคูปอง: "Save Coupon",
    กรุณากรอกรหัสคูปอง: "Please enter coupon code",
    รหัสคูปองนี้มีในระบบแล้ว: "Coupon code already exists",
    กรุณากรอกชื่อคูปอง: "Please enter coupon title",
    เพิ่มข่าวสารใหม่: "Add News Article",
    หัวข้อข่าวสาร: "Headline",
    "เช่น เปิดบริการสถานีชาร์จใหม่ย่านสาทร":
      "e.g. New Sathorn fast-charging station live",
    รายละเอียด: "Details",
    รายละเอียดข่าวสารหรือช่วงเวลาโปรโมชัน: "Details or promotion schedule",
    เผยแพร่ข่าวสาร: "Publish News",
    กรุณากรอกหัวข้อข่าวสาร: "Please enter a headline",
    ผู้ดูแลระบบทั้งหมด: "Total Accounts",
    "Super Admin (เพิ่ม Operator ได้)": "Super Admin (Can add Operator)",
    "Operator (คูปอง/ข่าว/Monitor)": "Operator (Coupons/News/Monitor)",
    "เข้าสู่ระบบด้วย ": "Signed in as ",
    ออกจากระบบเรียบร้อยแล้ว: "Signed out cleanly",
    "สร้างบัญชี Operator เรียบร้อยแล้ว": "Operator account created",
    อัปเดตสถานะผู้ใช้แล้ว: "User status updated",
    "ลบบัญชี Operator แล้ว": "Operator account removed",
    เปลี่ยนรหัสผ่านสำเร็จ: "Password updated cleanly",
    สร้างคูปองใหม่และซิงค์แล้ว: "Coupon created and synced",
    อัปเดตสถานะคูปองแล้ว: "Coupon status updated",
    เผยแพร่ข่าวสารใหม่แล้ว: "News article published",
    อัปเดตสถานะข่าวสารแล้ว: "News status updated",
    อัปเดตสถานะตู้ชาร์จล่าสุดแล้ว: "Station telemetry refreshed",
    สลับสถานะตู้ชาร์จแล้ว: "Charger status toggled",
    "ทุกโมดูล · เพิ่ม/จัดการ Operator": "All modules · Add/manage Operators",
    "คูปอง · ข่าวสาร · Monitor เท่านั้น": "Coupons · News · Monitor only",
    "สิทธิ์เต็มระบบ + เพิ่ม/จัดการ Operator":
      "Full access + Add & manage Operators",
    "สิทธิ์: คูปอง · ข่าวสาร · Monitor (อีเมลบริษัท)":
      "Scope: Coupons · News · Monitor (Company email)",
    "เข้าด้วย Username / อีเมลบริษัท": "Username / Company email login",
    "บังคับใช้อีเมล @chargex.co.th": "Enforces @chargex.co.th email",
    กำลังเปิดใช้งาน: "Active",
    ตู้ชาร์จทั้งหมด: "All Chargers",
    สถานีออนไลน์: "Online",
    "บำรุงรักษา/ออฟไลน์": "Maintenance / Offline",
    "วรพล ศิริวัฒน์": "Worapol Siriwat",
    "ณัฐพงษ์ วงศ์ชัย": "Nattapong Wongchai",
    "กัญญา รัตนสุข": "Kanya Rattanasuk",
    "ลดค่าชาร์จ ฿50": "฿50 off charging",
    "เมื่อชาร์จตั้งแต่ ฿150 ขึ้นไป · ทุกสถานี": "Min spend ฿150 · All stations",
    "หมดอายุ 31 ธ.ค. 2569": "Valid until 31 Dec 2026",
    "ส่วนลดค่าชาร์จ DC 25%": "25% off DC charging",
    "ลดสูงสุด ฿60 · ชาร์จขั้นต่ำ ฿100 สำหรับหัวชาร์จ DC":
      "Max ฿60 off · Min ฿100 at DC chargers",
    "เติมเงิน ฿300 รับโบนัส ฿50": "Top up ฿300 get ฿50 bonus",
    "รับเครดิตเพิ่มเข้ากระเป๋าเมื่อเติมผ่าน PromptPay / บัตร":
      "Bonus credit with PromptPay / card",
    "หมดอายุ 15 ม.ค. 2570": "Valid until 15 Jan 2027",
    "โบนัสสมาชิกใหม่ รับเครดิต ฿30": "New member ฿30 credit",
    "กดรับเข้ากระเป๋าเงิน Charge X ได้ทันที ไม่มีขั้นต่ำ":
      "Claim to wallet · No min",
    "ชาร์จช่วง Off-Peak 22:00–06:00 ลดทันที 10%":
      "10% off Off-Peak 22:00–06:00 DC charging",
    "สำหรับสมาชิก Charge X ทุกท่านที่ชาร์จหัว DC ช่วงกลางคืน":
      "For all Charge X members charging on DC overnight",
    "เปิดสถานีใหม่ ม.รามคำแหง วิทยาเขต บางนา 4 หัวชาร์จ 150 kW":
      "New Ramkhamhaeng Bang Na station with four 150 kW chargers",
    "รองรับ CCS2 และ Auto Charge พร้อมจุดพักรถตลอด 24 ชม.":
      "Supports CCS2, Auto Charge, and 24-hr lounge access",
    แจ้งปรับปรุงระบบเชื่อมต่อธนาคารประจำเดือน:
      "Monthly bank gateway maintenance notice",
    "ปิดปรับปรุงช่องทาง Mobile Banking ชั่วคราว 30 นาที":
      "Temporary 30-min Mobile Banking maintenance window",
    "มหาวิทยาลัยรามคำแหง วิทยาเขต บางนา": "Ramkhamhaeng University, Bang Na",
    "เมกา บางนา (ลานจอด P3)": "Mega Bangna (Parking P3)",
    "ไบเทค บางนา (อาคาร 2)": "BITEC Bangna (Building 2)",
    "ถนนกิ่งแก้ว กม.9": "King Kaew Rd Km.9",
    "บางนา-ตราด กม.4": "Bang Na-Trat Km.4",
    "เซ็นทรัล บางนา": "Central Bangna",
    "ซีคอนสแควร์ ศรีนครินทร์": "Seacon Square Srinakarin",
    "สถานี ลาซาล-แบริ่ง": "Lasalle–Bearing Station",
    พร้อมให้บริการ: "Ready",
    ปิดใช้งานชั่วคราว: "Temporarily unavailable",
    รอรับรถ: "Pickup grace",
    โปรโมชัน: "Promotion",
    สถานีใหม่: "New Station",
    ประกาศ: "Announcement",
    "วันนี้ · 09:15": "Today · 09:15",
    "วันนี้ · 10:40": "Today · 10:40",
    "เมื่อวาน · 17:20": "Yesterday · 17:20",
    "15 พ.ย. – 31 ธ.ค. 2569": "15 Nov – 31 Dec 2026",
    "10 พ.ย. 2569": "10 Nov 2026",
    "25 พ.ย. 2569 · 02:00–02:30": "25 Nov 2026 · 02:00–02:30",
    "ว่าง 2 จาก 2 หัว": "2 of 2 free",
    "ว่าง 1 จาก 2 หัว": "1 of 2 free",
    บำรุงรักษาตามรอบ: "Scheduled maintenance",
    "ชาร์จขั้นต่ำ ฿": "Min spend ฿",
    " · ทุกสถานี": " · All stations",
    ใช้: "Used",
    "เครื่อง ": "Charger ",
    ยังไม่เคยเข้าใช้: "Never signed in",
    "17 พ.ย. 2569": "17 Nov 2026",
    "ไม่มีขั้นต่ำ · ทุกสถานี": "No minimum · All stations",
    "— เข้าถึงได้ทุกโมดูล และเพิ่ม / ระงับบัญชี Operator ได้":
      "— Full access & add/suspend Operator accounts",
    "— กำหนดคูปอง ข่าวสาร และ Monitor ระบบ (เข้าด้วยอีเมลบริษัท @chargex.co.th เท่านั้น)":
      "— Coupons, News & Monitor only (@chargex.co.th company email required)",
    "Super Admin สามารถสร้างและจัดการสิทธิ์บัญชี Operator ที่ใช้อีเมลบริษัท":
      "Super Admin can create and manage company-email Operator accounts",
    จัดการคูปองส่วนลดค่าชาร์จและโบนัสเติมเงินของแพลตฟอร์ม:
      "Manage platform charging discounts and top-up bonus coupons",
    "จัดการข่าวสาร แคมเปญ และประกาศแจ้งเตือนหน้าแอป":
      "Manage in-app news, campaigns, and system notices",
    "ตรวจสอบสถานะสถานีชาร์จและหัวชาร์จแบบ Real-time":
      "Track live charger telemetry and station status",
    "สิทธิ์ที่ได้รับ:": "Permissions:",
    "กำหนดคูปอง, ข่าวสาร และ Monitor": "Coupons, News & Monitor",
    "(ไม่สามารถเพิ่ม Operator ได้)": "(cannot add Operators)",
    "8+ ตัว": "8+ chars",
    "ต้องครบ 5 เงื่อนไข": "All 5 required",
    "นโยบาย: 8+ ตัว (A–Z, a–z, 0–9, สัญลักษณ์)":
      "Policy: 8+ chars (A–Z, a–z, 0–9, Symbol)",
    "ภาพรวมสถานีชาร์จ สมาชิก ยอดเงินใน Wallet พลังงาน และรายงานเปรียบเทียบ":
      "Platform overview: stations, users, wallet balance, energy & comparative reports",
    ช่วงเวลาข้อมูล: "Date Range",
    วันนี้: "Today",
    "7 วัน": "7 Days",
    "30 วัน": "30 Days",
    กำหนดเอง: "Custom",
    วันที่เริ่มต้น: "Start date",
    วันที่สิ้นสุด: "End date",
    "ส่งออก Excel": "Export Excel",
    "ส่งออก PDF": "Export PDF",
    สถานีชาร์จทั้งหมด: "All Charging Stations",
    ผู้ใช้งานในระบบ: "System Users",
    "ดูรายชื่อทั้งหมด →": "View all members →",
    เงินที่เหลือในระบบ: "System Balance",
    "ยอดค้างใน Wallet รวม": "Total Wallet Balance",
    ยอดที่ตัดไม่ได้: "Uncollected / Failed",
    ยอดตัดไม่ได้: "Uncollected",
    ยอดรวมการชาร์จทั้งหมด: "Total Charging Energy",
    จำนวนการชาร์จต่อวัน: "Daily Charging Sessions",
    การเติบโตของการใช้งาน: "Usage Growth",
    เทียบช่วงก่อนหน้า: "vs prior period",
    กราฟข้อมูลเชิงเปรียบเทียบ: "Comparative Analytics",
    ช่วงปัจจุบัน: "Current period",
    ช่วงก่อนหน้า: "Previous period",
    เปรียบเทียบรายสถานี: "Station Comparison",
    "จัดอันดับตามปริมาณพลังงาน (kWh) ในช่วงที่เลือก":
      "Ranked by energy delivered (kWh) in selected range",
    ข้อมูลสถานีชาร์จทั้งหมด: "All Charging Stations",
    "สถานะล่าสุดซิงค์จากระบบ Monitor ตู้ชาร์จและสถิติในช่วงที่เลือก":
      "Live station status synced from Monitor and selected date range",
    สถานีชาร์จ: "Stations",
    "กำลังไฟ / หัวชาร์จ": "Power / Connectors",
    หัวชาร์จว่าง: "Available Bays",
    ครั้งชาร์จ: "Sessions",
    "พลังงาน (kWh)": "Energy (kWh)",
    รายได้รวม: "Revenue",
    รายชื่อสมาชิกในระบบทั้งหมด: "All System Members",
    "ตรวจสอบรายชื่อสมาชิก ยอดคงเหลือใน Wallet และยอดค้างตัดชำระทั้งหมดในระบบ":
      "Inspect every member account, wallet balance, and uncollected amount",
    "ค้นหาชื่อ, อีเมล, เบอร์โทร หรือรุ่นรถ...":
      "Search name, email, phone, or EV model...",
    "ชื่อสมาชิก / วันสมัคร": "Member / Joined",
    "อีเมล / เบอร์โทรศัพท์": "Email / Phone",
    รถยนต์ไฟฟ้า: "EV Vehicle",
    "ชาร์จ (ครั้ง / kWh)": "Sessions / kWh",
    "ยอดใน Wallet": "Wallet",
    ไม่พบสมาชิกที่ตรงกับคำค้นหาหรือเงื่อนไขที่เลือก:
      "No members match your search or filter",
    ทั้งหมด: "All",
    ใช้งานปกติ: "Active",
    มียอดค้างตัดไม่ได้: "Payment Due",
    ค้างตัดชำระ: "Payment Due",
    "การชาร์จ (ครั้ง)": "Sessions",
    "รายได้ (฿)": "Revenue (฿)",
    "ส่งออกไฟล์ Excel (.xls) เรียบร้อยแล้ว":
      "Excel (.xls) report exported cleanly",
    'เปิดหน้าต่างส่งออก PDF เรียบร้อย (เลือก "บันทึกเป็น PDF")':
      'PDF print window opened (choose "Save as PDF")',
    "สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin":
      "Access restricted to Super Admin",
    "เขตบางนา · เปิด 24 ชม.": "Bang Na · 24 hrs",
    "บางพลี · ลานจอดห้าง": "Bang Phli · Mall parking",
    "เขตบางนา · ศูนย์ประชุม": "Bang Na · Exhibition Hall",
    "ลาดกระบัง-กิ่งแก้ว · 24 ชม.": "King Kaew · 24 hrs",
    "เขตบางนา · จุดแวะพัก": "Bang Na · Highway stop",
    "เขตบางนา · โซน EV": "Bang Na · EV Zone",
    "ประเวศ · ลานจอด B1": "Prawet · Level B1",
    "สุขุมวิท 105 · 24 ชม.": "Sukhumvit 105 · 24 hrs",
    "(บัตรหมดอายุ / ค่าปรับค้างชำระ)": "(card declined / unpaid idle fee)",
    "ม.ค.": "Jan",
    "ก.พ.": "Feb",
    "มี.ค.": "Mar",
    "เม.ย.": "Apr",
    "พ.ค.": "May",
    "มิ.ย.": "Jun",
    "ก.ค.": "Jul",
    "ส.ค.": "Aug",
    "ก.ย.": "Sep",
    "ต.ค.": "Oct",
    "พ.ย.": "Nov",
    "ธ.ค.": "Dec",
    "อรรถพล กิตติชัย": "Atthaphon Kittichai",
    "ปิยะนุช วัฒนากูล": "Piyanuch Wattanakul",
    "ธนากร สุขเกษม": "Thanakorn Sukkasem",
    "ชนิกานต์ วงศ์สุวรรณ": "Chanikarn Wongsuwan",
    "ภาณุวัฒน์ เจริญพร": "Phanuwat Charoenporn",
    "ศิริลักษณ์ แสงทอง": "Sirilak Saengthong",
    "กิตติพงศ์ นาคสวัสดิ์": "Kittiphong Naksawat",
    "พิมพ์ชนก อินทร์แก้ว": "Pimchanok Inkaew",
    "ธีรภัทร พงษ์พิพัฒน์": "Theeraphat Pongpipat",
    "มัณฑนา มณีรัตน์": "Manthana Maneerat",
    "พงศกร รุ่งเรือง": "Pongsakorn Rungrueng",
    "สุธิดา แก้วมณี": "Suthida Kaewmanee",
    "เอกชัย บุญมี": "Ekkachai Boonmee",
    "นภาพร ชัยชนะ": "Napaporn Chaichana",
    "ครั้ง/วัน": "sessions/day",
    "รวมช่วงปัจจุบัน:": "Current total:",
    "รวมช่วงก่อนหน้า:": "Previous total:",
    "เปลี่ยนแปลง:": "Change:",
    พลังงาน: "Energy",
    สมาชิก: "Members",
    สูงสุด: "Peak",
    สมัคร: "Joined",
    แสดง: "Showing",
    คน: "users",
    ครั้ง: "sessions",
    ว่าง: "Free",
    ซ่อมบำรุง: "Maint.",
    หัว: "bays",
    วัน: "days",
    ช่วง: "Period",
    รายได้: "Revenue",
    รวม: "Total",
    แจ้งเตือนและข่าวสาร: "Notifications & News",
    "เพิ่ม แก้ไข ลบข้อมูลการแจ้งเตือน กำหนดเวลาล่วงหน้ากรณีข่าวสาร และกำหนดสถานะเผยแพร่หรือแบบร่าง":
      "Create, edit, delete notifications, schedule advance news alerts, and set Published or Draft",
    การแจ้งเตือนทั้งหมด: "Total Notifications",
    เผยแพร่แล้ว: "Published",
    ตั้งเวลาล่วงหน้า: "Scheduled",
    แบบร่าง: "Draft",
    "จัดการการแจ้งเตือนและข่าวสาร (Notification)":
      "Notification & News Management",
    "+ เพิ่มการแจ้งเตือน": "+ Add Notification",
    "ค้นหาพาดหัวหรือคำอธิบาย...": "Search headline or description...",
    แก้ไข: "Edit",
    เป็นแบบร่าง: "Set Draft",
    ไม่พบรายการแจ้งเตือนที่ตรงกับคำค้นหาหรือเงื่อนไขที่เลือก:
      "No notifications match your search or filter",
    จัดการการแจ้งเตือน: "Manage Notification",
    เพิ่มการแจ้งเตือนใหม่: "Add New Notification",
    แก้ไขการแจ้งเตือน: "Edit Notification",
    หมวดหมู่การแจ้งเตือน: "Notification Category",
    ข่าวสาร: "News",
    พาดหัว: "Headline",
    ระบุพาดหัวการแจ้งเตือนหรือข่าวสาร: "Enter notification or news headline",
    คำอธิบาย: "Description",
    ระบุคำอธิบายและรายละเอียดการแจ้งเตือน:
      "Enter notification description and details",
    เวลาแจ้งเตือน: "Notification Schedule",
    ส่งทันที: "Send Now",
    "หมายเหตุ: กรณีแจ้งข่าวสาร สามารถกำหนดวันและเวลาแจ้งเตือนล่วงหน้าได้":
      "Note: For news alerts, you can schedule an advance date and time",
    วันที่แจ้งเตือนล่วงหน้า: "Scheduled Date",
    สถานะการเผยแพร่: "Publish Status",
    "เผยแพร่ทันทีเมื่อบันทึก (แสดงในแอปและแจ้งเตือน)":
      "Publishes immediately when saved (live in app & notifications)",
    รอเผยแพร่อัตโนมัติตามวันและเวลาที่ตั้งไว้ล่วงหน้า:
      "Scheduled to publish automatically at the specified date & time",
    "บันทึกเป็นแบบร่าง (ยังไม่แสดงในแอป)":
      "Saved as draft (hidden from end users)",
    บันทึกการแจ้งเตือน: "Save Notification",
    บันทึกการแก้ไข: "Save Changes",
    กรุณากรอกพาดหัว: "Please enter a headline",
    กรุณากรอกคำอธิบาย: "Please enter a description",
    กรุณากำหนดวันและเวลาแจ้งเตือนล่วงหน้า:
      "Please specify advance schedule date and time",
    กรุณากำหนดวันและเวลาในอนาคต: "Please choose a future date and time",
    เพิ่มและเผยแพร่การแจ้งเตือนแล้ว: "Notification created and published",
    ตั้งเวลาแจ้งเตือนล่วงหน้าเรียบร้อยแล้ว: "Notification scheduled in advance",
    บันทึกการแจ้งเตือนเป็นแบบร่างแล้ว: "Notification saved as draft",
    บันทึกการแก้ไขการแจ้งเตือนแล้ว: "Notification updated cleanly",
    ลบการแจ้งเตือนแล้ว: "Notification deleted",
    กู้คืนการแจ้งเตือนแล้ว: "Notification restored",
    เปลี่ยนสถานะเป็นเผยแพร่แล้ว: "Changed status to Published",
    เปลี่ยนสถานะเป็นแบบร่างแล้ว: "Changed status to Draft",
    เลิกทำ: "Undo",
    ตั้งเวลา: "Scheduled",
    "แจ้งข่าวสาร: ขยายจุดบริการชาร์จเร็ว 180 kW เส้นบางนา-ตราด":
      "News Alert: Expanding 180 kW fast chargers on Bang Na-Trat Rd",
    "เปิดให้จองช่องชาร์จล่วงหน้าผ่านแอป Charge X ตั้งแต่สัปดาห์หน้าเป็นต้นไป":
      "Advance bay reservations open on Charge X starting next week",
    "ปิดปรับปรุงช่องทาง Mobile Banking ชั่วคราว 30 นาที เวลา 02:00–02:30 น.":
      "Temporary 30-min Mobile Banking maintenance from 02:00–02:30",
    "การสอนใช้งาน (Tutorial)": "Tutorial Manager",
    "เพิ่ม แก้ไข ลบจำนวนหน้า รูปภาพ คำอธิบาย และทดสอบแสดงแบบสไลด์โชว์ (ซิงค์กับเมนูตั้งค่าในแอปอัตโนมัติ)":
      "Add, edit, delete tutorial slides, images & descriptions, and test slideshow replay synced to Settings",
    จำนวนหน้าทั้งหมด: "Total Pages",
    โหมดการแสดงผล: "Display Mode",
    "สไลด์โชว์ (Slideshow)": "Slideshow",
    การแสดงซ้ำในแอป: "In-App Replay",
    เปิดผ่านเมนูตั้งค่า: "Via Settings Menu",
    "จัดการหน้าการสอนใช้งาน (Tutorial)": "Tutorial Slides Management",
    แสดงสไลด์โชว์: "Play Slideshow",
    "+ เพิ่มหน้าสอนใช้งาน": "+ Add Page",
    เลื่อนขึ้น: "Move up",
    เลื่อนลง: "Move down",
    สไลด์นี้: "Preview",
    ลบหน้า: "Delete Page",
    ยังไม่มีหน้าการสอนใช้งานในระบบ: "No tutorial pages yet",
    จัดการหน้าสอนใช้งาน: "Manage Tutorial Page",
    เพิ่มหน้าสอนใช้งานใหม่: "Add Tutorial Page",
    แก้ไขหน้าสอนใช้งาน: "Edit Tutorial Page",
    รูปภาพประกอบ: "Slide Image",
    อัปโหลดรูปภาพ: "Upload Image",
    ตัวอย่างรูปภาพ: "Image Preview",
    "หรือระบุลิงก์ / พาธรูปภาพ": "Or enter image URL / path",
    "เช่น ./img/18970bd8ea282f5bf473c1f7b19d490d.jpg หรือ URL รูปภาพ":
      "e.g. ./img/18970bd8ea282f5bf473c1f7b19d490d.jpg or image URL",
    หัวข้อหน้า: "Slide Title",
    "เช่น ค้นหาสถานีชาร์จใกล้คุณ": "e.g. Find nearby stations",
    ระบุคำอธิบายวิธีใช้งานสำหรับหน้านี้:
      "Enter tutorial description for this slide",
    บันทึกหน้าสอนใช้งาน: "Save Tutorial Page",
    กรุณาเลือกรูปภาพหรืออัปโหลดรูปภาพ: "Please choose or upload an image",
    กรุณากรอกหัวข้อหน้า: "Please enter a slide title",
    สไลด์โชว์การสอนใช้งาน: "Tutorial Slideshow",
    "การสอนใช้งาน (สไลด์โชว์)": "Tutorial (Slideshow)",
    เล่นอัตโนมัติ: "Auto Play",
    หยุดเล่นอัตโนมัติ: "Pause Auto",
    "‹ ย้อนกลับ": "‹ Previous",
    "ดูซ้ำตั้งแต่หน้า 1": "Replay from Slide 1",
    "ถัดไป ›": "Next ›",
    เพิ่มหน้าสอนใช้งานเรียบร้อยแล้ว: "Tutorial page added",
    บันทึกการแก้ไขหน้าสอนใช้งานแล้ว: "Tutorial page updated",
    ลบหน้าสอนใช้งานแล้ว: "Tutorial page deleted",
    กู้คืนหน้าสอนใช้งานแล้ว: "Tutorial page restored",
    บันทึกลำดับหน้าสอนใช้งานแล้ว: "Slide order updated",
    อัปโหลดรูปภาพเข้าสู่หน้าสอนใช้งานแล้ว: "Uploaded image for slide",
    ไม่สามารถอ่านไฟล์รูปภาพได้: "Unable to read image file",
    ยังไม่มีหน้าสไลด์สำหรับแสดง: "No slides available to preview",
    เริ่มแสดงสไลด์โชว์ซ้ำตั้งแต่หน้าแรก: "Replaying slideshow from Slide 1",
    ภาพแผนที่: "Map Visual",
    "ภาพสแกน QR": "QR Visual",
    ภาพสถานะชาร์จ: "Charge Visual",
    ภาพกระเป๋าเงิน: "Wallet Visual",
    ภาพสถานีจริง: "Station Photo",
    ค้นหาสถานีชาร์จใกล้คุณ: "Find Nearby Chargers",
    "เปิดแผนที่ดูจุดชาร์จว่าง (หมุดสีเขียว) ตรวจสอบกำลังไฟ ระยะทาง และกดนำทางไปยังสถานีได้ทันที":
      "Open the map to check free stations (green pins), charger power, distance, and navigate right away.",
    "สแกน QR ที่ตู้ชาร์จ": "Scan Charger QR Code",
    "จอดรถ เสียบหัวชาร์จเข้ากับรถ แล้วกดปุ่มชาร์จตรงกลางเมนูด้านล่างเพื่อสแกน QR บนตู้ชาร์จ":
      "Park, plug into your EV, then tap the center Charge button to scan the QR on the charger.",
    ติดตามสถานะชาร์จแบบเรียลไทม์: "Live Charging Monitor",
    "ตรวจสอบเปอร์เซ็นต์แบตเตอรี่ กำลังไฟ (kW) และค่าบริการตลอดเวลา พร้อมแจ้งเตือนเมื่อใกล้เต็มหรือครบ 5 นาที":
      "Track battery %, kW power, and cost in real time, with alerts near target and 5-min grace period.",
    "ชำระเงิน คูปอง และประวัติ": "Wallet, Coupons & History",
    "ชำระค่าชาร์จผ่าน Charge X Wallet หรือบัตร เลือกใช้คูปองส่วนลด และเรียกดูการสอนใช้งานซ้ำได้จากเมนูตั้งค่า":
      "Pay with Charge X Wallet or card, apply discount coupons, and replay this tutorial anytime from Settings.",
    "สไลด์ที่ ": "Slide ",
    "แสดงและจัดการรหัสส่วนลด ประเภทคูปอง โควตา วันใช้งาน และเงื่อนไขผู้ใช้ใหม่ (ซิงค์กับแอปอัตโนมัติ)":
      "Display & manage coupon codes, discount types, quotas, validity dates & new-user eligibility (synced to app)",
    คูปองทั้งหมด: "Total Coupons",
    สำหรับผู้ใช้ใหม่: "New Users Only",
    จำนวนคงเหลือในระบบ: "Remaining Quota",
    "ค้นหารหัสคูปอง ชื่อ หรือประเภท...": "Search code, title, or usage type...",
    ผู้ใช้ใหม่เท่านั้น: "New Users Only",
    เฉพาะผู้ใช้ใหม่: "New Users Only",
    ใช้ร่วมกับคูปองอื่นได้: "Stackable",
    ไม่สามารถใช้ร่วมกับคูปองอื่น: "Non-stackable",
    หน่วยจำนวนเงิน: "Fixed Amount",
    ส่วนลดเปอร์เซ็น: "Percentage Discount",
    "หน่วยจำนวนเงิน (฿)": "Fixed Amount (฿)",
    "ส่วนลดเปอร์เซ็น (%)": "Percentage (%)",
    สินค้าและบริการ: "Goods & Services",
    "เติมเงิน Wallet": "Wallet Top-up",
    ประเภทการใช้งาน: "Usage Category",
    ขั้นต่ำการใช้งาน: "Min. Spend",
    ไม่มีขั้นต่ำ: "No minimum",
    จำนวนคูปองในระบบ: "Total Quota",
    "จำกัด / 1 ผู้ใช้": "Limit / User",
    "วันเริ่มต้น – หมดอายุ": "Valid Dates",
    การใช้ร่วมกับคูปองอื่น: "Coupon Stacking",
    "กลุ่มผู้ใช้: ": "Audience: ",
    ผู้ใช้ทุกกลุ่ม: "All Users",
    จัดการคูปองส่วนลด: "Manage Coupon",
    แก้ไขคูปองส่วนลด: "Edit Coupon",
    รหัสส่วนลด: "Coupon Code",
    "ชื่อคูปอง / โปรโมชัน": "Coupon / Promo Title",
    ประเภทคูปองส่วนลด: "Discount Type",
    "จำนวนที่ลด (บาท)": "Discount (THB)",
    "จำนวนที่ลด (%)": "Discount (%)",
    "ลดสูงสุด (บาท)": "Max Discount (THB)",
    "ขั้นต่ำการใช้งาน (บาท)": "Minimum Spend (THB)",
    "จำนวนคูปองในระบบ (สิทธิ์)": "Total Quota (uses)",
    "จำนวนที่อนุญาตให้ใช้งาน / 1 ผู้ใช้ (ครั้ง)": "Allowed Uses / User",
    "วันเริ่มต้น (Today = ค่าเริ่มต้น)": "Start Date (Default = Today)",
    วันหมดอายุ: "Expiration Date",
    เงื่อนไขสำหรับผู้ใช้ใหม่: "New User Condition",
    "โปรโมชั่น / คูปองสำหรับผู้ใช้ใหม่เท่านั้น":
      "New user promotion / coupon only",
    "หมายเหตุ: ถ้าเป็นโปรโมชั่นสำหรับผู้ใช้ใหม่ต้องเลือกช่องนี้":
      "Note: Required to check this box for new-user promotions",
    "แนะนำ: พบคำเกี่ยวกับผู้ใช้ใหม่ กรุณาเลือกช่องเงื่อนไขสำหรับผู้ใช้ใหม่":
      "Tip: New-user keywords detected; please check the new-user condition box",
    สถานะการใช้งาน: "Coupon Status",
    ไม่พบคูปองที่ตรงกับคำค้นหาหรือเงื่อนไขที่เลือก:
      "No coupons match your search or filter",
    "กรุณาระบุส่วนลดตั้งแต่ 1 ขึ้นไป": "Please enter a discount of at least 1",
    "ส่วนลดเปอร์เซ็นต้องอยู่ระหว่าง 1% ถึง 100%":
      "Percentage discount must be between 1% and 100%",
    "กรุณาระบุจำนวนคูปองในระบบตั้งแต่ 1 ขึ้นไป":
      "Total system quota must be at least 1",
    "กรุณาระบุจำนวนการใช้งานต่อ 1 ผู้ใช้ตั้งแต่ 1 ครั้งขึ้นไป":
      "Per-user usage limit must be at least 1",
    "จำนวนการใช้งานต่อ 1 ผู้ใช้ต้องไม่เกินจำนวนคูปองในระบบ":
      "Per-user limit cannot exceed total system quota",
    กรุณากำหนดวันเริ่มต้นและวันหมดอายุ:
      "Please select both start date and expiration date",
    วันหมดอายุต้องไม่น้อยกว่าวันเริ่มต้น:
      "Expiration date cannot be earlier than start date",
    "โปรโมชั่นสำหรับผู้ใช้ใหม่ ต้องเลือกช่องเงื่อนไขสำหรับผู้ใช้ใหม่":
      "New-user promotion requires checking the new-user condition box",
    บันทึกการแก้ไขคูปองแล้ว: "Coupon updated cleanly",
    ลบคูปองแล้ว: "Coupon deleted",
    กู้คืนคูปองแล้ว: "Coupon restored",
    เริ่มวันนี้: "Starts today",
    ทั่วไป: "General",
    สิทธิ์: "uses",
    คงเหลือ: "left",
    "ทั้งหมด (สินค้า & Membership)": "All (Goods & Membership)",
    Membership: "Membership",
    "ส่วนลดสมาชิก Membership 20%": "Membership 20% Discount",
    "ลดสูงสุด ฿120 · ใช้กับแพ็กเกจ Membership และค่าชาร์จรายเดือน":
      "Max ฿120 off · Valid for Membership & monthly charging plans",
    "หมดอายุ ": "Expires ",
    "การชำระเงิน (Payment)": "Payment Management",
    "การจัดการการชำระเงิน (Payment Management)": "Payment Management",
    "จัดการรายการชำระเงิน สถานะ ออกใบแจ้งหนี้/ใบกำกับภาษี ตรวจสอบ Gateway และกระเป๋าเงินผู้ใช้ (เฉพาะ Super Admin)":
      "Manage payments, status, invoices/tax receipts, gateway bank reconciliation & user wallets (Super Admin only)",
    ยอดรับชำระสำเร็จ: "Settled Revenue",
    "รอตรวจสอบ / ไม่สำเร็จ": "Pending / Failed",
    โอนเข้าบัญชีบริษัทแล้ว: "Settled to Bank",
    "ยอด Wallet ผู้ใช้รวม": "Total User Wallets",
    "รวมค่าชาร์จ เติมเงิน & สมาชิก": "Charging, top-ups & plans",
    "รวมเคสเติมเงินไม่เข้า / ตัดไม่ผ่าน": "Pending slips / failed txns",
    "บัญชีรับโอน ": "Settlement bank ",
    กระเป๋าเงินสมาชิกทั้งหมด: "All member wallets",
    "รายการชำระเงินและสถานะ (เฉพาะ Super Admin)":
      "Payments & Status (Super Admin Only)",
    "จัดการ แก้ไข เปลี่ยนแปลงสถานะ ออกใบแจ้งหนี้ / ใบกำกับภาษี และอัปโหลดหลักฐาน JPEG/PNG กรณีเติมเงินไม่เข้า":
      "Manage & edit payments, update status, issue invoices/tax invoices, and upload JPEG/PNG slips for uncredited top-ups",
    ตั้งค่าข้อมูลชำระเงิน: "Payment Config",
    "+ บันทึกรายการ / เติมเงินไม่เข้า": "+ Record / Missing Top-up",
    "ค้นหารหัสรายการ, ผู้ใช้, ช่องทาง...":
      "Search payment ID, user, or channel...",
    ช่วงวันที่: "Date Range",
    วันที่เริ่มต้นรายการชำระเงิน: "Payment start date",
    วันที่สิ้นสุดรายการชำระเงิน: "Payment end date",
    ล้างตัวกรอง: "Reset Filters",
    ชำระสำเร็จ: "Paid",
    "รอตรวจสอบ (เติมไม่เข้า)": "Pending (Slip)",
    ไม่สำเร็จ: "Failed",
    คืนเงินแล้ว: "Refunded",
    รอตรวจสอบสลิป: "Pending Review",
    ตัดเงินไม่สำเร็จ: "Failed",
    "แก้ไข / สถานะ": "Edit / Status",
    "สลิป JPEG/PNG": "Slip JPEG/PNG",
    ใบแจ้งหนี้: "Invoice",
    "ใบเสร็จ / ใบกำกับภาษี": "Receipt / Tax Invoice",
    "ใบแจ้งหนี้ (Invoice)": "Invoice",
    "ใบเสร็จรับเงิน / ใบกำกับภาษี": "Receipt / Tax Invoice",
    "ไม่พบรายการชำระเงินที่ตรงกับคำค้นหา สถานะ หรือช่วงวันที่":
      "No payment records match your search, status, or date range",
    "ตรวจสอบการโอนเงินจาก Payment Gateway เข้าบัญชีบริษัท":
      "Verify Payment Gateway Transfers to Company Bank",
    ตรวจสอบและกระทบยอดทั้งหมด: "Reconcile All Pending",
    "รอบโอน / Batch": "Settlement Batch",
    "Payment Gateway · บัญชีปลายทาง": "Payment Gateway · Target Bank",
    "ยอดรวม (Gross)": "Gross Amount",
    ค่าธรรมเนียม: "Gateway Fee",
    โอนสุทธิเข้าบริษัท: "Net Settled",
    สถานะบัญชี: "Bank Status",
    ตรงยอดเข้าบัญชีแล้ว: "Matched in Bank",
    รอตรวจสอบยอดเข้าบัญชี: "Pending Bank Match",
    ยืนยันยอดเข้าบัญชี: "Verify Bank Deposit",
    "ตรวจสอบแล้ว ✓": "Verified ✓",
    "ระบบจัดการกระเป๋าเงินผู้ใช้งานทั่วไป (กำหนดโดย User Role)":
      "General User Wallet Management (by User Role)",
    "สิทธิ์ปัจจุบัน: ": "Active role: ",
    "Super Admin — แก้ไขยอด ปลดล็อก Wallet & เปลี่ยนสิทธิ์ User Role ได้เต็มรูปแบบ":
      "Super Admin — Full wallet adjustments, unlocks & User Role policy control",
    "Operator — จำกัดสิทธิ์เฉพาะคูปอง ข่าวสาร และ Monitor เท่านั้น":
      "Operator — Restricted to Coupons, News & Monitor only",
    "ค้นหาชื่อหรืออีเมลผู้ใช้...": "Search user name or email...",
    ผู้ใช้ทั่วไป: "Standard",
    "สมาชิก VIP": "VIP Member",
    "องค์กร / Fleet": "Corporate / Fleet",
    "ระงับ Wallet": "Suspended Wallet",
    "ผู้ใช้ทั่วไป (Standard)": "Standard User",
    "สมาชิก VIP (Priority)": "VIP Member",
    "องค์กร / Fleet (Corporate)": "Corporate / Fleet",
    "วงเงินสูงสุด ฿5,000 · เติมล่วงหน้า": "Max ฿5,000 · Prepaid",
    "วงเงิน ฿20,000 · เครดิตเงินคืน 5%": "Limit ฿20,000 · 5% cashback",
    "วงเงิน ฿100,000 · วางบิล/ใบกำกับภาษี":
      "Limit ฿100,000 · Net billing / Tax Inv.",
    ผู้ใช้งาน: "Users Report",
    "User Role · สิทธิ์วงเงิน": "User Role · Tier Policy",
    "สถานะ Wallet": "Wallet Status",
    หมายเหตุ: "Note",
    "จัดการ Wallet": "Manage Wallet",
    ระงับชั่วคราว: "Suspended",
    "ซิงค์แอป Wallet หลัก": "Synced Mobile Wallet",
    บัญชีระบบ: "System account",
    จัดการรายการชำระเงิน: "Manage Payment Record",
    แก้ไขรายการชำระเงินและสถานะ: "Edit Payment & Status",
    "เพิ่มรายการชำระเงิน / เติมเงินไม่เข้า": "Add Payment / Missing Top-up",
    "ชื่อผู้ใช้งาน / ผู้ชำระ": "Payer Name",
    "ยอดชำระ (บาท)": "Amount (THB)",
    ประเภทรายการ: "Transaction Type",
    "ช่องทาง / Gateway": "Channel / Gateway",
    วันที่ทำรายการ: "Transaction Date",
    สถานะการชำระเงิน: "Payment Status",
    "ชื่อผู้เสียภาษี (สำหรับใบกำกับภาษี)": "Taxpayer Name (Tax Invoice)",
    หมายเหตุรายการ: "Transaction Note",
    บันทึกรายการชำระเงิน: "Save Payment Record",
    "เติมเงิน Wallet (ไม่เข้า)": "Wallet Top-up (Pending)",
    "ค่าชาร์จ EV": "EV Charging",
    "แพ็กเกจ Membership": "Membership Plan",
    "หลักฐานการชำระเงิน (สลิปเติมเงินไม่เข้า)":
      "Payment Slip Evidence (Uncredited Top-up)",
    "หมายเหตุ: กรณีเติมแล้วเงินไม่เข้า รองรับเฉพาะไฟล์ภาพ JPEG (.jpg/.jpeg) หรือ PNG (.png) เท่านั้น":
      "Note: For uncredited top-ups, upload JPEG (.jpg/.jpeg) or PNG (.png) images only.",
    "อัปโหลด JPEG / PNG": "Upload JPEG / PNG",
    "จำลองสลิป .PNG": "Sample .PNG Slip",
    "จำลองสลิป .JPEG": "Sample .JPEG Slip",
    หลักฐานการโอนเงิน: "Transfer Slip Image",
    "ยังไม่ได้แนบไฟล์สลิป (กรุณาอัปโหลดไฟล์ .jpg / .jpeg หรือ .png)":
      "No slip attached (.jpg / .jpeg or .png required)",
    บันทึกหลักฐานไว้ตรวจสอบ: "Save Slip for Review",
    "อนุมัติสลิป & เติมเงินเข้า Wallet": "Approve Slip & Credit Wallet",
    "จัดการข้อมูลชำระเงิน (เฉพาะ Super Admin)":
      "Payment Settings (Super Admin Only)",
    ชื่อบริษัทผู้ออกเอกสาร: "Company Legal Name",
    เลขประจำตัวผู้เสียภาษีบริษัท: "Company Tax ID",
    "ที่อยู่สำนักงานใหญ่ (สำหรับใบแจ้งหนี้/ใบกำกับภาษี)":
      "Head Office Address (for Invoices/Tax Receipts)",
    ธนาคารรับโอนเข้าบัญชีบริษัท: "Company Settlement Bank",
    เลขที่บัญชีบริษัท: "Company Bank Account No.",
    "ผู้ให้บริการ Payment Gateway": "Payment Gateway Provider",
    "รหัสร้านค้า (Merchant ID)": "Merchant ID",
    รอบตรวจสอบและโอนเงินเข้าบัญชีบริษัท: "Gateway Settlement Cycle",
    บันทึกข้อมูลชำระเงิน: "Save Payment Config",
    ออกเอกสารใบแจ้งหนี้และใบกำกับภาษี: "Invoice & Tax Receipt",
    "ออกให้แก่ (ลูกค้า / ข้อมูลผู้เสียภาษี)":
      "Billed To (Customer / Tax Profile)",
    "ภาษีมูลค่าเพิ่ม (VAT 7%)": "VAT (7%)",
    ยอดรวมสุทธิ: "Grand Total",
    "พิมพ์ / บันทึกเป็น PDF": "Print / Save as PDF",
    จัดการกระเป๋าเงินผู้ใช้งาน: "Manage User Wallet",
    "จัดการกระเป๋าเงิน & User Role": "Manage Wallet & User Role",
    "กำหนด User Role (สิทธิ์และวงเงิน Wallet)":
      "Assign User Role (Tier & Policy)",
    รายการดำเนินการกับกระเป๋าเงิน: "Wallet Operation",
    "เติมเงิน (+)": "Credit (+)",
    "หักเงิน / ปรับลด (-)": "Debit / Deduct (-)",
    ชำระยอดค้างตัดไม่ได้: "Settle Debt",
    "จำนวนเงิน (บาท)": "Amount (THB)",
    "เหตุผล / บันทึกโดย Super Admin": "Reason / Super Admin Note",
    "บันทึกการจัดการ Wallet": "Save Wallet Adjustment",
    "รองรับเฉพาะไฟล์ภาพ JPEG (.jpg/.jpeg) หรือ PNG (.png) เท่านั้น":
      "Only JPEG (.jpg/.jpeg) or PNG (.png) image files are supported",
    "กรุณาอัปโหลดหลักฐาน JPEG หรือ PNG ก่อนอนุมัติเติมเงิน":
      "Please upload a JPEG or PNG slip before approving top-up",
    อัปโหลดไฟล์สลิปเข้าสู่รายการแล้ว: "Uploaded payment slip cleanly",
    บันทึกหลักฐานสลิปเรียบร้อยแล้ว: "Saved slip evidence cleanly",
    "อนุมัติสลิปและเติมเงินเข้า Wallet สำเร็จแล้ว":
      "Slip approved and wallet credited cleanly",
    "กรุณากรอกข้อมูลบริษัท เลขผู้เสียภาษี และบัญชีธนาคารให้ครบถ้วน":
      "Please complete company name, Tax ID, and settlement bank details",
    บันทึกข้อมูลชำระเงินบริษัทเรียบร้อยแล้ว:
      "Company payment settings saved cleanly",
    เปิดหน้าต่างออกเอกสารเรียบร้อยแล้ว: "Document print window opened cleanly",
    กระทบยอดเงินเข้าบัญชีบริษัทครบทุกรายการแล้ว:
      "All pending gateway transfers reconciled cleanly",
    "ยืนยันเงินโอนจาก Payment Gateway เข้าบัญชีบริษัทแล้ว":
      "Confirmed Payment Gateway transfer into company bank",
    กรุณากรอกชื่อผู้ชำระและจำนวนเงินให้ถูกต้อง:
      "Please enter valid payer name and amount",
    บันทึกการแก้ไขรายการชำระเงินแล้ว: "Payment record updated cleanly",
    เพิ่มรายการชำระเงินเรียบร้อยแล้ว: "Payment record added cleanly",
    "อัปเดตกระเป๋าเงินและ User Role แล้ว":
      "Wallet and User Role updated cleanly",
    "ยอดเงินใน Wallet ไม่พอสำหรับหักยอด":
      "Insufficient wallet balance for deduction",
    "กรุณาระบุจำนวนเงินมากกว่า 0 หรือแก้ไขสิทธิ์ Role / สถานะ":
      "Enter amount > 0 or change Role/Status",
    ผู้ใช้ไม่มีรายการค้างชำระ: "User has no uncollected balance",
    "ผู้ใช้เติมเงิน ฿500 ผ่าน K-Plus แล้วยอดไม่เข้ากระเป๋า (รอแนบ/ตรวจสลิป)":
      "User topped up ฿500 via K-Plus; wallet not yet credited (pending slip)",
    "ชาร์จเร็ว CCS2 48.6 kWh · ม.รามคำแหง วิทยาเขต บางนา":
      "DC Fast CCS2 48.6 kWh · Ramkhamhaeng Bang Na",
    "ตัดบัตรเครดิตอัตโนมัติไม่ผ่าน (วงเงินไม่พอ) มียอดค้างชำระ":
      "Auto card charge declined (insufficient funds); balance overdue",
    "สมัคร/ต่ออายุแพ็กเกจ Charge X Membership รายเดือน":
      "Charge X monthly Membership subscription",
    "ขอคืนเงินซ้ำซ้อน · ดำเนินการคืนเข้า Wallet เรียบร้อยแล้ว":
      "Duplicate charge refund · credited to wallet",
    "มีสลิป: ": "Slip: ",
    "บัญชีรับโอน: ": "Settlement account: ",
    "โอนแล้ว · อ้างอิง ": "Transferred · Ref ",
    รอเงินโอนเข้าบัญชีบริษัท: "Pending company bank settlement",
    " รายการ · ": " txns · ",
    "เลขประจำตัวผู้เสียภาษี: ": "Tax ID: ",
    "บริษัท ชาร์จ เอ็กซ์ (ประเทศไทย) จำกัด": "Charge X (Thailand) Co., Ltd.",
    "88 อาคาร เอส ทาวเวอร์ ถนนบางนา-ตราด แขวงบางนา เขตบางนา กทม. 10260":
      "88 S Tower, Bang Na-Trat Rd, Bang Na, Bangkok 10260",
    "ธนาคารกสิกรไทย (KBank)": "Kasikornbank (KBank)",
    รายการนี้ยังไม่แนบไฟล์: "No slip attached",
    "เติมเงินจากสลิป Back Office": "Top-up credited from Back Office slip",
    "ปรับยอดโดย Super Admin": "Adjusted by Super Admin",
    "เอกสารเลขที่ ": "Doc No. ",
    "เช่น Sawanya Srisawat": "e.g. Sawanya Srisawat",
    "เช่น PromptPay QR · Omise": "e.g. PromptPay QR · Omise",
    ชื่อบุคคลหรือนิติบุคคล: "Individual or Company Name",
    "ระบุรายละเอียดเพิ่มเติม เช่น เติมเงินแล้วระบบไม่ตัด หรือเลขอ้างอิง":
      "Enter notes e.g. uncredited top-up or bank reference",
    "อัปโหลดหลักฐานการชำระเงิน JPEG/PNG": "Upload Payment Slip JPEG/PNG",
    "บริษัท ชาร์จ เอ็กซ์ จำกัด": "Charge X Co., Ltd.",
    ที่อยู่บริษัท: "Company Address",
    "ตัดยอดอัตโนมัติรายวัน 00:00 น. (T+1)": "Daily auto settlement 00:00 (T+1)",
    "เช่น เติมเงินชดเชยสลิป หรือปรับวงเงิน Role":
      "e.g. Credit from slip or Role limit update",
    ตั้งค่าข้อมูลชำระเงินบริษัท: "Company Payment Config",
    "เลขประจำตัวผู้เสียภาษี (13 หลัก)": "Tax ID (13 digits)",
    "อนุมัติสลิป &amp; เติมเงินเข้า Wallet": "Approve Slip &amp; Credit Wallet",
    "จัดการกระเป๋าเงิน &amp; User Role": "Manage Wallet &amp; User Role",
    "บริษัท คิทติชัย โลจิสติกส์ จำกัด": "Kittichai Logistics Co., Ltd.",
    "บจก. นาคสวัสดิ์ ฟลีท กรุ๊ป": "Naksawat Fleet Group Co., Ltd.",
    "จัดการสถานีชาร์จ (Stations)": "Station Management",
    "จัดการสถานีชาร์จไฟฟ้ารถยนต์ (Station Management)":
      "EV Charging Station Management",
    "แสดง เพิ่ม ลบ แก้ไขข้อมูลสถานี รูปภาพ เจ้าของ ที่อยู่ พิกัด Google Map ผู้ดูแลพื้นที่ จำนวนตู้ชาร์จ และสถิติขัดข้อง":
      "View, add, edit & delete stations: photos, owner, address, Google Map coordinates, local contacts, chargers & fault stats",
    จำนวนตู้ชาร์จรวม: "Total Chargers",
    สถิติแจ้งระบบขัดข้องสะสม: "Reported Faults",
    สถานีออนไลน์ปกติ: "Online Stations",
    "+ เพิ่มสถานีชาร์จ": "+ Add Station",
    "ค้นหาชื่อสถานี, เจ้าของ, ที่อยู่ หรือผู้ดูแล...":
      "Search station, owner, address, or contact...",
    เคยแจ้งขัดข้อง: "With Faults",
    "เจ้าของสถานี:": "Owner:",
    "ที่อยู่สถานี:": "Address:",
    "พิกัด Google Map:": "Google Map:",
    "ผู้ดูแลพื้นที่:": "Area Contact:",
    ผู้ดูแลพื้นที่: "Area Contact",
    "สถิติระบบขัดข้อง:": "Fault Stats:",
    แก้ไขข้อมูล: "Edit Station",
    ลบสถานี: "Delete",
    ไม่พบสถานีชาร์จที่ตรงกับคำค้นหาหรือเงื่อนไขที่เลือก:
      "No stations match your search or filter",
    จัดการข้อมูลสถานีชาร์จ: "Manage EV Station",
    เพิ่มสถานีชาร์จใหม่: "Add New Charging Station",
    แก้ไขข้อมูลสถานีชาร์จ: "Edit Charging Station",
    รูปสถานีชาร์จไฟฟ้า: "Station Photo",
    อัปโหลดรูปสถานี: "Upload Photo",
    ตัวอย่างรูปสถานีชาร์จ: "Station photo preview",
    "พาธหรือ URL รูปสถานี": "Photo path or URL",
    "เช่น ./img/18970bd8ea282f5bf473c1f7b19d490d.jpg":
      "e.g. ./img/18970bd8ea282f5bf473c1f7b19d490d.jpg",
    ชื่อสถานีชาร์จไฟฟ้า: "Station Name",
    "เช่น สถานี Charge X พระราม 9": "e.g. Charge X Rama 9",
    เจ้าของสถานีชาร์จไฟฟ้า: "Station Owner",
    "เช่น บริษัท ชาร์จ เอ็กซ์ จำกัด": "e.g. Charge X Co., Ltd.",
    ที่อยู่สถานีชาร์จไฟฟ้า: "Station Address",
    "ระบุเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์":
      "Street, Sub-district, District, Province, Postal Code",
    "ละติจูด (Lat)": "Latitude (Lat)",
    "ลองจิจูด (Lng)": "Longitude (Lng)",
    "ลิงก์ Google Map": "Google Map Link",
    ผู้ดูแลสถานีประจำพื้นที่: "Regional Caretaker",
    "เช่น คุณสมชาย เขตบางนา": "e.g. Somchai (Bang Na)",
    "ช่องทางติดต่อผู้ดูแล (โทร / LINE / อีเมล)":
      "Caretaker Contact (Phone / LINE / Email)",
    "จำนวนตู้ชาร์จ (ตู้)": "Chargers (units)",
    "จำนวนหัวชาร์จ (หัว)": "Connectors (bays)",
    "กำลังไฟ / สเปค": "Power / Spec",
    "150 kW DC · 4 หัว": "150 kW DC · 4 bays",
    สถิติการแจ้งระบบขัดข้องที่เกิดจากสถานี:
      "Station Fault & Incident Statistics",
    "จำนวนครั้งที่แจ้งขัดข้อง (ครั้ง)": "Fault Reports (count)",
    วันที่แจ้งขัดข้องล่าสุด: "Latest Fault Date",
    "เช่น 15 พ.ย. 2569 หรือ ยังไม่มี": "e.g. 15 Nov 2026 or None",
    "รายละเอียด / สถิติอาการขัดข้อง": "Fault Summary / Notes",
    "เช่น ปกติ 0 ครั้ง หรือ เซ็นเซอร์หัวชาร์จรีเซ็ตอัตโนมัติ":
      "e.g. 0 incidents or connector sensor auto-reset",
    สถานะสถานี: "Station Status",
    บันทึกข้อมูลสถานี: "Save Station",
    กรุณากรอกชื่อสถานีและชื่อเจ้าของสถานี:
      "Please enter station name and owner",
    กรุณากรอกที่อยู่สถานี: "Please enter station address",
    "กรุณาระบุพิกัด Lat / Lng หรือลิงก์ Google Map ที่ถูกต้อง":
      "Please enter valid Lat/Lng or Google Map link",
    กรุณาระบุชื่อและช่องทางติดต่อผู้ดูแลสถานี:
      "Please enter regional caretaker name and contact",
    "กรุณาระบุจำนวนตู้ชาร์จตั้งแต่ 1 ตู้ขึ้นไป":
      "Please enter at least 1 charger unit",
    เพิ่มสถานีชาร์จเรียบร้อยแล้ว: "Charging station added cleanly",
    บันทึกการแก้ไขข้อมูลสถานีแล้ว: "Charging station updated cleanly",
    ลบสถานีชาร์จแล้ว: "Charging station deleted",
    กู้คืนสถานีชาร์จแล้ว: "Charging station restored",
    อัปโหลดรูปสถานีเรียบร้อยแล้ว: "Station image uploaded cleanly",
    "ส่งออกรายงานสถานี Excel (.xls) เรียบร้อยแล้ว":
      "Stations Excel (.xls) exported cleanly",
    "เปิดหน้าต่างส่งออก PDF สถานีเรียบร้อยแล้ว":
      "Stations PDF print window opened cleanly",
    "ภาพจุดชาร์จเร็ว DC": "DC Fast Visual",
    ภาพลานจอดห้าง: "Mall Parking Visual",
    ภาพสถานีริมทาง: "Highway Visual",
    ไม่พบประวัติขัดข้อง: "No incidents recorded",
    "พันธมิตร สยามรีเทล จำกัด": "Siam Retail Partner Co., Ltd.",
    "ไบเทค เอ็นเนอร์ยี่ พาร์ทเนอร์": "BITEC Energy Partner",
    "บจก. กิ่งแก้ว อีวี ฮับ": "King Kaew EV Hub Co., Ltd.",
    "บจก. บางนา ออโต้ พาวเวอร์": "Bang Na Auto Power Co., Ltd.",
    "เซ็นทรัล พาร์ทเนอร์ อีวี": "Central EV Partner",
    "บจก. ซีคอน ศรีนครินทร์ โมบิลิตี้": "Seacon Srinakarin Mobility Co., Ltd.",
    "บจก. ลาซาล คลีน เอ็นเนอร์จี": "Lasalle Clean Energy Co., Ltd.",
    "คุณเอกรินทร์ เขตบางนา": "Ekarin (Bang Na)",
    "คุณศศิธร โซนบางพลี": "Sasithorn (Bang Phli)",
    "คุณธนพล ศูนย์ไบเทค": "Thanapol (BITEC)",
    "คุณวิชัย เขตลาดกระบัง": "Wichai (Lat Krabang)",
    "คุณนลินี สายบางนา-ตราด": "Nalinee (Bang Na-Trat)",
    "คุณปิติ โซนเซ็นทรัล": "Piti (Central)",
    "คุณกานดา เขตประเวศ": "Kanda (Prawet)",
    "คุณอรุณ สุขุมวิท 105": "Arun (Sukhumvit 105)",
    "หัวชาร์จ B แจ้งเตือนแรงดันไฟฟ้าแกว่ง · แก้ไขแล้ว":
      "Connector B voltage fluctuation · Resolved",
    "เซ็นเซอร์ล็อกหัวชาร์จ DC ขัดข้อง 1 ครั้ง · เปลี่ยนอะไหล่แล้ว":
      "Connector latch fault once · Replaced",
    "ตู้ชาร์จ AC เบรกเกอร์ทริประหว่างบำรุงรักษา":
      "AC charger breaker tripped during maintenance",
    "ระบบระบายความร้อนสายไฟแจ้งเตือน · อัปเดตเฟิร์มแวร์แล้ว":
      "Cable cooling alert · Firmware updated",
    "ไม่พบแจ้งขัดข้องในช่วง 30 วันที่ผ่านมา": "Zero incidents in past 30 days",
    "แรงดันโหลดสลับเฟส 1 ครั้ง · ปกติแล้ว": "Phase load switch once · Normal",
    "282 ถ.บางนา-ตราด แขวงดอกไม้ เขตประเวศ กทม. 10250":
      "282 Bang Na-Trat Rd, Prawet, Bangkok 10250",
    "39 หมู่ 6 ถ.เทพรัตน ต.บางแก้ว อ.บางพลี สมุทรปราการ 10540":
      "39 Moo 6 Bang Phli, Samut Prakan 10540",
    "88 ถ.เทพรัตน แขวงบางนาใต้ เขตบางนา กทม. 10260":
      "88 Debaratna Rd, Bang Na, Bangkok 10260",
    "99 ถ.กิ่งแก้ว ต.ราชาเทวะ อ.บางพลี สมุทรปราการ 10540":
      "99 King Kaew Rd, Bang Phli, Samut Prakan 10540",
    "145 ถ.บางนา-ตราด กม.4 แขวงบางนา เขตบางนา กทม. 10260":
      "145 Bang Na-Trat Km.4, Bang Na, Bangkok 10260",
    "587-589 ถ.เทพรัตน แขวงบางนาเหนือ เขตบางนา กทม. 10260":
      "587-589 Bang Na Nuea, Bang Na, Bangkok 10260",
    "55 ถ.ศรีนครินทร์ แขวงหนองบอน เขตประเวศ กทม. 10250":
      "55 Srinakarin Rd, Prawet, Bangkok 10250",
    "1050 ซ.แบริ่ง-ลาซาล แขวงบางนาใต้ เขตบางนา กทม. 10260":
      "1050 Lasalle–Bearing, Bang Na, Bangkok 10260",
    ยังไม่มีเหตุขัดข้อง: "No incidents",
    "สถิติล่าสุด: ": "Latest: ",
    "กทม.": "Bangkok",
    "ขัดข้อง ": "Faults: ",
    หัวชาร์จ: "Connector",
    "สมชาย ใจดี": "Somchai Jaidee",
    "รายงานระบบ (Report)": "Reports & Analytics",
    "ระบบรายงานและการวิเคราะห์ข้อมูล (Report)": "System Reports & Analytics",
    "รายงานและการวิเคราะห์ระบบ (Report)": "System Reports & Analytics",
    "สรุปยอดใช้งาน ข้อมูลผู้ใช้ การเข้าใช้งานระบบ สถานี ตู้ชาร์จทั้งหมด พร้อม Filter และ Real Time (เฉพาะ Super Admin)":
      "Usage breakdowns, users, system access logs, stations & all chargers with filters, Real-Time & exports (Super Admin only)",
    "รับข้อมูล Real Time สด": "Live Real-Time Stream",
    หยุดสตรีมชั่วคราว: "Stream Paused",
    "หยุด Real Time": "Pause Real-Time",
    "เปิด Real Time": "Enable Real-Time",
    "ส่งข้อมูล Real Time ทันที": "Sync Real-Time Now",
    "ค้นหาสถานี, ตู้ชาร์จ, ผู้ใช้งาน, อีเมล, หัวชาร์จ...":
      "Search station, charger unit, user, email, connector...",
    วันที่เริ่มต้นรายงาน: "Report start date",
    วันที่สิ้นสุดรายงาน: "Report end date",
    "หัวชาร์จ:": "Connector:",
    "รอบเวลา:": "Time Slot:",
    "สถานีชาร์จ:": "Station:",
    "กลุ่มสิทธิ์:": "Role Group:",
    "มุมมองรายงาน:": "Report View:",
    ทุกหัวชาร์จ: "All Connectors",
    ทุกรอบเวลา: "All Time Slots",
    "06:00–12:00 (ช่วงเช้า)": "06:00–12:00 (Morning)",
    "12:00–18:00 (ช่วงบ่าย Peak)": "12:00–18:00 (Afternoon Peak)",
    "18:00–24:00 (ช่วงค่ำ Peak)": "18:00–24:00 (Evening Peak)",
    ทุกสถานี: "All Stations",
    ทุกสิทธิ์: "All Roles",
    "ทั้งหมด (5 รายงาน)": "All Reports (5)",
    ยอดใช้งาน: "Usage Summary",
    การเข้าใช้งานระบบ: "Access Logs",
    สถานีชาร์จไฟฟ้า: "Charging Station",
    "Off-Peak ลด 10%": "Off-Peak -10%",
    การใช้งานปกติ: "Standard Load",
    "Peak ช่วงบ่าย": "Afternoon Peak",
    "Peak สูงสุด": "Evening Peak",
    ยอดใช้งานรวมทั้งหมด: "Total Charging Sessions",
    "พลังงานรวม (kWh)": "Total Energy (kWh)",
    รายได้รวมจากการชาร์จ: "Total Charging Revenue",
    ลดคาร์บอนสะสม: "Carbon Saved (CO₂)",
    ยอดใช้งานแยกตามประเภทของหัวชาร์จ: "Usage by Connector Type",
    "ยอดใช้งานแยกตามรอบเวลา (Time Slot)": "Usage by Time Slot",
    "เปรียบเทียบ Off-Peak กลางคืน vs ช่วงกลางวัน และ Peak":
      "Overnight Off-Peak vs Daytime & Peak hours comparison",
    ยอดใช้งานแยกตามสถานีชาร์จไฟฟ้า: "Usage by Charging Station",
    "ยอดใช้งานแยกตามตู้ชาร์จไฟฟ้า (Top Units)":
      "Usage by Charger Unit (Top Units)",
    รหัสตู้ชาร์จ: "Charger ID",
    ไม่พบข้อมูลยอดใช้งานที่ตรงกับตัวกรองที่เลือก:
      "No usage data matches active filters",
    "รายงานข้อมูลผู้ใช้งาน (User Management Report)": "User Management Report",
    "ข้อมูลสมาชิก บทบาทสิทธิ์ User Role สถานะ Wallet ยอดคงเหลือ และสถิติการชาร์จ":
      "Member profiles, User Roles, Wallet status, balance & charging history",
    "ผู้ใช้งาน / วันสมัคร": "User / Joined",
    "อีเมล / เบอร์โทร": "Email / Phone",
    "รถ EV": "EV Model",
    "ครั้ง / kWh": "Sessions / kWh",
    "ยอด Wallet": "Wallet",
    ค้างตัดไม่ได้: "Uncollected",
    ไม่พบข้อมูลผู้ใช้งานที่ตรงกับตัวกรอง: "No users match active filters",
    "รายงานการเข้าใช้งานระบบ (System Access Report)":
      "System Access Log Report",
    "บันทึกการเข้าสู่ระบบ ออกจากระบบ และการปฏิเสธสิทธิ์ของ Super Admin และ Operator แบบ Real-Time":
      "Real-time audit log of Super Admin & Operator logins, logouts & access denials",
    "วัน-เวลาเข้าใช้งาน": "Timestamp",
    "ผู้ใช้งาน / อีเมล": "Actor / Email",
    "สิทธิ์ (Role)": "Role",
    "กิจกรรม / เหตุการณ์": "Action / Event",
    "ช่องทาง / IP": "Channel / IP",
    ผลการตรวจสอบ: "Result",
    ไม่พบประวัติการเข้าใช้งานระบบที่ตรงกับตัวกรอง:
      "No access log entries match active filters",
    "รายงานข้อมูลสถานีชาร์จไฟฟ้า (EV Station Report)":
      "EV Charging Stations Report",
    "ซิงค์ข้อมูลสถานี เจ้าของ พิกัด Google Map ผู้ดูแลพื้นที่ จำนวนตู้ชาร์จ Uptime และสถิติขัดข้อง":
      "Live synced stations, owners, Google Map coordinates, contacts, chargers, uptime & faults",
    "สถานีชาร์จ / เจ้าของ": "Station / Owner",
    "ที่อยู่ &amp; พิกัด Google Map": "Address &amp; Google Map",
    "ที่อยู่ & พิกัด Google Map": "Address & Google Map",
    "จำนวนตู้ / หัวชาร์จ": "Chargers / Bays",
    "Uptime &amp; ขัดข้อง": "Uptime &amp; Faults",
    "Uptime & ขัดข้อง": "Uptime & Faults",
    ยอดใช้งานช่วงนี้: "Period Usage",
    ไม่พบข้อมูลสถานีชาร์จไฟฟ้าที่ตรงกับตัวกรอง:
      "No stations match active filters",
    "รายงานของตู้ชาร์จไฟฟ้าทั้งหมด (All Charger Units Report)":
      "All Charger Units Report",
    "แสดงตู้ชาร์จทุกเครื่องในเครือข่าย กำลังไฟ ประเภทหัวชาร์จ โหลดจ่ายไฟ Real Time และประวัติขัดข้อง":
      "Complete directory of every EV charger unit, connector type, real-time load & fault logs",
    "หัวชาร์จ / กำลังไฟ": "Connector / Power",
    "โหลด Real Time": "Real-Time Load",
    "ครั้ง / พลังงาน": "Sessions / kWh",
    ขัดข้อง: "Faults",
    ไม่พบข้อมูลตู้ชาร์จไฟฟ้าที่ตรงกับตัวกรอง:
      "No charger units match active filters",
    "เพิ่มบัญชี Operator (kanya@chargex.co.th)":
      "Created Operator account (kanya@chargex.co.th)",
    "สร้างคูปองส่วนลด EV50 & DC25": "Created discount coupons EV50 & DC25",
    "เผยแพร่ข่าวสารโปรโมชัน Off-Peak": "Published Off-Peak promo news",
    "อัปเดตสถานะตู้ชาร์จ Monitor #3092": "Toggled charger monitor #3092",
    "ส่งออกรายงาน Excel แผงบริหาร": "Exported Dashboard Excel report",
    "ปฏิเสธ: อีเมลไม่สังกัด @chargex.co.th": "Denied: non-@chargex.co.th email",
    "เข้าสู่ระบบไม่สำเร็จ (รหัสผ่านไม่ผ่านเกณฑ์)":
      "Login failed (password policy)",
    "เข้าสู่ระบบไม่สำเร็จ (ไม่ใช่ @chargex.co.th)":
      "Login failed (non-company email)",
    "เข้าสู่ระบบไม่สำเร็จ (ข้อมูลไม่ถูกต้อง)":
      "Login failed (invalid credentials)",
    "เข้าสู่ระบบไม่สำเร็จ (บัญชีถูกระงับ)": "Login failed (account suspended)",
    "ออกจากระบบ Back Office": "Signed out of Back Office",
    สำเร็จ: "Success",
    ไม่ผ่านสิทธิ์: "Denied",
    "สแตนด์บาย · 0.0 kW": "Standby · 0.0 kW",
    "ปิดบำรุงรักษา · 0.0 kW": "Maintenance · 0.0 kW",
    "อัปเดตข้อมูลรายงานแบบ Real Time ล่าสุดแล้ว":
      "Real-time report telemetry synced",
    "ส่งออกไฟล์รายงาน Excel (.xls) เรียบร้อยแล้ว":
      "Report Excel (.xls) exported cleanly",
    "เปิดหน้าต่างส่งออกรายงาน PDF เรียบร้อยแล้ว":
      "Report PDF print window opened cleanly",
    ผู้ใช้ภายนอกระบบ: "Unregistered User",
    "เปิดการสตรีมข้อมูลรายงานแบบ Real Time แล้ว":
      "Real-Time report stream enabled",
    "หยุดการสตรีมข้อมูล Real Time ชั่วคราว": "Paused Real-Time report stream",
    ล้างตัวกรองรายงานทั้งหมดแล้ว: "All report filters cleared",
    แก้ไขบัญชีของฉัน: "My Account",
    "การจัดการผู้ใช้งานระบบ (User Management)": "System User & Role Management",
    "จัดการผู้ใช้ & Operator": "Users & Operators",
    "จัดการบัญชีผู้ดูแลระบบ สมาชิก บทบาท สิทธิ์การเข้าถึง กลุ่มทีม รหัสผ่าน และสถานะ Active / Inactive":
      "Manage admins, members, roles, permissions, teams, passwords & Active/Inactive status",
    "+ เพิ่มผู้ใช้งานระบบ": "+ Add User",
    ผู้ใช้งานทั้งหมด: "Total Users",
    "Super Admin (จำกัด 1 ID)": "Super Admin (1 ID Limit)",
    "Operator & ผู้ปฏิบัติการ": "Operators & Staff",
    "บทบาท & กลุ่มทีม": "Roles & Teams",
    "ค้นหาชื่อ, อีเมล, เบอร์โทร, Role หรือทีม...":
      "Search name, email, phone, Role, or team...",
    "ประเภทผู้ใช้งาน:": "User Type:",
    "บทบาท:": "Role:",
    "สถานะ:": "Status:",
    "กลุ่มทีม:": "Team:",
    "มุมมอง:": "Section:",
    "ทั้งหมด (ผู้ใช้/บทบาท/ทีม)": "All (Users/Roles/Teams)",
    รายชื่อผู้ใช้งาน: "User Directory",
    "บทบาท & สิทธิ์": "Roles & Perms",
    กลุ่มผู้ใช้งาน: "User Teams",
    "ผู้ดูแลระบบ (Admin/Operator)": "System Admin / Operator",
    "ผู้ใช้งานแอป (EV Member)": "EV App Member",
    ผู้ดูแลระบบ: "Admin Staff",
    "สมาชิกแอป EV": "EV Member",
    ทุกบทบาท: "All Roles",
    ทุกสถานะ: "All Statuses",
    ทุกทีม: "All Teams",
    "Active (ใช้งาน)": "Active",
    "Inactive (ระงับ)": "Inactive",
    "ตั้ง Active": "Activate",
    "ตั้ง Inactive": "Deactivate",
    ดูข้อมูล: "View",
    "ผู้ใช้งาน / User ID &amp; ทีม": "User / ID &amp; Team",
    "ผู้ใช้งาน / User ID & ทีม": "User / ID & Team",
    "อีเมล &amp; เบอร์โทร": "Email &amp; Phone",
    "อีเมล & เบอร์โทร": "Email & Phone",
    ประเภทผู้ใช้: "User Type",
    "บทบาท &amp; สิทธิ์การเข้าถึง": "Role &amp; Permissions",
    "บทบาท & สิทธิ์การเข้าถึง": "Role & Permissions",
    ไม่พบผู้ใช้งานที่ตรงกับตัวกรองหรือคำค้นหา: "No users match active filters",
    "จัดการบทบาทและสิทธิ์การเข้าถึง (Role Management)":
      "Role & Permission Management",
    "เพิ่ม แก้ไข ลบ และดูบทบาทผู้ใช้งาน (ผู้ดูแลระบบแบ่งเป็น Super Admin [1 ID] และ Operator)":
      "Add, edit, delete & inspect roles (Admin tiers: sole Super Admin ID & Operator)",
    "+ เพิ่มบทบาทใหม่": "+ Add Role",
    ชื่อบทบาท: "Role Name",
    ระดับระบบ: "Authority Tier",
    สิทธิ์การเข้าถึง: "Permissions",
    จำนวนผู้ใช้: "Users",
    ดูสิทธิ์: "View Perms",
    "Super Admin (1 ID เท่านั้น)": "Super Admin (1 ID Only)",
    "Operator Tier": "Operator Tier",
    "EV Member Tier": "EV Member Tier",
    "จัดการกลุ่มผู้ใช้งานระบบ (User Team)": "User Teams Management",
    จัดกลุ่มทีมผู้ใช้งานระบบและกำหนดทีมให้กับสมาชิกแต่ละราย:
      "Organize system teams and assign users to teams",
    "+ เพิ่มกลุ่มทีม": "+ Add Team",
    เพิ่มผู้ใช้งานระบบใหม่: "Add System User",
    แก้ไขข้อมูลผู้ใช้งานระบบ: "Edit System User",
    รายละเอียดผู้ใช้งานระบบ: "User Account Details",
    กำหนดรหัสผ่านผู้ใช้งาน: "Update User Password",
    "แก้ไขข้อมูลบัญชีของฉัน (My Account)": "Edit My Account",
    รายละเอียดบทบาทและสิทธิ์: "Role & Permissions Details",
    เพิ่มบทบาทผู้ใช้งานใหม่: "Add User Role",
    แก้ไขบทบาทผู้ใช้งาน: "Edit User Role",
    "เพิ่มกลุ่มผู้ใช้งาน (Team)": "Add User Team",
    "แก้ไขกลุ่มผู้ใช้งาน (Team)": "Edit User Team",
    "ระดับผู้ดูแลระบบมีได้ 2 บทบาทหลัก (Super Admin จำกัด 1 User ID เท่านั้น และ Operator)":
      "System admins have 2 core roles (Sole Super Admin 1 ID & Operator)",
    "ผู้ดูแลระบบระดับ Super Admin มีได้ 1 User ID เท่านั้น (บัญชี superadmin)":
      "Only 1 Super Admin User ID is allowed (superadmin already assigned)",
    "ไม่สามารถลบหรือระงับบัญชี Super Admin หลักได้":
      "Cannot delete or deactivate the sole Super Admin account",
    ไม่สามารถลบบัญชีที่กำลังเข้าสู่ระบบอยู่ได้:
      "Cannot delete the currently signed-in account",
    "ไม่สามารถเปลี่ยนสิทธิ์ของบัญชี Super Admin หลักได้":
      "Cannot downgrade the sole Super Admin account",
    กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน: "Please complete all mandatory fields",
    รูปแบบอีเมลไม่ถูกต้อง: "Invalid email address format",
    อีเมลนี้ถูกใช้งานในระบบแล้ว: "This email is already registered",
    รหัสผ่านทั้งสองช่องไม่ตรงกัน: "Password confirmation does not match",
    สร้างบัญชีผู้ใช้งานเรียบร้อยแล้ว: "User account created cleanly",
    บันทึกการแก้ไขข้อมูลผู้ใช้งานแล้ว: "User account updated cleanly",
    "อัปเดตสถานะผู้ใช้งานเป็น Active แล้ว": "User status set to Active",
    "อัปเดตสถานะผู้ใช้งานเป็น Inactive แล้ว": "User status set to Inactive",
    ลบบัญชีผู้ใช้งานออกจากระบบแล้ว: "User account deleted from system",
    กู้คืนบัญชีผู้ใช้งานแล้ว: "User account restored",
    อัปเดตรหัสผ่านของผู้ใช้งานเรียบร้อยแล้ว: "User password updated cleanly",
    บันทึกข้อมูลบัญชีส่วนตัวเรียบร้อยแล้ว:
      "Personal account settings saved cleanly",
    เพิ่มบทบาทผู้ใช้งานเรียบร้อยแล้ว: "User role created cleanly",
    บันทึกการแก้ไขบทบาทแล้ว: "User role updated cleanly",
    ลบบทบาทเรียบร้อยแล้ว: "User role deleted",
    ไม่สามารถลบบทบาทระบบหลักได้: "Cannot delete built-in system roles",
    ไม่สามารถลบบทบาทที่ยังมีผู้ใช้งานสังกัดอยู่ได้:
      "Cannot delete a role that still has assigned users",
    "กรุณาระบุชื่อบทบาท คำอธิบาย และเลือกสิทธิ์อย่างน้อย 1 สิทธิ์":
      "Please enter role name, description & select at least 1 permission",
    เพิ่มกลุ่มผู้ใช้งานเรียบร้อยแล้ว: "User team created cleanly",
    บันทึกการแก้ไขกลุ่มทีมแล้ว: "User team updated cleanly",
    ลบกลุ่มทีมเรียบร้อยแล้ว: "User team deleted",
    กรุณาระบุชื่อกลุ่มผู้ใช้งาน: "Please enter a user team name",
    ไม่สามารถลบกลุ่มทีมที่มีผู้ใช้งานสังกัดอยู่ได้:
      "Cannot delete a team with assigned users",
    กรุณาระบุอีเมลและเบอร์โทรให้ครบถ้วน: "Please enter email and phone number",
    ยืนยันรหัสผ่านใหม่: "Confirm New Password",
    กรอกรหัสผ่านใหม่อีกครั้ง: "Re-enter new password",
    "หมายเหตุ: หากไม่ต้องการเปลี่ยนรหัสผ่าน ให้เว้นว่างไว้":
      "Note: Leave blank to keep existing password",
    เบอร์โทรศัพท์: "Phone Number",
    "เช่น 081-234-5678": "e.g. 081-234-5678",
    "แผนก / ตำแหน่ง": "Department / Title",
    "กำหนดกลุ่มผู้ใช้งาน (User Team)": "Assign User Team",
    "กำหนดบทบาท (User Role)": "Assign User Role",
    "กำหนดสิทธิ์การเข้าถึง (Permissions)": "Assign Access Permissions",
    "สถานะบัญชี (Account Status)": "Account Status",
    บันทึกข้อมูลผู้ใช้งาน: "Save User",
    บันทึกบัญชีของฉัน: "Save My Account",
    บันทึกรหัสผ่านใหม่: "Save New Password",
    บันทึกบทบาท: "Save Role",
    บันทึกกลุ่มทีม: "Save Team",
    "ชื่อบทบาท (Role Name)": "Role Name",
    "เช่น Station Supervisor": "e.g. Station Supervisor",
    คำอธิบายบทบาทและขอบเขตหน้าที่: "Role Description & Scope",
    เลือกสิทธิ์การเข้าถึงโมดูลในระบบ: "Select System Module Permissions",
    "ชื่อกลุ่มผู้ใช้งาน (Team Name)": "User Team Name",
    "เช่น East Bangkok Operations": "e.g. East Bangkok Operations",
    คำอธิบายกลุ่มทีม: "Team Description",
    ผู้ใช้หลัก: "Root ID",
    "ผู้ดูแลระบบสูงสุด · เข้าถึงได้ทุกโมดูล (จำกัด 1 User ID)":
      "Highest authority · Full module access (1 User ID only)",
    "ผู้ปฏิบัติการ · คูปอง ข่าวสาร และ Monitor (อีเมล @chargex.co.th)":
      "Operations staff · Coupons, News & Monitor (@chargex.co.th)",
    "ดูแลคูปอง ข่าวสาร และติดตามสถานะสถานีชาร์จ":
      "Manages coupons, news & charger monitoring",
    "ทีมผู้ดูแลหลักและโครงสร้างระบบ Charge X":
      "Core platform admins & infrastructure management",
    "ทีมดูแลโปรโมชัน คูปอง และสื่อสารลูกค้า":
      "Promotions, coupons & customer communications team",
    "ทีมตรวจสอบและบำรุงรักษาตู้ชาร์จ 24 ชม.":
      "24/7 charger monitoring & maintenance operations",
    "กลุ่มผู้ใช้งานรถยนต์ไฟฟ้าและสมาชิก Fleet":
      "EV driver members & corporate fleet users",
    "ครบทั้ง 9 โมดูล": "Full 9 Modules",
    ครบทุกโมดูล: "Full Modules",
    แผงบริหาร: "Dashboard",
    จัดการผู้ใช้: "Users",
    คูปอง: "Coupons",
    การชำระเงิน: "Payments",
    รายงาน: "Reports",
    "แอป EV · กระเป๋าเงิน": "EV App · Wallet",
    "เข้าใช้ล่าสุด:": "Last Login:",
    "User ID:": "User ID:",
    "เบอร์โทร:": "Phone:",
    "สิทธิ์ที่อนุญาต:": "Permissions:",
    "Super Admin — จำกัด 1 User ID": "Super Admin — Limited to 1 User ID",
    "ชื่อ-นามสกุล *": "Full Name *",
    "Username / อีเมล *": "Username / Email *",
    "เบอร์โทรศัพท์ *": "Phone Number *",
    "กำหนดบทบาท (User Role) *": "Assign User Role *",
    "กำหนดกลุ่มผู้ใช้งาน (User Team) *": "Assign User Team *",
    "ชื่อบทบาท (Role Name) *": "Role Name *",
    "คำอธิบายบทบาทและขอบเขตหน้าที่ *": "Role Description & Scope *",
    "เลือกสิทธิ์การเข้าถึงโมดูลในระบบ *": "Select System Module Permissions *",
    "ชื่อกลุ่มผู้ใช้งาน (Team Name) *": "User Team Name *",
    "ประเภทผู้ใช้งาน: *": "User Type: *",
    ระบุรายละเอียดขอบเขตหน้าที่: "Enter role scope and responsibilities",
    ระบุคำอธิบายหน้าที่ของทีม: "Enter team description",
    "เช่น Station Operations": "e.g. Station Operations",
    จัดการข้อมูลผู้ใช้งาน: "Manage User Account",
    จัดการบทบาทและสิทธิ์: "Manage Role & Permissions",
    จัดการกลุ่มผู้ใช้งาน: "Manage User Team",
    แก้ไขข้อมูลบัญชีของฉัน: "Edit My Account",
    "Username / อีเมลบริษัท *": "Username / Company Email *",
    "Station Operations": "Station Operations",
    "Head of Platform": "Head of Platform",
    "Back Office Operator": "Back Office Operator",
    "ไม่สามารถเปิดใช้งานหรือแก้ไข Super Admin เพิ่มได้ (จำกัด 1 User ID)":
      "Cannot add or promote another Super Admin (1 User ID limit)",
    "Enterprise IAM · จำกัด Super Admin 1 User ID เท่านั้น และบริหารสิทธิ์รายโมดูล / กลุ่มทีม":
      "Enterprise IAM · Sole Super Admin 1 User ID Lock & Role/Team Governance",
    บัญชีส่วนตัวของฉัน: "My Profile",
    บัญชีของฉัน: "My Account",
    "+ เพิ่มผู้ใช้งานใหม่": "+ Add User",
    "ล็อก Super Admin 1 User ID": "Super Admin 1 ID Locked",
    "ค้นหาชื่อ, User ID, อีเมล, เบอร์โทร หรือชื่อทีม...":
      "Search name, User ID, email, phone, or team...",
    "ผู้ใช้งาน & User ID": "User & User ID",
    "ผู้ใช้งาน &amp; User ID": "User &amp; User ID",
    "ประเภท & บทบาท (Role)": "Type & Role",
    "ประเภท &amp; บทบาท (Role)": "Type &amp; Role",
    "สถานะ (Active)": "Status (Active)",
    "ผู้ดูแลหลัก (1 ID)": "Root Owner (1 ID)",
    "ดู / แก้ไข": "View / Edit",
    คำสั่งเพิ่มเติม: "More actions",
    ตัวกรองผู้ใช้งาน: "User filters",
    คำสั่งจัดการผู้ใช้งาน: "User account actions",
    ดูรายละเอียดบัญชี: "View Account Details",
    "แก้ไข / รีเซ็ตรหัสผ่าน": "Change / Reset Password",
    "เปลี่ยนกลุ่มทีม (Assign Team)": "Assign Team",
    ลบบัญชีผู้ใช้งาน: "Delete User Account",
    "จัดการบทบาทและสิทธิ์การเข้าถึง (Roles & Permissions)":
      "Roles & Permissions Governance",
    "จัดการบทบาทและสิทธิ์การเข้าถึง (Roles &amp; Permissions)":
      "Roles &amp; Permissions Governance",
    "บทบาทใหม่จำกัดสูงสุดไม่เกิน Operator Tier (สงวน Super Admin ไว้ที่ 1 User ID เท่านั้น)":
      "Custom roles are capped at Operator Tier (Super Admin is strictly reserved for 1 User ID)",
    "+ สร้างบทบาทใหม่": "+ Create Role",
    แก้ไขบทบาท: "Edit Role",
    "ตารางกำหนดสิทธิ์รายโมดูล 4 ระดับ (Granular Permission Matrix)":
      "4-Level Granular Permission Matrix",
    "คลิกเลือกบทบาทและปรับระดับสิทธิ์ได้ทันที: ไม่มีสิทธิ์ · ดูอย่างเดียว · เพิ่ม/แก้ไข · จัดการเต็มรูปแบบ":
      "Select a role to configure module access: None · View · Edit · Full Control",
    "โมดูลระบบ Charge X": "Charge X Module",
    "ระดับสิทธิ์ (Permission Level)": "Permission Level",
    "จัดการกลุ่มผู้ใช้งานระบบ (User Teams)": "User Teams Management",
    "กำหนดหัวหน้าทีม พื้นที่/สถานีที่รับผิดชอบ และเพิ่มหรือย้ายสมาชิกเข้าทีมพร้อมกัน":
      "Manage team leads, assigned stations & batch member assignments",
    "+ สร้างกลุ่มทีมใหม่": "+ Create Team",
    "หัวหน้าทีม: ": "Team Lead: ",
    "พื้นที่/สถานีรับผิดชอบ: ": "Stations / Scope: ",
    "รายชื่อ: ": "Members: ",
    จัดการสมาชิก: "Manage Members",
    "ตรวจสอบข้อมูลและกฎความปลอดภัย RBAC แบบ Real-Time (Super Admin จำกัด 1 User ID)":
      "Real-time RBAC validation & 1-ID Super Admin guard",
    "Username / อีเมล": "Username / Email",
    "Username / อีเมลบริษัท": "Username / Company Email",
    ประเภทผู้ใช้งาน: "User Type",
    "ชื่อ-นามสกุล": "Full Name",
    "ไม่สามารถกำหนดบทบาท Super Admin เพิ่มได้ เนื่องจากระบบจำกัดไว้ที่ 1 User ID เท่านั้น":
      "Cannot assign additional Super Admin role (strictly limited to 1 User ID)",
    "กำหนดสิทธิ์การเข้าถึงโมดูล (Permissions)": "Module Permissions",
    รหัสผ่านเริ่มต้น: "Initial Password",
    "ยืนยันรหัสผ่าน *": "Confirm Password *",
    "หมายเหตุ: หากไม่ต้องการเปลี่ยนรหัสผ่าน ให้เว้นว่างไว้ทั้งสองช่อง":
      "Note: Leave both fields blank to keep existing password",
    เปลี่ยนกลุ่มทีมผู้ใช้งาน: "Assign User Team",
    ยืนยันการลบบัญชีผู้ใช้งาน: "Confirm Delete User Account",
    ยืนยันลบบัญชี: "Confirm Delete",
    พิมพ์ชื่อหรืออีเมลของบัญชีนี้: "Type name or email of this account",
    เลือกด่วนรายโมดูล: "Quick Module Toggles",
    "กำหนดระดับสิทธิ์รายโมดูล (4 ระดับ)": "4-Level Module Permission Matrix",
    "หัวหน้าทีม (Team Lead)": "Team Lead",
    "เช่น กัญญา รัตนสุข": "e.g. Kanya Rattanasuk",
    "พื้นที่ / สถานีที่รับผิดชอบ": "Stations / Scope",
    "เช่น เมกา บางนา · กิ่งแก้ว กม.9": "e.g. Mega Bangna · King Kaew KM.9",
    "เลือกสมาชิกที่ต้องการให้อยู่ในกลุ่มทีมนี้ (สามารถเลือกและย้ายเข้าทีมพร้อมกันได้หลายคน)":
      "Select members to assign or move into this team (batch select)",
    "บัญชีส่วนตัวของฉัน (My Profile & Password)": "My Profile & Password",
    "บัญชีส่วนตัวของฉัน (My Profile &amp; Password)":
      "My Profile &amp; Password",
    "จัดการข้อมูลส่วนตัว รูปโปรไฟล์ และรหัสผ่านของบัญชีที่กำลังเข้าสู่ระบบ":
      "Manage your personal profile, avatar, and password",
    "สมาชิกแอป Charge X": "Charge X EV App Member",
    เปลี่ยนรหัสผ่านส่วนตัว: "Change Personal Password",
    "สลับสถานะบัญชี ": "Toggle account status for ",
    ผู้ใช้งานทั้งหมดในระบบ: "Total System Users",
    "โควตา Super Admin": "Super Admin Quota",
    โครงสร้างสิทธิ์และกลุ่มทีม: "Roles & Teams Structure",
    "กำหนดสิทธิ์ 4 ระดับรายโมดูล (RBAC)": "4-level granular module RBAC",
    จำกัดสิทธิ์เฉพาะโมดูลที่ได้รับมอบหมาย:
      "Scoped strictly to assigned modules",
    รายชื่อผู้ใช้งานทั้งหมด: "Users Directory",
    "บทบาทและสิทธิ์ (Roles)": "Roles & Permissions",
    "กลุ่มผู้ใช้งานระบบ (User Teams)": "User Teams",
    เลือกประเภทผู้ใช้งาน: "Filter by User Type",
    "เลือกบทบาท (Role)": "Filter by Role",
    เลือกสถานะบัญชี: "Filter by Status",
    "ประเภทผู้ใช้งาน: ทั้งหมด ▾": "User Type: All ▾",
    "บทบาท (Role): ทั้งหมด ▾": "Role: All ▾",
    "สถานะ: ทั้งหมด ▾": "Status: All ▾",
    ไม่มีสิทธิ์: "None",
    ดูอย่างเดียว: "View",
    "เพิ่ม/แก้ไข": "Edit",
    จัดการเต็มรูปแบบ: "Full Control",
    สร้างบทบาทผู้ใช้งานใหม่: "Create New Role",
    "Super Admin — สงวนสิทธิ์ 1 User ID เท่านั้น (ล็อกเต็มระบบ)":
      "Super Admin — Locked to 1 User ID (Full System)",
    "Operator Tier (จำกัดระดับสูงสุดไม่เกิน Operator)":
      "Operator Tier (Maximum allowed custom tier)",
    "จัดการกลุ่มทีม & สมาชิก (User Team)": "Manage Team & Members",
    "สร้างกลุ่มผู้ใช้งานใหม่ (User Team)": "Create User Team",
    "ข้อมูลทีม & หัวหน้าทีม": "Team Details & Lead",
    ยังไม่ได้ระบุหัวหน้าทีม: "Unassigned Team Lead",
    ทุกพื้นที่ที่รับผิดชอบ: "All Assigned Areas",
    ยังไม่มีสมาชิกในทีม: "No members in team",
    "ทุกสถานีและระบบกลาง (Full Network)": "Full Network & Central Platform",
    "โปรโมชัน คูปอง และสื่อสารลูกค้ารวมทุกสาขา":
      "Promotions, coupons & multi-site communications",
    "ม.รามฯ บางนา · เมกา บางนา · กิ่งแก้ว กม.9 · ลาซาล":
      "RU Bangna · Mega Bangna · King Kaew KM.9 · Lasalle",
    "สมาชิกแอปพลิเคชัน Charge X และลูกค้าองค์กร Fleet":
      "Charge X EV drivers & corporate fleet accounts",
    "สวรรยา ใจดี (Fleet Lead)": "Sawanya Jaidee (Fleet Lead)",
    "สวรรยา ใจดี": "Sawanya Jaidee",
    เว้นว่างไว้หากไม่ต้องการเปลี่ยนรหัสผ่าน:
      "Leave blank to keep existing password",
    กรอกรหัสผ่านเพื่อประเมินความปลอดภัย: "Enter password to evaluate strength",
    "ความแข็งแรง: ต่ำ": "Strength: Weak",
    "ความแข็งแรง: ปานกลาง": "Strength: Medium",
    "ความแข็งแรง: สูง (ผ่านเกณฑ์)": "Strength: Strong (Valid)",
    "✓ รหัสผ่านทั้งสองช่องตรงกัน": "✓ Passwords match",
    "✓ อีเมลองค์กรถูกต้องพร้อมใช้งาน": "✓ Valid company email",
    "✓ อีเมลถูกต้องพร้อมใช้งาน": "✓ Valid email address",
    กรุณาพิมพ์ชื่อผู้ใช้งานหรืออีเมลให้ตรงกับบัญชีที่ต้องการลบ:
      "Please type exact user name or email to confirm delete",
    "บทบาทต้องมีสิทธิ์อย่างน้อย 1 โมดูล": "Role must include at least 1 module",
    "สิทธิ์ของ Super Admin ถูกล็อกเต็มระบบ (1 User ID)":
      "Super Admin permissions are locked (1 User ID)",
    กรุณาเลือกกลุ่มผู้ใช้งาน: "Please select a user team",
    ไม่สามารถปรับสถานะบัญชีที่มีสิทธิ์สูงกว่าได้:
      "Cannot modify status of higher-rank accounts",
    " · ปัจจุบัน: ": " · Current: ",
    ผู้ใช้ทั่วไป: "Standard User",
    "สมาชิก VIP": "VIP Member",
    "องค์กร / Fleet": "Corporate / Fleet",
    "ตั้งค่าระบบ (Setting)": "Settings",
    "การตั้งค่าระบบและความปลอดภัย (Settings)":
      "System Configuration & Preferences",
    "จัดการภาพโปรไฟล์ รหัสผ่าน ภาษา Terms & Conditions Privacy Policy สิทธิ์ข้อมูล และหมวดหมู่":
      "Configure profile avatar, password, language, Terms & Conditions, Privacy Policy, permissions & categories",
    "ทั้งหมด (Settings)": "All Settings",
    "โปรไฟล์ & ภาษา": "Profile & Language",
    "สิทธิ์ข้อมูล (Permission)": "User Permissions",
    "หมวดหมู่ (Category)": "Categories",
    "ภาพโปรไฟล์ผู้ใช้งานระบบหลังบ้าน (Profile Picture)":
      "Back Office Profile Picture",
    "เลือกผู้ใช้งานที่ต้องการเปลี่ยนภาพโปรไฟล์ (เปลี่ยนได้ทั้งบัญชีตนเองและบัญชี Operator)":
      "Select user account to update avatar image",
    อัปโหลดภาพโปรไฟล์: "Upload Avatar",
    "พาธหรือ URL ภาพโปรไฟล์": "Avatar Path or URL",
    บันทึกภาพโปรไฟล์: "Save Avatar",
    เลือกภาพโปรไฟล์สำเร็จรูป: "Preset Avatars",
    "ชุดสีส้ม Charge X": "Charge X Orange",
    "ชุดสีเขียว Eco": "Eco Green",
    ชุดผู้ดูแลระบบ: "Platform Admin",
    ชุดเทคนิคสถานี: "Station Tech",
    อัปโหลดภาพโปรไฟล์เรียบร้อยแล้ว: "Profile avatar uploaded",
    บันทึกภาพโปรไฟล์เรียบร้อยแล้ว: "Profile avatar updated cleanly",
    รูปโปรไฟล์: "Profile photo",
    "แก้ไข Password ผู้ใช้งานระบบ (Password Settings)": "Update User Password",
    "ตั้งค่ารหัสผ่านใหม่ตามนโยบายความปลอดภัย 8+ ตัว (A–Z, a–z, 0–9 และสัญลักษณ์)":
      "Set new password meeting 5-rule security policy (8+ chars, A-Z, a-z, 0-9 & symbol)",
    เลือกบัญชีผู้ใช้งาน: "Target User Account",
    บันทึกรหัสผ่านผู้ใช้: "Update User Password",
    "ตั้งค่าภาษาของระบบ (Language Settings)": "System Language Settings",
    "เลือกรูปแบบภาษาของเมนูและการแสดงผลทั้งระบบ (ซิงค์กับแอปและ Back Office ทันที)":
      "Select UI display language (synced across app & Back Office)",
    "ภาษาไทย (Thai)": "Thai (TH)",
    "ภาษาอังกฤษ (English)": "English (EN)",
    เปลี่ยนภาษาเป็นภาษาไทยเรียบร้อยแล้ว: "Switched display language to Thai",
    เปลี่ยนภาษาเป็นภาษาอังกฤษเรียบร้อยแล้ว:
      "Switched display language to English",
    "ตั้งค่าข้อมูล Terms & Conditions": "Terms & Conditions Settings",
    "กำหนดหัวข้อ เวอร์ชัน วันที่มีผล และข้อกำหนดการให้บริการ (ซิงค์กับหน้า Privacy/Terms ในแอป)":
      "Edit title, version, effective date & legal clauses (synced to app)",
    "หัวข้อเอกสาร Terms": "Terms Document Title",
    "เวอร์ชัน Terms": "Terms Version",
    วันที่มีผลบังคับใช้: "Effective Date",
    "รายละเอียดข้อกำหนด (1 ข้อต่อ 1 บรรทัด รูปแบบ หัวข้อ :: เนื้อหา)":
      "Clauses (one per line as Heading :: Body)",
    "บันทึก Terms & Conditions": "Save Terms & Conditions",
    "บันทึกข้อมูล Terms & Conditions เรียบร้อยแล้ว":
      "Terms & Conditions saved & synced",
    "ตั้งค่าข้อมูล Privacy Policy": "Privacy Policy Settings",
    "กำหนดนโยบายความเป็นส่วนตัว การเก็บ/ใช้ข้อมูล PDPA และข้อมูลติดต่อ DPO (ซิงค์กับแอปทันที)":
      "Edit PDPA privacy clauses & DPO contact (synced live to app)",
    "หัวข้อเอกสาร Privacy Policy": "Privacy Policy Title",
    "เวอร์ชัน Privacy": "Privacy Version",
    "วันที่มีผล Privacy": "Privacy Effective Date",
    "ข้อมูลติดต่อ DPO": "DPO Contact Info",
    "บันทึก Privacy Policy": "Save Privacy Policy",
    "บันทึกข้อมูล Privacy Policy เรียบร้อยแล้ว":
      "Privacy Policy saved & synced",
    "กรุณากรอกข้อมูลหัวข้อ เวอร์ชัน และเนื้อหาของเอกสารให้ครบถ้วน":
      "Please enter complete document title, version, and clauses",
    "ตั้งค่าการกำหนดสิทธิ์การเข้าถึงข้อมูล (User Permission)":
      "Data Access & User Permission Settings",
    "กำหนดสิทธิ์การเข้าถึงข้อมูลและโมดูลสำหรับแต่ละ Role รวมถึงนโยบายความปลอดภัยระดับองค์กร":
      "Configure role module permissions & enterprise data access controls",
    นโยบายการเข้าถึงข้อมูลระบบ: "Data Access Controls",
    "กำหนดสิทธิ์โมดูลรายบทบาท (Role Permission Matrix)":
      "Role Module Permission Matrix",
    "อนุญาตให้ดูและแก้ไข Wallet สมาชิก (Payments)":
      "Access & Manage Member Wallets (Payments)",
    "อนุญาตให้ส่งออกข้อมูลรายงาน Excel / PDF":
      "Allow Excel / PDF Report Exports",
    "อนุญาตให้เข้าถึงบันทึกประวัติการเข้าใช้ระบบ (Access Logs)":
      "View System Access Audit Logs",
    "บังคับบัญชี Operator เข้าด้วย @chargex.co.th เท่านั้น":
      "Require @chargex.co.th Email for Operators",
    อนุญาตให้ผู้ใช้งานแก้ไขข้อมูลและภาพโปรไฟล์ตนเอง:
      "Allow Users to Edit Own Profile & Avatar",
    เปิดใช้งานสิทธิ์: "Enabled",
    ปิดสิทธิ์ชั่วคราว: "Disabled",
    อัปเดตนโยบายการเข้าถึงข้อมูลแล้ว: "Updated data access policy cleanly",
    "อัปเดตสิทธิ์การเข้าถึงของ Role แล้ว": "Updated Role permission cleanly",
    "ตั้งค่าหมวดหมู่ระบบ (Category Management)": "System Category Settings",
    "จัดการหมวดหมู่ข่าวสาร คูปอง/บริการ และสถานี (หมวดหมู่ที่เปิดใช้จะซิงค์ไปยังหน้าข่าวสารและคูปอง)":
      "Manage News, Coupon & Station categories (active categories sync across modules)",
    "+ เพิ่มหมวดหมู่": "+ Add Category",
    ทุกหมวดหมู่: "All Groups",
    "ข่าวสาร & แจ้งเตือน": "News & Alerts",
    "ข่าวสาร &amp; แจ้งเตือน": "News &amp; Alerts",
    "คูปอง & สิทธิประโยชน์": "Coupons & Perks",
    "คูปอง &amp; สิทธิประโยชน์": "Coupons &amp; Perks",
    "สถานี & หัวชาร์จ": "Stations & Chargers",
    "สถานี &amp; หัวชาร์จ": "Stations &amp; Chargers",
    ชื่อหมวดหมู่: "Category Name",
    กลุ่มหมวดหมู่: "Category Group",
    คำอธิบายหมวดหมู่: "Category Description",
    การซิงค์ระบบ: "Module Sync",
    ไม่พบหมวดหมู่ที่ตรงกับกลุ่มที่เลือก: "No categories match selected group",
    จัดการหมวดหมู่ระบบ: "Manage Category",
    เพิ่มหมวดหมู่ใหม่: "Add New Category",
    แก้ไขหมวดหมู่: "Edit Category",
    "ชื่อหมวดหมู่ *": "Category Name *",
    "เช่น โปรโมชันพิเศษ": "e.g. Flash Promotion",
    บันทึกหมวดหมู่: "Save Category",
    กรุณากรอกชื่อหมวดหมู่: "Please enter a category name",
    หมวดหมู่นี้มีในกลุ่มนี้อยู่แล้ว:
      "Category name already exists in this group",
    เพิ่มหมวดหมู่เรียบร้อยแล้ว: "Category created and synced",
    บันทึกการแก้ไขหมวดหมู่แล้ว: "Category updated cleanly",
    ลบหมวดหมู่แล้ว: "Category deleted",
    กู้คืนหมวดหมู่แล้ว: "Category restored",
    อัปเดตสถานะหมวดหมู่แล้ว: "Category status updated",
    ซิงค์หน้าข่าวสาร: "Synced to News",
    ซิงค์หน้าคูปอง: "Synced to Coupons",
    ซิงค์หน้าสถานี: "Synced to Stations",
    โปรโมชันและส่วนลดค่าชาร์จ: "Charging discounts & special offers",
    ข่าวเปิดสถานีใหม่และอัปเดต: "New station launches & updates",
    สิทธิประโยชน์แพ็กเกจรายเดือน: "Monthly membership plans & perks",
    "ชาร์จเร็ว DC ความเร็วสูง": "High-speed DC charging stations",
    "ข้อกำหนดการให้บริการ Charge X": "Charge X Terms of Service",
    "นโยบายความเป็นส่วนตัว Charge X (PDPA)": "Charge X Privacy Policy (PDPA)",
    อัปเดตและแจ้งเตือน: "Alerts & Updates",
    ภาพรวมการตั้งค่า: "Settings Overview",
    ตั้งค่าหมวดหมู่: "Category Settings",
    เปิดสิทธิ์โมดูล: "Grant Module",
    ปิดสิทธิ์โมดูล: "Revoke Module",
    ตัวอย่างรูปโปรไฟล์: "Avatar preview",
    "โปรไฟล์ &amp; ภาษา": "Profile &amp; Language",
    "1. การใช้บริการ": "1. Using the service",
    "ผู้ใช้ต้องมีอายุ 18 ปีขึ้นไป ให้ข้อมูลที่ถูกต้อง และใช้ตู้ชาร์จตามคำแนะนำที่ตู้และในแอป":
      "You must be 18 or older, provide accurate details, and follow charger instructions.",
    "2. ค่าบริการและการชำระเงิน": "2. Fees and payment",
    "ค่าบริการคิดตามพลังงานที่ได้รับ (kWh) ตามอัตราที่แสดงในแอปก่อนเริ่มชาร์จ ชำระผ่านกระเป๋าเงิน บัตร หรือช่องทางที่รองรับ":
      "Fees are calculated by energy delivered (kWh) as shown in-app via wallet or card.",
    "3. ค่าจอดเกินเวลา": "3. Idle fees",
    "คิด ฿5/นาที หลังตัดการชาร์จและให้เวลาย้ายรถอีก 5 นาทีแล้ว แต่รถยังจอดอยู่ที่ช่องชาร์จ":
      "THB 5/min applies after the 5-min grace period once charging ends.",
    "4. ยอดค้างชำระ": "4. Outstanding balances",
    "หากชำระไม่สำเร็จ ยอดจะถูกบันทึกเป็นยอดค้างชำระ และต้องชำระภายใน 24 ชม. ก่อนเริ่มชาร์จครั้งถัดไป":
      "Failed payments become overdue balance and must be settled within 24 hrs.",
    "1. ข้อมูลที่เราเก็บ": "1. Data we collect",
    "ชื่อ เบอร์โทรศัพท์ อีเมล ข้อมูลรถ ตำแหน่งที่ตั้ง (เมื่อคุณอนุญาต) ประวัติการชาร์จ และข้อมูลการชำระเงิน":
      "Name, phone, email, vehicle info, permitted location, charging history & payments.",
    "2. วัตถุประสงค์การใช้ข้อมูล": "2. How we use data",
    "เพื่อให้บริการชาร์จ เรียกเก็บค่าบริการ ออกใบเสร็จ ดูแลความปลอดภัย และส่งข่าวสารเมื่อยินยอม":
      "To deliver charging, billing, receipts, security & consented updates.",
    "3. สิทธิของเจ้าของข้อมูล (PDPA)": "3. PDPA Data Subject Rights",
    "มีสิทธิขอเข้าถึง ขอสำเนา แก้ไข ลบ และถอนความยินยอมได้ทุกเมื่อผ่านแอปหรือติดต่อ DPO":
      "Access, copy, correct, delete & withdraw consent anytime via app or DPO.",
    "จัดการภาพโปรไฟล์ รหัสผ่าน ภาษา Terms &amp; Conditions Privacy Policy สิทธิ์ข้อมูล และหมวดหมู่":
      "Configure profile avatar, password, language, Terms &amp; Conditions, Privacy Policy, permissions & categories",
    "ตั้งค่าข้อมูล Terms &amp; Conditions": "Terms &amp; Conditions Settings",
    "บันทึก Terms &amp; Conditions": "Save Terms &amp; Conditions",
    ระบุคำอธิบาย: "Enter description",
    "ค้นหาสถานี, สมาชิก, คูปอง...": "Search stations, members, coupons...",
    "ภาพรวมระบบและสถานี (System Health)": "System Health & Stations",
    "สัดส่วนออนไลน์ & ปริมาณชาร์จ (kWh)": "Online rate & energy share (kWh)",
    "สัดส่วนออนไลน์ &amp; ปริมาณชาร์จ (kWh)":
      "Online rate &amp; energy share (kWh)",
    "สรุปยอดระบบ & รอบการทำงาน": "System Snapshot & Activity",
    "สรุปยอดระบบ &amp; รอบการทำงาน": "System Snapshot & Activity",
    ข่าวสารและการแจ้งเตือนล่าสุด: "Latest News & Alerts",
    ผู้ใช้งานและสมาชิกเด่น: "Featured Users & Drivers",
    "ดูทั้งหมด →": "View all →",
    "ตรวจสอบสถานีทั้งหมด →": "Inspect all stations →",
    สมาชิกใช้งานช่วงนี้: "Active Members",
    สถานีพร้อมให้บริการ: "Operational Rate",
    ภาพรวมการชาร์จทั้งหมด: "Total Charging Overview",
    สลับภาษา: "Toggle Language",
    ไปยังข่าวสารและแจ้งเตือน: "Open Notifications & News",
    ตั้งค่าระบบหรือรหัสผ่าน: "Settings or Password",
    แก้ไขโปรไฟล์บัญชีของฉัน: "Edit My Account",
    "ค้นหา / Filter สถานี, สมาชิก, คูปอง...":
      "Filter stations, members, coupons...",
    ล้างคำค้นหา: "Clear search",
    เปลี่ยนภาษา: "Change language",
    "ไทย (TH)": "Thai (TH)",
    "เงินคงเหลือในระบบ (Wallet)": "System Balance (Wallet)",
    "ยอดตัดไม่ได้ / ค้างชำระ": "Uncollected / Overdue",
    "ดูรายละเอียดสถานี →": "View station details →",
    "ดูรายชื่อสมาชิกทั้งหมด →": "View all members →",
    "ยอดรวมพลังงาน & คาร์บอน": "Total Energy & Carbon",
    "ยอดรวมพลังงาน &amp; คาร์บอน": "Total Energy &amp; Carbon",
    อัตราการเติบโตของการใช้งาน: "Usage Growth Rate",
    รายได้รวมช่วงนี้: "Total Period Revenue",
    ความพร้อมใช้งานระบบ: "System Availability",
    "ภาพรวมสถานีชาร์จ & สมาชิก (System Health & Directory Preview)":
      "System Health & Directory Preview",
    "ภาพรวมสถานีชาร์จ &amp; สมาชิก (System Health &amp; Directory Preview)":
      "System Health &amp; Directory Preview",
    ค้างชำระ: "Overdue",
    แนวโน้มและเปรียบเทียบการใช้งาน: "Usage Trends & Comparison",
    "ยอดรวมการชาร์จ & สิ่งแวดล้อม": "Charging & Environmental Impact",
    "ยอดรวมการชาร์จ &amp; สิ่งแวดล้อม": "Charging &amp; Environmental Impact",
    พลังงานรวมทั้งหมด: "Total Energy Delivered",
    ลดการปล่อยคาร์บอน: "CO₂ Emissions Saved",
    "สัดส่วนความพร้อมสถานี & สมาชิก (System Health)":
      "Station & User Readiness (System Health)",
    "สัดส่วนความพร้อมสถานี &amp; สมาชิก (System Health)":
      "Station &amp; User Readiness (System Health)",
    สมาชิกใช้งาน: "Active Users",
    สรุปสถานะสถานีชาร์จทั้งหมด: "Charging Station Summary",
    รายชื่อสมาชิกในระบบ: "Registered Members",
    ชื่อสถานี: "Station Name",
    "ดูสถานีทั้งหมด →": "View all stations →",
    "รถ EV": "EV Vehicle",
    "ตรวจสอบสถานะบัญชี ยอดคงเหลือใน Wallet และรายการค้างตัดชำระทั้งหมดในระบบ":
      "Review account status, Wallet balances, and all uncollected charges",
    ข้อมูลติดต่อ: "Contact",
    "รถยนต์ EV": "EV Model",
    "การใช้งาน (ครั้ง / kWh)": "Usage (Sessions / kWh)",
    ยอดค้างตัดไม่ได้: "Uncollected",
    "สมาชิก / วันที่สมัคร": "Member / Joined Date",
    หน้าก่อนหน้า: "Previous page",
    หน้าถัดไป: "Next page",
    "แจ้งเตือนและข่าวสาร (Notifications)": "Notifications & News",
    "ค้นหาแจ้งเตือน...": "Search notifications...",
    "สร้าง แก้ไข ตั้งเวลาเผยแพร่ข่าวสารล่วงหน้า และจัดการสถานะการแจ้งเตือนถึงสมาชิก":
      "Create, edit, schedule announcements in advance, and manage member notification states",
    "+ สร้างการแจ้งเตือนใหม่": "+ New Notification",
    สร้างการแจ้งเตือนใหม่: "New Notification",
    "พาดหัว (Headline)": "Headline",
    "คำอธิบาย (Description)": "Description",
    "หมวดหมู่ (Category)": "Category",
    รูปแบบการเผยแพร่: "Publishing Mode",
    เผยแพร่ทันที: "Publish Now",
    ยังไม่เผยแพร่: "Not Published",
    กำหนดเวลาเผยแพร่: "Schedule Publish Time",
    กำหนดเวลา: "Schedule",
    "ตัวอย่างการแจ้งเตือนบนมือถือ (Live Mobile Preview)": "Live Mobile Preview",
    "ตัวอย่างพาดหัวการแจ้งเตือน...": "Notification headline preview...",
    "พิมพ์คำอธิบายเพื่อดูตัวอย่างข้อความบนมือถือ...":
      "Type description to preview mobile push message...",
    ตอนนี้: "Now",
    บันทึกการตั้งค่า: "Save Settings",
    "ส่งออกรายงานการแจ้งเตือน Excel (.xls) เรียบร้อยแล้ว":
      "Notifications Excel (.xls) exported cleanly",
    "เปิดหน้าต่างส่งออก PDF การแจ้งเตือนเรียบร้อยแล้ว":
      "Notifications PDF print window opened cleanly",
    สิทธิ์การส่งออกข้อมูลถูกปิดไว้ในตั้งค่าระบบ:
      "Data export is disabled in System Settings",
    "จัดลำดับหน้าสอนใช้งาน ตั้งค่าการแสดงซ้ำในแอป และทดสอบสไลด์โชว์ผ่านจอมือถือจำลอง":
      "Reorder slides, configure in-app replay, and test the live mobile carousel",
    ทดสอบแสดงสไลด์โชว์: "Preview Slideshow",
    "+ เพิ่มหน้าใหม่": "+ Add Slide",
    แสดงซ้ำอีกรอบด้วยการกดผ่านเมนูตั้งค่าในแอป:
      "Allow Tutorial Replay from App Settings",
    "เปิดให้สมาชิกเรียกดูหน้าสอนใช้งานซ้ำได้ตลอดเวลาจากเมนูตั้งค่า โปรไฟล์ และช่วยเหลือ":
      "Allow drivers to replay the app walkthrough anytime from Settings, Profile, and Help",
    ลำดับหน้าสอนใช้งานในแอป: "In-App Tutorial Slide Sequence",
    "ลากที่ไอคอน ⠿ เพื่อสลับลำดับหน้า หรือคลิกการ์ดเพื่อแก้ไขในแผงด้านขวา":
      "Drag ⠿ handle to reorder slides or click a card to edit in the drawer",
    ลากเพื่อสลับลำดับหน้า: "Drag to reorder slide",
    ดูตัวอย่างสไลด์นี้: "Preview this slide",
    "ตัวอย่างหน้าจอมือถือ (Live Preview)": "Mobile Screen Preview (Live)",
    ดูตัวอย่างบนแอปพลิเคชัน: "App Screen Preview",
    "ทดสอบแสดงสไลด์โชว์บนสมาร์ทโฟน (Carousel Preview)":
      "Mobile Carousel Preview",
    สไลด์ก่อนหน้า: "Previous Slide",
    สไลด์ถัดไป: "Next Slide",
    เปิดใช้งานอยู่: "Replay Enabled",
    ปิดชั่วคราว: "Disabled",
    ปิดการแสดงซ้ำ: "Replay Disabled",
    "ตัวอย่างหัวข้อหน้าสอนใช้งาน...": "Tutorial slide title preview...",
    "พิมพ์คำอธิบายเพื่อให้แสดงตัวอย่างหน้าจอมือถือแบบเรียลไทม์...":
      "Enter description for live mobile preview...",
    เปิดแสดงซ้ำการสอนใช้งานผ่านเมนูตั้งค่าในแอปแล้ว:
      "In-app tutorial replay enabled cleanly",
    ปิดแสดงซ้ำการสอนใช้งานผ่านเมนูตั้งค่าชั่วคราวแล้ว:
      "In-app tutorial replay temporarily disabled",
    การสอนใช้งาน: "Tutorial",
    ข้าม: "Skip",
    โปรโมชันและสิทธิพิเศษ: "Promotions and perks",
    ปัดซ้ายขวาเพื่อดูโปรโมชันล่าสุดและสิทธิพิเศษสำหรับสมาชิก:
      "Swipe left or right to see the latest promotions and member perks.",
    ค้นหาสถานีหรือสแกนชาร์จ: "Find a station or scan to charge",
    "กดค้นหาสถานีเพื่อดูแผนที่จุดชาร์จใกล้คุณ หรือกดสแกนเพื่อเริ่มชาร์จทันที":
      "Tap Find station to see chargers near you on the map, or tap Scan to start charging right away.",
    ปุ่มการชาร์จ: "Charge button",
    "ปุ่มตรงกลางเมนูด้านล่าง กดแล้วเปิดกล้องสแกน QR ที่ตู้ชาร์จได้เลย":
      "The middle button in the bottom bar opens the camera to scan the QR code on the charger.",
    แจ้งเตือนและโหมดมืด: "Alerts and dark mode",
    "ดูการแจ้งเตือนสถานะการชาร์จ และสลับโหมดสว่าง/มืดได้จากมุมขวาบน":
      "See charging alerts and switch light/dark mode from the top right.",
    ไฮไลต์โปรโมชัน: "Highlight Promo",
    "ไฮไลต์ค้นหาสถานี / สแกน": "Highlight Find / Scan",
    ไฮไลต์ปุ่มการชาร์จ: "Highlight Charge FAB",
    "ไฮไลต์แจ้งเตือน & โหมดมืด": "Highlight Alerts / Dark",
    "หน้าจอฝั่งผู้ใช้ (Coach Marks)": "User Screen (Coach Marks)",
    หน้าจอฝั่งผู้ใช้: "User Screen",
    "แสดงผลจริง (Coach Marks)": "Live Guide Preview (Coach Marks)",
    "แสดงผลจริงจากหน้า Guide พร้อมจุดไฮไลต์แต่ละขั้น":
      "Live Guide screen preview with step spotlights",
    "เปิดเต็มจอ ↗": "Full View ↗",
    ตัวอย่างหน้าสอนใช้งานฝั่งผู้ใช้: "User-facing tutorial screen preview",
    ตัวอย่างสดหน้าสอนใช้งานฝั่งผู้ใช้:
      "Live user-facing tutorial editor preview",
    ทดสอบหน้าสอนใช้งานฝั่งผู้ใช้จริง:
      "Interactive user-facing tutorial preview",
    "ลากที่ไอคอน ⠿ เพื่อสลับลำดับ หรือคลิกการ์ดเพื่อดูจุดไฮไลต์ในจอมือถือ":
      "Drag ⠿ handle to reorder slides or click a slide to preview its spotlight",
    "ซิงค์สดกับหน้าจอฝั่งผู้ใช้ (Guide)": "Live-synced with user Guide screen",
    "จุดไฮไลต์ / รูปภาพประกอบ": "Spotlight & Image",
    "ตัวอย่างขนาดย่อ ": "Thumbnail ",
    "รหัสส่วนลด &amp; ชื่อโปรโมชั่น": "Code &amp; Campaign",
    "รหัสส่วนลด & ชื่อโปรโมชั่น": "Code & Campaign",
    "รหัส &amp; โปรโมชั่น": "Code &amp; Promo",
    "รหัส & โปรโมชั่น": "Code & Promo",
    "ประเภท &amp; ส่วนลด": "Type &amp; Discount",
    "ประเภท & ส่วนลด": "Type & Discount",
    หมวดหมู่การใช้งาน: "Category",
    หมวดหมู่: "Category",
    ยอดขั้นต่ำ: "Min. Spend",
    ขั้นต่ำ: "Min.",
    "โควต้าคงเหลือ &amp; จำกัด/คน": "Quota &amp; Limit",
    "โควต้าคงเหลือ & จำกัด/คน": "Quota & Limit",
    "โควต้า &amp; จำกัด/คน": "Quota &amp; Limit",
    "โควต้า & จำกัด/คน": "Quota & Limit",
    "ระยะเวลา &amp; การใช้ร่วมกัน": "Dates &amp; Stacking",
    "ระยะเวลา & การใช้ร่วมกัน": "Dates & Stacking",
    "ช่วงวันที่ &amp; การใช้ร่วม": "Dates &amp; Stacking",
    "ช่วงวันที่ & การใช้ร่วม": "Dates & Stacking",
    "สถานะ &amp; จัดการ": "Status &amp; Actions",
    "สถานะ & จัดการ": "Status & Actions",
    ผู้ใช้ใหม่: "New User",
    ไม่ร่วมกับคูปองอื่น: "Non-stackable",
    "สูงสุด ฿": "Max ฿",
    แก้ไขคูปอง: "Edit Coupon",
    ลบคูปอง: "Delete Coupon",
    "ตั้งค่ารหัสส่วนลด โควต้า และเงื่อนไขสำหรับสมาชิก Charge X":
      "Configure discount rules, quotas & eligibility for Charge X",
    "ตั้งค่าโควต้าและระยะเวลา (Quota Control)":
      "Quota & Schedule (Quota Control)",
    "หากเป็นโปรโมชั่นสำหรับผู้ใช้ใหม่ต้องเลือกช่องนี้ (ป้องกันการตั้งค่าผิดกลุ่มผู้ใช้)":
      "Check this option for new-user-only promotions to prevent eligibility mistakes",
    "แสดงและจัดการรหัสส่วนลด ประเภทคูปอง โควตา วันใช้งาน และเงื่อนไขผู้ใช้ใหม่ (ซิงค์กับแอปอัตโนมัติ)":
      "View & manage discount codes, types, quotas, dates & new-user eligibility (synced live)",
    "รายการชำระเงิน &amp; หลักฐาน": "Transactions &amp; Slips",
    "รายการชำระเงิน & หลักฐาน": "Transactions & Slips",
    "ตรวจสอบการโอนจาก Payment Gateway": "Gateway Settlement",
    "กระเป๋าเงินผู้ใช้ (User Role)": "User Wallets (Role Policy)",
    "รหัสรายการ / วันที่": "Transaction / Date",
    "ผู้ใช้งาน / รถยนต์ EV": "Member / EV",
    "ประเภท &amp; ช่องทาง": "Type &amp; Channel",
    "ประเภท & ช่องทาง": "Type & Channel",
    จำนวนเงิน: "Amount",
    "สลิป (JPEG/PNG)": "Slip (JPEG/PNG)",
    "เอกสาร &amp; จัดการ": "Docs &amp; Actions",
    "เอกสาร & จัดการ": "Docs & Actions",
    "✓ ดูสลิป": "✓ View Slip",
    "+ อัปโหลด / ตรวจสลิป": "+ Upload / Verify Slip",
    "แนบสลิป / ตรวจยอด": "Attach / Check Slip",
    "อัปโหลด / แนบสลิป": "Upload / Attach Slip",
    "ออกใบแจ้งหนี้ (Invoice)": "Issue Invoice",
    "ใบเสร็จรับเงิน / ใบกำกับภาษี": "Receipt / Tax Invoice",
    "แก้ไขข้อมูล &amp; เปลี่ยนสถานะ": "Edit &amp; Change Status",
    "แก้ไขข้อมูล & เปลี่ยนสถานะ": "Edit & Change Status",
    รายละเอียดเพิ่มเติม: "More actions",
    ต้องตรวจสอบ: "Review",
    "เฉพาะ Super Admin": "Super Admin Only",
    "ค้นหารหัส, ผู้ใช้, ช่องทาง...": "Search ID, user, or channel...",
    "ค้นหารหัส, ผู้ใช้, ช่องทาง (Super Admin)...":
      "Search ID, user, or channel (Super Admin)...",
    "รอบโอน / Batch ID": "Settlement / Batch ID",
    "Payment Gateway · ปลายทาง": "Payment Gateway · Ref",
    "Payment Gateway · บัญชีปลายทาง": "Payment Gateway · Bank Ref",
    "ยอดรวม (Gross)": "Gross",
    "ค่าธรรมเนียม (Fee)": "Fee",
    "โอนสุทธิ (Net)": "Net",
    "โอนสุทธิเข้าบริษัท (Net)": "Net Settlement",
    "ยอดคงเหลือใน Wallet": "Wallet Balance",
    ยอดค้างตัดไม่ได้: "Uncollected",
    รายการใหม่: "New Record",
    " บัญชี": " accounts",
    "ตรงยอด ": "Matched ",
    "ระงับ ": "Susp. ",
    "การจัดการสถานีชาร์จไฟฟ้ารถยนต์ (Station Management)":
      "EV Station Management",
    "บริหารข้อมูลโครงสร้างพื้นฐาน พิกัดแผนที่ ผู้ดูแลพื้นที่ สถิติเหตุขัดข้อง และส่งออกรายงาน":
      "Manage station master data, GPS pins, area PICs, incident logs & reports",
    "ส่งออก Excel (.xls)": "Export Excel (.xls)",
    "+ เพิ่มสถานีชาร์จใหม่": "+ Add New Station",
    "แก้ไข & จัดการตู้ชาร์จ": "Edit & Manage Units",
    "แก้ไข &amp; จัดการตู้ชาร์จ": "Edit &amp; Manage Units",
    สลับโหมดบำรุงรักษา: "Switch to Maintenance",
    เปิดให้บริการปกติ: "Set Operational",
    "เปิด Google Maps ↗": "Open Google Maps ↗",
    ลบสถานีชาร์จ: "Delete Station",
    ยืนยันการลบสถานีชาร์จ: "Confirm Station Deletion",
    ยืนยันลบสถานี: "Confirm Delete",
    "ข้อมูลสถานีและรายการตู้ชาร์จที่ผูกอยู่จะถูกนำออกจากรายการ (สามารถกดกู้คืนทันทีผ่านปุ่ม Undo หลังลบได้)":
      "Station profile and attached charger units will be removed from the active list (you can restore immediately via Undo).",
    "Live Stream · ซิงค์ทุก 5 วินาที": "Live Stream · 5s Sync",
    "ค้นหาสถานี, ตู้ชาร์จ, สมาชิก, IP...": "Search station, unit, user, IP...",
    วันนี้: "Today",
    "7 วัน": "7 Days",
    เดือนนี้: "This Month",
    "ตัวกรองที่เลือก:": "Active Filters:",
    "เลือกประเภทหัวชาร์จ (เลือกได้หลายค่า)":
      "Select Connector Types (Multi-select)",
    "เลือกรอบเวลา (เลือกได้หลายค่า)": "Select Time Slots (Multi-select)",
    "เลือกสถานีชาร์จ (เลือกได้หลายค่า)": "Select Stations (Multi-select)",
    "เลือกกลุ่มสิทธิ์ / User Role": "Select Roles / User Roles",
    "ดูรวม (5 หมวด)": "All Views (5)",
    "1. ยอดใช้งานเชิงวิเคราะห์": "1. Usage Analytics",
    "2. ข้อมูลผู้ใช้งาน": "2. Users Report",
    "3. การเข้าใช้งานระบบ": "3. System Audit Log",
    "4. สถานีชาร์จไฟฟ้า": "4. Station Report",
    "5. ตู้ชาร์จทั้งหมด": "5. All Chargers",
    "1.1 ยอดใช้งานแยกตามประเภทของหัวชาร์จ": "1.1 Usage by Connector Type",
    "1.2 ยอดใช้งานแยกตามรอบเวลา (Time Slot)": "1.2 Usage by Time Slot",
    "1.3 ยอดใช้งานแยกตามสถานีชาร์จไฟฟ้า": "1.3 Usage by Station",
    "เรียงลำดับตามปริมาณพลังงาน (kWh) และรายได้ต่อสาขา":
      "Ranked by energy delivered (kWh) and revenue per site",
    "1.4 ยอดใช้งานแยกตามตู้ชาร์จไฟฟ้า (Top Units)":
      "1.4 Usage by Charger Unit (Top Units)",
    จัดอันดับตู้ชาร์จที่มีปริมาณการใช้พลังงานสูงสุด:
      "Top charger units ranked by cumulative energy",
    รวมทุกประเภทหัวชาร์จ: "All Connectors Total",
    "สัดส่วน 100%": "Share 100%",
    "รหัสตู้ / หัวชาร์จ": "Unit / Connector",
    รหัสตู้: "Unit",
    ครั้ง: "Sessions",
    พลังงาน: "Energy",
    ยอดใช้งาน: "Usage",
    "ตู้ / หัวชาร์จ": "Units / Bays",
    รายได้: "Revenue",
    "ข้อมูลสมาชิก บทบาทสิทธิ์ User Role สถานะ Wallet ยอดคงเหลือ และยอดค้างชำระ":
      "Member profiles, User Roles, Wallet status, balances & uncollected overdue",
    "รายงานการเข้าใช้งานระบบ (System Access & Audit Report)":
      "System Access & Audit Report",
    "รายงานการเข้าใช้งานระบบ (System Access &amp; Audit Report)":
      "System Access &amp; Audit Report",
    "บันทึกความปลอดภัย การเข้าสู่ระบบ ออกจากระบบ และการปฏิเสธสิทธิ์แบบ Real-Time":
      "Real-time login, logout & unauthorized access audit trail",
    "ซิงค์ข้อมูลสถานี เจ้าของ พิกัด Google Maps ผู้ดูแลพื้นที่ Uptime และสถิติขัดข้อง":
      "Synced stations, owners, Google Maps GPS, area PICs, uptime & fault logs",
    "Uptime & ขัดข้อง": "Uptime & Faults",
    "Uptime &amp; ขัดข้อง": "Uptime &amp; Faults",
    "แสดงตู้ชาร์จทุกเครื่องในเครือข่าย กำลังไฟ ประเภทหัวชาร์จ โหลด Real Time และประวัติขัดข้อง":
      "All network charger units, power ratings, connectors, live loads & fault logs",
    "หัวชาร์จ: ทั้งหมด ▾": "Connector: All ▾",
    "รอบเวลา: ทั้งหมด ▾": "Time Slot: All ▾",
    "กลุ่มสิทธิ์: ทั้งหมด ▾": "Role: All ▾",
    "ค้นหาสถานี, เจ้าของ, ผู้ดูแล, เขต...":
      "Search station, owner, PIC, area...",
    "เจ้าของ / พื้นที่:": "Owner / Zone:",
    ทุกเจ้าของพื้นที่: "All Owners",
    "Charge X ลงทุนเอง": "Charge X Owned",
    "ห้าง & ศูนย์ประชุม": "Malls & Venues",
    ฮับพาร์ทเนอร์: "Partner Hubs",
    มุมมองตาราง: "Table View",
    มุมมองแผนที่: "Map View",
    "รูปภาพ & ชื่อสถานี": "Station & Photo",
    "รูปภาพ &amp; ชื่อสถานี": "Station &amp; Photo",
    "เจ้าของ & สัญญา": "Owner & Contract",
    "เจ้าของ &amp; สัญญา": "Owner &amp; Contract",
    "ที่อยู่ & พิกัด Maps": "Address & Maps GPS",
    "ที่อยู่ &amp; พิกัด Maps": "Address &amp; Maps GPS",
    "ตู้ & หัวชาร์จรวม": "Total Units & Bays",
    สถานะการเชื่อมต่อ: "Connection Status",
    สถิติแจ้งขัดข้องสะสม: "Total Faults",
    ต้องติดตาม: "Monitor",
    "ลงทุนเอง 100%": "100% Direct Owned",
    "เช่าพื้นที่ / Partner": "Leased / Partner",
    คัดลอก: "Copy",
    เมนูสถานี: "Station menu",
    ปกติ: "Normal",
    "ขัดข้อง 3+ ครั้ง": "3+ Faults",
    "เจ้าของ:": "Owner:",
    "ที่อยู่:": "Address:",
    "เปิด Google Maps ↗": "Google Maps ↗",
    "คัดลอก GPS": "Copy GPS",
    "ผู้ดูแลพื้นที่:": "Area PIC:",
    ผู้ดูแลพื้นที่: "Area PIC",
    "ตู้ชาร์จ:": "Chargers:",
    ตู้ชาร์จ: "Chargers",
    "สถิติขัดข้อง:": "Faults:",
    สถิติขัดข้อง: "Fault Stats",
    จำนวนตู้ชาร์จ: "Charger Units",
    "เปิด Slide-Over Inspector แก้ไขสถานี →": "Open Slide-Over Inspector →",
    "1. ทั่วไป & เจ้าของ": "1. General & Owner",
    "2. ที่ตั้ง & พิกัด Maps": "2. Location & Maps Pin",
    "3. ผู้ดูแล & ตู้ชาร์จ": "3. PIC & Charger Units",
    "4. สถิติเหตุขัดข้อง": "4. Incident Analytics",
    "รูปสถานีชาร์จ (ลากวางไฟล์ หรือเลือกจากเครื่อง)":
      "Station Photo (Drag & Drop or Upload)",
    "URL รูปสถานี": "Station Photo URL",
    "ชื่อสถานี (ไทย) *": "Station Name (TH) *",
    "ชื่อสถานี (English)": "Station Name (EN)",
    "เจ้าของสถานี (Station Owner) *": "Station Owner *",
    เลขผู้เสียภาษีเจ้าของ: "Owner Tax ID",
    "รูปแบบสัญญา / การลงทุน": "Contract Type",
    สถานะเปิดให้บริการ: "Operational Status",
    เปิดให้บริการ: "Operational",
    "ที่อยู่สถานีฉบับเต็ม *": "Full Station Address *",
    "เช่น เขตบางนา · เปิด 24 ชม.": "e.g. Bang Na · Open 24h",
    "เปิด 24 ชม.": "Open 24h",
    "เช่น 15 พ.ย. 2569": "e.g. 15 Nov 2026",
    "150 kW DC · 2 หัว": "150 kW DC · 2 Bays",
    "โซน / เขตพื้นที่สรุป": "District / Zone",
    "ปักหมุดพิกัดบนแผนที่ (คลิกบนพื้นที่เพื่อย้ายหมุด)":
      "Interactive Pin Picker (Click map to pin)",
    "ทดสอบเปิด Google Maps ↗": "Test Google Maps ↗",
    "พิกัดด่วน:": "Quick Pins:",
    "บางนา P3": "Bangna P3",
    "รามฯ บางนา": "RU Bangna",
    "พระราม 9": "Rama 9",
    "กิ่งแก้ว กม.9": "King Kaew KM.9",
    "ผู้ดูแลสถานีประจำพื้นที่ *": "Area Site PIC *",
    "ช่องทางติดต่อ (โทร / LINE / อีเมล) *":
      "PIC Contact (Phone / LINE / Email) *",
    จำนวนหัวชาร์จ: "Total Bays",
    "กำลังไฟหลัก / สเปค": "Power Rating / Spec",
    เวลาทำการ: "Operating Hours",
    "รายการตู้ชาร์จประจำสถานี (Charger Units)": "Station Charger Units",
    "รหัสเครื่อง เช่น เครื่อง #6099": "Unit ID e.g. Unit #6099",
    "+ เพิ่มตู้": "+ Add Unit",
    "กราฟสรุปเหตุขัดข้องรายเดือน & ค่าสถิติ":
      "Monthly Incidents & MTTR Summary",
    "กราฟสรุปเหตุขัดข้องรายเดือน &amp; ค่าสถิติ":
      "Monthly Incidents &amp; MTTR Summary",
    "MTTR เฉลี่ย ~32 นาที": "Avg MTTR ~32 mins",
    "จำนวนขัดข้องสะสม (ครั้ง)": "Total Fault Count",
    สรุปอาการขัดข้องล่าสุด: "Latest Incident Summary",
    "ประวัติการแจ้งเหตุขัดข้อง / งานซ่อมบำรุง": "Incident & Maintenance Log",
    "ยังไม่มีบันทึกเหตุขัดข้องย้อนหลัง (สถานีทำงานปกติ 100%)":
      "No historical incidents (100% healthy operation)",
    "ระบุอาการขัดข้องใหม่เพื่อบันทึก...": "Describe new incident to log...",
    "+ บันทึกเหตุ": "+ Log Incident",
    เปิดใช้งาน: "Enable",
    กำลังดำเนินการ: "In Progress",
    แก้ไขแล้ว: "Resolved",
    ไม่พบสถานี: "No station",
    ตั้งสถานีเข้าสู่โหมดบำรุงรักษาแล้ว: "Station switched to maintenance mode",
    เปิดให้บริการสถานีตามปกติแล้ว: "Station set to operational status",
    "คัดลอกพิกัด GPS แล้ว: ": "Copied GPS coordinates: ",
    เพิ่มตู้ชาร์จเข้าสถานีแล้ว: "Added charger unit to station",
    บันทึกเหตุขัดข้องของสถานีแล้ว: "Station incident logged cleanly",
    "ต้องมีตู้ชาร์จอย่างน้อย 1 ตู้ต่อสถานี":
      "Station must have at least 1 charger unit",
    "ก.ค.": "Jul",
    "ส.ค.": "Aug",
    "ก.ย.": "Sep",
    "ต.ค.": "Oct",
    "พ.ย.": "Nov",
    "เครื่อง #": "Unit #",
    "จัดการโปรไฟล์ ภาษา รหัสผ่าน ข้อกำหนดกฎหมาย สิทธิ์การเข้าถึง และหมวดหมู่ระบบแบบรวมศูนย์":
      "Manage profile, language, password, legal docs, permissions, and categories in one place",
    "หมวดหมู่การตั้งค่า": "Settings Categories",
    "โปรไฟล์ & ภาษา": "Profile & Language",
    "ภาพโปรไฟล์และภาษาของระบบ": "Avatar studio & system language",
    "รูปภาพและภาษาของระบบ": "Avatar & system language",
    "รหัสผ่านและเกณฑ์ 5 ข้อ": "Password & 5-rule policy",
    "Terms & PDPA พรีวิวมือถือ": "T&C, PDPA & mobile preview",
    "นโยบายกลางและ 10 โมดูล": "Policies & 10-module matrix",
    "หมวดหมู่ระบบ": "System Categories",
    "ความพร้อมระบบ": "System Governance",
    "5 หมวดหลัก · ซิงค์เรียลไทม์": "5 Modules · Real-time Sync",
    "ภาพโปรไฟล์จะซิงค์ไปยังเมนูและบัญชีผู้ดูแลทันที":
      "Profile photo syncs cleanly across header and admin account",
    "แสดงเมนู รายงาน และเอกสารเป็นภาษาไทย":
      "Display menus, reports, and docs in Thai",
    "ซิงค์ภาษาทั้ง Back Office และแอป Charge X":
      "Sync language across Back Office & Charge X app",
    "เปลี่ยนภาษาเฉพาะหน้าจอ Back Office นี้":
      "Change language for this Back Office session only",
    "ต้องตรงกับช่องด้านซ้าย": "Must match new password",
    "บัญชี": "Profile",
    "ความปลอดภัยและรหัสผ่าน": "Security & Password",
    "เปลี่ยนรหัสผ่านและเกณฑ์ปลอดภัย": "Password policy & reset",
    "ข้อกำหนดและนโยบาย": "Terms & Privacy Policy",
    "Terms & PDPA พร้อมพรีวิวมือถือ": "T&C, PDPA & mobile preview",
    "สิทธิ์การเข้าถึงข้อมูล": "Data Permissions",
    "นโยบายกลางและตาราง 10 โมดูล": "Global rules & 10-module matrix",
    "หมวดหมู่ระบบ (Categories)": "System Categories",
    "ข่าวสาร คูปอง และสถานีชาร์จ": "News, coupons & station tags",
    "จัดการรูปประจำตัวผ่าน Visual Avatar Studio (อัปโหลดไฟล์หรือเลือกชุดสีมาตรฐาน)":
      "Manage profile photo via Visual Avatar Studio (upload or pick a corporate preset)",
    "ลากไฟล์รูปภาพมาวางที่นี่ หรือเลือกไฟล์จากเครื่อง (รองรับ JPG, PNG, WebP ไม่เกิน 2 MB)":
      "Drag & drop an image here or browse (JPG, PNG, WebP up to 2 MB)",
    "ระบุลิงก์ URL ภาพโปรไฟล์ภายนอก เช่น https://...":
      "Enter external avatar URL e.g. https://...",
    "เลือกภาพโปรไฟล์มาตรฐานองค์กร (Corporate Presets)":
      "Corporate Avatar Presets",
    " · บัญชีที่กำลังใช้งาน": " · Active Session",
    "ซ่อนช่อง URL รูปภาพ": "Hide URL Input",
    "ระบุลิงก์ URL รูปภาพภายนอก": "Use External Avatar URL",
    "ขนาดไฟล์รูปภาพต้องไม่เกิน 2 MB": "Image file size must not exceed 2 MB",
    "โหลดภาพตัวอย่างเรียบร้อย กดปุ่มบันทึกเพื่อยืนยัน":
      "Preview loaded. Click Save to confirm",
    "เลือกภาษาแสดงผลหลักของระบบและกำหนดขอบเขตการซิงค์ภาษา":
      "Select system display language and configure sync scope",
    "แสดงผลเมนู ตารางข้อมูล และเอกสารกฎหมายภาษาไทย":
      "Display Back Office menus, reports, and legal docs in Thai",
    "ขอบเขตการนำภาษาไปใช้ (Language Sync Scope)": "Language Sync Scope",
    "ซิงค์ทั้งระบบ (Back Office + แอป Charge X)":
      "Sync Entire System (Back Office + Charge X App)",
    "ปรับภาษาหน้าเว็บผู้ดูแลระบบและค่าเริ่มต้นแอปมือถือพร้อมกัน":
      "Apply language change to both Back Office and mobile app defaults",
    "เฉพาะหน้าจอ Back Office ส่วนตัว": "Back Office Session Only",
    "เปลี่ยนภาษาเฉพาะเบราว์เซอร์ของผู้ดูแลระบบในเซสชันนี้":
      "Apply language change only to this browser session",
    "บันทึกขอบเขตการตั้งค่าภาษาแล้ว": "Language sync scope updated",
    "ความปลอดภัยและแก้ไขรหัสผ่าน (Password Settings)":
      "Security & Password Settings",
    "กำหนดรหัสผ่านใหม่ตามมาตรฐานความปลอดภัย 5 ข้อ พร้อมตัวช่วยสุ่มและคัดลอก":
      "Set a new password meeting all 5 security rules with generator and clipboard copy",
    "คัดลอกรหัสผ่าน": "Copy Password",
    "เลือกบัญชีที่ต้องการเปลี่ยนรหัสผ่าน:": "Select account to update password:",
    "ความปลอดภัย:": "Strength:",
    "บัญชีเป้าหมาย:": "Target Account:",
    "แสดง": "Show",
    "ซ่อน": "Hide",
    "รอการกรอกรหัสผ่านใหม่": "Awaiting new password",
    "ผ่านครบทั้ง 5 เกณฑ์ความปลอดภัย": "All 5 security rules satisfied",
    "รหัสผ่านยืนยันตรงกันพร้อมบันทึก": "Passwords match and ready to save",
    "รหัสผ่านทั้งสองช่องยังไม่ตรงกัน": "Password confirmation does not match",
    "สุ่มรหัสผ่านปลอดภัยและกรอกทั้งสองช่องให้แล้ว":
      "Generated secure password and filled both fields",
    "กรุณากรอกหรือสุ่มรหัสผ่านก่อนคัดลอก":
      "Please enter or generate a password before copying",
    "คัดลอกรหัสผ่านเรียบร้อยแล้ว": "Password copied to clipboard",
    "มีการแก้ไขที่ยังไม่บันทึก": "Unsaved changes",
    "ข้อกำหนดการใช้บริการ (T&C)": "Terms & Conditions (T&C)",
    "ข้อกำหนดการใช้บริการ (Terms & Conditions)": "Terms & Conditions",
    "ข้อกำหนดการใช้บริการ (Terms &amp; Conditions)": "Terms &amp; Conditions",
    "นโยบายความเป็นส่วนตัว (PDPA)": "Privacy Policy (PDPA)",
    "นโยบายความเป็นส่วนตัว (Privacy Policy · PDPA)":
      "Privacy Policy (PDPA)",
    "แก้ไขแบบแบ่งข้อย่อยและรองรับสองภาษา TH / EN (ซิงค์กับแอป Charge X)":
      "Structured bilingual TH / EN editor synced to Charge X App",
    "กำหนดโครงสร้างนโยบาย PDPA และข้อมูลติดต่อ DPO สองภาษา TH / EN":
      "Configure structured PDPA sections and DPO contact in TH / EN",
    "+ เพิ่มข้อย่อยใหม่": "+ Add Section",
    "หัวข้อเอกสาร (TH)": "Document Title (TH)",
    "หัวข้อเอกสาร (EN)": "Document Title (EN)",
    "เวอร์ชันเอกสาร (Version)": "Document Version",
    "วันที่มีผลบังคับใช้ (Effective Date)": "Effective Date",
    "บังคับขอความยินยอมซ้ำ (Force Re-Consent)": "Force Re-Consent",
    "บังคับขอความยินยอม PDPA ซ้ำ (Force Re-Consent)":
      "Force PDPA Re-Consent",
    "แสดงป๊อปอัปให้สมาชิกในแอปยอมรับข้อกำหนดใหม่เมื่อเปิดใช้งานครั้งถัดไป":
      "Require mobile app users to accept updated terms on next launch",
    "ขอความยินยอม PDPA เวอร์ชันใหม่จากผู้ใช้งานแอปทุกคน":
      "Require all mobile app users to re-accept the new PDPA policy",
    "ย้ายขึ้น": "Move up",
    "ย้ายลง": "Move down",
    "ลบข้อย่อย": "Delete section",
    "หัวข้อ (TH)": "Heading (TH)",
    "รายละเอียดข้อกำหนด (TH)": "Section details (TH)",
    "รายละเอียดนโยบาย (TH)": "Policy details (TH)",
    "บันทึกแล้วจะอัปเดตหน้าเอกสารกฎหมายบนแอปทันที":
      "Saving publishes legal updates to the mobile app immediately",
    "ซิงค์กับหน้า Privacy.dc.html และแอปทันทีที่บันทึก":
      "Syncs live with Privacy.dc.html and mobile app upon save",
    "พรีวิวหน้าจอมือถือ (Live Preview)": "Live Mobile Preview",
    "ไทย (TH)": "Thai (TH)",
    "จำเป็นต้องยืนยันยอมรับเวอร์ชันใหม่": "Re-consent required for new version",
    "รับทราบและยินยอม": "Acknowledge & Agree",
    "เอกสารต้องมีเนื้อหาอย่างน้อย 1 ข้อย่อย":
      "Document must keep at least 1 section",
    "ลบข้อย่อยเอกสารแล้ว (กดบันทึกเพื่อเผยแพร่)":
      "Section removed (click Save to publish)",
    "นโยบายความปลอดภัยและการเข้าถึงข้อมูลส่วนกลาง (Global Data Policy)":
      "Global Data Access Policy",
    "ควบคุมการเข้าถึงข้อมูลละเอียดอ่อนระดับองค์กรด้วยสวิตช์เปิด–ปิดทันที":
      "Control sensitive organization-wide data access with instant toggles",
    "ตารางสิทธิ์การเข้าถึงรายบทบาท (Role Permission Matrix)":
      "Role Permission Matrix",
    "กำหนดสิทธิ์เข้าใช้งานทั้ง 10 โมดูลของแต่ละ Role พร้อมล็อกความปลอดภัย Super Admin":
      "Manage permissions across 10 modules per role with Super Admin protection",
    "เลือกบทบาท:": "Select Role:",
    "บัญชี Super Admin หลัก (1 User ID) ถูกล็อกสิทธิ์เต็มระบบครบ 10/10 โมดูล ไม่สามารถถอดถอนสิทธิ์ได้":
      "Primary Super Admin (1 User ID) is permanently locked to full access across all 10 modules",
    "โมดูลระบบ": "System Module",
    "ขอบเขตการเข้าถึง": "Access Scope",
    "ระดับสิทธิ์ปัจจุบัน": "Current Level",
    "เปิด / ปิดสิทธิ์": "Access Toggle",
    "ควบคุมการเข้าถึงยอดเงินสมาชิกและปุ่มปรับยอดกระเป๋าเงินในเมนูการชำระเงิน":
      "Control access to member wallet balances and top-up/refund adjustments",
    "อนุญาตให้ดาวน์โหลดไฟล์สรุปยอดขาย ประวัติการใช้ตู้ และตารางสถานีออกนอกระบบ":
      "Allow downloading revenue, usage, and station reports to Excel/PDF",
    "เปิดให้ Operator ตรวจสอบรายการกิจกรรมและความเคลื่อนไหวด้านความปลอดภัย":
      "Allow Operators to inspect security activity and access audit logs",
    "ป้องกันไม่ให้เพิ่มหรือแก้ไขอีเมลพนักงานนอกโดเมนองค์กรของบริษัท":
      "Enforce @chargex.co.th corporate email domain for all Operator accounts",
    "เปิดให้สมาชิกทีมปรับรูปประจำตัวและเปลี่ยนรหัสผ่านของตนเองในเมนู My Account":
      "Allow team members to update their own avatar and password in My Account",
    "ดู KPI รายได้ สถานีออนไลน์ และกราฟภาพรวม":
      "View revenue KPIs, online stations, and overview charts",
    "จัดการบัญชีผู้ใช้ บทบาท ทีมงาน และสิทธิ์ระบบ":
      "Manage user accounts, roles, teams, and RBAC rules",
    "เพิ่ม แก้ไข ลบสถานี และเชื่อมโยงหัวชาร์จ":
      "Create, edit, delete stations and manage linked chargers",
    "สร้าง แก้ไข และควบคุมการใช้คูปองส่วนลด":
      "Create, edit, and control promotional discount coupons",
    "เผยแพร่ประกาศ ข่าวสาร และแบนเนอร์ในแอป":
      "Publish announcements, news updates, and app banners",
    "ติดตามสถานะตู้ชาร์จแบบ Real-time และบำรุงรักษา":
      "Monitor real-time charger telemetry and maintenance status",
    "จัดการคู่มือแนะนำการใช้งานแอป 4 ขั้นตอน":
      "Manage the 4-step app onboarding tutorial carousel",
    "ดูรายการธุรกรรม ใบกำกับ และจัดการ Wallet":
      "View payment transactions, tax receipts, and wallets",
    "เรียกดูรายงานวิเคราะห์และส่งออกข้อมูลระบบ":
      "Inspect analytics reports and export system datasets",
    "ตั้งค่าระบบ รหัสผ่าน ข้อกำหนดกฎหมาย และหมวดหมู่":
      "Manage system settings, passwords, legal docs, and categories",
    "ควบคุมสิทธิ์การเข้าถึงโมดูลนี้": "Control access to this module",
    "ไม่มีสิทธิ์ (No Access)": "No Access",
    "จัดการหมวดหมู่ข่าวสาร คูปอง และสถานีชาร์จแบบสองภาษา ซิงค์ตัวเลือกอัตโนมัติทั่วระบบ":
      "Manage bilingual categories for news, coupons, and stations with auto-sync",
    "หมวดหมู่ (TH / EN)": "Category (TH / EN)",
    "กลุ่มระบบ": "System Group",
    "การซิงค์และการใช้งาน": "Sync & Usage",
    "ยังไม่ถูกใช้งาน": "Unused",
    "ชื่อหมวดหมู่ (TH) *": "Category Name (TH) *",
    "ชื่อหมวดหมู่ (EN)": "Category Name (EN)",
    "ระบบจัดการเครือข่ายสถานีชาร์จ EV": "EV Charging Network Management Portal",
    "ควบคุมสิทธิ์ผู้ดูแลระบบ คูปอง ข่าวสาร และการตรวจสอบตู้ชาร์จแบบศูนย์กลางภายใต้มาตรฐาน Zero-Trust":
      "Centralized Zero-Trust access control for EV stations, coupons, news, and charger telemetry",
    "โครงสร้างสิทธิ์ผู้ดูแลระบบ (2-Tier RBAC)": "Role-Based Access Governance (2-Tier RBAC)",
    "จำกัด 1 User ID": "1 User ID Only",
    "เข้าสู่ระบบด้วย Username และรหัสผ่านระดับสูง ควบคุมระบบทั้งหมด รวมถึงสร้าง ระงับ และกำหนดสิทธิ์ให้บัญชี Operator":
      "Sign in via Username and high-security password with full system control to create, suspend, and govern Operators",
    "@chargex.co.th เท่านั้น": "@chargex.co.th Only",
    "เข้าถึงและจัดการเฉพาะ 3 โมดูลที่ได้รับมอบหมาย ได้แก่ คูปอง (Coupons), ข่าวสาร (News) และ Monitor ตู้ชาร์จ":
      "Restricted access to 3 assigned modules: Coupons, News & Announcements, and Charger Monitor",
    "เข้าสู่ระบบผู้ดูแล (Back Office Sign In)": "Back Office Sign In",
    "ยืนยันตัวตนตามระดับสิทธิ์และนโยบายความปลอดภัยองค์กร":
      "Authenticate according to your role tier and enterprise security policy",
    "ผู้ดูแลหลัก (Super Admin)": "Super Admin",
    "เจ้าหน้าที่ปฏิบัติการ (Operator)": "Operator (@chargex)",
    "อีเมลบริษัท (Company Email)": "Company Email",
    "Username / อีเมลผู้ดูแลหลัก": "Username / Admin Email",
    "เช่น name@chargex.co.th": "e.g. name@chargex.co.th",
    "เช่น superadmin หรือ superadmin@chargex.co.th":
      "e.g. superadmin or superadmin@chargex.co.th",
    "บัญชี Operator อนุญาตเฉพาะอีเมลบริษัท (@chargex.co.th) เท่านั้น":
      "Operator accounts require a corporate email (@chargex.co.th) only",
    "คลิกปุ่ม @chargex.co.th ด้านขวาเพื่อเติมโดเมนบริษัทอัตโนมัติ":
      "Click + @chargex.co.th on the right to auto-complete your corporate domain",
    "ลืมรหัสผ่าน?": "Forgot password?",
    "รหัสผ่านตามเกณฑ์ความปลอดภัย 5 เงื่อนไข": "Password meeting all 5 security rules",
    "ส่งคำขอรีเซ็ตรหัสผ่านถึง Super Admin": "Request Password Reset from Super Admin",
    "ระบุอีเมลบริษัท @chargex.co.th": "Enter @chargex.co.th corporate email",
    "ส่งคำขอ": "Send Request",
    "กรุณาระบุอีเมลบริษัท (@chargex.co.th) เพื่อส่งคำขอรีเซ็ต":
      "Please enter a corporate email (@chargex.co.th) to submit a reset request",
    "ส่งคำขอรีเซ็ตรหัสผ่านไปยัง Super Admin แล้ว":
      "Password reset request sent to Super Admin",
    "ต้องครบ 5 เงื่อนไขความปลอดภัย": "All 5 security rules required",
    "จดจำเซสชันนี้ไว้ 8 ชั่วโมง": "Remember this session for 8 hours",
    "จำกัดผิดไม่เกิน 5 ครั้ง": "Max 5 failed attempts",
    "เข้าสู่ระบบ Charge X Back Office": "Sign in to Charge X Back Office",
    "ตั้งรหัสผ่านครั้งแรกสำหรับ Operator": "Operator First-Time Password Setup",
    "บัญชี:": "Account:",
    "— กรุณากำหนดรหัสผ่านใหม่ให้ครบ 5 เกณฑ์ความปลอดภัยก่อนเข้าใช้งาน":
      "— Please set a new password meeting all 5 security rules to continue",
    "รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านชั่วคราวเดิม":
      "New password must differ from your temporary password",
    "ตั้งรหัสผ่านครั้งแรกและเข้าสู่ระบบ Back Office":
      "Completed first-time password setup and signed in",
    "ตั้งรหัสผ่านใหม่และเข้าสู่ระบบเรียบร้อยแล้ว":
      "New password saved and signed in cleanly",
    "บันทึกรหัสผ่านใหม่และเข้าสู่ระบบ": "Save New Password & Sign In",
    "กลับหน้าเข้าสู่ระบบ": "Back to Sign In",
    "โหมดทดสอบระบบ (Sandbox Quick-Fill)": "Sandbox Mode (Quick-Fill)",
    "สวมสิทธิ์ Super Admin": "Fill Super Admin",
    "สวมสิทธิ์ Operator": "Fill Operator",
    "Operator ล็อกอินครั้งแรก": "First-Time Operator",
    "รีเซ็ตสถานะล็อกชั่วคราว (Sandbox)": "Reset Temporary Lockout (Sandbox)",
    "คำขอรีเซ็ตรหัสผ่าน": "Password Reset Request",
    "แจ้งเตือน Super Admin: กรอกรหัสผิดครบ 5 ครั้ง (ล็อก 15 นาที)":
      "Super Admin Alert: 5 consecutive failed logins (15m lockout)",
    "สลับเป็นโหมดมืด": "Switch to Dark Mode",
    "สลับเป็นโหมดสว่าง": "Switch to Light Mode",
    "เปลี่ยนเป็นโหมดมืดเรียบร้อยแล้ว": "Switched to Dark Mode",
    "เปลี่ยนเป็นโหมดสว่างเรียบร้อยแล้ว": "Switched to Light Mode",
  };
  const PT = [
    ["^Active\\ (\\d+)\\ ·\\ Inactive\\ (\\d+)$", "Active {1} · Inactive {2}"],
    ["^(\\d+)\\ บทบาท\\ ·\\ (\\d+)\\ ทีม$", "{1} Roles · {2} Teams"],
    [
      "^บทบาท\\ (.+?)\\ ถูกล็อกสิทธิ์จัดการเต็มรูปแบบทุกโมดูล\\ \\(สงวนเฉพาะ\\ 1\\ User\\ ID\\ เท่านั้น\\)$",
      "Role {1} is locked with Full Control on all modules (1 User ID only)",
    ],
    ["^จัดการสมาชิกในทีม\\ \\((\\d+)\\)$", "Manage Members ({1})"],
    [
      "^พิมพ์ชื่อผู้ใช้งานหรืออีเมล\\ \\(([^)]+)\\)\\ เพื่อยืนยันการลบ$",
      "Type user name or email ({1}) to confirm deletion",
    ],
    ["^\\((\\d+)\\ ตู้\\ ·\\ (\\d+)\\ ประเภท\\)$", "({1} Units · {2} Types)"],
    ["^(\\d+)\\ ประเภท$", "{1} Types"],
    ["^(\\d+)\\ รอบเวลา$", "{1} Slots"],
    ["^Top\\ (\\d+)\\ ตู้$", "Top {1} Units"],
    ["^เข้าสู่ระบบด้วย\\ (.+?)$", "Signed in as {1}"],
    [
      "^อัปเดต\\ ([0-9:]+)\\ ·\\ #(\\d+)\\ \\(([^)]+)\\)$",
      "Updated {1} · #{2} ({3})",
    ],
    ["^สถานี\\ \\((\\d+)\\):\\ ทั้งหมด\\ ▾$", "Stations ({1}): All ▾"],
    ["^หัวชาร์จ:\\ (.+?)$", "Connector: {1}"],
    ["^รอบเวลา:\\ (.+?)$", "Slot: {1}"],
    ["^สถานี:\\ (.+?)$", "Station: {1}"],
    ["^สิทธิ์:\\ (.+?)$", "Role: {1}"],
    ["^ค้นหา:\\ (.+?)$", "Search: {1}"],
    [
      "^เปิดให้บริการ\\ (\\d+)\\ ·\\ ปิดปรับปรุง\\ (\\d+)$",
      "Open {1} · Maint. {2}",
    ],
    [
      "^DC\\ Fast\\ (\\d+)\\ ตู้\\ ·\\ AC\\ (\\d+)\\ ตู้$",
      "DC Fast {1} · AC {2}",
    ],
    ["^(\\d+)\\ ตู้\\ /\\ (\\d+)\\ หัว$", "{1} Units / {2} Bays"],
    ["^([0-9.]+)%\\ ออนไลน์$", "{1}% Online"],
    [
      "^ออนไลน์\\ (\\d+)\\ ·\\ ชาร์จ\\ (\\d+)\\ ·\\ ซ่อม\\ (\\d+)$",
      "Online {1} · Charging {2} · Maint. {3}",
    ],
    [
      "^พบประวัติใน\\ (\\d+)\\ สถานี\\ \\(คลิกกรอง\\)$",
      "Found in {1} stations (click filter)",
    ],
    ["^พร้อมใช้\\ \\((\\d+)\\)$", "Ready ({1})"],
    ["^กำลังชาร์จ\\ \\((\\d+)\\)$", "Charging ({1})"],
    ["^บำรุงรักษา\\ \\((\\d+)\\)$", "Maint. ({1})"],
    ["^แจ้งขัดข้อง\\ \\((\\d+)\\)$", "Faults ({1})"],
    ["^(\\d+)\\ ตู้\\ \\((\\d+)\\ หัว\\)$", "{1} Units ({2} Bays)"],
    ["^(.+?)\\ ·\\ ว่าง\\ (\\d+)$", "{1} · {2} free"],
    ["^(\\d+)\\ ครั้ง$", "{1} times"],
    [
      "^(\\d+)\\ บัญชี\\ ·\\ กระเป๋าเงินสมาชิกทั้งหมด$",
      "{1} accounts · All member wallets",
    ],
    ["^ธนาคารกสิกรไทย\\ \\(KBank\\)\\ ·\\ (.+?)$", "KBank · {1}"],
    ["^ตรงยอด\\ (\\d+)/(\\d+)$", "Matched {1}/{2}"],
    ["^ระงับ\\ (\\d+)$", "Suspended {1}"],
    ["^(\\d+)\\ บัญชี$", "{1} accounts"],
    ["^([0-9,]+)\\ /\\ ([0-9,]+)\\ สิทธิ์$", "{1} / {2} uses"],
    ["^ส่วนลดเปอร์เซ็น\\ ·\\ สูงสุด\\ ฿(.+?)$", "Percentage · Max ฿{1}"],
    ["^฿([0-9.,]+)\\ \\((\\d+)\\ รายการ\\)$", "฿{1} ({2} items)"],
    ["^รวมยอด\\ (\\d+)\\ วัน$", "{1}-day total"],
    ["^([▲▼]\\s*[+-]?[0-9.]+%)\\ เทียบช่วงก่อนหน้า$", "{1} vs prior period"],
    [
      "^(\\d+)%\\ ออนไลน์\\ /\\ (\\d+)%\\ ซ่อมบำรุง$",
      "{1}% Online / {2}% Maint.",
    ],
    ["^พร้อมใช้งาน\\ (\\d+)\\ /\\ (\\d+)\\ แห่ง$", "{1} of {2} operational"],
    ["^(\\d+)/(\\d+)\\ คน$", "{1}/{2} users"],
    [
      "^เรียกดูรายชื่อสมาชิกทั้งหมด\\ \\((\\d+)\\)\\ →$",
      "View all members ({1}) →",
    ],
    ["^ทั้งหมด\\ \\((\\d+)\\)$", "All ({1})"],
    ["^ใช้งานปกติ\\ \\((\\d+)\\)$", "Active ({1})"],
    ["^มียอดค้างตัดไม่ได้\\ \\((\\d+)\\)$", "Payment Due ({1})"],
    ["^สมาชิกทั้งหมด\\ (\\d+)\\ คน$", "Total {1} members"],
    ["^ใช้งานปกติ\\ (\\d+)\\ คน$", "Active {1}"],
    [
      "^มียอดค้างตัดไม่ได้\\ (\\d+)\\ คน\\ \\(฿([0-9.,]+)\\)$",
      "Payment Due {1} (฿{2})",
    ],
    [
      "^แสดง\\ (\\d+)[–-](\\d+)\\ จาก\\ (\\d+)\\ รายการ$",
      "Showing {1}–{2} of {3}",
    ],
    ["^แสดง\\ 0\\ จาก\\ (\\d+)\\ รายการ$", "Showing 0 of {1}"],
    ["^(\\d+)\\ สถานี$", "{1} Stations"],
    ["^(\\d+)\\ หัวชาร์จ$", "{1} Connectors"],
    ["^(\\d+)\\ สมาชิก$", "{1} Members"],
    ["^ใช้งานช่วงนี้\\ (.+?)\\ คน$", "Active {1} users"],
    ["^ใหม่\\ \\+(.+?)\\ คน$", "New +{1}"],
    [
      "^(\\d+)\\ รายการค้างชำระ\\ \\(บัตรหมดอายุ\\ /\\ ค่าปรับค้างชำระ\\)$",
      "{1} overdue items (card declined / unpaid idle fee)",
    ],
    ["^ลด\\ Carbon\\ (.+?)$", "Carbon -{1}"],
    ["^แสดง\\ (\\d+)\\ /\\ (\\d+)\\ คน$", "Showing {1} / {2} members"],
    ["^แสดง\\ (\\d+)\\ /\\ (\\d+)\\ รายการ$", "Showing {1} / {2} items"],
    ["^แสดง\\ (\\d+)\\ /\\ (\\d+)\\ บัญชี$", "Showing {1} / {2} accounts"],
    ["^รวมช่วงนี้\\ (.+?)\\ ครั้ง$", "Period total: {1} sessions"],
    ["^(\\d+)\\ หน้า$", "{1} Pages"],
    ["^ตัวอย่างขนาดย่อ\\ หน้าที่\\ (\\d+)$", "Thumbnail Page {1}"],
    ["^หน้าที่\\ (\\d+)$", "Page {1}"],
    ["^หน้า\\ (\\d+)\\ /\\ (\\d+)$", "Page {1} / {2}"],
    ["^(\\d+)\\ รายการ$", "{1} Items"],
    ["^(.+?)\\ สิทธิ์\\ \\(คงเหลือ\\ (.+?)\\)$", "{1} uses ({2} left)"],
    ["^(.+?)\\ สิทธิ์$", "{1} uses"],
    ["^(\\d+)\\ ครั้ง\\ /\\ 1\\ ผู้ใช้$", "{1} / 1 user"],
    ["^หน่วยจำนวนเงิน\\ ·\\ ลด\\ ฿(.+?)$", "Fixed · ฿{1} off"],
    [
      "^ส่วนลดเปอร์เซ็น\\ ·\\ ลด\\ (.+?)%\\ \\(สูงสุด\\ ฿(.+?)\\)$",
      "{1}% off (max ฿{2})",
    ],
    ["^ส่วนลดเปอร์เซ็น\\ ·\\ ลด\\ (.+?)%$", "{1}% off"],
    ["^ขั้นต่ำ\\ ฿(.+?)$", "Min spend ฿{1}"],
    ["^(\\d+)\\ แห่ง$", "{1} Stations"],
    ["^ตู้ชาร์จทั้งหมด\\ (\\d+)\\ ตู้$", "Total {1} charger units"],
    ["^(.+?)\\ ตู้$", "{1} Units"],
    ["^([0-9,]+)\\ เหตุการณ์$", "{1} Incidents"],
    ["^(\\d+)\\ ตู้ชาร์จ\\ ·\\ (\\d+)\\ หัวชาร์จ$", "{1} Chargers · {2} Bays"],
    [
      "^Uptime\\ (.+?)%\\ ·\\ ขัดข้อง\\ (\\d+)\\ ครั้ง$",
      "Uptime {1}% · {2} faults",
    ],
    [
      "^อัปเดตล่าสุด\\ ([0-9:]+)\\ ·\\ ซิงค์ครั้งที่\\ #(\\d+)\\ \\(([0-9-]+)\\ –\\ ([0-9-]+)\\)$",
      "Last synced {1} · Tick #{2} ({3} – {4})",
    ],
    [
      "^ตู้ชาร์จ\\ (\\d+)\\ ·\\ สถานี\\ (\\d+)\\ ·\\ สมาชิก\\ (\\d+)\\ ·\\ เข้าใช้\\ (\\d+)$",
      "Chargers {1} · Stations {2} · Users {3} · Logs {4}",
    ],
    ["^([0-9,]+)\\ ครั้ง$", "{1} sessions"],
    ["^ขัดข้อง\\ (\\d+)\\ ครั้ง$", "{1} faults"],
    ["^สัดส่วน\\ ([0-9.]+)%$", "Share {1}%"],
    ["^เฉลี่ย\\ ([0-9.,]+)\\ kWh/ครั้ง$", "Avg {1} kWh/session"],
    ["^([0-9,]+)\\ ครั้ง\\ ·\\ ([0-9.,]+)\\ kWh$", "{1} sessions · {2} kWh"],
    ["^ผู้ใช้ทั้งหมด\\ (\\d+)\\ คน$", "Total {1} users"],
    ["^ประวัติเข้าใช้\\ (\\d+)\\ รายการ$", "Total {1} access logs"],
    ["^สถานีทั้งหมด\\ (\\d+)\\ แห่ง$", "Total {1} stations"],
    [
      "^รวม\\ (\\d+)\\ สถานี\\ ·\\ (\\d+)\\ ตู้ชาร์จ$",
      "{1} stations · {2} chargers",
    ],
    ["^คำนวณรวม\\ (\\d+)\\ ตู้ชาร์จ$", "Aggregated across {1} units"],
    ["^ลดเทียบเท่าน้ำมัน\\ ~([0-9.,]+)\\ ลิตร$", "Approx. {1} L fuel saved"],
    ["^Uptime\\ ([0-9.]+)%$", "Uptime {1}%"],
    ["^(\\d+)\\ ผู้ใช้$", "{1} users"],
    ["^สมาชิกในทีม\\ (\\d+)\\ คน$", "{1} members"],
    ["^หมวดหมู่ทั้งหมด\\ (\\d+)\\ รายการ$", "{1} categories total"],
    ["^ข้อที่\\ (\\d+)$", "Section {1}"],
    ["^มีผลวันที่\\ (.+)$", "Effective {1}"],
    ["^ผ่านเกณฑ์\\ (\\d+)/5\\ ข้อ$", "Passed {1}/5 rules"],
    ["^(.+)\\ ·\\ บัญชีที่กำลังใช้งาน$", "{1} · Active Session"],
    ["^(\\d+)\\ /\\ (\\d+)\\ โมดูล$", "{1} / {2} Modules"],
    ["^(.+)\\ ·\\ (\\d+)\\ /\\ (\\d+)\\ โมดูล$", "{1} · {2} / {3} Modules"],
    ["^ใช้งาน\\ (\\d+)\\ รายการ$", "Used in {1} items"],
    [
      "^ไม่สามารถลบหมวดหมู่ที่กำลังใช้งานอยู่ได้\\ \\((\\d+)\\ รายการ\\)\\ กรุณาปิดใช้งานชั่วคราวแทน$",
      "Cannot delete category currently in use ({1} items). Disable it instead.",
    ],
    [
      "^คำเตือนความปลอดภัย:\\ กรอกรหัสผ่านผิด\\ (\\d+)/5\\ ครั้ง\\ \\(ล็อกชั่วคราว\\ 15\\ นาทีเมื่อครบ\\ 5\\ ครั้ง\\)$",
      "Security Warning: {1}/5 failed attempts (15-min lockout after 5 attempts)",
    ],
    [
      "^บัญชีถูกล็อกชั่วคราว\\ (\\d+)\\ นาที\\ เนื่องจากพยายามเข้าสู่ระบบผิดครบ\\ 5\\ ครั้ง\\ \\(แจ้งเตือน\\ Super\\ Admin\\ แล้ว\\)$",
      "Account temporarily locked for {1} mins after 5 failed attempts (Super Admin alerted)",
    ],
    [
      "^ส่งคำขอรีเซ็ตรหัสผ่านไปยัง\\ Super\\ Admin\\ สำหรับ\\ (.+?)\\ เรียบร้อยแล้ว$",
      "Password reset request sent to Super Admin for {1}",
    ],
    ["^สวัสดี,\\ (.+?)!$", "Hello, {1}!"],
    [
      "^ออนไลน์\\ (\\d+)\\ /\\ (\\d+)\\ สถานี\\ ·\\ (\\d+)\\ สมาชิก\\ ·\\ ยอดค้าง\\ ฿([0-9.,]+)$",
      "Online {1} / {2} stations · {3} members · Overdue ฿{4}",
    ],
  ].map(([r, e]) => [new RegExp(r), e]);
  const SUB = Object.keys(TR)
    .filter((k) => /[\u0E01-\u0E3A\u0E40-\u0E5B]/.test(k))
    .sort((a, b) => b.length - a.length);
  const THR = /[\u0E01-\u0E3A\u0E40-\u0E5B]/;
  const ATTRS = ["aria-label", "placeholder", "title", "alt"];
  const tx = (s) => {
    if (!s || !THR.test(s)) return s;
    const k = s.trim();
    if (Object.prototype.hasOwnProperty.call(TR, k)) return s.replace(k, TR[k]);
    for (const [re, en] of PT) {
      const m = k.match(re);
      if (m)
        return s.replace(
          k,
          en.replace(/\{(\d)\}/g, (_, i) => m[+i]),
        );
    }
    let o = s;
    for (const key of SUB) {
      if (o.indexOf(key) >= 0) o = o.split(key).join(TR[key]);
      if (!THR.test(o)) break;
    }
    return o;
  };
  function setupI18n(P) {
    P.cxLang = function () {
      if (this.state && (this.state.lang === "en" || this.state.lang === "th"))
        return this.state.lang;
      const pl = this.props.lang;
      if (pl === "English") return "en";
      if (pl === "ไทย") return "th";
      try {
        return localStorage.getItem("cx-lang") === "en" ? "en" : "th";
      } catch (e) {
        return "th";
      }
    };
    P.cxWalk = function () {
      const r = this._cxRoot;
      if (!r || typeof document === "undefined") return;
      const en = this.cxLang() === "en";
      const O = this._cxOrig || (this._cxOrig = new Map());
      if (!en) {
        O.forEach((v, node) => {
          if (v.t != null && node.nodeValue === v.e) node.nodeValue = v.t;
          if (v.a)
            for (const a in v.a) {
              if (node.getAttribute(a) === v.a[a].e)
                node.setAttribute(a, v.a[a].t);
            }
        });
        O.clear();
        if (this._cxObs) {
          this._cxObs.disconnect();
          this._cxObs = null;
        }
        return;
      }
      const w = document.createTreeWalker(r, 5, {
        acceptNode: (x) =>
          x.nodeType === 1 && x.getAttribute("translate") === "no" ? 2 : 1,
      });
      let x = w.currentNode;
      while (x) {
        if (x.nodeType === 3) {
          const v = x.nodeValue;
          if (THR.test(v)) {
            const e = tx(v);
            if (e !== v) {
              O.set(x, { t: v, e });
              x.nodeValue = e;
            }
          }
        } else if (x.nodeType === 1) {
          for (const a of ATTRS) {
            const v = x.getAttribute(a);
            if (v && THR.test(v)) {
              const e = tx(v);
              if (e !== v) {
                const rec = O.get(x) || {};
                rec.a = rec.a || {};
                rec.a[a] = { t: v, e };
                O.set(x, rec);
                x.setAttribute(a, e);
              }
            }
          }
        }
        x = w.nextNode();
      }
      if (!this._cxObs && typeof MutationObserver !== "undefined") {
        this._cxObs = new MutationObserver(() => {
          if (this._cxQ) return;
          this._cxQ = true;
          Promise.resolve().then(() => {
            this._cxQ = false;
            this.cxWalk();
          });
        });
        this._cxObs.observe(r, {
          subtree: true,
          childList: true,
          characterData: true,
          attributes: true,
          attributeFilter: ATTRS,
        });
      }
    };
    const cdm = P.componentDidMount,
      cdu = P.componentDidUpdate,
      cwu = P.componentWillUnmount,
      rv = P.renderVals;
    P.componentDidMount = function () {
      if (cdm) cdm.call(this);
      this.cxWalk();
      setTimeout(() => this.cxWalk(), 60);
      if (typeof window !== "undefined") {
        this._cxL = (e) => {
          if (!e || !e.key || e.key === "cx-lang") {
            this.cxWalk();
          }
        };
        window.addEventListener("storage", this._cxL);
        window.addEventListener("cx-lang", this._cxL);
      }
    };
    P.componentDidUpdate = function (a, b) {
      if (cdu) cdu.call(this, a, b);
      this.cxWalk();
    };
    P.componentWillUnmount = function () {
      if (this._cxObs) this._cxObs.disconnect();
      if (this._cxL && typeof window !== "undefined") {
        window.removeEventListener("storage", this._cxL);
        window.removeEventListener("cx-lang", this._cxL);
      }
      if (cwu) cwu.call(this);
    };
    P._cxTx = tx;
    P.renderVals = function () {
      const v = rv.call(this) || {};
      v.cxRef = (el) => {
        this._cxRoot = el;
      };
      v.cxLangProp = this.props.lang || "ตามแอป";
      return v;
    };
  }
  globalThis.CX_BO_I18N = { TR, PT, SUB, THR, ATTRS, tx, setupI18n };
})();
