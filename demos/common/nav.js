export default `<calcite-navigation id="nav" navigation-action slot="header">
        <calcite-navigation-logo
          href="#"
          icon="globe"
          alt="Application logo"
          slot="logo"
          heading="Museums in the United States"
        ></calcite-navigation-logo>
        <calcite-action-pad
          layout="horizontal"
          expand-disabled
          slot="content-end"
        >
          <calcite-action
            id="toggleLayoutNode"
            text="Toggle layout"
            icon="map"
          ></calcite-action>
          <calcite-action
            id="toggleDialog"
            text="About this application"
            icon="information"
          ></calcite-action>
        </calcite-action-pad>
        <calcite-tooltip
          placement="bottom"
          reference-element="toggleLayoutNode"
          close-on-click
          slot="content-end"
          >Toggle layout</calcite-tooltip
        >
        <calcite-tooltip
          placement="bottom"
          reference-element="toggleDialog"
          close-on-click
          slot="content-end"
          >About this application</calcite-tooltip
        >
      </calcite-navigation>`;
