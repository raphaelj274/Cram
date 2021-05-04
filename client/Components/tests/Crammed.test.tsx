import React from "react";
import { Crammed } from '../Crammed';
import { render, cleanup, fireEvent, waitFor, act } from '@testing-library/react-native';
import { MockedProvider } from "@apollo/client/testing";
import { NavigationContainer } from '@react-navigation/native';


const mockRoute = {
  params: {
    paramC: {
      bullets: ['const http = require(\'http\')\; const hostname = \'127.0.0.1\'\; const port =      3000;',
        'const server = http.createServer((req, res) => {res.statusCode = 200\; res.setHeader(\'Content-Type\', \'text/plain\')\;res.end(\'Hello World\')\;})\;',
        'server.listen(port, hostname, () => {console.log(\'Server running at http://hostname:port\');});'],
      related: ['Koa', 'Express'],
      title: 'Node',
      url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',

    }
  }
}

const notFound = {
  params: {
    paramC: {
      title: 'Not Found',
      url: 'Sorry no materials available at present. Check out some of the other available materials!',
      related: [
                'Koa',
                'Node',
                'Express',
                'Apollo',
                'REST',
                'HTTP',
                'MongoDB',
                'SQL',
      ],
      bullets: []
    }
  }
}

jest.mock('../../Services/ApiService', () => {
  return { furtherTopics: jest.fn() }
})

const fakeNavigation = {
  navigate: jest.fn(),
};

describe('Crammed page test suite on successful topic load', () => {
  afterEach(cleanup);


  it('crammed page loads correctly "Node" topic has been found ', () => {
    const { getByText, debug } = render(
      <MockedProvider>
        <Crammed route={mockRoute}/>
      </MockedProvider>
    )
    getByText('Node');
  })

  it('Related topics Koa and Express are shown for Node Topic', () => {
    const { getByText, debug } = render(
      <MockedProvider>
        <Crammed route={mockRoute}/>
      </MockedProvider>
    )
    getByText('Koa');
    getByText('Express');
  })

  it('Cheatsheet and Related topics components have been rendered on page load', () => {
    const { getByTestId, debug } = render(
      <MockedProvider>
        <Crammed route={mockRoute}/>
      </MockedProvider>
    )
    getByTestId('bullet-container')
    getByTestId('related-topics-container')
  })
  
  it('Video component is rendered on page load', () => {
    const { getByTestId, debug } = render(
      <MockedProvider>
        <Crammed route={mockRoute} />
      </MockedProvider>
    )
    getByTestId('video-container')
  })

  it('Option to "Cram again" is available', () => {
    const { getByText, debug } = render(
      <MockedProvider>
        <Crammed route={mockRoute} />
      </MockedProvider>
    )
    getByText('Cram again?')
  })

})

describe('Crammed page test suite on unsuccessful topic load', () => {
  afterEach(cleanup);

  it('Not found page message loads successfully', () => {

    const { getByText, debug } = render(
      <MockedProvider>
        <Crammed route={notFound} />
      </MockedProvider>
    )
    getByText('Not Found');
  })

  it('Not found still gives the option to cram again', () => {
    const { getByText, debug } = render(
      <MockedProvider>
        <Crammed route={notFound} />
      </MockedProvider>
    )
    getByText('Cram again?');
  })
  
})


describe('Navigation from Crammed back to Cram', () => {
  afterEach(cleanup);

  it('Click the "Cram again?" button brings the user back to Cram page when Topic "Not Found"', async () => {
    const { getByTestId, debug } = render(
      <NavigationContainer>
        <Crammed route={notFound} navigation={fakeNavigation}/>
      </NavigationContainer>
    )
    const cramAgainBtn = getByTestId('cram-again-btn');
    fireEvent.press(cramAgainBtn);
    await waitFor(() => {
      expect(fakeNavigation.navigate).toBeCalledWith('Cram')
    })
  })

  it('Click the "Cram again?" button brings the user back to Cram page when Topic exists', async () => {
    const { getByTestId, debug } = render(
      <NavigationContainer>
        <Crammed route={mockRoute} navigation={fakeNavigation}/>
      </NavigationContainer>
    )
    const cramAgainBtn = getByTestId('cram-again-btn');
    fireEvent.press(cramAgainBtn);
    await waitFor(() => {
      expect(fakeNavigation.navigate).toBeCalledWith('Cram')
    })
  })
})