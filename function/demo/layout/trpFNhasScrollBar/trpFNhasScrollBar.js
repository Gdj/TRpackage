/**
 * singleton
 * trpFNhasScrollBar
 * - 스크롤바 존재 여부에 따라 클래스 토글
 */
const trpFNhasScrollBar = (() => {
  let elements = [];

  function update(wrapper) {
    const scrollEl = wrapper.querySelector('.trpHasScrollBarY');
    if (!scrollEl) return;

    const check = scrollEl.scrollHeight > scrollEl.clientHeight;
    wrapper.classList.toggle('scrollbar_on', check);
  }

  function refresh() {
    elements.forEach(update);
  }

  function init(selector = '.js-TRPscrollbar-wrapper') {
    const newElements = document.querySelectorAll(selector);
    newElements.forEach(wrapper => {
      if (elements.includes(wrapper)) return;
      elements.push(wrapper);
      const scrollEl = wrapper.querySelector('.trpHasScrollBarY');
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
/* 
trpFNhasScrollBar.init('.js-scrollbar');

*/



/**
 * 스크롤바 존재 여부에 따라 클래스 토글(멀티)
 * - wrapper: 스크롤바 존재 여부를 체크할 요소의 래퍼 클래스
 * - content: 스크롤바 존재 여부를 체크할 요소의 콘텐츠 클래스
 * - activeClass: 스크롤바가 존재할 때 추가할 클래스 (기본값: 'scrollbar_on')
 */
const trpFNhasScrollBars = (() => {
  let items = [];

  function update(item) {
    const scrollEl = item.wrapper.querySelector(item.content);
    if (!scrollEl) return;
    const check = scrollEl.scrollHeight > scrollEl.clientHeight;
    item.wrapper.classList.toggle('scrollbar_on', check);
  }

  function refresh() {
    items.forEach(update);
  }

  function init(options = {}) {
    const settings = {
      wrapper: '.js-scrollbar',
      content: '.js-scrollbar__content',
      ...options
    };

    const wrappers = document.querySelectorAll(settings.wrapper);
    wrappers.forEach(wrapper => {
      // 중복 방지
      const exists = items.some(item => item.wrapper === wrapper);
      if (exists) return;

      const item = {
        wrapper,
        content: settings.content
      };
      items.push(item);
      const scrollEl = wrapper.querySelector(settings.content);
      if (!scrollEl) return;
      update(item);

      new ResizeObserver(() => {
        update(item);
      }).observe(scrollEl);
    });
  }

  window.addEventListener('resize', refresh);

  return {
    init,
    refresh
  };

})();
/* 
사용
trpFNhasScrollBars.init({
  wrapper: '.js-scrollbar',
  content: '.scroll-content',
  activeClass: 'scrollbar_on'
});
trpFNhasScrollBars.init({
  wrapper: '.js-scrollbar1',
  content: '.scroll-content1',
  activeClass: 'scrollbar_on1'
});
*/