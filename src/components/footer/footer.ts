import './scss/footer.styles.scss';

class FooterComponent {
  constructor() {
    this.render = this.render.bind(this);
  }

  render(): string {
    return `
      <footer class="main-footer">
        <hr>
        <h2>Main Footer</h2>
      </footer>
    `;
  }
}

export default new FooterComponent();
