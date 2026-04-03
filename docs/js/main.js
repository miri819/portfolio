/* =========================================
   Portfolio Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Dark Mode --- */
  const htmlEl = document.documentElement;
  const darkToggle = document.getElementById('darkToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);
  darkToggle.addEventListener('click', function () {
    const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* --- Mobile Menu --- */
  const menuBtn = document.getElementById('menuBtn');
  const gnbNav  = document.getElementById('gnbNav');
  menuBtn.addEventListener('click', function () { gnbNav.classList.toggle('open'); });
  gnbNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { gnbNav.classList.remove('open'); });
  });

  /* --- Scroll Progress Bar --- */
  var progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }

  /* --- Active Nav & Page Dots --- */
  var sections   = document.querySelectorAll('section[id]');
  var navLinks   = document.querySelectorAll('.gnb-nav a[href^="#"]');
  var pageDotEls = document.querySelectorAll('.page-dot[data-section]');
  function updateActiveNav() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      var sTop = section.offsetTop, sH = section.offsetHeight, sId = section.getAttribute('id');
      if (scrollY >= sTop && scrollY < sTop + sH) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        pageDotEls.forEach(function (d) { d.classList.remove('active'); });
        var link = document.querySelector('.gnb-nav a[href="#' + sId + '"]');
        var dot  = document.querySelector('.page-dot[data-section="' + sId + '"]');
        if (link) link.classList.add('active');
        if (dot)  dot.classList.add('active');
      }
    });
  }

  /* --- GNB shadow --- */
  var gnb = document.querySelector('.gnb');
  function updateGnbShadow() {
    gnb.style.boxShadow = window.scrollY > 10 ? '0 2px 16px rgba(192,65,90,0.12)' : 'none';
  }

  window.addEventListener('scroll', function () {
    updateProgress(); updateActiveNav(); updateGnbShadow();
  }, { passive: true });
  updateProgress(); updateActiveNav(); updateGnbShadow();

  /* --- Typing Animation (Hero) --- */
  var typingEl = document.getElementById('typingText');
  var phrases  = ['JAVA Back-End Developer','SI Team Lead & Architect','Full-Stack Engineer','Public Web Developer','AI Enthusiast'];
  var phraseIdx = 0, charIdx = 0, isDeleting = false, typeDelay = 100;
  function type() {
    var current = phrases[phraseIdx];
    typingEl.textContent = isDeleting ? current.substring(0, charIdx - 1) : current.substring(0, charIdx + 1);
    charIdx += isDeleting ? -1 : 1;
    typeDelay = isDeleting ? 50 : 100;
    if (!isDeleting && charIdx === current.length) { isDeleting = true; typeDelay = 1800; }
    else if (isDeleting && charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; typeDelay = 400; }
    setTimeout(type, typeDelay);
  }
  setTimeout(type, 800);

  /* --- About Heading Typing Animation --- */
  var aboutH2 = document.querySelector('#about .about-text h2');
  if (aboutH2) {
    var line1 = '기획부터 개발, 테스트까지', line2 = '전 과정을 책임지는 개발자';
    aboutH2.innerHTML = '<span id="aboutTypeLine"></span><span class="about-type-cursor"></span>';
    var aboutTypeLine = document.getElementById('aboutTypeLine');
    var aboutTyped = false;
    var fullChars = (line1 + '\n' + line2).split('');
    var aboutObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !aboutTyped) {
        aboutTyped = true;
        var i = 0;
        (function tick() {
          if (i < fullChars.length) {
            aboutTypeLine.innerHTML = fullChars.slice(0, i + 1).join('').replace('\n', '<br>');
            i++;
            setTimeout(tick, fullChars[i - 1] === '\n' ? 260 : 52);
          } else {
            setTimeout(function () {
              var c = document.querySelector('.about-type-cursor');
              if (c) c.classList.add('cursor-hide');
            }, 1600);
          }
        })();
      }
    }, { threshold: 0.4 });
    aboutObs.observe(document.querySelector('#about'));
  }

  /* --- Contact Heading Typing Animation --- */
  var contactTypeLine   = document.getElementById('contactTypeLine');
  var contactTypeCursor = document.querySelector('.contact-type-cursor');
  if (contactTypeLine && contactTypeCursor) {
    var contactText  = '새로운 기회를 기다리고 있습니다.';
    var contactChars = contactText.split('');
    var contactTyped = false;
    var contactObs   = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !contactTyped) {
        contactTyped = true;
        contactTypeCursor.classList.add('typing-active');
        var i = 0;
        (function tick() {
          if (i < contactChars.length) {
            contactTypeLine.textContent = contactChars.slice(0, i + 1).join('');
            i++;
            setTimeout(tick, 68);
          }
          /* 타이핑 완료 후 커서는 계속 깜빡임 유지 */
        })();
      }
    }, { threshold: 0.5 });
    contactObs.observe(document.querySelector('#contact'));
  }

  /* --- Scroll Fade-in --- */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });

  /* --- Counter Animation --- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var step = target / (1600 / 16), current = 0;
    var timer = setInterval(function () {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.count-up').forEach(function (el) { counterObserver.observe(el); });

  /* --- Projects Search & Filter --- */
  var filterBtns   = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');
  var searchInput  = document.getElementById('projectSearch');
  var noResults    = document.getElementById('noResults');
  var activeFilter = 'all';
  function filterProjects() {
    var keyword = searchInput.value.trim().toLowerCase(), count = 0;
    projectCards.forEach(function (card) {
      var catMatch = (activeFilter === 'all' || card.getAttribute('data-category') === activeFilter);
      var keyMatch = (keyword === '' || card.textContent.toLowerCase().includes(keyword));
      card.style.display = (catMatch && keyMatch) ? 'flex' : 'none';
      if (catMatch && keyMatch) count++;
    });
    noResults.style.display = count === 0 ? 'block' : 'none';
  }
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      filterProjects();
    });
  });
  searchInput.addEventListener('input', filterProjects);

  /* --- Project View Toggle --- */
  var btnCardView     = document.getElementById('btnCardView');
  var btnTimelineView = document.getElementById('btnTimelineView');
  var cardView        = document.getElementById('cardView');
  var timelineView    = document.getElementById('timelineView');
  btnCardView.addEventListener('click', function () {
    btnCardView.classList.add('active'); btnTimelineView.classList.remove('active');
    cardView.style.display = 'block'; timelineView.classList.remove('visible');
  });
  btnTimelineView.addEventListener('click', function () {
    btnTimelineView.classList.add('active'); btnCardView.classList.remove('active');
    cardView.style.display = 'none'; timelineView.classList.add('visible');
  });

  /* =========================================
     Project Detail Modal
     ========================================= */
  var projectData = {
    'VPP 전력 모니터링 시스템': {
      problem: 'VPP(가상발전소) 전력 데이터를 실시간 모니터링하는 전용 시스템이 없어 수동 엑셀 관리에 의존. 데이터 누락과 이상 감지 지연 문제 발생.',
      role: '1인 단독 개발 — 요구사항 분석 → DB 설계 → Spring 백엔드 API → Chart.js 대시보드 → 테스트 전 과정.',
      solution: 'Spring MVC 기반 REST API로 실시간 데이터 수집 파이프라인 구축. PostgreSQL 시계열 최적화 스키마 설계. Chart.js 실시간 대시보드 및 임계값 초과 알림 기능 구현.',
      result: '실시간 전력 현황 모니터링 실현. 이상 감지 자동화로 대응 시간 단축. 단독 개발로 전체 일정 내 납품 완료.',
      tech: ['Java', 'Spring', 'Chart.js', 'PostgreSQL']
    },
    '계근 시스템': {
      problem: '마이빌더 기반 기존 프로그램 노후화로 웹 환경 활용 어려움 발생. 사용성과 관리 편의성 측면에서 개선 필요.',
      role: '백엔드 개발과 JSP 화면 퍼블리싱 전반 담당. 데이터 입력 API, 화물차 등록·관리, 측량 데이터 수정 기능 등 구현.',
      solution: '실시간 중량 입력 화면 및 이력 조회 기능 구현. MySQL 테이블 설계, 엑셀 내보내기 기능 적용.',
      result: '기존 프로그램을 웹 기반 시스템으로 개선. 속도와 사용성 향상, 화물차·고객·상품 관리의 직관성과 편의성 강화.',
      tech: ['Java', 'Spring', 'JSP', 'MySQL']
    },
    '5G/PC 반입반출 시스템': {
      problem: '공공기관 내 5G 기기 및 노트북 반출 시, 장비 목록 기반으로 반출 신청과 결재 처리가 가능한 시스템 필요. 타 포털 사용자도 접근할 수 있도록 SSO 로그인 연계 요구 존재.',
      role: '사용자 신청 영역 전반 담당. 5G 장비 목록 조회, 반출 신청, 반려 건 재상신 기능 구현 및 대여 일정·장비 선택 흐름 설계. 관련 DB 설계와 SSO 로그인 연계 API 구현 수행.',
      solution: '신청·반려·재상신·이력 조회 흐름 구현. Oracle DB 기반 데이터 구조 설계, 장비별 대여 일정 및 상태 관리 기능 개발, SSO 로그인 연동 처리 적용.',
      result: '반출 현황과 이력 조회 가능 구조 마련. 대여 기간 및 잔여 일정 확인, 엑셀 다운로드 기능 제공으로 관리 편의성 향상.',
      tech: ['Java', 'Spring', 'MyBatis', 'Cubrid']
    },
    '버스타다 (예약 / 관리자 시스템)': {
      problem: '버스 좌석 예약을 전화·수기로 처리하여 중복 예약 및 현황 파악 어려움 존재.',
      role: '2인 팀 중 백엔드 담당 — 예약 로직, 좌석 현황 API, DB 설계.',
      solution: '실시간 좌석 현황 조회 및 예약·취소 API 개발. 동시 예약 처리를 위한 트랜잭션 관리. 관리자 백오피스 예약 관리 기능 구현.',
      result: '온라인 예약 전환으로 중복 예약 0건 달성. 관리자 현황 파악 시간 단축.',
      tech: ['Java', 'Spring', 'JSP', 'MySQL']
    },
    '조합원 생일 조회 시스템': {
      problem: '노동조합 조합원 생일 관리를 수기 및 엑셀로 하여 누락 및 조회 불편 발생.',
      role: '1인 단독 개발 — 기획부터 DB 설계, 개발, 납품까지 전 과정.',
      solution: '조합원 데이터 등록/수정/조회 CRUD 구현. 당일·이달 생일 빠른 조회 기능. JSP 기반 관리자 화면 개발.',
      result: '단독 개발로 빠른 납품 완료. 조합원 생일 관리 업무 효율 개선.',
      tech: ['Java', 'Spring', 'JSP', 'MySQL']
    },
    '자료 공유 시스템': {
      problem: '조직 내 문서·자료를 이메일·USB로 공유하여 버전 관리 및 권한 통제 어려움 발생.',
      role: '3인 팀 중 백엔드 개발 및 ERD 설계 담당 — 권한 관리 모듈, 파일 업로드/다운로드 API.',
      solution: '역할별 권한(관리자/일반) 체계 설계 및 구현. 파일 업로드·다운로드 API 개발. 카테고리·검색 기능 구현.',
      result: '조직 내 문서 관리 일원화. 권한 체계로 자료 접근 통제 실현.',
      tech: ['Java', 'Spring', 'MyBatis', 'Oracle']
    },
    '코딩 테스트 시스템': {
      problem: '자사 채용 시 코딩 테스트를 외부 플랫폼에 의존. 비용 발생 및 커스터마이징 한계.',
      role: '1인 단독 개발 — 기획, 설계, 문제 출제 모듈, 채점 로직, 결과 통계 전 과정.',
      solution: '문제 출제·편집 관리자 페이지 개발. 응시자 코드 제출 및 자동 채점 로직 구현. 응시 결과 통계 대시보드 구현.',
      result: '사내 채용 프로세스에 즉시 적용. 외부 플랫폼 비용 절감. 맞춤형 문제 출제 가능.',
      tech: ['Java', 'Spring', 'JSP', 'MySQL']
    },
    '대전 동·서부 학교지원센터': {
      problem: '학교지원 서비스 신청을 전화·방문으로만 접수하여 처리 지연 및 정보 접근성 부족.',
      role: '2인 팀 중 백엔드 담당 — eGovFramework 기반 신청 접수 모듈, API, DB 설계.',
      solution: 'eGovFramework 기반 온라인 신청·접수 시스템 구현. 관리자 승인 처리 워크플로우 개발. PostgreSQL DB 설계 및 공지사항·게시판 기능 구현.',
      result: '온라인 신청 전환으로 접수 처리 시간 단축. 공공기관 웹 접근성 기준 충족.',
      tech: ['eGovFramework', 'Java', 'JSP', 'PostgreSQL']
    },
    '산업기술보호협회 홈페이지': {
      problem: '협회 업무(회원 관리, 교육 신청, 자료 배포)를 오프라인으로 처리하여 비효율 발생.',
      role: '2인 팀 중 백엔드 담당 — 회원 관리, 교육 신청 모듈, 자료실 API 개발.',
      solution: '회원가입·인증·권한 관리 시스템 구현. 교육 신청 및 수강 이력 관리 기능 개발. Cubrid DB 기반 자료실·공지사항 구현.',
      result: '협회 업무 온라인 일원화. 회원 서비스 접근성 향상.',
      tech: ['Java', 'Spring', 'JSP', 'Cubrid']
    },
    '산업보안관리사 홈페이지': {
      problem: '자격증 시험 예약 및 합격자 발표를 전화·방문으로만 처리하여 응시자 불편 발생.',
      role: '2인 팀 중 백엔드 담당 — 시험 예약 시스템, 합격자 발표 기능 개발.',
      solution: '온라인 시험 예약 및 취소 API 개발. 합격자 조회 기능 구현. 수험 정보 안내 콘텐츠 관리 시스템 구축.',
      result: '시험 예약 온라인화로 응시자 편의 향상. 합격자 발표 실시간 조회 가능.',
      tech: ['Java', 'Spring', 'JSP', 'MySQL']
    },
    '충남교육과정평가정보원': {
      problem: '공공기관 교육 정보 제공 및 내부 업무 지원 시스템 노후화.',
      role: '3인 팀 중 백엔드 담당 — 통계 기능, 공지·자료 관리 모듈 개발.',
      solution: 'eGovFramework 기반 신규 홈페이지 구축. 교육 통계 조회 기능 개발. 내부 업무 지원 게시판·자료 관리 구현.',
      result: '공공기관 웹 표준 및 접근성 기준 충족. 내부 업무 처리 효율 향상.',
      tech: ['eGovFramework', 'Java', 'JSP', 'Oracle']
    },
    '측량학회 논문투고 시스템': {
      problem: '논문 투고·심사 과정을 이메일로 처리하여 진행 상황 추적 및 관리 어려움 존재.',
      role: '2인 팀 중 백엔드 담당 — 심사 워크플로우, 역할별 권한(저자/심사자/편집장) 시스템, DB 설계.',
      solution: '저자 투고→심사자 배정→심사→결과 통보 워크플로우 설계 및 구현. 역할별 대시보드 개발. 이메일 알림 자동화.',
      result: '투고~게재 확정 전 과정 온라인 자동화. 편집장·심사자 업무 효율 대폭 향상.',
      tech: ['Java', 'Spring', 'JSP', 'MySQL']
    },
    '웰다잉 학회 논문투고 시스템': {
      problem: '이메일 기반 논문 투고·심사 관리의 한계로 이력 추적 및 마감 관리 어려움.',
      role: '2인 팀 중 백엔드 담당 — 투고·심사 프로세스, 이메일 알림 연동.',
      solution: '논문 접수~게재 결정 워크플로우 구현. 심사 기한 알림 자동화. 편집장 현황 대시보드 개발.',
      result: '투고 관리 업무 자동화. 심사 기한 준수율 향상.',
      tech: ['Java', 'Spring', 'JSP', 'MySQL']
    },
    '123사비 고도화': {
      problem: '기존 서비스의 레거시 코드 및 UX 문제로 사용자 불만 및 운영 부담 증가.',
      role: '1인 단독 고도화 — UI 개선, 기능 확장, 코드 리팩토링 전 과정.',
      solution: '레거시 코드 정리 및 공통 모듈화. UI/UX 개선. 신규 기능 추가 및 성능 최적화.',
      result: '운영 안정성 향상. 코드 유지보수성 개선. 사용자 피드백 반영 완료.',
      tech: ['Java', 'Spring', 'JSP', 'MySQL']
    },
    '대전 학교지원센터 고도화': {
      problem: '기존 홈페이지의 신청 프로세스 불편 및 통계 기능 부재로 운영 어려움 발생.',
      role: '1인 단독 고도화 — 신청 프로세스 개선, 통계 기능 추가, 접근성 향상.',
      solution: '신청 UI/UX 개선 및 프로세스 간소화. 통계 조회 기능 신규 개발. 웹 접근성 기준 보완.',
      result: '신청 처리 시간 단축. 통계 데이터 활용 가능. 접근성 기준 충족.',
      tech: ['eGovFramework', 'Java', 'JSP', 'PostgreSQL']
    },
    '정보보호업무지원시스템 고도화': {
      problem: '레거시 시스템의 노후화로 신규 업무 기능 추가 어려움 및 유지보수 비용 증가.',
      role: '2인 팀 중 백엔드 담당 — 레거시 코드 리팩토링, 신규 업무 기능 개발.',
      solution: '레거시 코드 분석 후 단계적 리팩토링. 신규 업무 처리 기능 개발. Oracle/Tibero DB 최적화 쿼리 작성.',
      result: '시스템 안정성 향상. 신규 기능 납품 완료. 유지보수 용이성 개선.',
      tech: ['Java', 'Spring', 'Oracle', 'Tibero']
    },
    '과학기술정보통신부 검색 페이지': {
      problem: '공공기관 포털 검색 기능 부정확 및 느린 응답 속도로 사용자 불만 발생.',
      role: '1인 단독 개발 — 검색 기능 개선, UI 개편, 성능 최적화.',
      solution: '검색 알고리즘 개선 및 결과 노출 최적화. 검색 UI 개편. Oracle DB 쿼리 튜닝.',
      result: '검색 응답 속도 향상. 검색 정확도 개선. 사용자 경험 향상.',
      tech: ['eGovFramework', 'Java', 'JSP', 'Oracle']
    },
    '산학기술학회 홈페이지 고도화': {
      problem: '학회 홈페이지 회원 관리 및 논문 열람 기능 한계로 회원 불편 발생.',
      role: '2인 팀 중 백엔드 고도화 담당 — 회원 관리 개선, 논문 열람 기능 추가.',
      solution: '회원 정보 관리 개선 및 논문 열람 기능 신규 개발. 반응형 UI 개선. Cubrid DB 최적화.',
      result: '회원 서비스 향상. 논문 접근성 개선. 모바일 환경 대응.',
      tech: ['Java', 'Spring', 'JSP', 'Cubrid']
    },
    '과학기술정보통신부 관리자 기능': {
      problem: '공공기관 관리자 백오피스의 데이터 관리·통계 기능 부재로 운영 어려움.',
      role: '1인 단독 개발 — 관리자 기능 신규 개발, 통계 조회, 콘텐츠 편집 기능.',
      solution: '데이터 관리 CRUD 기능 개발. 통계 조회 및 시각화 기능 구현. 콘텐츠 편집 에디터 연동.',
      result: '관리자 업무 효율 향상. 데이터 현황 실시간 조회 가능.',
      tech: ['eGovFramework', 'Java', 'JSP', 'Oracle']
    },
    '중소벤처기업부 서포트': {
      problem: '공공기관 프로젝트 진행 중 기술적 이슈 발생으로 일정 지연 위기.',
      role: '기술 서포트 — 개발 이슈 분석 및 해결 지원, 기술 자문.',
      solution: '이슈 원인 파악 및 해결책 제시. 레거시 코드 분석 지원. 관련 기술 자문 제공.',
      result: '프로젝트 일정 회복. 기술 이슈 해결로 납품 완료.',
      tech: ['Java', 'Spring', 'eGovFramework']
    }
  };

  function openProjectModal(title, teamText) {
    var modal = document.getElementById('projectModal');
    if (!modal) return;
    var data = projectData[title];
    document.getElementById('pModalTitle').textContent = title;
    document.getElementById('pModalTeam').textContent  = teamText || '';
    if (data) {
      document.getElementById('pModalPending').style.display = 'none';
      document.getElementById('pModalSteps').style.display   = 'flex';
      document.getElementById('pModalProblem').textContent  = data.problem;
      document.getElementById('pModalRole').textContent     = data.role;
      document.getElementById('pModalSolution').textContent = data.solution;
      document.getElementById('pModalResult').textContent   = data.result;
      var techEl = document.getElementById('pModalTech');
      techEl.innerHTML = '';
      (data.tech || []).forEach(function (t) {
        var sp = document.createElement('span');
        sp.className = 'project-tech-tag';
        sp.textContent = t;
        techEl.appendChild(sp);
      });
    } else {
      document.getElementById('pModalPending').style.display = 'block';
      document.getElementById('pModalSteps').style.display   = 'none';
      document.getElementById('pModalTech').innerHTML = '';
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    var modal = document.getElementById('projectModal');
    if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
  }

  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' || e.target.closest('a.project-card-link')) return;
      var titleEl  = card.querySelector('.project-title');
      var teamEl   = card.querySelector('.project-team');
      var title    = titleEl ? titleEl.textContent.replace(/\s+/g,' ').trim() : '';
      var teamText = teamEl  ? teamEl.textContent.trim() : '';
      openProjectModal(title, teamText);
    });
  });

  var projClose    = document.querySelector('.proj-modal-close');
  var projBackdrop = document.querySelector('.proj-modal-backdrop');
  if (projClose)    projClose.addEventListener('click', closeProjectModal);
  if (projBackdrop) projBackdrop.addEventListener('click', closeProjectModal);

  /* --- Planning Modal --- */
  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }

  document.querySelectorAll('.planning-preview-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { openModal(btn.getAttribute('data-modal')); });
  });
  document.querySelectorAll('.planning-modal').forEach(function (modal) {
    modal.querySelector('.planning-modal-close').addEventListener('click', function () { closeModal(modal); });
    modal.querySelector('.planning-modal-backdrop').addEventListener('click', function () { closeModal(modal); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.planning-modal.open').forEach(closeModal);
      closeProjectModal();
    }
  });

});
