import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class App {
  constructor(props, data) {
    this.parentDiv = document.createElement('div');
    this.data = data;
    this.Header = new Header(props.header);
    this.Main = new Main(props.main, this.data);
    this.Footer = new Footer(props.footer);
  }

  appendComponentsToParent() {
    const renderedComponents = [
      this.Header.render(),
      this.Main.render(),
      this.Footer.render(),
    ];
    renderedComponents.forEach((component) =>
      this.parentDiv.appendChild(component)
    );
    this.parentDiv.className = 'component-wrapper';
    return this.parentDiv;
  }

  render() {
    return this.appendComponentsToParent();
  }
}

export default App;
