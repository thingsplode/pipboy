import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {
    Layout,
    Header,
    Navigation,
    Drawer,
    Content,
    Textfield
} from 'react-mdl';
import DrawerMenuContainer from '../containers/DrawerMenuContainer'
import AppMenuContainer from '../containers/AppMenuContainer'

 export const NavigationLink = ({route, text}) => (
     <a href={route} className='mdl-navigation__link'>{text}</a>
 )

 NavigationLink.propTypes = {
     route: PropTypes.string.isRequired,
     text: PropTypes.string.isRequired
 }

export class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        let pps = this.props;
    }

    handleChange() {
        this.props.onUserInput(this.refs.searchInput.value);
    }

    render() {
        return (<Textfield ref="searchInput" placeholder="Search..." value={this.props.searchText} onChange={(e) => this.handleChange(e)} label="Search" expandable expandableIcon="search" style={{}}/>);
    }
}

export class Deprecated extends React.Component {

    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this)
        this.state = {
            searchText: ''
        };
    }

    handleUserInput(searchTextValue) {
        this.setState({searchText: searchTextValue})
    }

    componentDidMount() {
        //componentHandler.upgradeDom();
        //let domNode = ReactDOM.findDOMNode(this);
        //let ch = componentHandler.upgradeElement(domNode);
    }

    componentWillUnmount() {
        ch.downgradeElement();
    }

    componentDidUpdate() {
        //componentHandler.upgradeDom();
    }

    render() {
        return (
            <div className="demo-big-content">
                <Layout>
                    <Header title={this.props.title} scroll>
                        <AppMenuContainer/>
                        <SearchBox onUserInput={this.handleUserInput}/>
                    </Header>
                    <DrawerMenuContainer/>
                    <Content>
                        <div className="page-content"/>
                    </Content>
                </Layout>
            </div>
        );
    }
};
