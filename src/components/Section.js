class Section {
  constructor(props, data) {
    this.props = props;
    this.data = data;
  }
  render() {
    const section = document.createElement('section');
    if (this.data) section.id = 'dataViz';

    section.innerHTML = `
      ${
        this.data
          ? `
        <div class='section__date-range-wrapper'>
          <div id='startDate' class='section__date-range'>Start Date: <b>${this.data.startDate}</b></div>
          <div id='endDate' class='section__date-range'>End Date: <b>${this.data.endDate}</b></div>
        </div>
      `
          : ''
      }
        ${this.props.p1}
        ${this.props.p2 ? this.props.p2 : ''}
        ${this.props.p3 ? this.props.p3 : ''}
    `;

    return section;
  }
}

export default Section;
