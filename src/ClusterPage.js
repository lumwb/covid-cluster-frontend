import React from 'react';
import AddClusterForm from './AddClusterForm';
import DeleteClusterForm from './DeleteClusterForm';
import GetNeighborForm from './GetNeighborForm';
import HexGrid from './HexGrid';

class ClusterPage extends React.Component {

    render() {
        return (
            <div>
                <AddClusterForm />
                <GetNeighborForm />
                <DeleteClusterForm />
                <HexGrid />
            </div>
        );
    }
}

export default ClusterPage;