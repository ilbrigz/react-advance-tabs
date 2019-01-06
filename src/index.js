import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Tabs extends Component {
  state = {
    activeIndex: 0
  };

  selectTab = index => {
    this.setState({ activeIndex: index });
  };

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        activeIndex: this.state.activeIndex,
        selectTab: this.selectTab
      });
    });
    return <div className="tabs">{children}</div>;
  }
}

class TabList extends Component {
  render() {
    const { activeIndex, selectTab } = this.props;
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: activeIndex === index,
        index,
        onSelect: () => selectTab(index)
      });
    });
    return <div className="tabList">{children}</div>;
  }
}

class Tab extends Component {
  render() {
    const { isActive, isDisabled, onSelect } = this.props;
    return (
      <div
        className={
          isDisabled ? "tab disabled" : isActive ? "tab active" : "tab"
        }
        onClick={isDisabled ? null : onSelect}
      >
        {this.props.children}
      </div>
    );
  }
}

class TabPanels extends Component {
  render() {
    const { activeIndex } = this.props;
    return <div className="tabPanel">{this.props.children[activeIndex]}</div>;
  }
}

class TabbPanel extends Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
function App() {
  return (
    <div className="App">
      <Tabs>
        <TabList>
          <Tab>Home</Tab>
          <Tab>About</Tab>
          <Tab>Contacts</Tab>
          <Tab isDisabled>Four</Tab>
        </TabList>
        <TabPanels>
          <div>
            <h1>home page</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            officiis, obcaecati sint voluptatibus accusamus in illo ex itaque
            modi debitis dolorem deserunt distinctio consectetur voluptatem
            ipsum hic cum expedita soluta.
          </div>
          <div>
            <h1>about page</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            officiis, obcaecati sint voluptatibus accusamus in illo ex itaque
            modi debitis dolorem deserunt distinctio consectetur voluptatem
            ipsum hic cum expedita soluta.
          </div>
          <div>
            <h1>contacts page</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            officiis, obcaecati sint voluptatibus accusamus in illo ex itaque
            modi debitis dolorem deserunt distinctio consectetur voluptatem
            ipsum hic cum expedita soluta.
          </div>
          <div>
            <h1>disabled page</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            officiis, obcaecati sint voluptatibus accusamus in illo ex itaque
            modi debitis dolorem deserunt distinctio consectetur voluptatem
            ipsum hic cum expedita soluta.
          </div>
        </TabPanels>
      </Tabs>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
