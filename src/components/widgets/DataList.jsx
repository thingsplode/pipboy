import React, {PropTypes} from 'react'
import {DataTable, TableHeader, IconButton, Menu, MenuItem} from 'react-mdl'

class DataRenderer extends React.Component {

    constructor(props) {
        super(props)
        //cellFormatter={(actions) => `\${price.toFixed(2)}`}
        //this.callSystemAction = this.callSystemAction.bind(this)
    }

    render() {
        return (
            <DataTable
                selectable={this.props.content.enclosure.selectable}
                rowKeyColumn={this.props.content.enclosure.rowkey}
                sortable={this.props.content.enclosure.sortable}
                shadow={0}
                rows={this.props.content.items}>
                {this.props.content.enclosure.header.map(headerItem =>
                    <TableHeader
                        key={headerItem.seq}
                        name={headerItem.seq}
                        tooltip={headerItem.tooltip}
                    >
                        {headerItem.caption}
                    </TableHeader>)}
                <TableHeader
                    key="menu"
                    name="menu"
                    tooltip="actions"
                    cellFormatter={(actions) => <div>
                    <IconButton name="more_vert" id="demo-menu-lower-right"/>
                    <Menu target="demo-menu-lower-right" align="right">
                        <MenuItem>Some Action</MenuItem>
                        <MenuItem>Another Action</MenuItem>
                        <MenuItem disabled>Disabled Action</MenuItem>
                        <MenuItem>Yet Another Action</MenuItem>
                        </Menu></div>
                    }
                >
                    aaaa
                </TableHeader>
            </DataTable>
        )
    }

}

DataRenderer.propTypes = {
    //dispatch: PropTypes.func.isRequired,
    //title: PropTypes.string.isRequired,
}

export default DataRenderer