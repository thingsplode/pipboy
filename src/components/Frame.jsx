import React, {PropTypes} from 'react'
import {Layout, Header, Content, Grid, Cell} from 'react-mdl'
import ReactDOM from 'react-dom'
import AppMenu from './AppMenu'
import DrawerMenu from './DrawerMenu'
import ContentRendererContainer from '../containers/ContentRendererContainer'
import {Actions} from '../actions'
import {ActionSource} from '../core'

class Frame extends React.Component {

    /**
     *  Grid structure on this.props.frameData.grid
     *  "grid": [
     *    {"cells":[{"cellidx": 0, "col": 12}]},
     *    {"cells":[{"cellidx": 1, "col": 8, "phone": 12},{"cellidx": 2, "col": 4, "phone": 12}]},
     *    {"cells":[{"cellidx": 3, "col": 12, "tabs":[]}]}
     *    ],
     */

    constructor(props) {
        super(props)
        this.callSystemAction = this.callSystemAction.bind(this)
    }

    callSystemAction(actionId, actionSource) {
        this.props.dispatch(Actions.triggerAction(actionId, actionSource))
    }

    componentDidMount() {
        //console.log('frame -> componentDidMount');
        let domNode = ReactDOM.findDOMNode(this);
        let ch = componentHandler.upgradeElement(domNode);
        componentHandler.upgradeDom();
    }

    componentDidUpdate() {
        //console.log('frame -> componentDidUpdate');
        //componentHandler.upgradeDom()
    }

    componentWillUpdate() {
        //console.log('frame -> componentWillUpdate')
    }

    shouldComponentUpdate() {
        //console.log('frame -> shouldComponentUpdate');
        return true
    }

    componentWillReceiveProps() {
        //console.log('frame -> componentWillReceiveProps')
    }

    render() {
        const grid = this.props.frameData.grid

        let modules = typeof this.props.frameData !== 'undefined' &&
            typeof this.props.frameData.modules !== 'undefined'
        return (<div className="frame-content">
            <Layout>
                {modules ?
                    <Header title={this.props.frameData.appTitle} scroll>
                        <AppMenu appLinks={this.props.frameData.systemMenus}
                                 callSystemActionFunction={this.callSystemAction}
                        />
                    </Header>
                    : <span/>}
                {modules ?
                    <DrawerMenu drawerTitle={this.props.frameData.drawerTitle}
                                drawerLinks={this.props.frameData.modules.list}
                                frameInstance={this}
                                callSystemActionFunction={this.callSystemAction}
                    /> :
                    <DrawerMenu drawerTitle="Empty" callSystemActionFunction={this.callSystemAction} drawerLinks={[]}/>}
                <Content>
                    <div className="page-content" style={{float: 'none', margin: '0 auto', padding: '15px'}}>
                        <Grid className="frame_grid">
                            {grid.map(row =>
                                row.cells.map(cell =>
                                    <Cell col={cell.col}
                                          tablet={cell.tablet}
                                          phone={cell.phone}
                                          key={cell.cellidx}>
                                        {/*style={{borderSize: '1px', borderColor:'red', borderStyle:'solid'}}*/}
                                        <ContentRendererContainer cellId={cell.cellidx}/>
                                    </Cell>
                                )
                            )}
                        </Grid>
                    </div>
                </Content>
            </Layout>
        </div>)
    }
}

Frame.propTypes = {
    dispatch: PropTypes.func.isRequired,
    //title: PropTypes.string.isRequired,
    //frameData: PropTypes.is
}

export default Frame
