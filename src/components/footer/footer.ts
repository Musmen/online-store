import './scss/footer.styles.scss';

class FooterComponent {
  constructor() {
    this.render = this.render.bind(this);
  }

  render(): string {
    return `
      <footer class="main-footer">
        <div class="footer--centralizer">
          <p class="footer--description footer--description-course">
            <span class="course--year">2023</span>
            <a
              class="link footer--link footer--link-rss_course"
              href="https://rs.school/js/"
              title="Goto RS School JS Course Page"
              target="_blank"
            >
              RS School JS Course
            </a>
          </p>

          <section class="footer--description footer--description-author">
            <h3 class="authors-title">Authors: </h3>
            <ul class="socials--list list">
              <li class="socials--item">
                <a
                  class="link footer--link socials--link"
                  title="Musmen's Github"
                  href="https://github.com/Musmen"
                  target="_blank"
                >
                  <h3 class="author">@Musmen</h3>
                  <span class="socials--icon socials--icon-github"></span>
                </a>
              </li>
              <li class="socials--item">
                <a
                  class="link footer--link socials--link"
                  title="Doonns3 Github"
                  href="https://github.com/doonn3"
                  target="_blank"
                >
                  <h3 class="author">@Doonn3</h3>
                  <span class="socials--icon socials--icon-github"></span>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </footer>`;
  }
}

export default new FooterComponent();
