import { SimpleGrid, VStack, Text, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../Store/product.js";
import ProductCard from "../Components/ProductCard.jsx";
import React from "react";

function HomePage() {
  const {fetchProducts, products} = useProductStore();
  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <Container maxW="container.x1" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"Bold"}
          bgGradient="linear(to-r, #7928CA,#FF0080)"
          bgClip="text"
          textAlign="center"
        >
          Current Products
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          w={"full"}
          
        >
          {products.map((product) =>(
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text 
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
