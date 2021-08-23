//Courtesy of https://techsolutionshere.com/how-to-create-a-react-scroll-to-top-button/

import React, { Component } from 'react';

export default class GoTop extends Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(props: any) {
    super(props);
    this.state = {
      is_visible: false,
    };
  }

  componentDidMount(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const scrollComponent = this;
    document.addEventListener('scroll', function () {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility(): void {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true,
      });
    } else {
      this.setState({
        is_visible: false,
      });
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  render(): JSX.Element {
    const { is_visible } = this.state;

    return (
      <div className="back-to-top show-back-to-top">
        {is_visible && (
          <div className="top" onClick={() => this.scrollToTop()}>
            ⬆
          </div>
        )}
      </div>
    );
  }
}
