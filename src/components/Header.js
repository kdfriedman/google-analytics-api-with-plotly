import Navigation from './Navigation';

class Header {
  constructor(props) {
    this.props = props;
  }
  render() {
    const header = document.createElement('header');
    header.id = 'plotly-init';
    header.innerHTML = `
            <h1 class='header__title'>${this.props.title}</h1>
            <p class='header__subtitle'>${this.props.subTitle}</p>
        `;
    header.insertAdjacentElement(
      'afterbegin',
      new Navigation(this.props.nav).render()
    );
    return header;
  }
}

export default Header;
