import dialogHtml from "./dialog.js";
import sheetHtml from "./sheet.js";
import navHtml from "./nav.js";

class Common {
  constructor() {
    this.initialize();
    this.arcgisMap = document.querySelector("arcgis-map");
    this.sheet = document.getElementById("sheet");
    this.navigation = document.getElementById("nav");
    this.panel = document.getElementById("sheet-panel");
    this.dialog = document.getElementById("dialog");
    this.toggleDialogNode = document.getElementById("toggleDialog");
    this.toggleLayoutNode = document.getElementById("toggleLayoutNode");
    this.setupUI();
  }

  initialize() {
    this.isMapCentric = window.location.href.includes("/map-centric");
    this.createAndInsertElement(dialogHtml);
    this.createAndInsertElement(sheetHtml);
    this.createAndInsertElement(navHtml, true);
  }

  createAndInsertElement(htmlString, isNav = false) {
    const dummyContainer = document.createElement("div");
    dummyContainer.innerHTML = htmlString;
    const element = dummyContainer.firstChild;
    const shell = document.querySelector("calcite-shell");
    if (isNav) {
      shell?.prepend(element);

      const navLogo = element.querySelector("calcite-navigation-logo");
      navLogo.description = this.isMapCentric
        ? "Map Centric"
        : "Non Map Centric";
    } else {
      document.body.insertBefore(element, shell?.nextSibling);
    }
  }

  setupUI() {
    this.addEventListeners(
      this.navigation,
      "calciteNavigationActionSelect",
      this.toggleSheet.bind(this, true)
    );
    this.addEventListeners(
      this.panel,
      "calcitePanelClose",
      this.toggleSheet.bind(this, false)
    );
    this.addEventListeners(
      this.toggleDialogNode,
      "click",
      this.toggleDialog.bind(this)
    );
    this.addEventListeners(
      this.toggleLayoutNode,
      "click",
      this.toggleLayout.bind(this)
    );

    this.initMapComponents();
  }

  addEventListeners(element, event, handler) {
    if (element) {
      element.addEventListener(event, handler);
    }
  }

  toggleSheet(open) {
    if (this.sheet) {
      this.sheet.open = open;
      if (!open) {
        this.panel.closed = false;
      }
    }
  }

  toggleDialog() {
    if (this.dialog) {
      this.dialog.open = !this.dialog.open;
    }
  }

  toggleLayout() {
    const urlObj = new URL(window.location.href);
    const demosPath = "/demos/";
    urlObj.pathname = this.isMapCentric
      ? `${demosPath}non-map-centric`
      : `${demosPath}map-centric`;
    window.location.href = urlObj.href;
  }

  initMapComponents() {
    if (!this.arcgisMap) return;
    this.arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {
      const view = event?.target?.view;
      if (!view) return;

      const layer = view.map.allLayers.find(
        (layer) => layer.id === "18066f67b9f-layer-5"
      );
      this.setupCharts(layer, view);
    });
  }

  async setupCharts(layer, view) {
    const loadedLayer = await layer.load();
    const charts = [
      { id: "chart", index: 2 },
      { id: "chart2", index: 5 },
      { id: "chart3", index: 6 },
    ];
    charts.forEach(({ id, index }) => {
      const chartElement = document.getElementById(id);
      if (chartElement?.parentElement) {
        chartElement.parentElement.heading =
          loadedLayer.charts[index].title.content.text;
      }
      chartElement.id = id;
      chartElement.view = view;
      chartElement.layer = layer;
      chartElement.model = loadedLayer.charts[index];
      chartElement.enableResponsiveFeatures = true;
      loadedLayer.charts[index].title.visible = false;
      loadedLayer.charts[index].legend.visible = false;
    });
  }
}

new Common();
