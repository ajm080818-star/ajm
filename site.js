
// ===== app.js =====
const icons={search:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" stroke-width="1.6"/><path d="m16 16 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'};
const user=JSON.parse(localStorage.getItem('ember-oak-user')||'null');
const initialRoute = location.hash.match(/^#route=([^&]+)/)?.[1] || 'home';
const current = `${decodeURIComponent(initialRoute)}.html`;
const active=(path)=>current===path?' class="current"':'';
const header=document.getElementById('site-header');
if(header){header.innerHTML=`<header class="site-header"><a class="brand" href="index.html" aria-label="엠버 앤 오크 홈"><span class="brand-symbol">✳</span><span class="brand-name">EMBER &amp; OAK<small>STEAKHOUSE</small></span></a><button class="mobile-menu" id="mobile-menu" aria-label="메뉴 열기" aria-expanded="false">☰</button><nav class="main-nav" id="main-nav"><a href="about.html"${active('about.html')}>회사 소개</a><a href="about.html#brand-story"${active('about.html')}>브랜드 스토리</a><div class="nav-dropdown"><a class="nav-dropdown-trigger" href="products.html" aria-haspopup="true" aria-expanded="false">메뉴 소개</a><div class="nav-dropdown-menu"><a href="steak.html">스테이크</a><a href="kids.html">어린이 메뉴</a><a href="sides.html">사이드 메뉴</a><a href="pasta.html">파스타</a><a href="drinks.html">음료</a><a href="wine.html">와인</a></div></div><a href="index.html#membership">멤버십 가입</a><div class="nav-dropdown"><a class="nav-dropdown-trigger" href="stores.html">매장·예약</a><div class="nav-dropdown-menu"><a href="stores.html">매장 안내</a><a href="reservation.html">예약 안내</a><a href="faq.html">자주 묻는 질문</a><a href="policies.html">개인정보 안내</a></div></div><a href="inquiry.html"${active('inquiry.html')}>문의하기</a><div class="mobile-auth">${user?`<a href="#" id="mobile-logout">로그아웃 (${user.nickname})</a>`:`<a href="signup.html">회원가입</a><a href="login.html">로그인</a>`}</div></nav><div class="header-tools"><form class="search-form" id="site-search"><input type="search" placeholder="무엇을 찾으세요?" aria-label="사이트 검색"><button aria-label="검색">${icons.search}</button></form>${user?`<a class="head-link" href="#" id="logout-link">로그아웃</a>`:`<a class="head-link" href="signup.html">회원가입</a><span class="head-divider"></span><a class="head-link" href="login.html">로그인</a>`}<a href="${user?'#profile':'login.html'}" class="profile-link ${user?'logged':''}" aria-label="${user?`${user.nickname} 프로필`:'로그인'}">${user?user.avatar:'♙'}</a></div></header>`;document.getElementById('mobile-menu').addEventListener('click',e=>{const menu=document.getElementById('main-nav');const opened=menu.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(opened));e.currentTarget.textContent=opened?'×':'☰'});document.getElementById('site-search').addEventListener('submit',e=>{e.preventDefault();const input=e.currentTarget.querySelector('input');const query=input.value.trim();if(!query){e.currentTarget.classList.toggle('is-open');if(e.currentTarget.classList.contains('is-open'))input.focus();return}const match=[['회사','about.html'],['브랜드','about.html'],['스테이크','steak.html'],['어린이','kids.html'],['키즈','kids.html'],['사이드','sides.html'],['파스타','pasta.html'],['음료','drinks.html'],['와인','wine.html'],['매장','stores.html'],['예약','reservation.html'],['질문','faq.html'],['개인정보','policies.html'],['이용약관','policies.html'],['제품','products.html'],['메뉴','products.html'],['멤버십','index.html#membership'],['문의','inquiry.html'],['가입','signup.html'],['로그인','login.html']].find(([word])=>query.includes(word));if(match)window.navigatePage(routeFromPath(match[1].split('#')[0]),match[1].includes('#')?{anchor:match[1].split('#')[1]}:{});else{input.value='';input.placeholder='검색 결과가 없습니다';setTimeout(()=>input.placeholder='무엇을 찾으세요?',1900)}});for(const id of ['logout-link','mobile-logout']){const logout=document.getElementById(id);if(logout)logout.addEventListener('click',e=>{e.preventDefault();localStorage.removeItem('ember-oak-user');location.reload()})}}
document.querySelectorAll('.nav-dropdown').forEach(dropdown=>{const trigger=dropdown.querySelector('.nav-dropdown-trigger');const relatedPages=dropdown.querySelector('.nav-dropdown-menu')?.querySelectorAll('a')||[];if(trigger?.getAttribute('href')===current||[...relatedPages].some(link=>link.getAttribute('href')===current))trigger?.classList.add('current');const setDropdown=open=>trigger?.setAttribute('aria-expanded',String(open));dropdown.addEventListener('mouseenter',()=>setDropdown(true));dropdown.addEventListener('mouseleave',()=>setDropdown(false));dropdown.addEventListener('focusin',()=>setDropdown(true));dropdown.addEventListener('focusout',event=>{if(!dropdown.contains(event.relatedTarget))setDropdown(false)})})
const footer=document.getElementById('site-footer');if(footer)footer.innerHTML=`<footer class="site-footer"><div class="footer-top"><span class="footer-brand">EMBER &amp; OAK STEAKHOUSE</span><nav class="footer-links"><a href="about.html">회사 소개</a><a href="products.html">메뉴 소개</a><a href="index.html#membership">멤버십</a><a href="inquiry.html"${active('inquiry.html')}>문의하기</a><a href="about.html#brand-story">브랜드 스토리</a><a href="stores.html">매장 안내</a><a href="reservation.html">예약</a><a href="faq.html">자주 묻는 질문</a><a href="admin-login.html">관리자</a><a href="policies.html">개인정보·이용약관</a></nav></div><div class="footer-bottom"><div class="footer-meta">EMBER &amp; OAK은 이 사이트를 위해 만든 가상 스테이크하우스 브랜드입니다. 계정·멤버십·문의는 데모 기능이며 실제 결제는 진행되지 않습니다.<br>연혁과 매장 수는 가상 브랜드 설정입니다. · © EMBER &amp; OAK STEAKHOUSE</div><div class="footer-social"><span>EST. SEOUL 2008</span></div></div></footer>`;
const track=document.getElementById('milestone-track');if(track){const cards=[...track.children],total=cards.length;let index=0,timer;function showSlide(next){index=(next+total)%total;const width=cards[0].getBoundingClientRect().width+15;const visible=Math.max(1,Math.floor((track.parentElement.clientWidth+15)/width));const max=Math.max(0,total-visible);index=Math.min(index,max);track.style.transform=`translateX(-${index*width}px)`;cards.forEach((card,i)=>card.classList.toggle('active',i===index));document.getElementById('slide-current').textContent=String(index+1).padStart(2,'0');document.getElementById('slide-progress').style.width=`${(index+1)/total*100}%`}document.querySelectorAll('[data-slide]').forEach(button=>button.addEventListener('click',()=>{showSlide(index+(button.dataset.slide==='next'?1:-1));resetTimer()}));function resetTimer(){clearInterval(timer);timer=setInterval(()=>showSlide(index+1),5000)}track.parentElement.addEventListener('mouseenter',()=>clearInterval(timer));track.parentElement.addEventListener('mouseleave',resetTimer);document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(timer):resetTimer());window.addEventListener('resize',()=>showSlide(index));resetTimer()}

const membershipSection = document.getElementById('membership');
if (membershipSection) {
  const membershipStorageKey = 'ember-oak-memberships';
  const welcomeHistoryKey = 'ember-oak-welcome-used';
  const getMemberships = () => JSON.parse(localStorage.getItem(membershipStorageKey) || '{}');
  const saveMemberships = (memberships) => localStorage.setItem(membershipStorageKey, JSON.stringify(memberships));
  const getUserKey = () => user?.username?.toLowerCase() || '';
  const getMonthKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };
  const getMonthExpiry = (monthKey) => {
    const [year, month] = monthKey.split('-').map(Number);
    return new Date(year, month, 0, 23, 59, 59, 999);
  };
  const getWelcomeExpiry = (joinedAt) => {
    const expiry = new Date(joinedAt);
    expiry.setFullYear(expiry.getFullYear() + 1);
    return expiry;
  };
  const formatCouponDate = (date) => date.toLocaleDateString('ko-KR', {year:'numeric', month:'long', day:'numeric'});
  const getWelcomeHistory = () => JSON.parse(localStorage.getItem(welcomeHistoryKey) || '[]');
  const dashboard = document.getElementById('membership-dashboard');

  function renderMembership() {
    const key = getUserKey();
    const memberships = getMemberships();
    const record = memberships[key];
    const active = Boolean(record?.active);
    if (active) {
      record.monthlyIssued ||= [];
      record.monthlyRedeemed ||= [];
      const month = getMonthKey();
      if (!record.monthlyIssued.includes(month)) record.monthlyIssued.push(month);
      const welcomeHistory = getWelcomeHistory();
      if (welcomeHistory.includes(key)) record.welcomeAvailable = false;
      saveMemberships(memberships);
    }

    document.querySelectorAll('.plan-join').forEach((button) => {
      button.textContent = active
        ? (record.plan === button.dataset.plan ? '현재 이용 중' : '가입 중인 플랜이 있습니다')
        : (user ? `${button.dataset.plan === 'annual' ? '연간' : '월간'} 멤버십 가입` : '로그인 후 가입');
      if (button.querySelector('span')) button.querySelector('span').textContent = active ? '✓' : '↗';
      button.disabled = active;
    });

    dashboard.hidden = !record;
    if (!record) return;
    const planName = record.plan === 'annual' ? '연간 멤버십' : '월간 멤버십';
    const month = getMonthKey();
    const monthlyExpiry = getMonthExpiry(month);
    const monthlyRedeemed = record.monthlyRedeemed?.includes(month);
    const monthlyIssued = record.monthlyIssued?.includes(month);
    const monthlyAvailable = active && monthlyIssued && !monthlyRedeemed && Date.now() <= monthlyExpiry.getTime();
    const welcomeExpiry = record.joinedAt ? getWelcomeExpiry(record.joinedAt) : null;
    const welcomeUsed = getWelcomeHistory().includes(key);
    const welcomeExpired = Boolean(welcomeExpiry && Date.now() > welcomeExpiry.getTime());
    const welcomeAvailable = active && record.welcomeAvailable && !welcomeUsed && !welcomeExpired;
    dashboard.innerHTML = `<div class="member-status-heading"><div><span class="eyebrow">MY MEMBERSHIP</span><h3>${record.active ? planName + ' 이용 중' : '멤버십이 해지되었습니다'}</h3></div>${record.active ? '<button type="button" class="membership-cancel" data-membership-action="cancel">멤버십 해지</button>' : ''}</div><div class="coupon-grid"><article class="coupon-card ${monthlyAvailable ? 'coupon-available' : ''}"><span class="coupon-label">MONTHLY COUPON</span><b>메인 메뉴 10% 할인</b><p>${monthlyAvailable ? `${month} 발급 · ${formatCouponDate(monthlyExpiry)}까지 사용 가능` : (monthlyRedeemed ? '이번 달 쿠폰을 이미 사용했어요.' : '이번 달 쿠폰을 사용할 수 없어요.')}</p>${monthlyAvailable ? '<button type="button" data-membership-action="monthly">쿠폰 사용 처리</button>' : ''}</article><article class="coupon-card ${welcomeAvailable ? 'coupon-welcome' : ''}"><span class="coupon-label">WELCOME COUPON</span><b>메인 메뉴 25% 할인</b><p>${welcomeAvailable ? `가입일 기준 1년 · ${formatCouponDate(welcomeExpiry)}까지 사용 가능` : (welcomeUsed ? '웰컴 쿠폰 사용 이력이 있어 재가입 혜택 대상이 아닙니다.' : (welcomeExpired ? '가입일로부터 1년이 지나 쿠폰 사용 기간이 끝났어요.' : '웰컴 쿠폰은 가입일 기준 1년간 사용할 수 있습니다.'))}</p>${welcomeAvailable ? '<button type="button" data-membership-action="welcome">웰컴 쿠폰 사용 처리</button>' : ''}</article></div><p class="coupon-footnote">월간 쿠폰은 매월 말일까지, 웰컴 쿠폰은 가입일로부터 1년까지 사용할 수 있습니다. 쿠폰 사용은 데모 상태만 변경하며 실제 주문이나 결제는 발생하지 않습니다.</p>`;
    dashboard.querySelectorAll('[data-membership-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.membershipAction;
        const currentMemberships = getMemberships();
        const currentRecord = currentMemberships[key];
        if (!currentRecord) return;
        if (action === 'cancel') {
          if (!window.confirm('멤버십을 해지할까요? 웰컴 쿠폰 사용 이력은 유지됩니다.')) return;
          currentRecord.active = false;
        } else if (action === 'monthly') {
          currentRecord.monthlyRedeemed ||= [];
          const currentMonth = getMonthKey();
          if (!currentRecord.monthlyRedeemed.includes(currentMonth)) currentRecord.monthlyRedeemed.push(currentMonth);
        } else if (action === 'welcome') {
          const history = getWelcomeHistory();
          if (!history.includes(key)) history.push(key);
          localStorage.setItem(welcomeHistoryKey, JSON.stringify(history));
          currentRecord.welcomeAvailable = false;
        }
        saveMemberships(currentMemberships);
        renderMembership();
      });
    });
  }

  document.querySelectorAll('.plan-join').forEach((button) => {
    button.addEventListener('click', () => {
      if (!user) {
        window.navigatePage('login', {anchor:'membership'});
        return;
      }
      const key = getUserKey();
      const memberships = getMemberships();
      if (memberships[key]?.active) return;
      const history = getWelcomeHistory();
      memberships[key] = {
        plan: button.dataset.plan,
        active: true,
        joinedAt: new Date().toISOString(),
        monthlyIssued: [getMonthKey()],
        monthlyRedeemed: [],
        welcomeAvailable: !history.includes(key)
      };
      saveMemberships(memberships);
      renderMembership();
    });
  });

  renderMembership();
}

if (location.search.includes('welcome=1')) {
  history.replaceState({}, '', location.pathname + location.hash);
  const toast = document.createElement('div');
  toast.className = 'welcome-toast';
  toast.textContent = `환영합니다, ${user?.nickname || '회원'}님!`;
  document.body.append(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => toast.remove(), 3600);
}

if (user) {
  const sidebarEscape = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const usernameKey = String(user.username || '').toLowerCase();
  const normalizePhone = (value) => String(value || '').replace(/\D/g, '');
  const formatDate = (value) => value ? new Date(value).toLocaleDateString('ko-KR') : '';
  const memberList = JSON.parse(localStorage.getItem('ember-oak-members') || '[]');
  const memberRecord = memberList.find((member) => String(member.username || '').toLowerCase() === usernameKey);
  const pointsStorageKey = 'ember-oak-points';
  const pointsData = JSON.parse(localStorage.getItem(pointsStorageKey) || '{}');
  const pointsAccount = pointsData[usernameKey] || { balance: 0, history: [] };
  pointsAccount.history ||= [];
  const memberships = JSON.parse(localStorage.getItem('ember-oak-memberships') || '{}');
  const membership = memberships[usernameKey];
  let membershipMarkup = '<p>멤버십 가입 전입니다.</p><a class="account-action-link" href="index.html#membership">멤버십 살펴보기 ↗</a>';
  if (membership?.active) {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    membership.monthlyIssued ||= [];
    membership.monthlyRedeemed ||= [];
    if (!membership.monthlyIssued.includes(month)) {
      membership.monthlyIssued.push(month);
      localStorage.setItem('ember-oak-memberships', JSON.stringify(memberships));
    }
    const endOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0);
    const welcomeExpiry = membership.joinedAt ? new Date(membership.joinedAt) : null;
    if (welcomeExpiry) welcomeExpiry.setFullYear(welcomeExpiry.getFullYear()+1);
    const welcomeUsed = (JSON.parse(localStorage.getItem('ember-oak-welcome-used') || '[]')).includes(usernameKey);
    const monthlyStatus = membership.monthlyRedeemed.includes(month) ? '이번 달 쿠폰 사용 완료' : `이번 달 쿠폰 · ${formatDate(endOfMonth)}까지`;
    const welcomeStatus = welcomeUsed ? '웰컴 쿠폰 사용 완료' : (welcomeExpiry && now <= welcomeExpiry ? `웰컴 쿠폰 · ${formatDate(welcomeExpiry)}까지` : '웰컴 쿠폰 사용 기간 종료');
    membershipMarkup = `<p class="account-plan-status">${membership.plan === 'annual' ? '연간' : '월간'} 멤버십 이용 중</p><ul class="account-coupon-list"><li>${sidebarEscape(monthlyStatus)}</li><li>${sidebarEscape(welcomeStatus)}</li></ul><a class="account-action-link" href="index.html#membership">쿠폰 상세·사용 관리 ↗</a>`;
  }

  const reservations = JSON.parse(localStorage.getItem('ember-oak-reservation-requests') || '[]')
    .filter((item) => normalizePhone(item.phone) === normalizePhone(user.phone))
    .sort((a,b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0,3);
  const reservationMarkup = reservations.length
    ? reservations.map((item) => `<li><b>${sidebarEscape(item.store)}</b><span>${sidebarEscape(item.date)} · ${sidebarEscape(item.time)} · ${sidebarEscape(item.guests)}명</span></li>`).join('')
    : '<li class="account-empty">연결된 예약 내역이 없습니다.</li>';
  const inquiries = JSON.parse(localStorage.getItem('ember-oak-inquiries') || '[]')
    .filter((item) => item.ownerKey === usernameKey)
    .sort((a,b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0,3);
  const inquiryMarkup = inquiries.length
    ? inquiries.map((item) => `<li><b>${sidebarEscape(item.title)}</b><span>${item.reply ? '답변 도착' : (item.status === 'in-progress' ? '답변 중' : '접수')}</span></li>`).join('')
    : '<li class="account-empty">등록한 문의가 없습니다.</li>';

  document.body.insertAdjacentHTML('beforeend', `<div class="account-overlay" id="account-overlay"></div><aside class="account-drawer" id="account-drawer" aria-hidden="true" aria-labelledby="account-drawer-title" role="dialog"><div class="account-drawer-head"><div><span class="eyebrow">EMBER &amp; OAK</span><h2 id="account-drawer-title">MY ACCOUNT</h2></div><button class="account-close" id="account-close" type="button" aria-label="프로필 사이드바 닫기">×</button></div><div class="account-drawer-body"><section class="account-profile"><div class="account-avatar" id="account-avatar">${sidebarEscape(user.avatar || '♙')}</div><div><h3>${sidebarEscape(user.nickname || user.name || '회원')}</h3><span>@${sidebarEscape(user.username)}</span></div><button id="account-avatar-change" type="button" aria-label="프로필 이모티콘 변경">↻</button></section><section class="account-drawer-section"><h3>프로필 설정</h3><form id="account-profile-form"><label>닉네임<input name="nickname" maxlength="16" value="${sidebarEscape(user.nickname || '')}" required></label><label>이메일 주소<input name="email" type="email" value="${sidebarEscape(user.email || '')}" required></label><button type="submit" class="account-save">변경 내용 저장</button><p id="account-save-message" aria-live="polite"></p></form></section><section class="account-drawer-section account-points"><div class="account-section-heading"><h3>공통 포인트</h3><span class="account-points-balance">${Number(pointsAccount.balance).toLocaleString('ko-KR')}P</span></div><p>멤버십 가입 여부와 관계없이 회원 아이디 또는 등록 전화번호로 적립·사용하는 공통 혜택입니다. 실제 매장 이용에는 포인트 시스템 연동이 필요합니다.</p><p class="points-policy">기획 예시는 1P당 1원, 결제 금액의 1% 적립이며 멤버십 할인 쿠폰과 함께 쓸 수 있습니다. 유효기간과 실제 이용 기준은 운영 정책 확정 후 안내합니다.</p><a class="account-action-link" href="policies.html#points-policy">포인트 이용 안내 ↗</a></section><section class="account-drawer-section"><div class="account-section-heading"><h3>멤버십 · 쿠폰</h3><a href="index.html#membership">보기 ↗</a></div>${membershipMarkup}<p class="points-combine-note">포인트는 멤버십 쿠폰과 함께 사용할 수 있습니다.</p></section><section class="account-drawer-section"><div class="account-section-heading"><h3>최근 예약</h3><a href="reservation.html">예약하기 ↗</a></div><ul class="account-list">${reservationMarkup}</ul></section><section class="account-drawer-section"><div class="account-section-heading"><h3>내 문의</h3><a href="inquiry.html">문의하기 ↗</a></div><ul class="account-list">${inquiryMarkup}</ul></section><button class="account-logout" id="account-logout" type="button">로그아웃</button></div></aside>`);

  const drawer = document.getElementById('account-drawer');
  const overlay = document.getElementById('account-overlay');
  const profileLink = document.querySelector('.profile-link');
  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('account-drawer-open');
    profileLink?.focus();
  };
  const openDrawer = () => {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('account-drawer-open');
    document.getElementById('account-close').focus();
  };
  profileLink?.addEventListener('click', (event) => { event.preventDefault(); openDrawer(); });
  document.getElementById('account-close').addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer(); });

  const avatars = ['🐨','🦘','🦋','🐻','🦊','🐼','🐯','🐰','🐸','🐳','🦄','🐙'];
  document.getElementById('account-avatar-change').addEventListener('click', () => {
    const choices = avatars.filter((avatar) => avatar !== user.avatar);
    const avatar = choices[Math.floor(Math.random()*choices.length)];
    user.avatar = avatar;
    if (memberRecord) memberRecord.avatar = avatar;
    localStorage.setItem('ember-oak-user', JSON.stringify(user));
    if (memberRecord) localStorage.setItem('ember-oak-members', JSON.stringify(memberList));
    location.reload();
  });
  document.getElementById('account-profile-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    user.nickname = String(data.get('nickname')).trim();
    user.email = String(data.get('email')).trim();
    if (memberRecord) {
      memberRecord.nickname = user.nickname;
      memberRecord.email = user.email;
      localStorage.setItem('ember-oak-members', JSON.stringify(memberList));
    }
    localStorage.setItem('ember-oak-user', JSON.stringify(user));
    document.getElementById('account-save-message').textContent = '프로필 설정을 저장했습니다.';
    setTimeout(() => location.reload(), 650);
  });
  document.getElementById('account-logout').addEventListener('click', () => {
    localStorage.removeItem('ember-oak-user');
    sessionStorage.removeItem('ember-oak-admin-session');
    location.reload();
  });

  const reservationForm = document.getElementById('reservation-form');
  if (reservationForm) {
    if (!reservationForm.elements.name.value) reservationForm.elements.name.value = user.name || user.nickname || '';
    if (!reservationForm.elements.phone.value) reservationForm.elements.phone.value = user.phone || '';
  }
}

const pageRoutes = new Set([...document.querySelectorAll('.route-view')].map((view) => view.dataset.route));
const routeFromPath = (value) => {
  const name = value.split('/').pop().replace(/\.html(?:\?.*)?$/, '') || 'home';
  return pageRoutes.has(name) ? name : 'home';
};
window.navigatePage = (route, options = {}) => {
  const target = pageRoutes.has(route) ? route : 'home';
  const params = [];
  if (options.welcome) params.push('welcome=1');
  if (options.registered) params.push('registered=1');
  if (options.anchor) params.push(`anchor=${encodeURIComponent(options.anchor)}`);
  location.hash = `route=${encodeURIComponent(target)}${params.length ? `&${params.join('&')}` : ''}`;
  if (options.reload) location.reload();
};
const renderRoute = () => {
  const hash = location.hash.slice(1);
  const routeMatch = hash.match(/^route=([^&]+)/);
  let route = routeMatch ? decodeURIComponent(routeMatch[1]) : 'home';
  const routeParams = new URLSearchParams(hash.replace(/^route=[^&]+&?/, ''));
  if (!pageRoutes.has(route)) route = 'home';
  window.currentPageRoute = route;
  const pageTitle = document.querySelector(`.route-view[data-route="${route}"] h1`)?.textContent?.replace(/\s+/g, ' ').trim();
  document.title = route === 'home' ? 'EMBER & OAK STEAKHOUSE — 불의 온도, 마음의 온도' : `${pageTitle || route} — EMBER & OAK`;
  document.querySelectorAll('.route-view').forEach((view) => { view.classList.toggle('is-active', view.dataset.route === route); });
  document.querySelectorAll('.main-nav a.current').forEach((link) => link.classList.remove('current'));
  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    const matches = trigger?.getAttribute('href') === `${route}.html` || [...(dropdown.querySelectorAll('.nav-dropdown-menu a') || [])].some((link) => routeFromPath(link.getAttribute('href')) === route);
    trigger?.classList.toggle('current', Boolean(matches));
  });
  document.querySelectorAll('.main-nav > a').forEach((link) => link.classList.toggle('current', routeFromPath(link.getAttribute('href') || '') === route));
  const anchor = routeParams.get('anchor');
  if (anchor) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({behavior:'smooth', block:'start'}));
  else window.scrollTo(0, 0);
  if (route === 'login' && routeParams.has('registered')) {
    const message = document.getElementById('login-message');
    if (message) { message.textContent = '가입이 완료되었습니다. 새 아이디와 비밀번호로 로그인해 주세요.'; message.className = 'auth-message full-field success'; }
  }
  if (routeParams.has('welcome')) {
    const currentUser = JSON.parse(localStorage.getItem('ember-oak-user') || '{}');
    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.textContent = `환영합니다, ${currentUser.nickname || '회원'}님!`;
    document.body.append(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => toast.remove(), 3600);
  }
  window.initCatalog?.();
};
window.addEventListener('hashchange', renderRoute);
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || link.target || link.hasAttribute('download')) return;
  const raw = link.getAttribute('href');
  if (!raw || /^(https?:|mailto:|tel:|javascript:)/i.test(raw)) return;
  if (raw.startsWith('#')) {
    const target = raw.slice(1);
    if (['membership','signature'].includes(target) && !location.hash.includes('route=home')) {
      event.preventDefault();
      window.navigatePage('home', {anchor:target});
    } else {
      const activeView = document.querySelector('.route-view.is-active');
      const targetNode = activeView?.querySelector(`#${CSS.escape(target)}`);
      if (targetNode) {
        event.preventDefault();
        targetNode.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
    return;
  }
  const url = new URL(raw, location.href);
  if (url.origin !== location.origin || !url.pathname.endsWith('.html')) return;
  event.preventDefault();
  const route = routeFromPath(url.pathname);
  const options = {};
  if (url.hash) options.anchor = decodeURIComponent(url.hash.slice(1));
  const query = new URLSearchParams(url.search);
  if (query.has('welcome')) options.welcome = true;
  if (query.has('registered')) options.registered = true;
  window.navigatePage(route, options);
});
renderRoute();


// ===== auth.js =====
const readMembers = () => JSON.parse(localStorage.getItem('ember-oak-members') || '[]');
const saveMembers = (members) => localStorage.setItem('ember-oak-members', JSON.stringify(members));
const normalizePhone = (phone) => String(phone || '').replace(/\D/g, '');

const first = document.getElementById('signup-step-one');
if (first) {
  let personalInfo = null;
  let usernameAvailable = false;
  const second = document.getElementById('signup-step-two');
  const usernameMessage = document.getElementById('username-message');
  const phoneMessage = document.getElementById('phone-message');
  const signupError = document.getElementById('signup-error');
  const idInput = second.elements.username;
  const passwordInput = second.elements.password;
  const passwordConfirmInput = second.elements.passwordConfirm;
  const passwordMessage = document.getElementById('password-message');

  first.addEventListener('submit', (event) => {
    event.preventDefault();
    phoneMessage.textContent = '';
    phoneMessage.className = 'auth-message full-field';
    if (!first.reportValidity()) return;

    const info = Object.fromEntries(new FormData(first).entries());
    const phoneExists = readMembers().some(
      (member) => normalizePhone(member.phone) === normalizePhone(info.phone)
    );
    if (phoneExists) {
      phoneMessage.textContent = '이미 가입된 전화번호입니다. 가입 시 사용한 전화번호를 확인해 주세요.';
      phoneMessage.className = 'auth-message full-field error';
      return;
    }

    personalInfo = info;
    first.hidden = true;
    second.hidden = false;
    document.getElementById('step-num').textContent = '02';
    document.getElementById('signup-title').textContent = '계정 정보를 만들어 주세요.';
    document.getElementById('signup-subtitle').textContent = '엠버 앤 오크에서 사용할 아이디와 닉네임을 정해 주세요.';
    document.querySelectorAll('.step-dots i')[0].classList.remove('is-active');
    document.querySelectorAll('.step-dots i')[1].classList.add('is-active');
  });

  document.getElementById('back-step').addEventListener('click', () => {
    second.hidden = true;
    first.hidden = false;
    document.getElementById('step-num').textContent = '01';
    document.getElementById('signup-title').textContent = '기본 정보를 입력해 주세요.';
    document.getElementById('signup-subtitle').textContent = '회원 확인을 위해 필요한 정보를 입력해 주세요.';
    document.querySelectorAll('.step-dots i')[1].classList.remove('is-active');
    document.querySelectorAll('.step-dots i')[0].classList.add('is-active');
  });

  idInput.addEventListener('input', () => {
    usernameAvailable = false;
    usernameMessage.textContent = '아이디 중복 확인을 진행해 주세요.';
    usernameMessage.className = 'field-note';
  });

  document.getElementById('check-username').addEventListener('click', () => {
    const value = idInput.value.trim();
    if (!/^[a-zA-Z0-9]{4,20}$/.test(value)) {
      usernameMessage.textContent = '아이디는 영문과 숫자 4~20자로 입력해 주세요.';
      usernameMessage.className = 'field-note error';
      usernameAvailable = false;
      return;
    }
    usernameAvailable = !readMembers().some(
      (member) => member.username.toLowerCase() === value.toLowerCase()
    );
    usernameMessage.textContent = usernameAvailable
      ? '사용할 수 있는 아이디입니다.'
      : '이미 사용 중인 아이디입니다.';
    usernameMessage.className = `field-note ${usernameAvailable ? 'success' : 'error'}`;
  });

  const updatePasswordMessage = () => {
    if (!passwordConfirmInput.value) {
      passwordMessage.textContent = '';
      passwordMessage.className = 'field-note';
      return;
    }
    const matches = passwordInput.value === passwordConfirmInput.value;
    passwordMessage.textContent = matches ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.';
    passwordMessage.className = `field-note ${matches ? 'success' : 'error'}`;
  };
  passwordInput.addEventListener('input', updatePasswordMessage);
  passwordConfirmInput.addEventListener('input', updatePasswordMessage);

  second.addEventListener('submit', (event) => {
    event.preventDefault();
    signupError.textContent = '';
    signupError.className = 'auth-message full-field';
    if (!second.reportValidity()) return;
    if (passwordInput.value !== passwordConfirmInput.value) {
      passwordMessage.textContent = '입력한 두 비밀번호가 서로 다릅니다.';
      passwordMessage.className = 'field-note error';
      passwordConfirmInput.focus();
      return;
    }
    if (!usernameAvailable) {
      usernameMessage.textContent = '먼저 아이디 중복 확인을 해주세요.';
      usernameMessage.className = 'field-note error';
      return;
    }

    const members = readMembers();
    const username = idInput.value.trim();
    const phoneExists = members.some(
      (member) => normalizePhone(member.phone) === normalizePhone(personalInfo.phone)
    );
    if (phoneExists) {
      signupError.textContent = '이미 가입된 전화번호입니다. 가입을 완료할 수 없습니다.';
      signupError.className = 'auth-message full-field error';
      return;
    }
    if (members.some((member) => member.username.toLowerCase() === username.toLowerCase())) {
      usernameAvailable = false;
      usernameMessage.textContent = '이미 사용 중인 아이디입니다. 다른 아이디를 입력해 주세요.';
      usernameMessage.className = 'field-note error';
      return;
    }

    const formData = new FormData(second);
    const member = {
      ...personalInfo,
      phone: normalizePhone(personalInfo.phone),
      username,
      password: formData.get('password'),
      nickname: String(formData.get('nickname')).trim(),
      avatar: '♙'
    };
    members.push(member);
    saveMembers(members);
    window.navigatePage('login', {registered:true});
  });
}

const login = document.getElementById('login-form');
if (login) {
  login.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(login);
    const username = String(data.get('username')).trim();
    const password = data.get('password');
    const member = readMembers().find(
      (item) => item.username.toLowerCase() === username.toLowerCase() && item.password === password
    );
    const message = document.getElementById('login-message');
    if (!member) {
      message.textContent = '아이디 또는 비밀번호를 확인해 주세요.';
      message.className = 'auth-message full-field error';
      return;
    }
    const avatars = ['🐨', '🦘', '🦋', '🐻', '🦊', '🐼', '🐯', '🐰', '🐸', '🐳', '🦄', '🐙'];
    member.avatar = avatars[Math.floor(Math.random() * avatars.length)];
    localStorage.setItem('ember-oak-user', JSON.stringify(member));
    const next = new URLSearchParams(location.search).get('next');
    const hashParams = new URLSearchParams(location.hash.slice(1).replace(/^route=[^&]+&?/, ''));
    window.navigatePage('home', {welcome:true, anchor:next === 'membership' || hashParams.get('anchor') === 'membership' ? 'membership' : undefined});
    setTimeout(() => location.reload(), 0);
  });
}

if (location.search.includes('registered=1')) {
  const message = document.getElementById('login-message');
  if (message) {
    message.textContent = '가입이 완료되었습니다. 새 아이디와 비밀번호로 로그인해 주세요.';
    message.className = 'auth-message full-field success';
    history.replaceState({}, '', location.pathname);
  }
}

if (location.search.includes('welcome=1')) {
  history.replaceState({}, '', location.pathname);
  const current = JSON.parse(localStorage.getItem('ember-oak-user') || '{}');
  const toast = document.createElement('div');
  toast.className = 'welcome-toast';
  toast.textContent = `환영합니다, ${current.nickname || '회원'}님!`;
  document.body.append(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => toast.remove(), 3600);
}


// ===== catalog.js =====
window.initCatalog = () => {
const catalog = {
  steak: {
    label: '스테이크', english: 'STEAK FROM THE FIRE', icon: '🥩', intro: '숙성의 시간을 지나 참나무 숯불을 만난 스테이크. 겉은 깊게 시어링하고 속은 원하는 굽기로 정성껏 완성합니다.',
    products: [
      ['오크 숙성 티본 스테이크','채끝과 안심을 한 번에 즐기는 티본을 28일간 드라이 에이징해 고소한 풍미를 살렸습니다.','28일 숙성 · 참나무 숯불'],
      ['통후추 크러스트 채끝','굵게 간 통후추와 허브 버터를 더해 씹을수록 진한 향이 퍼지는 채끝 스테이크입니다.','후추 크러스트 · 허브 버터'],
      ['참나무 훈연 폭립','부드럽게 익힌 돼지 등갈비에 은은한 참나무 향과 달콤한 글레이즈를 입혔습니다.','슬로우 쿠킹 · 하우스 글레이즈'],
      ['솔트 시어드 립아이','두툼한 립아이를 센 불에 빠르게 구워 육즙과 고소한 마블링을 즐기는 메뉴입니다.','시그니처 시어링 · 씨솔트']
    ]
  },
  kids: {
    label: '어린이 메뉴', english: 'LITTLE OAKS · KIDS MENU', icon: '🍽️', ageNote: '권장 연령 만 3–12세 · 보호자 동반 권장', intro: '아이들도 편안하게 즐길 수 있도록 익숙한 맛과 알맞은 양으로 준비한 메뉴입니다. 알레르기 및 식단 제한은 주문 전 매장에 확인해 주세요.',
    products: [
      ['미니 오크 스테이크 플레이트','부드러운 미니 스테이크와 밥, 계절 채소를 담은 어린이 한 접시입니다.','미니 스테이크 · 밥 · 채소'],
      ['키즈 치킨 라이스','그릴 치킨과 고슬고슬한 밥, 달콤한 옥수수를 함께 담았습니다.','그릴 치킨 · 라이스 · 콘'],
      ['키즈 미트소스 파스타','순한 토마토 미트소스와 한입 크기 파스타로 완성한 메뉴입니다.','토마토 미트소스 · 파스타'],
      ['과일 요거트 컵','제철 과일과 부드러운 요거트를 담은 어린이 디저트입니다.','제철 과일 · 요거트']
    ]
  },  sides: {
    label: '사이드 메뉴', english: 'A LITTLE MORE TO SHARE', icon: '🥔', intro: '숯불 향이 감도는 메인 메뉴에 곁들이기 좋은 사이드. 한 접시를 더해 테이블을 풍성하게 채워보세요.',
    products: [
      ['트러플 오크 매시','부드러운 감자에 트러플 오일과 구운 마늘을 더해 고소하게 완성했습니다.','감자 · 트러플 · 구운 마늘'],
      ['스모크드 체다 프라이','바삭하게 튀긴 감자에 훈연 체다 소스와 파슬리를 듬뿍 올렸습니다.','크리스피 포테이토 · 체다'],
      ['허니 글레이즈 콘','달콤한 옥수수를 버터와 꿀에 구워 가장자리에 은은한 불향을 입혔습니다.','버터 로스트 · 허니 글레이즈'],
      ['버터 로스티드 머쉬룸','제철 버섯을 허브 버터에 볶고 타임 향을 더한 따뜻한 사이드입니다.','제철 버섯 · 허브 버터']
    ]
  },
  pasta: {
    label: '파스타', english: 'PASTA, MADE WITH CARE', icon: '🍝', intro: '매일 준비하는 소스와 알맞게 삶은 면, 좋은 재료를 더해 한 접시씩 정성껏 만듭니다.',
    products: [
      ['크림 머쉬룸 링귀니','구운 버섯과 파마산을 진한 크림소스에 담아낸 고소한 링귀니입니다.','버섯 · 크림 · 파마산'],
      ['칠리 토마토 새우 파스타','탱글한 새우와 산뜻한 토마토소스에 은은한 칠리의 매콤함을 더했습니다.','새우 · 토마토 · 칠리'],
      ['오크 베이컨 크림 펜네','참나무 향을 입힌 베이컨과 크림소스가 펜네 사이사이에 깊이 배어듭니다.','훈연 베이컨 · 크림'],
      ['레몬 허브 치킨 파스타','숯불에 구운 치킨과 레몬 제스트, 허브 오일로 산뜻하게 마무리했습니다.','그릴 치킨 · 레몬 · 허브']
    ]
  },
  drinks: {
    label: '음료', english: 'SIP SOMETHING BRIGHT', icon: '🥤', intro: '진한 스테이크와 잘 어울리는 클래식 음료부터 과일과 허브를 담은 하우스 에이드까지 준비했습니다.',
    products: [
      ['콜라','얼음 가득 시원하게 즐기는 클래식 탄산음료입니다.','클래식 · 아이스'],
      ['사이다','깔끔하고 청량한 기포가 입안을 산뜻하게 정리해 줍니다.','시트러스 · 아이스'],
      ['오렌지 주스','상큼하고 달콤한 오렌지 풍미를 담은 주스입니다.','오렌지 · 프레시'],
      ['자몽 로즈마리 에이드','자몽의 산뜻한 쌉싸름함과 로즈마리 향을 탄산에 담았습니다.','하우스 에이드 · 허브'],
      ['레몬 스파클링','레몬을 직접 짜 넣어 산뜻한 여운을 남기는 스파클링 음료입니다.','레몬 · 탄산']
    ]
  },
  wine: {
    label: '와인', english: 'A GOOD POUR FOR THE TABLE', icon: '🍷', intro: '숯불 스테이크와의 조화를 생각해 고른 와인. 취향과 메뉴에 맞는 한 잔을 편안하게 추천해 드립니다.',
    products: [
      ['하우스 카베르네 소비뇽','잘 익은 검은 과실 향과 부드러운 탄닌이 스테이크의 풍미를 받쳐줍니다.','레드 · 바디감 있는 스타일','오크 숙성 티본 스테이크 · 버터 로스티드 머쉬룸'],
      ['오크 셀러 쉬라즈','검붉은 과실의 향과 은은한 스파이스가 참나무 숯불 요리와 어울립니다.','레드 · 스파이스 노트','통후추 크러스트 채끝 · 스모크드 체다 프라이'],
      ['가든 로제 피노','붉은 베리의 산뜻함과 가벼운 여운을 담아 다양한 메뉴에 곁들이기 좋습니다.','로제 · 산뜻한 스타일','참나무 훈연 폭립 · 허니 글레이즈 콘'],
      ['브뤼 스파클링','섬세한 기포와 산뜻한 과실 향으로 식사의 시작을 경쾌하게 열어줍니다.','스파클링 · 브뤼','솔트 시어드 립아이 · 트러플 오크 매시']
    ]
  }
};

const menuDetails = {
  '미니 오크 스테이크 플레이트':{price:'18,000원',allergens:'우유(버터)',origin:'쇠고기: 미국산 / 쌀: 국내산'},
  '키즈 치킨 라이스':{price:'12,000원',allergens:'해당 없음',origin:'닭고기: 국내산 / 쌀: 국내산'},
  '키즈 미트소스 파스타':{price:'13,000원',allergens:'밀, 우유',origin:'쇠고기: 국내산 / 파스타: 이탈리아산'},
  '과일 요거트 컵':{price:'7,000원',allergens:'우유',origin:'과일: 국내산·수입산 / 요거트: 국내산'},
  '오크 숙성 티본 스테이크':{price:'79,000원',allergens:'우유(버터)',origin:'쇠고기: 미국산'},
  '통후추 크러스트 채끝':{price:'52,000원',allergens:'우유(허브 버터)',origin:'쇠고기: 미국산'},
  '참나무 훈연 폭립':{price:'42,000원',allergens:'대두, 밀(글레이즈)',origin:'돼지고기: 스페인산'},
  '솔트 시어드 립아이':{price:'58,000원',allergens:'우유(버터)',origin:'쇠고기: 미국산'},
  '트러플 오크 매시':{price:'9,000원',allergens:'우유',origin:'감자: 국내산 / 트러플 오일: 수입산'},
  '스모크드 체다 프라이':{price:'11,000원',allergens:'우유, 대두',origin:'감자: 국내산 / 치즈: 미국산'},
  '허니 글레이즈 콘':{price:'8,000원',allergens:'우유',origin:'옥수수: 국내산'},
  '버터 로스티드 머쉬룸':{price:'10,000원',allergens:'우유',origin:'버섯: 국내산'},
  '크림 머쉬룸 링귀니':{price:'21,000원',allergens:'밀, 우유, 달걀',origin:'버섯: 국내산 / 파스타: 이탈리아산'},
  '칠리 토마토 새우 파스타':{price:'23,000원',allergens:'밀, 갑각류, 토마토',origin:'새우: 베트남산 / 파스타: 이탈리아산'},
  '오크 베이컨 크림 펜네':{price:'22,000원',allergens:'밀, 우유',origin:'돼지고기: 국내산 / 파스타: 이탈리아산'},
  '레몬 허브 치킨 파스타':{price:'21,000원',allergens:'밀',origin:'닭고기: 국내산 / 파스타: 이탈리아산'},
  '콜라':{price:'4,000원',allergens:'해당 없음',origin:'음료: 국내 제조'},
  '사이다':{price:'4,000원',allergens:'해당 없음',origin:'음료: 국내 제조'},
  '오렌지 주스':{price:'6,000원',allergens:'해당 없음',origin:'오렌지: 수입산'},
  '자몽 로즈마리 에이드':{price:'7,000원',allergens:'해당 없음',origin:'자몽: 수입산 / 로즈마리: 국내산'},
  '레몬 스파클링':{price:'6,000원',allergens:'해당 없음',origin:'레몬: 수입산'},
  '하우스 카베르네 소비뇽':{price:'글라스 14,000원 / 병 68,000원',allergens:'아황산류 함유 가능',origin:'와인: 칠레산'},
  '오크 셀러 쉬라즈':{price:'글라스 15,000원 / 병 72,000원',allergens:'아황산류 함유 가능',origin:'와인: 호주산'},
  '가든 로제 피노':{price:'글라스 13,000원 / 병 62,000원',allergens:'아황산류 함유 가능',origin:'와인: 프랑스산'},
  '브뤼 스파클링':{price:'글라스 16,000원 / 병 78,000원',allergens:'아황산류 함유 가능',origin:'와인: 스페인산'}
};
const categoryLinks = [
  ['steak', 'steak.html'], ['kids', 'kids.html'], ['sides', 'sides.html'], ['pasta', 'pasta.html'], ['drinks', 'drinks.html'], ['wine', 'wine.html']
];
const content = document.querySelector('.product-route[data-route="' + (window.currentPageRoute || 'products') + '"]');
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

if (content?.dataset.category === 'overview') {
  document.title = '메뉴 소개 — EMBER & OAK';
  content.innerHTML = `<section class="catalog-hero"><div class="catalog-hero-copy"><span class="eyebrow"><i class="status-dot"></i> OUR MENU</span><h1>불에서 시작해<br><em>테이블에 머무는 맛.</em></h1><p>숙성 스테이크부터 함께 나누는 사이드와 파스타,<br>식사를 완성하는 음료와 와인까지 만나보세요.</p><div class="catalog-note">EMBER &amp; OAK · A MENU MADE FOR GATHERING</div></div><div class="catalog-hero-art"><div class="catalog-plate">🥩</div><span>FIRE<br>AGED<br>SHARED</span></div></section><section class="featured-menu"><div class="featured-heading"><span class="eyebrow">CHEF’S PICKS · SIGNATURE SETS</span><h2>무엇을 고를지 고민될 때,<br><em>가장 사랑받는 조합부터.</em></h2><p>숯불 스테이크와 잘 어울리는 메뉴를 한 상으로 제안합니다.</p></div><div class="featured-grid"><a class="featured-card featured-set" href="steak.html"><span class="featured-label">SIGNATURE SET · 01</span><span class="featured-icon">🥩</span><div><h3>엠버 시그니처 한 상</h3><p>오크 숙성 티본 스테이크 · 트러플 오크 매시 · 버터 로스티드 머쉬룸</p></div><b class="featured-link">세트 구성 보기 ↗</b></a><a class="featured-card featured-set" href="steak.html"><span class="featured-label">FOR TWO · 02</span><span class="featured-icon">🔥</span><div><h3>둘이서 나누는 숯불 테이블</h3><p>통후추 크러스트 채끝 · 스모크드 체다 프라이 · 자몽 로즈마리 에이드 2잔</p></div><b class="featured-link">메뉴 살펴보기 ↗</b></a><a class="featured-card featured-popular" href="steak.html"><span class="featured-label">MOST LOVED · BEST 01</span><span class="featured-icon">⭐</span><div><h3>가장 인기 있는 메뉴</h3><p>오크 숙성 티본 스테이크<br>28일 숙성과 참나무 숯불 향을 함께 즐기는 시그니처.</p></div><b class="featured-link">스테이크 메뉴 보기 ↗</b></a></div><p class="featured-note">세트 구성은 메뉴 조합을 제안하는 콘셉트이며, 실제 판매·가격 정보는 포함하지 않습니다.</p></section><section class="menu-finder" id="menu-finder"><div class="section-heading"><div><span class="eyebrow">FIND YOUR FAVORITE</span><h2>내 취향에 맞는<br>메뉴를 찾아보세요.</h2></div><p>유형·예시 가격·피하고 싶은 성분으로<br>메뉴를 빠르게 살펴볼 수 있어요.</p></div><div class="menu-filter-controls"><label>메뉴 검색<input id="menu-search" type="search" placeholder="메뉴 이름이나 재료"></label><label>메뉴 유형<select id="menu-category"><option value="all">전체 메뉴</option><option value="steak">스테이크</option><option value="sides">사이드 메뉴</option><option value="pasta">파스타</option><option value="drinks">음료</option><option value="wine">와인</option></select></label><label>가격대<select id="menu-price"><option value="all">전체</option><option value="20000">2만원 이하</option><option value="40000">4만원 이하</option><option value="60000">6만원 이하</option><option value="80000">8만원 이하</option></select></label><label>피하고 싶은 성분<select id="menu-allergen"><option value="all">선택 안 함</option><option value="우유">우유</option><option value="대두">대두</option><option value="밀">밀</option><option value="달걀">달걀</option><option value="갑각류">갑각류</option><option value="토마토">토마토</option><option value="아황산류">아황산류</option></select></label></div><p class="menu-filter-note">가격은 가상 예시이며, 와인은 글라스 가격 기준으로 필터링합니다. 알레르기 필터는 표기된 성분만 참고해 메뉴를 거르며, 교차 접촉 가능성이나 안전을 보장하지 않습니다. 이용 전 매장에 반드시 확인해 주세요.</p><p class="menu-filter-count" id="menu-filter-count" aria-live="polite"></p><div class="menu-filter-grid" id="menu-filter-results"></div></section><section class="catalog-section"><div class="section-heading"><div><span class="eyebrow">EXPLORE THE MENU</span><h2>오늘의 테이블을<br>골라보세요.</h2></div><p>각 메뉴는 가상 브랜드 콘셉트에 맞춰<br>새롭게 구성한 소개입니다.</p></div><div class="catalog-grid">${categoryLinks.map(([key, href], index) => {const item=catalog[key];return `<a class="catalog-tile catalog-${key}" href="${href}"><span class="catalog-index">0${index+1} / MENU</span><span class="catalog-icon">${item.icon}</span>${item.ageNote ? `<span class="catalog-age-note">${esc(item.ageNote)}</span>` : ''}<h3>${esc(item.label)}</h3><p>${esc(item.intro)}</p><span class="catalog-link">카테고리 보기 <b>↗</b></span></a>`}).join('')}</div></section>`;
} else if (content) {
  const key = content.dataset.category;
  const item = catalog[key];
  if (item) {
    document.title = `${item.label} — EMBER & OAK`;
    const index = categoryLinks.findIndex(([category]) => category === key);
    content.innerHTML = `<section class="category-hero"><div class="category-hero-copy"><div class="breadcrumb"><a href="index.html">HOME</a><span>/</span><a href="products.html">MENU</a><span>/</span><b>${esc(item.label.toUpperCase())}</b></div><span class="eyebrow">${esc(item.english)}</span><h1>${esc(item.label)}<br><em>엠버 앤 오크의 한 접시.</em></h1><p>${esc(item.intro)}</p>${item.ageNote ? `<p class="kids-age-note">${esc(item.ageNote)}</p>` : ''}<a class="button button-blue" href="#menu-items">메뉴 살펴보기 <span>↓</span></a></div><div class="category-hero-art category-art-${key}"><div>${item.icon}</div><span>EMBER<br>&amp; OAK</span></div></section><section class="category-products" id="menu-items"><div class="section-heading"><div><span class="eyebrow">${esc(item.english)}</span><h2>${esc(item.label)} 메뉴</h2></div><span class="category-counter">0${item.products.length} ITEMS</span></div><div class="product-card-grid">${item.products.map(([name, description, notes], itemIndex) => {const detail=menuDetails[name]||{};return `<article class="menu-product-card"><div class="product-card-top"><span class="product-card-index">${String(itemIndex+1).padStart(2,'0')}</span><span class="product-card-symbol">${item.icon}</span><span class="product-card-mark">EMBER &amp; OAK</span></div><div class="product-card-copy"><span class="product-note">${esc(notes)}</span><h3>${esc(name)}</h3><p>${esc(description)}</p>${key === 'wine' ? `<div class="wine-pairing"><span>PAIRING · 추천 메뉴</span><strong>${esc(item.products[itemIndex][3])}</strong></div>` : ''}<dl class="menu-facts"><div><dt>가격</dt><dd>${detail.price ? detail.price.split(' / ').map(esc).join('<br>') : '가격 미정'}</dd></div><div><dt>알레르기</dt><dd>${esc(detail.allergens||'매장 확인')}</dd></div><div><dt>원산지</dt><dd>${detail.origin ? detail.origin.split(' / ').map(esc).join('<br>') : '매장 확인'}</dd></div></dl></div></article>`}).join('')}</div>${key === 'wine' ? '<p class="wine-notice">주류 메뉴는 성인에게만 제공됩니다. 매장별 구성은 달라질 수 있습니다.</p>' : ''}<div class="category-switcher"><span>다른 메뉴도 둘러보세요</span>${categoryLinks.filter(([category])=>category!==key).map(([category,href])=>`<a href="${href}">${esc(catalog[category].label)} <b>↗</b></a>`).join('')}</div><p class="catalog-disclaimer">메뉴·가격·원산지·알레르기 정보는 가상 브랜드 시안을 위한 예시이며 실제 판매 정보가 아닙니다. 알레르기가 있다면 이용 전 매장에서 원재료와 교차 접촉 가능성을 확인해 주세요.</p></section>`;
  }
}

if (content?.dataset.category === 'overview') {
  const search = document.getElementById('menu-search');
  const categoryFilter = document.getElementById('menu-category');
  const priceFilter = document.getElementById('menu-price');
  const allergenFilter = document.getElementById('menu-allergen');
  const results = document.getElementById('menu-filter-results');
  const count = document.getElementById('menu-filter-count');
  const rows = Object.entries(catalog).flatMap(([key, section]) => section.products.map(([name, description, notes]) => ({key, section, name, description, notes, detail:menuDetails[name] || {}})));
  const renderFilteredMenu = () => {
    const term = search.value.trim().toLocaleLowerCase('ko-KR');
    const category = categoryFilter.value;
    const maxPrice = priceFilter.value === 'all' ? Infinity : Number(priceFilter.value);
    const avoid = allergenFilter.value;
    const filtered = rows.filter((row) => {
      const price = Number(String(row.detail.price || '').split(' / ')[0].replace(/[^0-9]/g, '')) || Infinity;
      const searchable = `${row.name} ${row.description} ${row.notes}`.toLocaleLowerCase('ko-KR');
      return (!term || searchable.includes(term)) && (category === 'all' || row.key === category) && price <= maxPrice && (avoid === 'all' || !String(row.detail.allergens || '').includes(avoid));
    });
    count.textContent = `${filtered.length}개 메뉴`;
    results.innerHTML = filtered.length ? filtered.map((row) => `<a class="menu-filter-card" href="${categoryLinks.find(([key])=>key===row.key)[1]}"><span>${esc(row.section.label)} · ${esc(row.notes)}</span><h3>${esc(row.name)}</h3><p>${esc(row.description)}</p><b>${esc(row.detail.price || '가격 미정')} <i>↗</i></b></a>`).join('') : '<p class="empty-inquiry">조건에 맞는 메뉴가 없습니다. 필터를 조정해 주세요.</p>';
  };
  [search, categoryFilter, priceFilter, allergenFilter].forEach((control) => control.addEventListener(control === search ? 'input' : 'change', renderFilteredMenu));
  renderFilteredMenu();
}
};
window.initCatalog();


// ===== inquiry.js =====
const inquiryStorageKey = 'ember-oak-inquiries';
const currentUser = JSON.parse(localStorage.getItem('ember-oak-user') || 'null');
const inquiryCategories = {
  menu: '메뉴·제품·알레르기·원산지',
  feedback: '칭찬·불편·개선 제안'
};
const getInquiries = () => JSON.parse(localStorage.getItem(inquiryStorageKey) || '[]');
const saveInquiries = (items) => localStorage.setItem(inquiryStorageKey, JSON.stringify(items));
const escapeText = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));
const inquiryForm = document.getElementById('inquiry-form');
const visibilityInputs = [...document.querySelectorAll('input[name="visibility"]')];
const privateNote = document.getElementById('private-login-note');
const message = document.getElementById('inquiry-message');

function renderInquiries() {
  const entries = getInquiries().sort((first, second) => second.createdAt.localeCompare(first.createdAt));
  const isAdmin = currentUser?.role === 'admin';
  const visiblePublic = entries.filter((entry) => entry.visibility === 'public');
  const mine = entries.filter((entry) => entry.visibility === 'private' && currentUser && (entry.ownerKey === currentUser.username.toLowerCase() || currentUser.role === 'admin'));
  const publicList = document.getElementById('inquiry-list');
  const privateList = document.getElementById('private-inquiry-list');
  document.getElementById('inquiry-count').textContent = `${visiblePublic.length}건`;
  publicList.innerHTML = visiblePublic.length ? visiblePublic.map((entry) => `
    <article class="inquiry-post">
      <div class="post-meta"><span>${escapeText(inquiryCategories[entry.category] || '기타')}</span><time>${new Date(entry.createdAt).toLocaleDateString('ko-KR')}</time></div>
      <h3>${escapeText(entry.title)}</h3><p>${escapeText(entry.content).replace(/\n/g, '<br>')}</p>
      <small>작성자 ${escapeText(entry.displayAuthor || '고객')}</small>
      ${entry.reply ? `<div class="inquiry-reply"><b>EMBER &amp; OAK 답변</b><p>${escapeText(entry.reply.content).replace(/\n/g, '<br>')}</p><small>${new Date(entry.reply.createdAt).toLocaleDateString('ko-KR')}</small></div>` : ''}
      ${isAdmin ? `<small class="admin-contact">관리자 연락처: ${escapeText(entry.contactEmail || '이메일 없음')}</small>` : ''}
    </article>`).join('') : '<p class="empty-inquiry">아직 등록된 공개 문의가 없습니다.</p>';
  const privateBoard = document.getElementById('private-board');
  privateBoard.hidden = !currentUser;
  privateList.innerHTML = mine.length ? mine.map((entry) => `
    <article class="inquiry-post private-post">
      <div class="post-meta"><span>${escapeText(inquiryCategories[entry.category] || '기타')} · 비밀</span><time>${new Date(entry.createdAt).toLocaleDateString('ko-KR')}</time></div>
      <h3>${escapeText(entry.title)}</h3><p>${escapeText(entry.content).replace(/\n/g, '<br>')}</p>
      <small>${isAdmin ? `관리자 문의자 연락처: ${escapeText(entry.contactEmail || '이메일 없음')}` : '작성자 본인에게만 표시됩니다.'}</small>
      ${entry.reply ? `<div class="inquiry-reply"><b>EMBER &amp; OAK 답변</b><p>${escapeText(entry.reply.content).replace(/\n/g, '<br>')}</p><small>${new Date(entry.reply.createdAt).toLocaleDateString('ko-KR')}</small></div>` : ''}
    </article>`).join('') : '<p class="empty-inquiry">내 비밀 문의가 없습니다.</p>';
}

function updateVisibility() {
  const isPrivate = document.querySelector('input[name="visibility"]:checked')?.value === 'private';
  privateNote.hidden = !isPrivate || Boolean(currentUser);
}
visibilityInputs.forEach((input) => input.addEventListener('change', updateVisibility));

if (currentUser) {
  inquiryForm.elements.author.value = currentUser.nickname || currentUser.name || '';
  inquiryForm.elements.email.value = currentUser.email || '';
}

inquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  message.textContent = '';
  message.className = 'auth-message';
  if (!inquiryForm.reportValidity()) return;
  const formData = new FormData(inquiryForm);
  const visibility = formData.get('visibility');
  if (visibility === 'private' && !currentUser) {
    message.textContent = '비밀 문의는 로그인 후 등록할 수 있습니다.';
    message.className = 'auth-message error';
    return;
  }
  const entry = {
    id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    category: formData.get('category'),
    visibility,
    title: String(formData.get('title')).trim(),
    content: String(formData.get('content')).trim(),
    contactEmail: String(formData.get('email')).trim(),
    displayAuthor: visibility === 'public' ? '엠버 앤 오크 고객' : currentUser.nickname,
    ownerKey: currentUser?.username?.toLowerCase() || null,
    createdAt: new Date().toISOString(),
    status: 'received',
    reply: null
  };
  const inquiries = getInquiries();
  inquiries.push(entry);
  saveInquiries(inquiries);
  inquiryForm.elements.title.value = '';
  inquiryForm.elements.content.value = '';
  message.textContent = visibility === 'private' ? '비밀 문의가 등록되었습니다.' : '공개 문의가 등록되었습니다.';
  message.className = 'auth-message success';
  renderInquiries();
});

renderInquiries();
updateVisibility();


// ===== reservation.js =====
(() => {
  const form = document.getElementById('reservation-form');
  const confirmation = document.getElementById('reservation-confirmation');
  const summary = document.getElementById('reservation-summary');
  const dateInput = document.getElementById('reservation-date');
  if (!form || !confirmation || !summary || !dateInput) return;

  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localToday;

  const labels = {
    store: '매장', date: '날짜', time: '시간', name: '예약자', phone: '전화번호', guests: '인원', occasion: '기념일', occasionService: '희망 서비스', request: '추가 요청'
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    data.createdAt = new Date().toISOString();
    const requests = JSON.parse(localStorage.getItem('ember-oak-reservation-requests') || '[]');
    requests.push(data);
    localStorage.setItem('ember-oak-reservation-requests', JSON.stringify(requests));

    summary.replaceChildren();
    Object.entries(labels).forEach(([key, label]) => {
      const value = data[key]?.trim() || (key === 'request' ? '없음' : '');
      if (!value) return;
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const description = document.createElement('dd');
      term.textContent = label;
      description.textContent = key === 'guests' ? `${value}명` : value;
      row.append(term, description);
      summary.append(row);
    });
    form.hidden = true;
    confirmation.hidden = false;
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('reservation-reset').addEventListener('click', () => {
    form.reset();
    dateInput.min = localToday;
    form.hidden = false;
    confirmation.hidden = true;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();


// ===== admin.js =====
(() => {
  const memberKey = 'ember-oak-members';
  const sessionKey = 'ember-oak-admin-session';
  const inquiryKey = 'ember-oak-inquiries';
  const members = () => JSON.parse(localStorage.getItem(memberKey) || '[]');
  const demoAdminUsername = 'ajm5024';
  const demoAdminPassword = 'ajm1512@';
  const provisionDemoAdmin = () => {
    const items = members();
    let account = items.find((member) => member.username.toLowerCase() === demoAdminUsername);
    if (!account) {
      account = {
        name: '엠버 앤 오크 관리자',
        gender: '선택 안 함',
        birth: '',
        phone: '00000000000',
        email: 'admin@emberoak.demo',
        username: demoAdminUsername,
        nickname: '관리자',
        avatar: '🛡️'
      };
      items.push(account);
    }
    account.password = demoAdminPassword;
    account.role = 'admin';
    account.nickname ||= '관리자';
    account.avatar ||= '🛡️';
    localStorage.setItem(memberKey, JSON.stringify(items));
  };
  provisionDemoAdmin();
  const inquiries = () => JSON.parse(localStorage.getItem(inquiryKey) || '[]');
  const saveInquiries = (items) => localStorage.setItem(inquiryKey, JSON.stringify(items));
  const byUsername = (username) => members().find((member) => member.role === 'admin' && member.username.toLowerCase() === username.toLowerCase());
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const loginForm = document.getElementById('admin-login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(loginForm);
      const username = String(data.get('username')).trim();
      const admin = byUsername(username);
      const message = document.getElementById('admin-login-message');
      if (!admin || admin.password !== data.get('password')) {
        message.textContent = '관리자 아이디 또는 비밀번호를 확인해 주세요.';
        message.className = 'auth-message error';
        return;
      }
      sessionStorage.setItem(sessionKey, admin.username);
      window.navigatePage('admin');
    });
  }

  const list = document.getElementById('admin-inquiry-list');
  if (!list) return;
  let admin = null;

  const categoryLabels = {menu:'메뉴·알레르기·원산지', feedback:'칭찬·불편·개선 제안'};
  const statusLabels = {received:'접수', 'in-progress':'답변 중', answered:'답변 완료'};
  const render = () => {
    const visibility = document.getElementById('filter-visibility').value;
    const category = document.getElementById('filter-category').value;
    const status = document.getElementById('filter-status').value;
    const entries = inquiries().sort((a,b) => b.createdAt.localeCompare(a.createdAt)).filter((entry) =>
      (visibility === 'all' || entry.visibility === visibility) &&
      (category === 'all' || entry.category === category) &&
      (status === 'all' || (entry.status || 'received') === status)
    );
    document.getElementById('admin-inquiry-count').textContent = `표시 중 ${entries.length}건`;
    if (!entries.length) {
      list.innerHTML = '<p class="empty-inquiry">조건에 맞는 문의가 없습니다.</p>';
      return;
    }
    list.innerHTML = entries.map((entry) => `<article class="admin-inquiry-card" data-entry-id="${escapeHtml(entry.id)}">
      <div class="admin-inquiry-meta"><span>${escapeHtml(categoryLabels[entry.category] || '기타')}</span><span>${entry.visibility === 'private' ? '비밀 문의' : '공개 문의'}</span><time>${new Date(entry.createdAt).toLocaleString('ko-KR')}</time></div>
      <h3>${escapeHtml(entry.title)}</h3><p class="admin-inquiry-content">${escapeHtml(entry.content).replace(/\n/g,'<br>')}</p>
      <div class="admin-contact-grid"><span>작성자 <b>${escapeHtml(entry.displayAuthor || '고객')}</b></span><span>아이디 <b>${escapeHtml(entry.ownerKey || '비회원')}</b></span><span>이메일 <b>${escapeHtml(entry.contactEmail || '미입력')}</b></span></div>
      ${entry.reply ? `<div class="admin-existing-reply"><b>현재 답변</b><p>${escapeHtml(entry.reply.content).replace(/\n/g,'<br>')}</p></div>` : ''}
      <label class="admin-reply-field">관리자 답변<textarea rows="4" maxlength="3000" data-reply placeholder="문의에 대한 답변을 작성해 주세요.">${escapeHtml(entry.reply?.content || '')}</textarea></label>
      <div class="admin-inquiry-actions"><label>처리 상태<select data-status><option value="received" ${(entry.status||'received')==='received'?'selected':''}>접수</option><option value="in-progress" ${entry.status==='in-progress'?'selected':''}>답변 중</option><option value="answered" ${entry.status==='answered'?'selected':''}>답변 완료</option></select></label><button type="button" class="button button-blue" data-save>답변·상태 저장 <span>↗</span></button></div>
    </article>`).join('');
    list.querySelectorAll('[data-save]').forEach((button) => button.addEventListener('click', () => {
      const card = button.closest('[data-entry-id]');
      const items = inquiries();
      const entry = items.find((item) => item.id === card.dataset.entryId);
      if (!entry) return;
      const content = card.querySelector('[data-reply]').value.trim();
      const nextStatus = card.querySelector('[data-status]').value;
      entry.status = nextStatus;
      entry.reply = content ? {content, author: admin.username, createdAt: new Date().toISOString()} : null;
      saveInquiries(items);
      render();
    }));
  };
  ['filter-visibility','filter-category','filter-status'].forEach((id) => document.getElementById(id).addEventListener('change', render));
  document.getElementById('admin-logout').addEventListener('click', () => {
    sessionStorage.removeItem(sessionKey);
    window.navigatePage('admin-login');
  });
  const activateAdmin = () => {
    if (window.currentPageRoute !== 'admin') return;
    const adminUsername = sessionStorage.getItem(sessionKey);
    admin = adminUsername && byUsername(adminUsername);
    if (!admin) {
      sessionStorage.removeItem(sessionKey);
      window.navigatePage('admin-login');
      return;
    }
    document.getElementById('admin-greeting').textContent = `SIGNED IN · ${admin.nickname || admin.username}`;
    render();
  };
  window.addEventListener('hashchange', activateAdmin);
  activateAdmin();
})();

