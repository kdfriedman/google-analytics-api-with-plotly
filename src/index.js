import { wireUpEvents, loadHandler, loginHandler } from './events';
import App from './components/App';
import plotlyInit from './plotly/visualization';

// client app init
const appInit = () => {
  // parse json from script
  const data = document.getElementById('data') || null;

  // if data is null, no data is being returned from server via templates
  if (data == null) return;
  const props = JSON.parse(data.innerText);

  // root div
  const root = document.getElementById('root');

  // wire up load handler
  const loadEventData = wireUpEvents('DOMContentLoaded', window, loadHandler);

  // if loadEventData is null, no GA api has been called. Wire up app without ga api data.
  if (loadEventData === null) {
    // initialize app and render
    const app = new App(props).render();

    // append rendered app to root div
    return root.appendChild(app);
  }

  // listen for custom data response event which will indicate that ga api data has been received
  window.addEventListener('dataResponse', (e) => {
    // check if err message exists on custom event data
    const errMsg = e.detail.err ? e.detail.err : undefined;

    // if errMsg exists, write new err property to props object and render to UI
    if (errMsg) {
      props.main.text = errMsg;

      // initialize app and render
      const app = new App(props).render();

      //append rendered app to root div
      return root.appendChild(app);
    }

    // initialize app and render
    const app = new App(props, e.detail.data[0].dateRanges).render();

    //append rendered app to root div
    root.appendChild(app);

    // initialize Plotly Data Vizualization
    plotlyInit('plotlyParentElement', e.detail);
  });
};

appInit();
