import { productPages } from "./product-pages";

const layout = {
  showlegend: false,
  yaxis: {
    automargin: true,
  },
  xaxis: {
    automargin: true,
  },
  margin: {
    t: 0,
  },
};

const config = {
  responsive: true,
  displayModeBar: false,
};

export const plotlyHeatmap = {
  layout,
  config,
  getData(values) {
    const productNamesList = productPages.map((obj) => {
      const productName = Object.keys(obj)[0];
      return productName;
    });
    const data = [
      {
        z: values,
        x: ["KPI 1", "KPI 2", "KPI 3", "KPI 4", "KPI 5", "KPI 6", "KPI 7"],
        y: productNamesList,
        type: "heatmap",
        hoverongaps: false,
      },
    ];
    return data;
  },
};
