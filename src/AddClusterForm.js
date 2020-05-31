import React from 'react';
import axios from 'axios';

class AddClusterForm extends React.Component {
    state = {
        baseClusterName: '',
        baseClusterSide: 0,
        newClusterName: ''
    };

    handleSubmit = async (event) => {
        await axios.post(`http://localhost:9000/covidCluster/`, {
            "baseClusterName": this.state.baseClusterName,
            "baseClusterSide": this.state.baseClusterSide,
            "newClusterName": this.state.newClusterName,
        }).then((response) => {
            alert(response);
        }).catch((error) => {
            alert("Unable to add specified cluster.\n -  Name must be unique. \n - Side must not be occupied");
        });
        this.setState({
            baseClusterName: '',
            baseClusterSide: 0,
            newClusterName: ''
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <span className="formtext">Add New Cluster</span>
                <input
                    type="text"
                    value={this.state.baseClusterName}
                    onChange={event => this.setState({ baseClusterName: event.target.value })}
                    placeholder="Base Cluster Name"
                    required
                />
                <input
                    type="number"
                    value={this.state.baseClusterSide}
                    onChange={event => this.setState({ baseClusterSide: event.target.value })}
                    placeholder="Base Cluser Side"
                    min="0"
                    max="5"
                    required
                />
                <input
                    type="text"
                    value={this.state.newClusterName}
                    onChange={event => this.setState({ newClusterName: event.target.value })}
                    placeholder="New Cluster Name"
                    required
                />
                <button>Submit</button>
            </form>
        );
    }
}

export default AddClusterForm;