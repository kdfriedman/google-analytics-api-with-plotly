import Section from './Section';

class Main {
  constructor(props, data) {
    this.props = props;
    this.data = data;
  }
  render() {
    const main = document.createElement('main');
    main.innerHTML = `<p class='main__title'>${this.props.text}</p>`;
    main.appendChild(new Section(this.props.section, this.data).render());
    return main;
  }
}

export default Main;
