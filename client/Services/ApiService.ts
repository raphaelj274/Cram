import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import pathToBase64 from './ImageService';

const apolloClient = new ApolloClient({
  uri: 'http://10.153.104.135:4000/',
  cache: new InMemoryCache()
});

// ipconfig getifaddr en0

const cramToApi = async function (imageURI: string): Promise<any> {
  console.log('request made');
  const imgBase64 = await pathToBase64(imageURI);
  return apolloClient.query({
    query: gql`
	    {
	      topics(input: {title: "${imgBase64}"}) {
          title
          url
          related,
          bullets
        }
      }
    `,
    fetchPolicy: "network-only"
  }).then(result => {
    console.log('heres the topic : ', result.data.topics[0]);
    return result.data.topics[0];
  }).catch(err => console.error(err));
}

const furtherTopics = async function (title: string): Promise<any> {
  console.log('request made');
  return apolloClient.query({
    query: gql`
	    {
	      furtherTopics(input: {title: "${title}"}) {
          title
          url
          related
          bullets
        }
      }
    `,
    fetchPolicy: "network-only"
  }).then(result => {
    console.log('heres the topic : ', result.data.furtherTopics[0]);
    return result.data.furtherTopics[0];
  }).catch(err => console.error(err));
}

export { cramToApi, furtherTopics, apolloClient }