class Navigation {
  constructor(props) {
    this.props = props;
  }
  render() {
    const navigation = document.createElement("nav");
    this.props.linkText.forEach((prop, i) => {
      navigation.innerHTML += `
                <div class='nav__item'>
                    <a class='nav__link' href='${this.props?.linkUrls[i]}'>${prop}</a>
                </div>
            `;
    });
    const logo = `
            <a id='orgLogo' class='nav__link' title='logo' href='/'>orgLogo</a>
        `;
    // convert string to dom element using fragment API
    const frag = document.createRange().createContextualFragment(logo);

    // loop through fragments to insert in specific dom location ...
    // have to iterate through children due to insertAdjacent API only accepting single element, opposed to multiple fragments
    [...frag.children].forEach((frag) =>
      navigation.insertAdjacentElement("afterbegin", frag)
    );
    return navigation;
  }
}

export default Navigation;
