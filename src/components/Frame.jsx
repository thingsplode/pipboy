import React, { PropTypes } from 'react'
import {Layout,Header,Content,Textfield} from 'react-mdl';
import DrawerMenuContainer from '../containers/DrawerMenuContainer'
import AppMenuContainer from '../containers/AppMenuContainer'

const Frame = ({title}) => (
  <div className="demo-big-content">
      <Layout>
          <Header title={title} scroll>
              <AppMenuContainer/>
          </Header>
          <DrawerMenuContainer/>
          <Content>
              <div className="page-content"/>
          </Content>
      </Layout>
  </div>
)

Frame.propTypes = {
    title:PropTypes.string.isRequired
}

export default Frame
