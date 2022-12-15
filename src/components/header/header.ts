import './scss/header.styles.scss';

class HeaderComponent {
  #elements: { [key: string]: HTMLElement | null } = {};

  constructor() {
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
  }

  init(): void {
    console.log('Init Header');
  }

  render(): string {
    return `
      <header class="main-header">
        <h1>Logo from Main Header</h1>
      </header>
    `;
  }
}

export default new HeaderComponent();
