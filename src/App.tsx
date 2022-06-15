import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <div>Hello world</div>
      </div>
    </ChakraProvider>
  );
}

export default App;
