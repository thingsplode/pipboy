import React from 'react';
import ReactDOM from 'react-dom';
import {
    Layout,
    Header,
    Navigation,
    Drawer,
    Content,
    Textfield
} from 'react-mdl';

//var componentHandler = require('exports?componentHandler!material-design-lite/material');

var LINKS = [
    {
        id: '1',
        text: 'one'
    }, {
        id: '2',
        text: 'two'
    }, {
        id: '3',
        text: 'three'
    }
];

class NavigationLink extends React.Component {
    componentDidMount() {}

    componentWillUnmount() {}

    componentDidUpdate() {}

    render() {
        return (
            <a href={this.props.link} className='mdl-navigation__link'>{this.props.link}</a>
        );
    }
}

class SearchBox extends React.Component {

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

class Container extends React.Component {

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
        componentHandler.upgradeDom();
    }

    render() {
        let headerLinks = [];
        let drawerLinks = [];

        this.props.headerLinks.forEach(function(headerLink) {
            headerLinks.push(<NavigationLink key={headerLink.id} link={headerLink.text}/>);
        });

        this.props.drawerLinks.forEach(function(drawerLink) {
            drawerLinks.push(<NavigationLink key={drawerLink.id} link={drawerLink.text}/>);
        });

        return (
            <div className="demo-big-content">
                <Layout>
                    <Header title={this.props.title} scroll>
                        <Navigation>
                            {headerLinks}
                        </Navigation>
                        <SearchBox onUserInput={this.handleUserInput}/>
                    </Header>
                    <Drawer title="Title">
                        <Navigation>
                            {drawerLinks}
                        </Navigation>
                    </Drawer>
                    <Content>
                        <div className="page-content"/>
                    </Content>
                </Layout>
            </div>
        );
    }
};

var Frame = class {
    constructor() {
        var f = ReactDOM.render(
            <Container title='some title' headerLinks={LINKS} drawerLinks={LINKS}/>, document.getElementById('app'));
    }
}

export default Frame;
