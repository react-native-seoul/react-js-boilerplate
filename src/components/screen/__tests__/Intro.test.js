import React from 'react';
import renderer from 'react-test-renderer';

import { AppProvider } from '../../../providers';
import Intro from '../Intro';
import Button from '../../shared/Button';
import { AppContext } from './testHelpers';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  history: {
    push: jest.fn(),
  },
  ...AppContext,
};

const component = (
  <AppProvider>
    <Intro {...props}/>
  </AppProvider>
);

// test for the container page in dom
describe('[Intro] screen rendering test', () => {
  let json;

  it('should render outer component and snapshot matches', () => {
    json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Intro] Interaction', () => {
  let rendered: TestRenderer.ReactTestRenderer;
  let root: TestRenderer.ReactTestRenderer.root;
  let instance;

  beforeEach(() => {
    rendered = renderer.create(component);
    root = rendered.root;
  });

  it('should simulate [onLogin] click', () => {
    jest.useFakeTimers();

    const intro = root.findByType(Intro);
    // console.log('intro', intro);
    
    const buttons = root.findAllByType(Button);
    // console.log('buttons', buttons);
    
    // buttons[0].props.onClick();
    // const spy = jest.spyOn(Intro, 'onLogin');
    // const buttons = root.findAllByType(Button);
    // instance.onLogin(AppContext);
    // expect(setTimeout).toHaveBeenCalledTimes(1);
    // expect(instance.state.isLoggingIn).toEqual(true);
    // expect(spy).toBeCalled();

    // jest.runAllTimers();
    // expect(instance.state.isLoggingIn).toEqual(false);
    // expect(instance.dispatc).toHaveBeenCalled();

    // buttons[0].props.onClick();
  });

  it('should simulate [navigate] click', () => {
    const buttons = root.findAllByType(Button);
    buttons[1].props.onClick();
    expect(props.history.push).toBeCalledWith({
      pathname: '/404',
      state: {},
    });
  });
});

