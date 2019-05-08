class LegitDrawer {
  constructor() {
    this.defaults = {
      selectors: {
        header: '#js-header',
        trigger: '#js-hamburger',
        target: '#js-global-navi',
        activeClass: 'is-active'
      }
    }
    this.handleEvents();
  }

  handleEvents() {
    const selectors = this.defaults.selectors;

    document.querySelector(selectors.trigger).addEventListener('click', (event) => this.toggle(), false);
  }

  toggle() {
    const selectors = this.defaults.selectors;

    event.preventDefault();

    if (event.currentTarget.classList.contains(selectors.activeClass)) {
      this.close.call(this);
    } else {
      this.open.call(this);
    }
  }

  open() {
    const selectors = this.defaults.selectors;

    event.currentTarget.classList.add(selectors.activeClass);
    document.querySelector(selectors.target).classList.add(selectors.activeClass);
    event.currentTarget
      .closest(selectors.header)
      .classList.add(selectors.activeClass);
  }

  close() {
    const selectors = this.defaults.selectors;

    document.body.removeAttribute('style');

    event.currentTarget.classList.remove(selectors.activeClass);
    document.querySelector(selectors.target).classList.remove(selectors.activeClass);
    event.currentTarget
      .closest(selectors.header)
      .classList.remove(selectors.activeClass);
  }
}

export default LegitDrawer;
