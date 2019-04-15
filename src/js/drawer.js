class GLDrawer {
  constructor(trigger, target) {
    this.trigger = trigger;
    this.target = target;
    this.activeClass = 'is-active';
    this.clientWidth = document.body.clientWidth;
    this.noScrollBarWidth = document.body.clientWidth;
    this.diff = 0;
  }

  init() {
    this.handleEvents();
  }

  handleEvents() {
    document.querySelector(this.trigger).addEventListener('click', (event) => this.toggle(), false);
  }

  toggle() {
    event.preventDefault();

    if (event.currentTarget.classList.contains(this.activeClass)) {
      this.setOpenDrawer.call(this);

    } else {
      this.bugFixForIE.call(this);
      this.setCloseDrawer.call(this);
    }
  }

  setOpenDrawer() {
    document.body.classList.remove('hamburger-active');

      /**
       * bodyタグのoverflowプロパティとpaddingを削除
       */
      document.body.removeAttribute('style');


      event.currentTarget.classList.remove(this.activeClass);
      document.querySelector(this.target).classList.remove(this.activeClass);
      event.currentTarget
        .closest('#js-header')
        .classList.remove(this.activeClass);
  }

  setCloseDrawer() {
    document.body.classList.add('hamburger-active');
    event.currentTarget.classList.add(this.activeClass);
    document.querySelector(this.target).classList.add(this.activeClass);
    event.currentTarget
      .closest('#js-header')
      .classList.add(this.activeClass);
  }

  /**
   * IEでスクロールバーの影響で表示がガタつく事象に対応
   */
  bugFixForIE() {
    this.clientWidth = document.body.clientWidth;
    document.body.style.overflow = 'hidden';

    this.noScrollBarWidth = document.body.clientWidth;
    this.diff = this.noScrollBarWidth - this.clientWidth;

    if (0 < this.diff) {
      document.querySelector('#js-header').style.paddingRight = 30 + this.diff + 'px';
    }
  }
}

export default GLDrawer;
