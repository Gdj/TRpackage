/**
 * @file trpFnUtils.js
 * @description 실무에서 자주 사용하는 공통 유틸리티 함수 모음
 *
 * ─── HTML 일반 방식 ────────────────────────────────────
 * <script src="trpFnUtils.js"></script>
 * <script>
 *  getByteLength('안녕하세요');   // 15
 *  isValidEmail('a@b.com');       // true
 * </script>
 *
 * ─── ES Module 방식 ───────────────────────────────────
 * <script type="module">
 *  import { getByteLength, isValidEmail } from './utils.js';
 *  getByteLength('안녕하세요');
 * </script>
 *
 * ─── JS 파일에서 import ────────────────────────────────
 *  import { getByteLength, isValidEmail } from './utils.js';
 *  import { getByteLength as byteLen , isValidEmail as checkEmail } from './utils.js';
 * 
 *  // * as 로 전체를 하나의 객체로 묶기
 *   import * as Utils from './utils.js';
 *
 *   Utils.getByteLength('안녕하세요');
 *   Utils.isValidEmail('a@b.com');
 *   Utils.toComma(123456);
 */


// ─────────────────────────────────────────────
// 📐 1. 한글 포함 바이트 계산
// ─────────────────────────────────────────────

/**
 * 문자열의 바이트 수를 반환합니다. (UTF-8 기준)
 * 한글 1자 = 3바이트 / 영문·숫자 1자 = 1바이트
 *
 * @param {string} str - 바이트를 계산할 문자열
 * @returns {number} 바이트 수
 *
 * @example
 * getByteLength('안녕하세요');  // 15
 * getByteLength('Hello');       // 5
 * getByteLength('안녕Hello');   // 11
 */
function getByteLength(str) {
  if (typeof str !== 'string') return 0;
  let byteCount = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code <= 0x007f)      byteCount += 1;
    else if (code <= 0x07ff) byteCount += 2;
    else                     byteCount += 3;
  }
  return byteCount;
}

/**
 * 바이트 제한에 맞게 문자열을 잘라서 반환합니다.
 *
 * @param {string} str       - 원본 문자열
 * @param {number} maxBytes  - 최대 허용 바이트 수
 * @param {string} [suffix=''] - 초과 시 붙일 접미사 (예: '...')
 * @returns {string} 잘린 문자열
 *
 * @example
 * truncateByByte('안녕하세요 반갑습니다', 9, '…'); // '안녕하…'
 */
function truncateByByte(str, maxBytes, suffix = '') {
  if (typeof str !== 'string') return '';
  const suffixBytes = getByteLength(suffix);
  const limit = maxBytes - suffixBytes;
  let byteCount = 0;
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    const charByte = code <= 0x007f ? 1 : code <= 0x07ff ? 2 : 3;
    if (byteCount + charByte > limit) return result + suffix;
    byteCount += charByte;
    result += str[i];
  }
  return result;
}


// ─────────────────────────────────────────────
// ✉️ 2. 이메일 형식 검사
// ─────────────────────────────────────────────

/**
 * 이메일 주소 형식의 유효성을 검사합니다.
 *
 * @param {string} email - 검사할 이메일 문자열
 * @returns {boolean} 유효하면 true
 *
 * @example
 * isValidEmail('user@example.com');       // true
 * isValidEmail('invalid-email');          // false
 * isValidEmail('test@sub.domain.co.kr'); // true
 */
function isValidEmail(email) {
  if (typeof email !== 'string' || !email.trim()) return false;
  if (/\.{2,}/.test(email)) return false;
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
}


// ─────────────────────────────────────────────
// 📞 3. 전화번호 형식 검사
// ─────────────────────────────────────────────

/**
 * 한국 전화번호 형식의 유효성을 검사합니다.
 * 하이픈 유무 무관, 휴대폰·지역번호·대표번호 지원
 *
 * @param {string} phone - 검사할 전화번호 문자열
 * @returns {boolean} 유효하면 true
 *
 * @example
 * isValidPhone('010-1234-5678');  // true
 * isValidPhone('01012345678');    // true
 * isValidPhone('02-123-4567');    // true
 * isValidPhone('1234-5678');      // false
 */
function isValidPhone(phone) {
  if (typeof phone !== 'string' || !phone.trim()) return false;
  const cleaned = phone.replace(/[\s-]/g, '');
  const patterns = [
    /^01[016789]\d{7,8}$/,
    /^02\d{7,8}$/,
    /^0[3-9]\d{7,8}$/,
    /^15\d{2}\d{4}$/,
    /^16\d{2}\d{4}$/,
    /^18\d{2}\d{4}$/,
  ];
  return patterns.some((regex) => regex.test(cleaned));
}

/**
 * 전화번호에 하이픈을 자동으로 포맷팅합니다.
 *
 * @param {string} phone - 원본 전화번호
 * @returns {string} 하이픈이 추가된 전화번호
 *
 * @example
 * formatPhone('01012345678');  // '010-1234-5678'
 * formatPhone('0212345678');   // '02-1234-5678'
 */
function formatPhone(phone) {
  if (typeof phone !== 'string') return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('02')) {
    return cleaned.length === 9
      ? cleaned.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3')
      : cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (cleaned.startsWith('0')) {
    return cleaned.length === 10
      ? cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
      : cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else {
    return cleaned.replace(/(\d{4})(\d{4})/, '$1-$2');
  }
}


// ─────────────────────────────────────────────
// 🔗 4. URL 형식 검사
// ─────────────────────────────────────────────

/**
 * URL 형식의 유효성을 검사합니다.
 * 브라우저 URL 생성자(URL Constructor)를 활용한 안전한 방식입니다.
 *
 * @param {string}   url               - 검사할 URL 문자열
 * @param {Object}  [options]
 * @param {string[]} [options.protocols=['http:','https:']] - 허용할 프로토콜 목록
 * @param {boolean}  [options.requireTLD=true]              - TLD 필수 여부
 * @returns {boolean} 유효하면 true
 *
 * @example
 * isValidURL('https://example.com');          // true
 * isValidURL('http://localhost:3000', { requireTLD: false }); // true
 * isValidURL('not-a-url');                    // false
 */
function isValidURL(url, options = {}) {
  const { protocols = ['http:', 'https:'], requireTLD = true } = options;
  if (typeof url !== 'string' || !url.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    if (!protocols.includes(parsed.protocol)) return false;
    if (requireTLD && !parsed.hostname.includes('.')) return false;
    if (parsed.hostname.length === 0) return false;
    return true;
  } catch {
    return false;
  }
}


// ─────────────────────────────────────────────
// 💰 5. 숫자 천단위 콤마
// ─────────────────────────────────────────────

/**
 * 숫자에 천단위 콤마(,)를 추가합니다.
 * 소수점 및 음수를 지원합니다.
 *
 * @param {number|string} value      - 포맷할 숫자
 * @param {Object}  [options]
 * @param {number}  [options.decimals]    - 소수점 자릿수 고정
 * @param {string}  [options.fallback=''] - 변환 실패 시 반환값
 * @returns {string} 천단위 콤마가 추가된 문자열
 *
 * @example
 * toComma(1234567);                       // '1,234,567'
 * toComma('9876543.21');                  // '9,876,543.21'
 * toComma(-5000);                         // '-5,000'
 * toComma(1234.5678, { decimals: 2 });    // '1,234.57'
 * toComma('abc',    { fallback: '0' });   // '0'
 */
function toComma(value, options = {}) {
  const { decimals, fallback = '' } = options;
  const num = Number(value);
  if (isNaN(num)) return fallback;
  const formatted = decimals !== undefined ? num.toFixed(decimals) : String(num);
  const [integer, decimal] = formatted.split('.');
  const commafied = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal !== undefined ? `${commafied}.${decimal}` : commafied;
}

/**
 * 콤마가 포함된 문자열에서 순수 숫자를 추출합니다. (toComma 역함수)
 *
 * @param {string} value - 콤마가 포함된 문자열
 * @returns {number}
 *
 * @example
 * fromComma('1,234,567');  // 1234567
 * fromComma('9,876.54');   // 9876.54
 */
function fromComma(value) {
  if (typeof value !== 'string') return Number(value);
  return Number(value.replace(/,/g, ''));
}


// ─────────────────────────────────────────────
// 📋 6. 클립보드 복사
// ─────────────────────────────────────────────

/**
 * 텍스트를 클립보드에 복사합니다.
 * Clipboard API 우선 사용, 미지원 환경은 execCommand 폴백 처리합니다.
 *
 * @param {string} text - 복사할 텍스트
 * @returns {Promise<boolean>} 복사 성공 시 true
 *
 * @example
 * const ok = await copyToClipboard('복사할 텍스트');
 * if (ok) alert('복사되었습니다!');
 */
async function copyToClipboard(text) {
  if (typeof text !== 'string') return false;

  // 1순위: Clipboard API (HTTPS / localhost)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('[copyToClipboard] Clipboard API 실패, 폴백 시도:', err);
    }
  }

  // 2순위: execCommand 폴백 (구형 브라우저 / HTTP)
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    Object.assign(textarea.style, {
      position: 'fixed', top: '-9999px', left: '-9999px',
      opacity: '0', pointerEvents: 'none',
    });
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (err) {
    console.error('[copyToClipboard] 폴백도 실패:', err);
    return false;
  }
}


// ─────────────────────────────────────────────
// 📜 7. 스크롤 퍼센트 계산
// ─────────────────────────────────────────────

/**
 * 페이지 또는 특정 요소의 스크롤 위치를 퍼센트(0~100)로 반환합니다.
 *
 * @param {string|HTMLElement|null} [selector=null]
 *   null = 전체 페이지 / CSS 선택자 문자열 또는 HTMLElement = 해당 요소 기준
 * @returns {number} 스크롤 퍼센트 (소수점 2자리)
 *
 * @example
 * // 페이지 전체
 * window.addEventListener('scroll', () => {
 *   console.log(getScrollPercent() + '%');
 * });
 *
 * // 특정 요소
 * getScrollPercent('#content-area');
 * getScrollPercent(document.querySelector('.scroll-box'));
 */
function getScrollPercent(selector = null) {
  try {
    if (selector !== null) {
      const el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
      if (!el) return 0;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const scrollable = scrollHeight - clientHeight;
      if (scrollable <= 0) return 0;
      return parseFloat(Math.min((scrollTop / scrollable) * 100, 100).toFixed(2));
    }
    const scrollTop    = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollable   = scrollHeight - clientHeight;
    if (scrollable <= 0) return 0;
    return parseFloat(Math.min((scrollTop / scrollable) * 100, 100).toFixed(2));
  } catch (err) {
    console.error('[getScrollPercent] 오류:', err);
    return 0;
  }
}

/**
 * 스크롤 퍼센트를 실시간으로 감지하는 이벤트 리스너를 등록합니다.
 * 내부적으로 throttle 처리되며, 반환된 함수로 해제할 수 있습니다.
 *
 * @param {Function}               callback      - (percent: number) => void
 * @param {string|HTMLElement|null} [selector=null] - 대상 요소
 * @param {number}                 [throttleMs=100] - throttle 간격(ms)
 * @returns {Function} cleanup 함수 — 호출 시 리스너 해제
 *
 * @example
 * const stop = onScrollPercent((p) => {
 *   document.querySelector('.bar').style.width = p + '%';
 * });
 *
 * // 해제할 때
 * stop();
 */
function onScrollPercent(callback, selector = null, throttleMs = 100) {
  if (typeof callback !== 'function') return () => {};
  let timer = null;
  const handler = () => {
    if (timer) return;
    timer = setTimeout(() => {
      callback(getScrollPercent(selector));
      timer = null;
    }, throttleMs);
  };
  const target = selector
    ? (typeof selector === 'string' ? document.querySelector(selector) : selector)
    : window;
  if (!target) return () => {};
  target.addEventListener('scroll', handler, { passive: true });
  return () => {
    target.removeEventListener('scroll', handler);
    if (timer) clearTimeout(timer);
  };
}


// ─────────────────────────────────────────────
// 🖼️ 8. 이미지 지연 로딩 (Lazy Load)
// ─────────────────────────────────────────────

/**
 * IntersectionObserver를 활용한 이미지 지연 로딩을 초기화합니다.
 *
 * HTML 작성 방법:
 *   <img data-src="실제이미지.jpg" src="placeholder.gif" alt="..." class="lazy" />
 *
 * @param {string|NodeList|HTMLElement[]} [target='img[data-src]'] - 대상 선택자 또는 요소
 * @param {Object}   [options]
 * @param {string}   [options.srcAttr='data-src']       - 실제 이미지 URL 속성명
 * @param {string}   [options.srcsetAttr='data-srcset'] - srcset 속성명
 * @param {string}   [options.loadedClass='lazy-loaded'] - 로드 완료 클래스
 * @param {string}   [options.errorClass='lazy-error']  - 로드 실패 클래스
 * @param {string}   [options.rootMargin='100px']       - 뷰포트 여유 마진
 * @param {number}   [options.threshold=0.01]           - 노출 임계값
 * @param {Function} [options.onLoad]                   - 로드 성공 콜백 (img) => void
 * @param {Function} [options.onError]                  - 로드 실패 콜백 (img) => void
 * @returns {{ observe: Function, disconnect: Function }}
 *
 * @example
 * // 기본 사용
 * const lazy = initLazyLoad();
 *
 * // 옵션 지정
 * const lazy = initLazyLoad('img[data-src]', {
 *   rootMargin: '200px',
 *   onError: (img) => { img.src = '/images/fallback.png'; },
 * });
 *
 * // 동적으로 추가된 이미지 등록
 * lazy.observe(newImgElement);
 *
 * // SPA 페이지 이동 시 해제
 * lazy.disconnect();
 */
function initLazyLoad(target = 'img[data-src]', options = {}) {
  const {
    srcAttr     = 'data-src',
    srcsetAttr  = 'data-srcset',
    loadedClass = 'lazy-loaded',
    errorClass  = 'lazy-error',
    rootMargin  = '100px',
    threshold   = 0.01,
    onLoad      = null,
    onError     = null,
  } = options;

  function _getElements(t) {
    if (typeof t === 'string')                   return Array.from(document.querySelectorAll(t));
    if (t instanceof NodeList || Array.isArray(t)) return Array.from(t);
    if (t instanceof HTMLElement)                return [t];
    return [];
  }

  function _loadImage(img) {
    const src    = img.getAttribute(srcAttr);
    const srcset = img.getAttribute(srcsetAttr);
    if (!src && !srcset) return;

    img.addEventListener('load', () => {
      img.classList.add(loadedClass);
      img.removeAttribute(srcAttr);
      if (srcset) img.removeAttribute(srcsetAttr);
      if (typeof onLoad === 'function') onLoad(img);
    }, { once: true });

    img.addEventListener('error', () => {
      img.classList.add(errorClass);
      if (typeof onError === 'function') onError(img);
    }, { once: true });

    if (srcset) img.srcset = srcset;
    if (src)    img.src    = src;
  }

  // IntersectionObserver 미지원 시 즉시 로딩으로 폴백
  if (!('IntersectionObserver' in window)) {
    console.warn('[initLazyLoad] IntersectionObserver 미지원 → 즉시 로딩으로 전환');
    _getElements(target).forEach(_loadImage);
    return { observe: _loadImage, disconnect: () => {} };
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      _loadImage(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin, threshold });

  _getElements(target).forEach((el) => observer.observe(el));

  return {
    observe:    (el) => observer.observe(el),
    disconnect: ()   => observer.disconnect(),
  };
}


// ─────────────────────────────────────────────
// ES Module export (import 방식 사용 시)
// ─────────────────────────────────────────────
if (typeof exports !== 'undefined') {
  // Node.js / CommonJS 환경
  exports.getByteLength    = getByteLength;
  exports.truncateByByte   = truncateByByte;
  exports.isValidEmail     = isValidEmail;
  exports.isValidPhone     = isValidPhone;
  exports.formatPhone      = formatPhone;
  exports.isValidURL       = isValidURL;
  exports.toComma          = toComma;
  exports.fromComma        = fromComma;
  exports.copyToClipboard  = copyToClipboard;
  exports.getScrollPercent = getScrollPercent;
  exports.onScrollPercent  = onScrollPercent;
  exports.initLazyLoad     = initLazyLoad;
}