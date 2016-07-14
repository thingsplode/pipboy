import React, {PropTypes} from 'react'
import {Layout, Header, Content, Textfield} from 'react-mdl';
import DrawerMenuContainer from '../containers/DrawerMenuContainer'
import AppMenuContainer from '../containers/AppMenuContainer'
import ContentRendererContainer from '../containers/ContentRendererContainer'

const Frame = ({title}) => (
    <div className="demo-big-content">
        <Layout>
            <Header title={title} scroll>
                <AppMenuContainer/>
            </Header>
            <DrawerMenuContainer/>
            <Content>
                <div className="page-content">
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
