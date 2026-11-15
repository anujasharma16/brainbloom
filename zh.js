/* © 2026 Anuja Sharma. All rights reserved. See LICENSE. */
/* Mandarin Chinese (简体中文) pack. Loaded after every content file and after zh-content.js.
   - I18N.zh holds the interface text.
   - ZH_DICT (zh-content.js) maps each English lesson text to its Mandarin translation; the walker below attaches
     it as the `zh` field on every {en, fr, es, hi} object, so the content files stay untouched. */
LANGS.push({ code: 'zh', name: '简体中文', badge: 'ZH' });

I18N.zh = {
  tagline: '边玩边学 AI。从入门到精通。',
  chooseLang: '选择你的语言', continue: '继续', langHint: '你可以稍后在个人资料中更改。',
  welcomeTitle: '欢迎！准备好学习 AI 了吗？', welcomeSub: '简短的游戏、谜题和测验。无需任何基础。',
  playGuest: '以访客身份开始', createAccount: '创建账号', login: '登录',
  guestNote: '访客可以玩所有内容。创建账号即可保存进度和语言选择。',
  username: '用户名', password: '密码', signup: '注册', back: '返回',
  authNote: '演示账号只保存在此浏览器中。以后连接服务器即可在多台设备间同步。',
  errUserExists: '该用户名已被使用。', errBadLogin: '用户名或密码错误。', errUser: '用户名：至少 3 个字母或数字。', errPass: '密码：至少 6 个字符。',
  learn: '学习', milestones: '里程碑', profile: '个人资料', close: '关闭',
  hello: '你好，{name}！', guest: '访客', yourJourney: '你的 AI 之旅',
  guestBanner: '你正在以访客身份游玩。进度仅保存在此设备上。', saveProgress: '保存进度',
  levelN: '第 {n} 级', lessonsDone: '{a}/{b} 节课', locked: '未解锁', start: '开始', replay: '重玩',
  question: '问题', check: '检查', next: '继续', finish: '完成', correct: '答对了！', incorrect: '不太对', tfTrue: '对', tfFalse: '错',
  matchHint: '把左边的每一项拖到右边对应的一项上。也可以先点一项，再点它的搭档。', orderHint: '按正确顺序点选各项。点已放好的项可以取消。',
  matchDone: '全部配对成功！', matchMistakes: '配对完成，但出错 {n} 次。下次争取零失误！', orderRight: '正确顺序：', yourOrder: '你的顺序',
  lessonDone: '课程完成！', lessonFailed: '差一点！得分 60% 或以上即可解锁下一节课。', score: '得分', xpEarned: '+{n} XP', newBadges: '新的里程碑！',
  tryAgain: '再试一次', backToMap: '返回地图', nextLesson: '下一节课',
  proTitle: '你已经是 AI 高手了！', proText: '你完成了所有级别。现在选择一条专业方向吧。', choosePath: '选择你的方向', changePath: '更换方向', pathTitle: '选择你的学习方向',
  pathSub: '把你的 AI 技能用到工作中。', startPath: '开始这条路线', comingSoon: '即将推出', morePaths: '更多路线即将上线', yourPath: '你的路线',
  pathLocked: '完成全部四个级别即可解锁路线。',
  overall: '总体进度', badges: '徽章', roadmap: '路线图', proRank: 'AI 高手', rank: '等级',
  rank0: '新手上路', rank1: '入门者', rank2: '探索者', rank3: '实践者', rank4: 'AI 高手',
  stats: '统计', totalXp: '总 XP', dayStreak: '连续天数', lessonsComplete: '已完成课程',
  language: '语言', account: '账号', logout: '退出登录', resetProgress: '重置进度', confirmReset: '要清除此档案的所有进度吗？',
  accountSaved: '已登录。进度和语言已保存到你的账号。', loggedAs: '已登录为 {name}', guestMode: '访客模式',
  leave: '要离开这节课吗？本节课的进度将会丢失。',
  skip: '跳过', letsPlay: '开始玩吧！', voiceOn: '语音已开', voiceOff: '语音已关', replayVoice: '重播', ready: '准备好上课了吗？', cheerWin: '太棒了！', cheerTry: '差一点！再试一次。', storyTime: '故事时间',
  rights: '保留所有权利。', aboutLink: '关于与鸣谢',
  privacyLink: '隐私政策',
  installTitle: '安装应用', installText: '把 Brainbloom 添加到主屏幕或桌面，一键打开，离线也能用。', installBtn: '安装 Brainbloom',
  installIos: '在 iPhone 或 iPad 上：点按 Safari 中的“分享”按钮，然后选择“添加到主屏幕”。',
  installOther: '在 Chrome 或 Edge 中，打开浏览器菜单，选择“安装应用”（或“添加到主屏幕”）。',
  email: '电子邮箱', displayNameOpt: '显示名称（可选）', forgotPassword: '忘记密码？', forgotTitle: '重置你的密码',
  forgotHelp: '输入你的账号邮箱。我们会发送一个链接，让你设置新密码。', sendReset: '发送重置链接',
  resetSent: '如果该邮箱已注册，重置链接正在发送中。请检查收件箱和垃圾邮件文件夹。', waitReset: '请稍等一会儿再重新申请。',
  verifySent: '账号已创建！我们已向 {email} 发送了验证链接。', emailVerified: '邮箱已验证', emailNotVerified: '邮箱尚未验证',
  resendVerify: '重新发送验证邮件', verifyResent: '验证邮件已发送。', deleteAccount: '删除我的账号',
  confirmDelete: '要永久删除你的账号和已保存的进度吗？此操作无法撤销。', accountDeleted: '你的账号已删除。',
  errEmail: '请输入有效的邮箱地址。', errEmailUsed: '该邮箱已有账号。请尝试登录。', errBadLoginEmail: '邮箱或密码错误。',
  errTooMany: '尝试次数过多。请稍候再试。', errNetwork: '没有网络连接。请检查网络后重试。',
  errRecent: '为了安全，请先退出登录，重新登录后再试。', errGeneric: '出了点问题。请重试。',
  authNoteCloud: '你的进度会保存到账号，并跟随你到任何设备。',
  theme: '外观', themeLight: '浅色', themeDark: '深色', themeSystem: '跟随设备',
  home: '首页', upNext: '接下来', yourTrack: '你的学习轨道', allDone: '所有课程都完成了！可以重玩任意一节来练习。',
  wrongFinal: '错误', answerIs: '正确答案',
  musicOn: '音乐已开', musicOff: '音乐已关',
  pause: '暂停', play: '播放',
  skitTitle: '小熊和小兔秀', watchSkit: '看一段搞笑小品',
  retryMsg: '不太对。你还有一次机会！', secondTry: '第二次答对：得一半分数。', summaryTitle: '你学到了什么', reviewTitle: '你的答案',
  sfxOn: '音效已开', sfxOff: '音效已关',
  noVoice: '此设备上没有找到{lang}语音，所以 Bruno 和 Pinky 不会出声。请在设备的语音设置中添加一个。',
};

/* attach the Mandarin text to every shared content object, using the English text as the key */
(() => {
  if (typeof ZH_DICT === 'undefined') return;
  const mapOne = (e) => (typeof e === 'string' ? ZH_DICT[e] : undefined);
  const mapEn = (en) => {
    if (typeof en === 'string') return mapOne(en);
    if (!Array.isArray(en)) return undefined;
    const out = en.map((x) => (Array.isArray(x) ? x.map((y) => mapOne(y) ?? y) : mapOne(x) ?? x));
    return out;
  };
  const walk = (o) => {
    if (!o || typeof o !== 'object') return;
    if (Array.isArray(o)) { o.forEach(walk); return; }
    if (o.en !== undefined && o.zh === undefined) { const z = mapEn(o.en); if (z !== undefined) o.zh = z; }
    for (const k in o) if (k !== 'en' && k !== 'fr' && k !== 'es' && k !== 'hi' && k !== 'zh') walk(o[k]);
  };
  [LEVELS, PATHS, SOON_PATHS, INTROS, SKITS].forEach(walk);
  /* positional rows: summary bullets [en, fr, es, hi, zh] and quotes [who, en, fr, es, hi, zh] */
  Object.values(SUMMARIES).forEach((rows) => rows.forEach((r) => { if (r[4] === undefined && ZH_DICT[r[0]]) r[4] = ZH_DICT[r[0]]; }));
  QUOTES.forEach((r) => { if (r[5] === undefined && ZH_DICT[r[1]]) r[5] = ZH_DICT[r[1]]; });
  /* used by app.js for badges, which are built after this file loads */
  window.addZh = walk;
})();
