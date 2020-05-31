import React from 'react';
import axios from 'axios';

class GetNeighborForm extends React.Component {
    state = {
        clusterName: '',
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.get(`http://localhost:9000/covidCluster/neighbors?clusterName=` + this.state.clusterName)
            .then((response) => {
                alert(prettifyNeigbors(response.data.neighbors));
            }).catch((error) => {
                console.log(error);
                alert("Unexpected error occured trying ot add this new cluster");
            });

        this.setState({
            clusterName: '',
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <span className="formtext">Get Cluster Neighbors</span>
                <input
                    type="text"
                    value={this.state.clusterName}
                    onChange={event => this.setState({ clusterName: event.target.value })}
                    placeholder="Enter Cluster Name"
                    required
                />
                <button>Submit</button>
            </form>
        );
    }
}

function prettifyNeigbors(neighbors) {
    var prettyStringResult = "";
    neighbors.forEach(clusterGroup => {
        prettyStringResult += "- " + clusterGroup.index + ", " + clusterGroup.cluster.name + "\n"
    });
    return prettyStringResult;

}

export default GetNeighborForm;