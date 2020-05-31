import React from 'react';
import axios from 'axios';
import * as PIXI from "pixi.js";

const Honeycomb = require('honeycomb-grid');


// not interactive but representative grid of clusters in application

class HexGrid extends React.Component {
    state = {
    };
    constructor(props) {
        super(props);
        this.pixi_cnt = React.createRef();
        this.state.app = new PIXI.Application({ width: 600, height: 600, transparent: true });
        this.state.graphics = new PIXI.Graphics();
        this.state.Hex = Honeycomb.extendHex({ size: 30, orientation: 'flat' });

        this.state.Grid = Honeycomb.defineGrid(this.state.Hex);
        this.state.grid = this.state.Grid([[0, 0]]);
        this.state.graphics.lineStyle(3, 0x999999);
    }

    updatePixiCnt = async (element) => {
        console.log(element);
        // alert("calling update pixicnt");
        // call get API
        try {
            var result = await axios.get(`http://localhost:9000/covidCluster/getAllClusters`);
        } catch (error) {
            console.log(error);
            alert("Error trying to get clusters from backend");
        }

        var allClusters = result.data.allCluster;

        // convert axial coordinate to cube coorindate
        var cubeCoordinates = allClusters.map(cluster => {
            return { q: cluster.q_cartesian, r: cluster.r_cartesian, s: 0 - (cluster.q_cartesian + cluster.r_cartesian) };
        });

        this.state.grid = this.state.Grid(cubeCoordinates);

        // the element is the DOM object that we will use as container to add pixi stage(canvas)
        this.pixi_cnt = element;

        // if (this.pixi_cnt && this.pixi_cnt.children.length <= 0) {
        //     this.pixi_cnt.appendChild(this.state.app.view);
        // }

        this.pixi_cnt.appendChild(this.state.app.view)

        var clusterIndex = 0;

        this.state.grid.forEach(hex => {
            // center grid to middle of graph

            // need to calculate difference between center of application with respect to 
            // hex and add that difference to every hex
            const point = hex.toPoint().add([300, 300]);

            // add the hex's position to each of its corner points
            const corners = hex.corners().map(corner => corner.add(point));
            // separate the first from the other corners
            const [firstCorner, ...otherCorners] = corners

            // convert cluster name to pixi text
            let text = new PIXI.Text(allClusters[clusterIndex].name, { fontFamily: 'Arial', fontSize: 10, fill: 0xff1010, align: 'center' });
            // center text
            var center_x = point.x + ((corners[0].x - corners[2].x) / 2);
            var center_y = point.y - ((corners[4].x - corners[0].x) / 2);
            text.position.x = center_x;
            text.position.y = center_y;


            // move the "pen" to the first corner
            this.state.graphics.moveTo(firstCorner.x, firstCorner.y)
            // draw lines to the other corners
            otherCorners.forEach(({ x, y }) => this.state.graphics.lineTo(x, y))
            // finish at the first corner

            this.state.graphics.lineTo(firstCorner.x, firstCorner.y)
            this.state.app.stage.addChild(text);
            this.state.app.stage.addChild(this.state.graphics)
            clusterIndex++;
        })
    };

    render() {
        return <div ref={this.updatePixiCnt} />
    }
}

export default HexGrid;