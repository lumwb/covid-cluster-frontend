## Covid-Cluster front-end

A (amatuer) attempt at creating a React web front-end for visualising clusters.

Allows for 3 simple operations to add cluster, delete cluster and get neighbour.

Pardon the un-appealing UI and full page refresh on form-submit...

### Local Testing

### `npm install`
To install the required dependencies

### `npm start`
Run react-server. localhost:3000

### Resoureces / Libraries
- [Honeycomb-grid](https://github.com/flauwekeul/honeycomb) A real god-send in rendering grids. Coupled with [PixiJS](https://www.pixijs.com/) to give pixel perfect rendering of hexagons along with their cluster names.



### To Improve:
- State / Prop passing amongst component
- UI of input fields and buttons
- Dynamically determine size of hexagons based on number of hexagons
- Highlight border of clusters when calling get cluster neighbors
- Show error message for delete neighbor (no messsages now...)
- Show better error message for adding validation (just a alert now)
