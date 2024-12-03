// helpers/Container.tsx
export function createContainer(
  PIXI: any,
  app: any,
  containerRef: any,
  label = "",
  parentContainer: any
) {
  if (!containerRef.current) {
    // Create a new container
    // console.log("createContainer=>", containerRef, parentContainer);
    const container: any = new PIXI.Container();
    container.label = label;
    containerRef.current = container;
    // Add the container to the application's stage
    // console.log("app=>", app, parentContainer);
    parentContainer
      ? parentContainer.addChild(container)
      : app.stage.addChild(container);
    return parentContainer
      ? { parentContainer, childContainerRef: containerRef }
      : containerRef;
  }
  // console.log("createContainer outside=>", containerRef, parentContainer);
  return parentContainer
    ? { parentContainer, childContainerRef: containerRef }
    : containerRef;
}
