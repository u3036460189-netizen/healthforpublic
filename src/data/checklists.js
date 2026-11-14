// 實用清單資料
// 來源：
// 1. 居家檢查：依衞生防護中心學校／家庭指引整理
// 2. 疫苗時間表：衞生署「香港兒童免疫接種計劃」（科學委員會最新建議，截至2024年10月9日）
// 3. 復課建議：衞生防護中心《學校預防傳染病指引》附錄十三（2025年11月修訂）

export const homeChecklist = {
  id: 'home',
  intro: '由大門開始順時針行一圈，10 分鐘內完成。建議每兩星期做一次，家人患病後再加做一次。',
  groups: [
    {
      name: '廚房',
      items: [
        '雪櫃保持攝氏 4 度或以下，沒有過期食物',
        '砧板及刀具「生熟分開」，用後即洗',
        '洗碗布及海綿乾爽無異味，每週更換或消毒',
        '垃圾桶有蓋，每日清倒',
        '處理過生肉後，枱面已用稀釋漂白水清潔',
      ],
    },
    {
      name: '廁所',
      items: [
        '梘液及抹手紙供應充足',
        '沖廁時先蓋上廁板，防止飛沫',
        '已向所有排水口倒入清水（保持 U 形隔氣儲水）',
        '毛巾分開使用，每週清洗',
        '通風良好，抽氣扇運作正常',
      ],
    },
    {
      name: '睡房',
      items: [
        '床單被套每週更換；家人患病後即時更換',
        '冷氣機及風扇濾網已清洗',
        '玩偶及枕頭可清洗、無霉味',
        '房間每日通風至少兩次',
      ],
    },
    {
      name: '客廳',
      items: [
        '門柄、遙控器、開關等常觸摸物件每日消毒',
        '玩具定期清洗，患病期間暫停共用',
        '水杯、毛巾、餐具各自專用',
        '家庭藥箱存貨齊備、沒有過期藥物',
      ],
    },
    {
      name: '大門與外出',
      items: [
        '口罩及酒精搓手液存貨充足',
        '外出鞋不入屋，或清潔鞋底',
        '外遊回港後，行李及衣物已清潔',
        '每名家庭成員有獨立毛巾及水杯',
      ],
    },
  ],
}

export const vaccineChecklist = {
  id: 'vaccine',
  intro: '對照衞生署「香港兒童免疫接種計劃」（科學委員會最新建議，截至 2024 年 10 月），逐項核對針卡。',
  groups: [
    {
      age: '初生',
      items: [
        { label: '卡介苗（BCG）' },
        { label: '乙型肝炎疫苗 — 第一次' },
      ],
    },
    {
      age: '一個月',
      items: [{ label: '乙型肝炎疫苗 — 第二次' }],
    },
    {
      age: '兩個月',
      items: [
        { label: '白喉、破傷風、無細胞型百日咳及滅活小兒麻痺混合疫苗 — 第一次' },
        { label: '肺炎球菌疫苗（十五價）— 第一次' },
      ],
    },
    {
      age: '四個月',
      items: [
        { label: '混合疫苗 — 第二次' },
        { label: '肺炎球菌疫苗 — 第二次' },
      ],
    },
    {
      age: '六個月',
      items: [
        { label: '混合疫苗 — 第三次' },
        { label: '乙型肝炎疫苗 — 第三次' },
      ],
    },
    {
      age: '十二個月',
      items: [
        { label: '麻疹、流行性腮腺炎及德國麻疹混合疫苗（MMR）— 第一次' },
        { label: '肺炎球菌疫苗 — 加強劑' },
        { label: '水痘疫苗 — 第一次' },
      ],
    },
    {
      age: '十八個月',
      items: [
        { label: '混合疫苗 — 加強劑' },
        { label: '麻疹、流行性腮腺炎、德國麻疹及水痘混合疫苗（MMRV）— 第二次 *' },
      ],
    },
    {
      age: '小一',
      items: [{ label: '混合疫苗 — 加強劑（學童免疫注射小組到校接種）' }],
    },
    {
      age: '小五',
      items: [{ label: '子宮頸癌疫苗（HPV）— 第一次（合資格女學童）' }],
    },
    {
      age: '小六',
      items: [
        { label: '白喉（減量）、破傷風、無細胞型百日咳（減量）及滅活小兒麻痺混合疫苗 — 加強劑' },
        { label: '子宮頸癌疫苗（HPV）— 第二次（合資格女學童）' },
      ],
    },
  ],
  notes: [
    '* 2018年7月1日或以後出生的兒童，於18個月大在母嬰健康院接種MMRV第二針；2013年1月1日至2018年6月30日出生的兒童則於小一接種。',
    '計劃以外疫苗（如流感、乙型流感嗜血桿菌、腦膜炎雙球菌、甲型肝炎、日本腦炎、輪狀病毒）可諮詢私家醫生；季節性流感疫苗建議每年接種。',
    '資料以衞生署最新公布為準；離港外遊前，請確認針卡已按當地要求補齊。',
  ],
}

export const returnToSchoolList = {
  id: 'school',
  intro: '子女確診後，幾時可以返學？以下按衞生防護中心《學校預防傳染病指引》（附錄十三，2025年11月修訂）整理。',
  rows: [
    { disease: '紅眼症（結膜炎）', condition: '眼睛不再有異常分泌物' },
    { disease: '桿菌痢疾', condition: '肚瀉停止，及最少兩個相隔24小時的大便樣本化驗陰性（首個樣本於完成抗生素治療48小時後收集）', notifiable: true },
    { disease: '水痘', condition: '約一星期，或直至所有水疱變乾', notifiable: true },
    { disease: '霍亂', condition: '完成抗生素療程48小時後，三個相隔至少一天的大便樣本化驗陰性', notifiable: true },
    { disease: '白喉', condition: '完成抗生素療程至少24小時後，咽喉及鼻咽拭子培養結果陰性', notifiable: true },
    { disease: '手足口病', condition: '所有水疱變乾或按醫生指示；如證實為腸病毒71型，須待水疱變乾後兩星期' },
    { disease: '甲型肝炎', condition: '首次出現黃疸起計一星期，或按醫生指示', notifiable: true },
    { disease: '麻疹', condition: '出疹翌日起計四天', notifiable: true },
    { disease: '流行性腮腺炎', condition: '腮腺腫脹翌日起計五天', notifiable: true },
    { disease: '德國麻疹（風疹）', condition: '出疹翌日起計七天', notifiable: true },
    { disease: '猩紅熱', condition: '已退燒，及開始服用適當抗生素24小時後', notifiable: true },
    { disease: '結核病', condition: '按醫生指示為準', notifiable: true },
    { disease: '傷寒', condition: '連續三個相隔至少24小時的大便樣本化驗陰性（首個樣本於完成抗生素治療48小時後收集）', notifiable: true },
    { disease: '病毒性腸胃炎', condition: '最後一次肚瀉或嘔吐後48小時' },
    { disease: '百日咳', condition: '完成至少五天抗生素療程，或按醫生指示', notifiable: true },
    { disease: '2019冠狀病毒病', condition: '病徵消退，或按醫生指示' },
  ],
  note: '以上建議只基於一般傳染期考慮；病假長短須以主診醫生的專業判斷為準。標有「須呈報」的疾病，醫生須依法通知衞生防護中心。',
}

// 外傭清潔防疫清單（中文 / Filipino / Bahasa Indonesia）
export const helperChecklist = {
  id: 'helper',
  intro: {
    zh: '給外傭姐姐的日常防疫指南。完成一項打一個勾，全部完成後請通知僱主檢查。',
    fil: 'Gabay sa pang-araw-araw na pag-iwas sa sakit para sa domestic helper. I-tsek ang bawat aytem pagkatapos gawin, at sabihin sa amo kapag tapos na.',
    ind: 'Panduan pencegahan penyakit harian untuk asisten rumah tangga. Centang setiap butir setelah selesai, lalu beri tahu majikan.',
  },
  groups: [
    {
      name: { zh: '每日', fil: 'Daily', ind: 'Harian' },
      items: [
        {
          zh: '用梘液洗手最少 20 秒，尤其如廁後與煮食前',
          fil: 'Hugasan ang kamay ng sabon nang hindi bababa sa 20 segundo, lalo na pagkatapos ng banyo at bago magluto',
          ind: 'Cuci tangan dengan sabon minimal 20 detik, terutama setelah ke toilet dan sebelum memasak',
        },
        {
          zh: '生肉與熟食分開處理，肉類必須徹底煮熟',
          fil: 'Hiwalayin ang hilaw at lutong pagkain; lutuin nang mabuti ang karne',
          ind: 'Pisahkan makanan mentah dan matang; masak daging sampai benar-benar matang',
        },
        {
          zh: '每天清潔及消毒廚房檯面與水槽',
          fil: 'Linisin at i-disinfect ang kitchen counter at lababo araw-araw',
          ind: 'Bersihkan dan disinfektan meja dapur serta bak pencucian setiap hari',
        },
        {
          zh: '每日清倒垃圾並綁好垃圾袋',
          fil: 'Itapon ang basura araw-araw at italî nang maayos ang bag',
          ind: 'Buang sampah setiap hari dan ikat kantong sampah dengan rapat',
        },
        {
          zh: '每天開窗通風兩次，每次 30 分鐘',
          fil: 'Buksan ang mga bintana dalawang beses sa isang araw, 30 minuto bawat isa',
          ind: 'Buka jendela dua kali sehari, masing-masing 30 menit',
        },
      ],
    },
    {
      name: { zh: '每週', fil: 'Weekly', ind: 'Mingguan' },
      items: [
        {
          zh: '每週更換床單被套，並以熱水清洗',
          fil: 'Palitan ang bedsheets kada linggo; labhan sa mainit na tubig',
          ind: 'Ganti sprei setiap minggu; cuci dengan air panas',
        },
        {
          zh: '刷洗浴室地板，並向所有去水位倒入清水',
          fil: 'Kuskusin ang sahig ng banyo; buhusan ng tubig ang mga drainage',
          ind: 'Sikat lantai kamar mandi; tuang air bersih ke semua saluran pembuangan',
        },
        {
          zh: '消毒門柄、電燈開關及遙控器',
          fil: 'I-disinfect ang door knob, light switch at remote control',
          ind: 'Disinfektan gagang pintu, saklar lampu, dan remote control',
        },
        {
          zh: '清洗小朋友的玩具及個人物品',
          fil: 'Hugasan ang mga laruan at personal na gamit ng bata',
          ind: 'Cuci mainan anak dan barang pribadi anak-anak',
        },
        {
          zh: '清潔冷氣機隔塵網及風扇',
          fil: 'Linisin ang filter ng aircon at electric fan',
          ind: 'Bersihkan filter AC dan kipas angin',
        },
      ],
    },
    {
      name: { zh: '有人不適時', fil: 'If someone is sick', ind: 'Jika ada yang sakit' },
      items: [
        {
          zh: '家中任何人感到不適，立即通知僱主',
          fil: 'Ialam agad sa amo kapag may may sakit sa pamilya',
          ind: 'Segera beri tahu majikan jika ada anggota keluarga yang sakit',
        },
        {
          zh: '照顧病人時戴上口罩及手套，事後徹底洗手',
          fil: 'Isuot ang mask at gloves habang nag-aalaga ng may sakit; hugasan nang mabuti ang kamay pagkatapos',
          ind: 'Gunakan masker dan sarung tangan saat merawat orang sakit; cuci tangan menyeluruh setelahnya',
        },
        {
          zh: '病人的餐具及毛巾分開使用和清洗',
          fil: 'Hiwalay na kutsara, tinidor at tuwalya para sa may sakit',
          ind: 'Pisahkan peralatan makan dan handuk orang yang sakit',
        },
        {
          zh: '每日以稀釋漂白水消毒病人接觸過的表面',
          fil: 'I-disinfect araw-araw ang mga nahawakan ng may sakit gamit ang diluted bleach',
          ind: 'Disinfektan permukaan yang disentuh pasien dengan pemutih encer setiap hari',
        },
        {
          zh: '自己不適時通知僱主並盡快求醫',
          fil: 'Kapag ikaw ay masama ang pakiramdam, sabihin sa amo at magpatingin agad sa doktor',
          ind: 'Jika Anda merasa tidak sehat, beri tahu majikan dan segera periksakan diri',
        },
      ],
    },
  ],
}
