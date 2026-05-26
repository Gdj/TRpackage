/**
 * @file trpFnLayout.js
 * @description 실무에서 자주 사용하는 공통 유틸리티 함수 모음
 *
 * ─── HTML 일반 방식 ────────────────────────────────────
 * <script src="trpFnLayout.js"></script>
 * <script>
 *  getByteLength('안녕하세요');   // 15
 *  isValidEmail('a@b.com');       // true
 * </script>
 *
 * ─── ES Module 방식 ───────────────────────────────────
 * <script type="module">
 *  import { getByteLength, isValidEmail } from './trpFnLayout.js';
 *  getByteLength('안녕하세요');
 * </script>
 *
 * ─── JS 파일에서 import ────────────────────────────────
 *  import { getByteLength, isValidEmail } from './trpFnLayout.js';
 *  import { getByteLength as byteLen , isValidEmail as checkEmail } from './trpFnLayout.js';
 * 
 *  // * as 로 전체를 하나의 객체로 묶기
 *   import * as Layout from './trpFnLayout.js';
 *
 *   Layout.getByteLength('안녕하세요');
 *   Layout.isValidEmail('a@b.com');
 *   Layout.toComma(123456);
 */


/**
 * 스크롤바 감지 및 클래스 토글
 * @description 스크롤바가 존재하는지 감지하여 부모 요소에 클래스 토글
 * @namespace trpFNhasScrollBarY
 * @param {string} selector - 스크롤바가 존재하는 부모 요소 선택자
 * @return {void}
 *
 * @example
 * trpFNhasScrollBar.init('.js-scrollbar-wrap', 'y');
 * trpFNhasScrollBar.refresh();
 */
  /* IIFE (scrollbar) */
  const trpFNhasScrollBar = (() => {
    let elements = [];
    let TYPE = 'y';
    
    function update(wrapper) {
      console.log('update : ', wrapper);
      let scrollBarClass = TYPE === 'y' ? 'trpHasScrollBarY' : 'trpHasScrollBarX';
      const scrollEl = wrapper.querySelector(scrollBarClass);
      if (!scrollEl) return;

      const check = scrollEl.scrollHeight > scrollEl.clientHeight;
      wrapper.classList.toggle('trpHasScroll_on', check);
    }

    function refresh() {
      elements.forEach(update);
    }

    function init($selector = '.js-TRPscrollbar-wrapper', $type = 'y') {
      const newElements = document.querySelectorAll($selector);
      TYPE = $type;
      let scrollBarClass = TYPE === 'y' ? 'trpHasScrollBarY' : 'trpHasScrollBarX';

      console.log('init : ', newElements, TYPE);

      newElements.forEach(wrapper => {
        if (elements.includes(wrapper)) return;
        elements.push(wrapper);
        const scrollEl = wrapper.querySelector(scrollBarClass);
        if (!scrollEl) return;
        update(wrapper);
        new ResizeObserver(() => {
          update(wrapper);
        }).observe(scrollEl);

      });
    }

    window.addEventListener('resize', refresh);

    return {
      init,
      refresh
    };

  })();





  // ─────────────────────────────────────────────
  // ES Module export (import 방식 사용 시)
  // ─────────────────────────────────────────────
  if (typeof exports !== 'undefined') {
    // Node.js / CommonJS 환경
    exports.trpFNhasScrollBarY    = trpFNhasScrollBarY;
  }