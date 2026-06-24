// 예문 품질 개선 패치
// data.js 원본 단어 목록은 그대로 두고, 어색한 예문만 실생활형 예문으로 교체합니다.
(function(){
  if (typeof WORDS === 'undefined' || !Array.isArray(WORDS)) return;

  const curated = {
    "但是": ["今天有点累，但是我还要把工作做完。", "Jīntiān yǒudiǎn lèi, dànshì wǒ hái yào bǎ gōngzuò zuò wán.", "오늘은 조금 피곤하지만 일을 끝내야 합니다."],
    "如果": ["如果你有时间，我们晚上一起吃饭吧。", "Rúguǒ nǐ yǒu shíjiān, wǒmen wǎnshang yìqǐ chīfàn ba.", "시간이 있으면 우리 저녁에 같이 밥 먹어요."],
    "虽然": ["虽然这家店有点贵，但是味道不错。", "Suīrán zhè jiā diàn yǒudiǎn guì, dànshì wèidào búcuò.", "이 가게는 조금 비싸지만 맛은 괜찮습니다."],
    "已经": ["我已经到楼下了，你慢慢下来。", "Wǒ yǐjīng dào lóuxià le, nǐ mànmàn xiàlái.", "저는 이미 아래층에 도착했으니 천천히 내려오세요."],
    "因为": ["因为今天下雨，我们改天再见吧。", "Yīnwèi jīntiān xiàyǔ, wǒmen gǎitiān zài jiàn ba.", "오늘 비가 오니까 우리 다른 날에 만나요."],
    "所以": ["路上有点堵，所以我可能晚十分钟到。", "Lùshang yǒudiǎn dǔ, suǒyǐ wǒ kěnéng wǎn shí fēnzhōng dào.", "길이 좀 막혀서 저는 10분 정도 늦게 도착할 것 같아요."],
    "而且": ["这家店离公司近，而且价格也合适。", "Zhè jiā diàn lí gōngsī jìn, érqiě jiàgé yě héshì.", "이 가게는 회사에서 가깝고 가격도 적당합니다."],
    "不过": ["我想去，不过今天可能没时间。", "Wǒ xiǎng qù, búguò jīntiān kěnéng méi shíjiān.", "가고 싶지만 오늘은 시간이 없을 것 같아요."],
    "然后": ["我先去取票，然后在门口等你。", "Wǒ xiān qù qǔ piào, ránhòu zài ménkǒu děng nǐ.", "먼저 표를 찾고 나서 입구에서 기다릴게요."],
    "正在": ["我正在开会，等会儿给你回电话。", "Wǒ zhèngzài kāihuì, děng huìr gěi nǐ huí diànhuà.", "저는 지금 회의 중이라 이따가 전화드릴게요."],
    "以前": ["我以前住在上海，现在搬到北京了。", "Wǒ yǐqián zhù zài Shànghǎi, xiànzài bān dào Běijīng le.", "저는 예전에 상하이에 살았고 지금은 베이징으로 이사했습니다."],
    "以后": ["以后有问题，可以直接给我发消息。", "Yǐhòu yǒu wèntí, kěyǐ zhíjiē gěi wǒ fā xiāoxi.", "앞으로 문제가 있으면 바로 저에게 메시지를 보내도 됩니다."],
    "刚才": ["刚才有人给你打电话。", "Gāngcái yǒu rén gěi nǐ dǎ diànhuà.", "방금 누군가 당신에게 전화했어요."],
    "马上": ["我马上出门，大概二十分钟到。", "Wǒ mǎshàng chūmén, dàgài èrshí fēnzhōng dào.", "곧 출발해서 약 20분 후에 도착합니다."],
    "还": ["我还没吃饭，你要一起去吗？", "Wǒ hái méi chīfàn, nǐ yào yìqǐ qù ma?", "저는 아직 밥을 안 먹었는데 같이 갈래요?"],
    "就": ["你到地铁站以后，就给我发个消息。", "Nǐ dào dìtiězhàn yǐhòu, jiù gěi wǒ fā ge xiāoxi.", "지하철역에 도착하면 바로 저에게 메시지를 보내세요."],
    "才": ["我刚下班，才看到你的消息。", "Wǒ gāng xiàbān, cái kàndào nǐ de xiāoxi.", "방금 퇴근해서 이제야 당신의 메시지를 봤어요."],
    "再": ["你能再说一遍吗？", "Nǐ néng zài shuō yí biàn ma?", "다시 한 번 말해 줄 수 있나요?"],
    "又": ["他今天又迟到了。", "Tā jīntiān yòu chídào le.", "그는 오늘 또 지각했습니다."],
    "只": ["我今天只想在家休息。", "Wǒ jīntiān zhǐ xiǎng zài jiā xiūxi.", "저는 오늘 집에서 쉬고만 싶어요."],
    "也": ["我也觉得这个办法不错。", "Wǒ yě juéde zhè ge bànfǎ búcuò.", "저도 이 방법이 괜찮다고 생각해요."],
    "都": ["我们都准备好了。", "Wǒmen dōu zhǔnbèi hǎo le.", "우리는 모두 준비가 끝났습니다."],
    "很": ["这家店很受欢迎。", "Zhè jiā diàn hěn shòu huānyíng.", "이 가게는 인기가 많습니다."],
    "太": ["这个房间太吵了。", "Zhè ge fángjiān tài chǎo le.", "이 방은 너무 시끄럽습니다."],
    "最": ["你最喜欢哪道菜？", "Nǐ zuì xǐhuan nǎ dào cài?", "당신은 어떤 요리를 가장 좋아하나요?"],
    "更": ["这个方案更适合现在的情况。", "Zhè ge fāng'àn gèng shìhé xiànzài de qíngkuàng.", "이 방안이 현재 상황에 더 적합합니다."],
    "没有": ["我今天没有带现金。", "Wǒ jīntiān méiyǒu dài xiànjīn.", "저는 오늘 현금을 가져오지 않았습니다."],
    "不是": ["这不是我的手机。", "Zhè bú shì wǒ de shǒujī.", "이건 제 휴대폰이 아닙니다."],
    "吗": ["你现在有空吗？", "Nǐ xiànzài yǒu kòng ma?", "지금 시간 있나요?"],
    "呢": ["你呢，周末有什么安排？", "Nǐ ne, zhōumò yǒu shénme ānpái?", "당신은요, 주말에 무슨 계획이 있나요?"],
    "吧": ["我们先点两个菜吧。", "Wǒmen xiān diǎn liǎng ge cài ba.", "우리 먼저 요리 두 개 주문합시다."],
    "了": ["我已经订好房间了。", "Wǒ yǐjīng dìng hǎo fángjiān le.", "저는 이미 방 예약을 마쳤습니다."],
    "把": ["请把地址发给我。", "Qǐng bǎ dìzhǐ fā gěi wǒ.", "주소를 저에게 보내 주세요."],
    "被": ["我的手机被同事拿错了。", "Wǒ de shǒujī bèi tóngshì ná cuò le.", "제 휴대폰을 동료가 잘못 가져갔습니다."]
  };

  const badFrames = [
    zh => `我需要${zh}。`,
    zh => `请给我${zh}。`,
    zh => `这个${zh}很重要。`,
    zh => `这里有${zh}吗？`
  ];

  function cleanKo(ko){
    return String(ko || '').split('/')[0].replace(/^~+/, '').trim() || '이 단어';
  }

  function isBadExample(w){
    return w && w.zh && w.ex && badFrames.some(fn => fn(w.zh) === w.ex);
  }

  function fallback(w, idx){
    const ko = cleanKo(w.ko);
    const patterns = [
      [`我想先了解一下${w.zh}，再做决定。`, `Wǒ xiǎng xiān liǎojiě yíxià ${w.py}, zài zuò juédìng.`, `${ko}에 대해 먼저 알아본 뒤 결정하고 싶습니다.`],
      [`关于${w.zh}，我们下午再讨论。`, `Guānyú ${w.py}, wǒmen xiàwǔ zài tǎolùn.`, `${ko}에 대해서는 오후에 다시 이야기합시다.`],
      [`你能帮我确认一下${w.zh}吗？`, `Nǐ néng bāng wǒ quèrèn yíxià ${w.py} ma?`, `${ko}을/를 한번 확인해 줄 수 있나요?`]
    ];
    return patterns[idx % patterns.length];
  }

  WORDS.forEach((w, idx) => {
    const fixed = curated[w.zh] || (isBadExample(w) ? fallback(w, idx) : null);
    if (!fixed) return;
    w.ex = fixed[0];
    w.expy = fixed[1];
    w.exko = fixed[2];
  });
})();
