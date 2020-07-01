import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: 'http://localhost:3000/graphql',
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Project: {
          developmentTime(data, args, ctx) {
            if (data.endDate) {
              return (data.endDate - data.startDate) / (3600000 * 24);
            } else {
              return Math.floor((Date.now() - data.startDate) / (3600000 * 24));
            }
          },
        },
      },
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
