import Plotly from "plotly.js-dist";
import { plotlyHeatmap } from "./heatmap";
import * as d3 from "d3";
import { mapTwoUnrelatedArrays } from "../utility/utility";
import {
  productPages,
  filterByProductPages,
  aggregateProductPageData,
} from "./product-pages";

const plotlyInit = (elementId, payload) => {
  // ga dimensions
  const dimensions = payload.data.map((obj) => obj.dimensions);

  // ga metrics
  const metrics = payload.data.map((obj) => obj.metrics);

  const scrubbedDimensions = dimensions.map((dimensionList) => {
    return dimensionList.map((dimension) => dimension.replace(/(\?.*)/gi, ""));
  });

  // join dimensions and metrics into organized arrayOfObjects
  const joinGAArrayData = (dimension, i, metrics) => {
    return {
      dimensions: dimensions[i],
      metrics: metrics[i],
    };
  };

  const joinedGAData = mapTwoUnrelatedArrays(
    scrubbedDimensions,
    metrics,
    joinGAArrayData
  );

  const filteredProductPageData = joinedGAData.filter((item) => {
    return filterByProductPages(item, productPages).length > 0;
  });

  const aggregatedProductPageData = aggregateProductPageData(
    filteredProductPageData,
    productPages
  );

  // heat map
  Plotly.newPlot(
    elementId,
    plotlyHeatmap.getData(aggregatedProductPageData),
    plotlyHeatmap.layout,
    plotlyHeatmap.config
  );
};

export default plotlyInit;
