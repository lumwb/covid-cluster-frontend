import React from 'react';
import axios from 'axios';

class DeleteClusterForm extends React.Component {
    state = {
        clusterName: '',
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        axios.delete(`http://covid-cluster-backend.herokuapp.com/covidCluster/`,
            { data: { clusterName: this.state.clusterName } })
            .then((response) => {
                // alert(response);
            }).catch((error) => {
                alert("Unable to delete this cluster.");
            });
        this.setState({
            clusterName: '',
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <span className="formtext">Delete Cluster</span>
                <input
                    type="text"
                    value={this.state.clusterName}
                    onChange={event => this.setState({ clusterName: event.target.value })}
                    placeholder="Target Cluster Name"
                    required
                />
                <button>Submit</button>
            </form>
        );
    }
}

export default DeleteClusterForm;