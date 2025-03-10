class MapCentric {
  constructor() {
    this.arcgisMap = document.querySelector("arcgis-map");
    this.legend = document.getElementById("legend");
    this.initMapComponents();
  }

  initMapComponents() {
    if (!this.arcgisMap) return;
    this.arcgisMap.addEventListener("arcgisViewReadyChange", (event) => {
      const view = event?.target?.view;
      if (!view) return;
      this.legend.view = view;
    });
  }
}

new MapCentric();
