import React, {PropTypes} from 'react'
import {Layout, Header, Content, Textfield} from 'react-mdl';
import AppMenu from './AppMenu'
import DrawerMenu from './DrawerMenu'
import ContentRendererContainer from '../containers/ContentRendererContainer'

const Frame = ({title, frame}) => (
    <div className="frame-content">
        <Layout>
            <Header title={title} scroll>
                {typeof frame !== 'undefined' ? <AppMenu appLinks={frame.appLinks}/> : <span/>}
            </Header>
            {typeof frame !== 'undefined' ? <DrawerMenu drawerTitle={frame.drawerTitle} drawerLinks={frame.drawerLinks}/> : <span/>}
            <Content>
                <div className="page-content" style={{float: 'none', margin: '0 auto', padding: '15px'}}>
                    <ContentRendererContainer/>
                </div>
            </Content>
        </Layout>
    </div>
)

Frame.propTypes = {
    title: PropTypes.string.isRequired
}

export default Frame
