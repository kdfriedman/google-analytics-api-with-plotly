class Footer {
  constructor(props) {
    this.props = props;
  }
  render() {
    const footer = document.createElement("footer");
    footer.innerHTML = `${this.props.text}`;
    const logo = `
            <a class='footer__link' href='/'>Footer Logo
            </a>
        `;
    // convert string to dom element using fragment API
    const frag = document.createRange().createContextualFragment(logo);

    // loop through fragments to insert in specific dom location ...
    // have to iterate through children due to insertAdjacent API only accepting single element, opposed to multiple fragments
    [...frag.children].forEach((frag) =>
      footer.insertAdjacentElement("afterbegin", frag)
    );

    return footer;
  }
}

export default Footer;
